"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import ResizeImage from "tiptap-extension-resize-image";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import Youtube from "@tiptap/extension-youtube";
import Video from "./VideoExtension";
import MenuBar from "./MenuBar";
import { useEffect, useRef, useCallback } from "react";

const EDITOR_STYLES = `
  .ProseMirror {
    outline: none;
    min-height: 420px;
    font-size: 16px;
    line-height: 1.75;
    color: #1a202c;
  }
  .ProseMirror p { margin: 0.6em 0; }
  .ProseMirror h1 { font-size: 2.2em; font-weight: 800; margin: 1em 0 0.4em; line-height: 1.2; }
  .ProseMirror h2 { font-size: 1.7em; font-weight: 700; margin: 0.9em 0 0.35em; line-height: 1.3; }
  .ProseMirror h3 { font-size: 1.35em; font-weight: 600; margin: 0.8em 0 0.3em; }
  .ProseMirror h4 { font-size: 1.1em; font-weight: 600; margin: 0.7em 0 0.25em; }
  .ProseMirror ul { list-style: disc; padding-left: 1.5rem; margin: 0.5em 0; }
  .ProseMirror ol { list-style: decimal; padding-left: 1.5rem; margin: 0.5em 0; }
  .ProseMirror li { margin: 0.2em 0; }
  .ProseMirror blockquote {
    border-left: 4px solid #e53e3e;
    padding: 0.6rem 1.2rem;
    margin: 1rem 0;
    background: #fff5f5;
    border-radius: 0 8px 8px 0;
    color: #555;
    font-style: italic;
  }
  .ProseMirror code {
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
    color: #e53e3e;
  }
  .ProseMirror pre {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.2rem 1.5rem;
    border-radius: 10px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    overflow-x: auto;
    margin: 1rem 0;
  }
  .ProseMirror pre code { background: none; color: inherit; padding: 0; }
  .ProseMirror hr {
    border: none;
    border-top: 2px solid #e2e8f0;
    margin: 2rem 0;
  }
  .ProseMirror img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
    margin: 0.5rem 0;
    cursor: pointer;
  }
  .ProseMirror img.ProseMirror-selectednode {
    outline: 3px solid #3b82f6;
    border-radius: 8px;
  }
  .ProseMirror video {
    max-width: 100%;
    border-radius: 8px;
    display: block;
    margin: 0.5rem 0;
  }
  .ProseMirror iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 10px;
    border: none;
    margin: 0.5rem 0;
    display: block;
  }
  .ProseMirror a { color: #3b82f6; text-decoration: underline; }
  /* TABLE */
  .ProseMirror .tableWrapper { overflow-x: auto; margin: 1rem 0; }
  .ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    overflow: hidden;
  }
  .ProseMirror td,
  .ProseMirror th {
    min-width: 80px;
    border: 2px solid #e2e8f0;
    padding: 10px 14px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }
  .ProseMirror th {
    font-weight: 700;
    background: #f8fafc;
    text-align: left;
  }
  .ProseMirror .selectedCell::after {
    z-index: 2;
    position: absolute;
    content: "";
    inset: 0;
    background: rgba(59, 130, 246, 0.12);
    pointer-events: none;
  }
  .ProseMirror .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background: #3b82f6;
    pointer-events: none;
  }
  .resize-cursor { cursor: col-resize; }
  /* DRAG */
  .ProseMirror .drop-cursor { border-left: 2px solid #3b82f6 !important; }
  /* PLACEHOLDER */
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #94a3b8;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;

export default function Tiptap({ setContent, initialContent }) {
  const contentLoaded = useRef(false);

  const uploadFile = useCallback(async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              file: reader.result,
              fileName: `${Date.now()}-${file.name}`,
            }),
          });
          const data = await res.json();
          resolve(data.url);
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        bulletList: { HTMLAttributes: { class: "list-disc" } },
        orderedList: { HTMLAttributes: { class: "list-decimal" } },
        link: false,
        underline: false,
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      ResizeImage,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({ controls: true, nocookie: true }),
      Video,
    ],

    content: initialContent || "",
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class: "ProseMirror px-8 py-6",
      },

      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files?.length) {
          const files = Array.from(event.dataTransfer.files);
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });
          if (!coordinates) return false;

          files.forEach(async (file) => {
            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");
            if (!isImage && !isVideo) return;

            const url = await uploadFile(file);
            const { schema } = view.state;

            if (isImage) {
              const node = schema.nodes.image.create({ src: url });
              view.dispatch(view.state.tr.insert(coordinates.pos, node));
            } else {
              const node = schema.nodes.video.create({ src: url });
              view.dispatch(view.state.tr.insert(coordinates.pos, node));
            }
          });

          return true;
        }
        return false;
      },

      handlePaste: (_view, event, _slice) => {
        const items = Array.from(event.clipboardData?.items || []);
        const imageItem = items.find((i) => i.type.startsWith("image/"));
        if (!imageItem) return false;

        event.preventDefault();
        const file = imageItem.getAsFile();
        if (!file) return false;

        uploadFile(file).then((url) => {
          editor?.chain().focus().setImage({ src: url }).run();
        });
        return true;
      },
    },

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Load initial content exactly once — never re-run when user types
  useEffect(() => {
    if (editor && initialContent && !contentLoaded.current) {
      editor.commands.setContent(initialContent);
      contentLoaded.current = true;
    }
  }, [editor, initialContent]);

  if (!editor) return null;

  return (
    <div className="tiptap-root border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
      <style dangerouslySetInnerHTML={{ __html: EDITOR_STYLES }} />
      <MenuBar editor={editor} uploadFile={uploadFile} />
      <EditorContent editor={editor} />
    </div>
  );
}
