import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useEffect } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaCode, FaBold, FaListUl, FaListOl, FaQuoteRight, FaUndo, FaRedo,FaItalic,FaStrikethrough, FaMinus, FaPaintBrush } from 'react-icons/fa';
import { BiParagraph } from 'react-icons/bi';
import { AiOutlineClear } from 'react-icons/ai';
import { TbCodeCircle2 } from 'react-icons/tb';
import { MdHorizontalRule } from 'react-icons/md';
import { RiTextSpacing } from 'react-icons/ri';
import "../../index.css"
import React from 'react'



const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]


const MenuBar = ({editor}) => {

  if (!editor) {
    return null
  }

  return (
    <div className="control-group">
      <div className="button-group">
        <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-3 rounded-md shadow-sm">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <FaBold />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('code') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <FaItalic />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('code') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <FaCode />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('code') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
               <FaStrikethrough />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                    .chain()
                    .focus()
                    .toggleCode()
                    .run()
                }
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('code') ? 'bg-blue-200 text-blue-700' : ''}`}
                >
                <FaCode />
            </button>
            <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                <AiOutlineClear />
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <BiParagraph />
            </button> 
            {[1, 2, 3, 4, 5, 6].map(level => (
                <button
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('heading', { level }) ? 'bg-blue-200 text-blue-700' : ''}`}
                >
                H{level}
                </button>
            ))}

             <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <FaListUl />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <FaListOl />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('codeBlock') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <TbCodeCircle2 />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-blue-200 text-blue-700' : ''}`}
            >
                <FaQuoteRight />
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="p-2 rounded-md hover:bg-gray-200"
            >
                <MdHorizontalRule />
            </button>

            <button
                onClick={() => editor.chain().focus().setHardBreak().run()}
                className="p-2 rounded-md hover:bg-gray-200"
            >
                <RiTextSpacing />
            </button>

            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded-md hover:bg-gray-200"
            >
                <FaUndo />
            </button>

            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded-md hover:bg-gray-200"
            >
                <FaRedo />
            </button>

            <button
                onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                className={`p-2 rounded-md hover:bg-gray-200 ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-purple-200 text-purple-700' : ''}`}
            >
                <FaPaintBrush />
            </button>

        </div>
      </div>
    </div>
  )
}




const TipTap = ({ value, onChange }) => {
    const editor = useEditor({
        extensions,
        content: value,
        onUpdate: ({ editor }) => {
        onChange(editor.getHTML())
        },
    })

    
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap