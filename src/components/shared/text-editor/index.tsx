/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

// import TreeViewPlugin from './plugins/TreeViewPlugin';

import "./styles.css";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

const placeholder = "Enter your text...";

// const getExtraStyles = (element: HTMLElement): string => {
//   // Parse styles from pasted input, but only if they match exactly the
//   // sort of styles that would be produced by exportDOM
//   let extraStyles = '';
//   const fontSize = parseAllowedFontSize(element.style.fontSize);
//   const backgroundColor = parseAllowedColor(element.style.backgroundColor);
//   const color = parseAllowedColor(element.style.color);
//   if (fontSize !== '' && fontSize !== '15px') {
//     extraStyles += `font-size: ${fontSize};`;
//   }
//   if (backgroundColor !== '' && backgroundColor !== 'rgb(255, 255, 255)') {
//     extraStyles += `background-color: ${backgroundColor};`;
//   }
//   if (color !== '' && color !== 'rgb(0, 0, 0)') {
//     extraStyles += `color: ${color};`;
//   }
//   return extraStyles;
// };

const editorConfig = {
  namespace: "React.js",
  theme: ExampleTheme,
  onError(error: Error) {
    throw error;
  },
};

function InitialValuePlugin({ value }: { value?: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (value) {
      editor.update(() => {
        const root = $getRoot();
        // Clear any existing content
        root.clear();
        // Create a new paragraph node
        const paragraph = $createParagraphNode();
        // Create a text node with the initial value
        const text = $createTextNode(value);
        // Add the text to the paragraph
        paragraph.append(text);
        // Add the paragraph to the root
        root.append(paragraph);
      });
    }
  }, [editor, value]);

  return null;
}

function OnChangePlugin({ onChange }: { onChange: (text: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const text = editor
          .getEditorState()
          .read(() => editor.getRootElement()?.innerText || "");

        if (onChange) {
          onChange(text);
        }
      });
    });
  }, [editor, onChange]);

  return null;
}

export default function TextEditor({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (text: string) => void;
}) {
  const handleChange = (text: string) => {
    if (onChange) onChange(text);
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">{placeholder}</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <InitialValuePlugin value={value} />
          <OnChangePlugin onChange={handleChange} />
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
