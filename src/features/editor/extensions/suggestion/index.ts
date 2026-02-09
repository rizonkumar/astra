import {
  Decoration,
  DecorationSet,
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from "@codemirror/view";
import { Extension, StateEffect, StateField } from "@codemirror/state";

const setSuggestionEffect = StateEffect.define<string | null>();

const suggestionState = StateField.define<string | null>({
  create() {
    return null;
  },
  update(value, transaction) {
    for (const effect of transaction.effects) {
      if (effect.is(setSuggestionEffect)) {
        return effect.value;
      }
    }
    return value;
  },
});

class SuggestionWidget extends WidgetType {
  constructor(readonly text: string) {
    super();
  }
  toDOM() {
    const span = document.createElement("span");
    span.textContent = this.text;
    span.style.opacity = "0.4";
    span.style.pointerEvents = "none";
    return span;
  }
}

let debounceTimer: number | null = null;
let isWaitingForSuggestion = false;
const DEBOUNCE_DELAY = 300;

const generateFakeSuggestion = (textBeforeCursor: string): string | null => {
  const trimmed = textBeforeCursor.trimEnd();
  if (trimmed.endsWith("const")) return " myVariable = ";
  if (trimmed.endsWith("function")) return " myFunction() { rizon}";
  if (trimmed.endsWith("class")) return " myClass { }";
  if (trimmed.endsWith("interface")) return " myInterface { }";
  if (trimmed.endsWith("type")) return " myType { }";
  if (trimmed.endsWith("enum")) return " myEnum { }";
  if (trimmed.endsWith("let")) return " myVariable = ";
  if (trimmed.endsWith("var")) return " myVariable = ";
  if (trimmed.endsWith("while")) return " while (condition) { }";

  return null;
};

const createDebouncePlugin = (fileName: string) => {
  return ViewPlugin.fromClass(
    class {
      constructor(view: EditorView) {
        this.triggerSuggestion(view);
      }

      update(update: ViewUpdate) {
        if (update.docChanged || update.selectionSet) {
          this.triggerSuggestion(update.view);
        }
      }
      triggerSuggestion(view: EditorView) {
        if (debounceTimer !== null) {
          clearTimeout(debounceTimer);
        }
        isWaitingForSuggestion = true;
        debounceTimer = window.setTimeout(async () => {
          // Fake suggestion (delete this block later)
          const cursor = view.state.selection.main.head;
          const line = view.state.doc.lineAt(cursor);
          const textBeforeCursor = line.text.slice(0, cursor - line.from);
          const suggestion = generateFakeSuggestion(textBeforeCursor);
          isWaitingForSuggestion = false;
          view.dispatch({ effects: [setSuggestionEffect.of(suggestion)] });
        }, DEBOUNCE_DELAY);
      }
      destroy() {
        if (debounceTimer !== null) {
          clearTimeout(debounceTimer);
        }
      }
    },
  );
};

const renderPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
      this.decorations = this.build(view);
    }
    update(update: ViewUpdate) {
      const suggestionChanged = update.transactions.some((transaction) => {
        return transaction.effects.some((effect) => {
          return effect.is(setSuggestionEffect);
        });
      });

      const shouldRebuild =
        update.docChanged || update.selectionSet || suggestionChanged;

      if (shouldRebuild) {
        this.decorations = this.build(update.view);
      }
    }
    build(view: EditorView) {
      if (isWaitingForSuggestion) {
        return Decoration.none;
      }

      const suggestion = view.state.field(suggestionState);
      if (!suggestion) {
        return Decoration.none;
      }
      const cursor = view.state.selection.main.head;
      return Decoration.set([
        Decoration.widget({
          widget: new SuggestionWidget(suggestion),
          side: 1,
        }).range(cursor),
      ]);
    }
  },
  { decorations: (plugin) => plugin.decorations },
);

const acceptSuggestionKeyMap = keymap.of([
  {
    key: "Tab",
    run: (view) => {
      const suggestion = view.state.field(suggestionState);
      if (!suggestion) return false;
      const cursor = view.state.selection.main.head;
      view.dispatch({
        changes: { from: cursor, insert: suggestion }, // insert the suggestion text
        selection: { anchor: cursor + suggestion.length }, // move the cursor to the end of the suggestion
        effects: [setSuggestionEffect.of(null)], // clear the suggestion
      });
      return true;
    },
  },
]);

export const suggestion = (fileName: string): Extension => [
  suggestionState,
  createDebouncePlugin(fileName),
  renderPlugin,
  acceptSuggestionKeyMap,
];
