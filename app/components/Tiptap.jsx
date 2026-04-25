"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ResizeImage from "tiptap-extension-resize-image";
import MenuBar from "../components/MenuBar";
import { useEffect } from "react";
export default function Tiptap({ setContent, initialContent }) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: {
          HTMLAttributes: { class: "list-disc ml-4" },
        },
        orderedList: {
          HTMLAttributes: { class: "list-decimal ml-4" },
        },
      }),

      Highlight.configure({ multicolor: true }),
      ResizeImage,
      TextStyle,
      Color,

      Image,

      Link.configure({
        openOnClick: true,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: initialContent || "", // ✅ LOAD INITIAL

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[200px] border rounded-md bg-slate-50 py-3 px-4 focus:outline-none whitespace-pre-wrap break-words",
      },
    },

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // 🔥 THIS IS THE KEY FIX (FOR EDIT MODE)
  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto">

      <MenuBar editor={editor} />

      <div className="mt-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}