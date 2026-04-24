'use client'

import {
  Bold, Italic, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter,
  List, ListOrdered,
  ImageIcon,
  Link2
} from 'lucide-react'

export default function MenuBar({ editor }) {
  if (!editor) return null

  const btn = "p-2 rounded-md hover:bg-gray-100 transition"
  const active = "bg-gray-200"

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 mb-4 border rounded-lg bg-white shadow-sm">

      {/* ✅ WIX STYLE DROPDOWN */}
      <select
        className="px-2 py-1 border rounded-md text-sm"
        onChange={(e) => {
          const value = e.target.value

          if (value === 'p') {
            editor.chain().focus().setParagraph().run()
          } else {
            editor.chain().focus().setHeading({ level: Number(value) }).run()
          }
        }}
        value={
          editor.isActive('heading', { level: 1 }) ? '1' :
            editor.isActive('heading', { level: 2 }) ? '2' :
              editor.isActive('heading', { level: 3 }) ? '3' : 'p'
        }
      >
        <option value="p">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>

      {/* TEXT FORMATTING */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editor.isActive('bold') ? active : ''}`}
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editor.isActive('italic') ? active : ''}`}
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${btn} ${editor.isActive('strike') ? active : ''}`}
      >
        <Strikethrough size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`${btn} ${editor.isActive('highlight') ? active : ''}`}
      >
        <Highlighter size={18} />
      </button>

      {/* 🎨 TEXT COLOR */}
      <input
        type="color"
        title="Text Color"
        onChange={(e) =>
          editor.chain().focus().setColor(e.target.value).run()
        }
        className="w-8 h-8 border rounded cursor-pointer"
      />

      {/* 🟡 HIGHLIGHT COLOR */}
      <input
        type="color"
        title="Highlight Color"
        onChange={(e) =>
          editor.chain().focus().setHighlight({ color: e.target.value }).run()
        }
        className="w-8 h-8 border rounded cursor-pointer"
      />

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* ALIGNMENT */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`${btn} ${editor.isActive({ textAlign: 'left' }) ? active : ''}`}
      >
        <AlignLeft size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`${btn} ${editor.isActive({ textAlign: 'center' }) ? active : ''}`}
      >
        <AlignCenter size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`${btn} ${editor.isActive({ textAlign: 'right' }) ? active : ''}`}
      >
        <AlignRight size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`${btn} ${editor.isActive({ textAlign: 'justify' }) ? active : ''}`}
      >
        <AlignJustify size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* LISTS */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn} ${editor.isActive('bulletList') ? active : ''}`}
      >
        <List size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btn} ${editor.isActive('orderedList') ? active : ''}`}
      >
        <ListOrdered size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* 🔗 LINK (FIXED) */}
      <button
        onClick={() => {
          const url = prompt("Enter URL")
          if (!url) return
          editor.chain().focus().setLink({ href: url }).run()
        }}
        className={btn}
      >
        <Link2 size={18} />
      </button>

      {/* 🖼 IMAGE */}
      <label className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={async (e) => {
            const files = Array.from(e.target.files || [])
            if (!files.length) return

            for (const file of files) {
              const reader = new FileReader()

              reader.onload = async () => {
                const res = await fetch('/api/upload', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    file: reader.result,
                    fileName: Date.now() + "-" + file.name
                  })
                })

                const data = await res.json()

                // ✅ Insert image + allow content after
                editor
                  .chain()
                  .focus()
                  .setImage({ src: data.url })
                  .createParagraphNear() // 🔥 THIS IS KEY
                  .run()
              }

              reader.readAsDataURL(file)
            }
          }}
        />
        🖼
      </label>

    </div>
  )
}