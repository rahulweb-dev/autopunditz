"use client";

import { useState } from "react";
import {
  Bold, Italic, Underline, Strikethrough, Code, Code2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Link2, List, ListOrdered, Quote, Minus,
  Image as ImageIcon, Film, PlayCircle, Table as TableIcon,
  Undo2, Redo2, Trash2, ChevronDown, X,
} from "lucide-react";

const Divider = () => (
  <span className="w-px h-5 bg-gray-200 mx-0.5 shrink-0" />
);

function ToolBtn({ title, onClick, active, disabled, children, className = "" }) {
  return (
    <button
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center w-8 h-8 rounded-lg text-sm transition-all shrink-0
        ${active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"}
        ${disabled ? "opacity-30 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default function MenuBar({ editor, uploadFile }) {
  const [ytOpen, setYtOpen] = useState(false);
  const [ytUrl, setYtUrl] = useState("");
  const [tableOpen, setTableOpen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  if (!editor) return null;

  const inTable = editor.isActive("table");

  const headingValue =
    editor.isActive("heading", { level: 1 }) ? "1" :
    editor.isActive("heading", { level: 2 }) ? "2" :
    editor.isActive("heading", { level: 3 }) ? "3" :
    editor.isActive("heading", { level: 4 }) ? "4" : "p";

  function insertYoutube() {
    if (!ytUrl.trim()) return;
    editor.chain().focus().setYoutubeVideo({ src: ytUrl.trim() }).run();
    setYtUrl("");
    setYtOpen(false);
  }

  function insertTable() {
    editor
      .chain()
      .focus()
      .insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true })
      .run();
    setTableOpen(false);
  }

  return (
    <div className="bg-gray-50 border-b border-gray-200 select-none">

      {/* ── ROW 1: Style / Formatting / Colors / Align / History ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-100">

        {/* STYLE PICKER */}
        <div className="relative flex items-center">
          <select
            value={headingValue}
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "p") editor.chain().focus().setParagraph().run();
              else editor.chain().focus().setHeading({ level: Number(v) }).run();
            }}
            className="h-8 pl-3 pr-7 text-sm border border-gray-200 rounded-lg bg-white appearance-none cursor-pointer outline-none hover:border-gray-300"
          >
            <option value="p">Paragraph</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
          </select>
          <ChevronDown size={13} className="absolute right-2 pointer-events-none text-gray-400" />
        </div>

        <Divider />

        {/* TEXT FORMAT */}
        <ToolBtn title="Bold (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </ToolBtn>
        <ToolBtn title="Italic (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </ToolBtn>
        <ToolBtn title="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <Underline size={15} />
        </ToolBtn>
        <ToolBtn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={15} />
        </ToolBtn>
        <ToolBtn title="Inline Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
          <Code size={15} />
        </ToolBtn>

        <Divider />

        {/* TEXT COLOR */}
        <label
          title="Text Color"
          className="relative flex items-center gap-1 w-8 h-8 justify-center rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <span className="text-sm font-black" style={{ color: editor.getAttributes("textStyle").color || "#000" }}>A</span>
          <input
            type="color"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          />
        </label>

        {/* HIGHLIGHT COLOR */}
        <label
          title="Highlight Color"
          className="relative flex items-center w-8 h-8 justify-center rounded-lg hover:bg-gray-100 cursor-pointer"
        >
          <Highlighter size={15} className="text-gray-700" />
          <input
            type="color"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
          />
        </label>

        <Divider />

        {/* ALIGNMENT */}
        <ToolBtn title="Align Left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft size={15} />
        </ToolBtn>
        <ToolBtn title="Align Center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter size={15} />
        </ToolBtn>
        <ToolBtn title="Align Right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight size={15} />
        </ToolBtn>
        <ToolBtn title="Justify" active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify size={15} />
        </ToolBtn>

        {/* UNDO / REDO pushed to right */}
        <div className="ml-auto flex items-center gap-0.5">
          <ToolBtn title="Undo (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 size={15} />
          </ToolBtn>
          <ToolBtn title="Redo (Ctrl+Y)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 size={15} />
          </ToolBtn>
        </div>
      </div>

      {/* ── ROW 2: Lists / Structure / Insert / Table ── */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-1.5">

        {/* LISTS */}
        <ToolBtn title="Bullet List" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={15} />
        </ToolBtn>
        <ToolBtn title="Ordered List" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={15} />
        </ToolBtn>
        <ToolBtn title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote size={15} />
        </ToolBtn>
        <ToolBtn title="Code Block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <Code2 size={15} />
        </ToolBtn>
        <ToolBtn title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus size={15} />
        </ToolBtn>

        <Divider />

        {/* LINK */}
        <ToolBtn title="Insert / Edit Link" active={editor.isActive("link")} onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const url = prompt("Enter URL (include https://):");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}>
          <Link2 size={15} />
        </ToolBtn>

        {/* IMAGE UPLOAD */}
        <label title="Upload Image (drag & drop also works)" className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 shrink-0">
          <ImageIcon size={15} />
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files || []);
              for (const file of files) {
                const url = await uploadFile(file);
                editor.chain().focus().setImage({ src: url }).createParagraphNear().run();
              }
              e.target.value = "";
            }}
          />
        </label>

        {/* VIDEO UPLOAD */}
        <label title="Upload Video (drag & drop also works)" className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 cursor-pointer text-gray-700 shrink-0">
          <Film size={15} />
          <input
            type="file"
            hidden
            accept="video/mp4,video/webm,video/ogg"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const url = await uploadFile(file);
              editor.chain().focus().setVideo({ src: url }).run();
              e.target.value = "";
            }}
          />
        </label>

        {/* YOUTUBE EMBED */}
        <div className="relative">
          <ToolBtn title="Embed YouTube Video" onClick={() => setYtOpen((v) => !v)}>
            <PlayCircle size={15} />
          </ToolBtn>
          {ytOpen && (
            <div className="absolute left-0 top-10 z-50 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Embed YouTube</p>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => setYtOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
              <input
                type="url"
                value={ytUrl}
                onChange={(e) => setYtUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && insertYoutube()}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full h-10 border border-gray-200 rounded-xl px-3 text-sm outline-none focus:ring-2 focus:ring-red-400 mb-3"
              />
              <div className="flex gap-2">
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={insertYoutube}
                  className="flex-1 h-9 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold"
                >
                  Embed
                </button>
                <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setYtOpen(false)}
                  className="flex-1 h-9 border border-gray-200 rounded-xl text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <Divider />

        {/* INSERT TABLE */}
        <div className="relative">
          <ToolBtn title="Insert Table" active={inTable} onClick={() => setTableOpen((v) => !v)}>
            <TableIcon size={15} />
          </ToolBtn>
          {tableOpen && (
            <div className="absolute left-0 top-10 z-50 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Insert Table</p>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => setTableOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Rows</label>
                  <input
                    type="number" min={1} max={20} value={tableRows}
                    onChange={(e) => setTableRows(Math.max(1, Number(e.target.value)))}
                    className="w-full h-9 border border-gray-200 rounded-xl px-3 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Columns</label>
                  <input
                    type="number" min={1} max={10} value={tableCols}
                    onChange={(e) => setTableCols(Math.max(1, Number(e.target.value)))}
                    className="w-full h-9 border border-gray-200 rounded-xl px-3 text-sm outline-none"
                  />
                </div>
              </div>
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={insertTable}
                className="w-full h-9 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-semibold"
              >
                Insert Table
              </button>
            </div>
          )}
        </div>

        {/* TABLE CONTROLS — only shown when cursor is inside a table */}
        {inTable && (
          <>
            <Divider />
            <span className="text-xs text-gray-400 font-medium px-1 shrink-0">Table:</span>

            <ToolBtn title="Add Row Before" onClick={() => editor.chain().focus().addRowBefore().run()}>
              <span className="text-xs font-bold leading-none">↑R</span>
            </ToolBtn>
            <ToolBtn title="Add Row After" onClick={() => editor.chain().focus().addRowAfter().run()}>
              <span className="text-xs font-bold leading-none">↓R</span>
            </ToolBtn>
            <ToolBtn title="Delete Row" onClick={() => editor.chain().focus().deleteRow().run()} className="hover:bg-red-50 hover:text-red-600">
              <span className="text-xs font-bold leading-none text-red-500">−R</span>
            </ToolBtn>

            <Divider />

            <ToolBtn title="Add Column Before" onClick={() => editor.chain().focus().addColumnBefore().run()}>
              <span className="text-xs font-bold leading-none">←C</span>
            </ToolBtn>
            <ToolBtn title="Add Column After" onClick={() => editor.chain().focus().addColumnAfter().run()}>
              <span className="text-xs font-bold leading-none">C→</span>
            </ToolBtn>
            <ToolBtn title="Delete Column" onClick={() => editor.chain().focus().deleteColumn().run()} className="hover:bg-red-50">
              <span className="text-xs font-bold leading-none text-red-500">−C</span>
            </ToolBtn>

            <Divider />

            <ToolBtn title="Merge Selected Cells" onClick={() => editor.chain().focus().mergeCells().run()}>
              <span className="text-xs font-bold leading-none">M</span>
            </ToolBtn>
            <ToolBtn title="Split Cell" onClick={() => editor.chain().focus().splitCell().run()}>
              <span className="text-xs font-bold leading-none">S</span>
            </ToolBtn>

            <Divider />

            <ToolBtn title="Toggle Header Row" onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
              <span className="text-xs font-bold leading-none">H</span>
            </ToolBtn>

            <ToolBtn title="Delete Table" onClick={() => editor.chain().focus().deleteTable().run()} className="hover:bg-red-50">
              <Trash2 size={13} className="text-red-500" />
            </ToolBtn>
          </>
        )}
      </div>
    </div>
  );
}
