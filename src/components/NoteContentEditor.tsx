import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'
import styled from 'styled-components'

export interface NoteContentEditorProps {
  value: string
  onChange(value: string): void
}

const EditorWrapper = styled.div`
  .ProseMirror {
    outline: none;
    min-height: 300px;
    line-height: 1.7;

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      color: #adb5bd;
      pointer-events: none;
      height: 0;
    }

    > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }

    code {
      background-color: rgba(97, 97, 97, 0.1);
      color: #616161;
    }

    pre {
      background: #0d0d0d;
      color: #fff;
      font-family: 'JetBrainsMono', monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid rgba(13, 13, 13, 0.1);
    }

    hr {
      border: none;
      border-top: 2px solid rgba(13, 13, 13, 0.1);
      margin: 2rem 0;
    }
  }
`

export const NoteContentEditor = ({
  value,
  onChange,
}: NoteContentEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '내용을 입력하세요',
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor?.getHTML() === value) {
      return
    }
    editor?.commands.setContent(value, false)
  }, [value, editor])

  return (
    <EditorWrapper>
      <EditorContent editor={editor} />
    </EditorWrapper>
  )
}
