import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { useEffect,useState, useRef, useCallback  } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit';
import { FaCode, FaBold, FaListUl, FaListOl, FaQuoteRight, FaUndo, FaRedo,FaItalic,FaStrikethrough, FaMinus, FaPaintBrush } from 'react-icons/fa';
import { BiParagraph } from 'react-icons/bi';
import { AiOutlineClear } from 'react-icons/ai';
import { TbCodeCircle2 } from 'react-icons/tb';
import { MdFormatAlignCenter } from "react-icons/md";
import { MdFormatAlignJustify } from "react-icons/md";
import { MdHorizontalRule } from 'react-icons/md';
import { MdFormatAlignRight } from "react-icons/md";
import { MdFormatAlignLeft } from "react-icons/md";
import { RiTextSpacing } from 'react-icons/ri';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { BulletList } from '@tiptap/extension-bullet-list';
import "../../index.css";



const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({
       types: ['heading', 'paragraph', 'listItem'], // tipe tag mana yang bisa di-align
    }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, 
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
]


const MenuBar = ({editor}) => {

  if (!editor) {
    return null
  }
  const buttonClass = "p-2 rounded-md hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const activeClass = "bg-blue-200 text-blue-700";

  return (
    <div className="control-group border-b border-gray-200 mb-4">
      <div className="button-group">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 bg-gray-100 p-2 sm:p-3 rounded-md shadow-sm">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={`${buttonClass} ${editor.isActive('bold') ? activeClass : ''}`}
              title="Bold"
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={`${buttonClass} ${editor.isActive('italic') ? activeClass : ''}`}
              title="Italic"
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={`${buttonClass} ${editor.isActive('strike') ? activeClass : ''}`}
              title="Strikethrough"
            >
              <FaStrikethrough />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={`${buttonClass} ${editor.isActive('code') ? activeClass : ''}`}
              title="Inline Code"
            >
              <FaCode />
            </button>
          </div>

          {/* Clear Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button 
              type="button"
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
              disabled={!editor.can().chain().focus().unsetAllMarks().run()}
              className={buttonClass}
              title="Clear Formatting"
            >
              <AiOutlineClear />
            </button>
          </div>

          {/* Paragraph & Headings */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().setParagraph().run()}
              disabled={!editor.can().chain().focus().setParagraph().run()}
              className={`${buttonClass} ${editor.isActive('paragraph') ? activeClass : ''}`}
              title="Paragraph"
            >
              <BiParagraph />
            </button>

            {[1, 2, 3, 4, 5, 6].map(level => (
              <button
                type="button"
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={`${buttonClass} text-xs sm:text-sm ${editor.isActive('heading', { level }) ? activeClass : ''}`}
                title={`Heading ${level}`}
              >
                H{level}
              </button>
            ))}
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${buttonClass} ${editor.isActive('bulletList') ? activeClass : ''}`}
              title="Bullet List"
            >
              <FaListUl />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`${buttonClass} ${editor.isActive('orderedList') ? activeClass : ''}`}
              title="Ordered List"
            >
              <FaListOl />
            </button>
          </div>

          {/* Blocks */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`${buttonClass} ${editor.isActive('codeBlock') ? activeClass : ''}`}
              title="Code Block"
            >
              <TbCodeCircle2 />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`${buttonClass} ${editor.isActive('blockquote') ? activeClass : ''}`}
              title="Blockquote"
            >
              <FaQuoteRight />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className={buttonClass}
              title="Horizontal Rule"
            >
              <MdHorizontalRule />
            </button>
          </div>

          {/* Text Alignment */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`${buttonClass} ${editor.isActive({ textAlign: 'left' }) ? activeClass : ''}`}
              title="Align Left"
            >
              <MdFormatAlignLeft />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`${buttonClass} ${editor.isActive({ textAlign: 'center' }) ? activeClass : ''}`}
              title="Align Center"
            >
              <MdFormatAlignCenter />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`${buttonClass} ${editor.isActive({ textAlign: 'right' }) ? activeClass : ''}`}
              title="Align Right"
            >
              <MdFormatAlignRight />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`${buttonClass} ${editor.isActive({ textAlign: 'justify' }) ? activeClass : ''}`}
              title="Justify"
            >
              <MdFormatAlignJustify />
            </button>
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-1 border-r border-gray-300 pr-2 mr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className={buttonClass}
              title="Line Break"
            >
              <RiTextSpacing />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setColor('#958DF1').run()}
              className={`${buttonClass} ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-purple-200 text-purple-700' : ''}`}
              title="Text Color"
            >
              <FaPaintBrush />
            </button>
          </div>

          {/* History */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
              className={buttonClass}
              title="Undo"
            >
              <FaUndo />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
              className={buttonClass}
              title="Redo"
            >
              <FaRedo />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


 // Handler untuk mencegah form submit
 const handleButtonClick = (callback) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };


const TipTap = ({ value = '', onChange, placeholder = "Start typing..." }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[200px] p-4 border border-gray-200 rounded-lg',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <div className="relative">
        <EditorContent 
          editor={editor}
          className="min-h-[200px] max-h-[400px] overflow-y-auto"
        />
        {editor.isEmpty && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};


export default TipTap