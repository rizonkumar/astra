import { useEffect, useMemo, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, Extension, StateEffect } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";

import { customTheme } from "../extensions/theme";
import { customSetup } from "../extensions/custom-setup";
import { getLanguageExtension } from "../extensions/language-extension";
import { miniMap } from "../extensions/minimap";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { suggestion } from "../extensions/suggestion";

interface Props {
  fileName: string;
  initialValue?: string;
  onChange: (value: string) => void;
}

export const CodeEditor = ({
  fileName,
  initialValue = "",
  onChange,
}: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const languageExtension = useMemo(
    () => getLanguageExtension(fileName),
    [fileName],
  );

  const baseExtensions = useMemo<Extension[]>(
    () => [
      oneDark,
      customTheme,
      customSetup,
      keymap.of([indentWithTab]),
      suggestion(fileName),
      miniMap(),
      indentationMarkers(),
      EditorView.updateListener.of((update) => {
        if (
          update.docChanged &&
          update.transactions.some((tr) => tr.isUserEvent("input"))
        ) {
          onChange(update.state.doc.toString());
        }
      }),
    ],
    [onChange],
  );

  useEffect(() => {
    if (!editorRef.current || viewRef.current) return;

    const state = EditorState.create({
      doc: initialValue,
      extensions: [...baseExtensions, languageExtension],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    view.dispatch({
      effects: StateEffect.reconfigure.of([
        ...baseExtensions,
        languageExtension,
      ]),
    });
  }, [languageExtension, baseExtensions]);

  return <div ref={editorRef} className="bg-background size-full pl-4" />;
};
