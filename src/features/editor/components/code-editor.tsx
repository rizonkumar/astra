import { useEffect, useMemo, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { customTheme } from "../extensions/theme";
import { getLanguageExtension } from "../extensions/language-extension";

interface Props {
  fileName: string;
}

export const CodeEditor = ({ fileName }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const languageExtension = useMemo(
    () => getLanguageExtension(fileName),
    [fileName],
  );

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      doc: `
      // This is a React component that displays a counter with increment and decrement buttons.
      import { useState } from "react";
      const Counter = () => {
        const [value, setValue] = useState(0);
        const onIncrement = () => setValue(value + 1);
        const onDecrement = () => setValue(value - 1);
        return (
          <div>
            <button onClick={onIncrement}>{value}</button>
            <button onClick={onDecrement}>{value}</button>
          </div>
        );
      }`,
      parent: editorRef.current,
      extensions: [
        oneDark,
        customTheme,
        basicSetup,
        languageExtension,
        keymap.of([indentWithTab]),
      ],
    });

    viewRef.current = view;
    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editorRef} className="bg-background size-full pl-4" />;
};
