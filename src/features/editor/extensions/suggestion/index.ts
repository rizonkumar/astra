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
    return ""; // TODO: Implement suggestion state
  },
  update(value, transaction) {
    for (const effect of transaction.effects) {
      if (effect.is(setSuggestionEffect)) {
        console.log("setSuggestionEffect", effect.value);
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

export const suggestion = (fileName: string): Extension => {
  console.log("suggestion", fileName);

  return [suggestionState, renderPlugin, acceptSuggestionKeyMap];
};
