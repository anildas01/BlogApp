'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { EditorToolbar } from '@/components/admin/EditorToolbar'

interface RichTextEditorProps {
    id?: string
    name: string
    defaultValue?: string
    placeholder?: string
    className?: string
    required?: boolean
    onChange?: (markdown: string) => void
}

export function RichTextEditor({
    id,
    name,
    defaultValue = '',
    placeholder = 'Start writing...',
    className,
    required,
    onChange
}: RichTextEditorProps) {
    const [markdownContent, setMarkdownContent] = useState(defaultValue)

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg',
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full',
                },
            }),
            TableRow,
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 px-4 py-2',
                },
            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 px-4 py-2 bg-muted font-bold',
                },
            }),
            TaskList.configure({
                HTMLAttributes: {
                    class: 'list-none pl-0',
                },
            }),
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: 'flex items-start gap-2',
                },
            }),
        ],
        content: defaultValue,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3',
            },
        },
        onUpdate: ({ editor }) => {
            const markdown = editorToMarkdown(editor)
            setMarkdownContent(markdown)
            if (onChange) {
                onChange(markdown)
            }
        },
    })

    // Update editor when defaultValue changes (for edit mode)
    useEffect(() => {
        if (editor && defaultValue && editor.getHTML() !== defaultValue) {
            editor.commands.setContent(defaultValue)
        }
    }, [defaultValue, editor])

    return (
        <div className={cn('flex flex-col border rounded-lg shadow-sm bg-background', className)}>
            {editor && <EditorToolbar editor={editor} />}

            <EditorContent
                editor={editor}
                className="flex-1 overflow-y-auto"
            />

            {/* Hidden input for form submission */}
            <input
                type="hidden"
                id={id}
                name={name}
                value={markdownContent}
                required={required}
            />
        </div>
    )
}

// Improved HTML to Markdown conversion
function editorToMarkdown(editor: Editor): string {
    const html = editor.getHTML()
    let markdown = html

    // Helper function to strip all HTML tags from a string
    const stripHtml = (str: string): string => {
        return str.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim()
    }

    // Convert tables FIRST and use placeholders to protect them from other conversions
    const tablePlaceholders: { [key: string]: string } = {}
    let tableIndex = 0

    markdown = markdown.replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (match, tableContent) => {
        const rows = tableContent.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || []

        if (rows.length === 0) return ''

        const tableRows: string[] = []

        rows.forEach((row: string, index: number) => {
            const cells = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g) || []
            const cellContents = cells.map((cell: string) => {
                const content = cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/, '$1')
                // Strip all HTML from cell content to prevent corruption
                return stripHtml(content)
            })

            // Build markdown row - all on ONE line
            tableRows.push('| ' + cellContents.join(' | ') + ' |')

            // Add separator after first row (header)
            if (index === 0) {
                tableRows.push('| ' + cellContents.map(() => '---').join(' | ') + ' |')
            }
        })

        const tableMarkdown = '\n' + tableRows.join('\n') + '\n\n'
        const placeholder = `__TABLE_PLACEHOLDER_${tableIndex}__`
        tablePlaceholders[placeholder] = tableMarkdown
        tableIndex++

        return placeholder
    })

    // Convert code blocks (before other inline conversions)
    markdown = markdown.replace(/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g, '```$1\n$2\n```\n')
    markdown = markdown.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, '```\n$1\n```\n')

    // Convert headings
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')

    // Convert images (before links to avoid interference)
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g, '![$2]($1)')
    markdown = markdown.replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)')

    // Convert links
    markdown = markdown.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, '[$2]($1)')

    // Convert formatting
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    markdown = markdown.replace(/<b>(.*?)<\/b>/g, '**$1**')
    markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*')
    markdown = markdown.replace(/<i>(.*?)<\/i>/g, '*$1*')
    markdown = markdown.replace(/<s>(.*?)<\/s>/g, '~~$1~~')
    markdown = markdown.replace(/<code>(.*?)<\/code>/g, '`$1`')

    // Convert blockquotes
    markdown = markdown.replace(/<blockquote>([\s\S]*?)<\/blockquote>/g, (match, content) => {
        const lines = content.split(/\n/).filter((line: string) => line.trim())
        return lines.map((line: string) => `> ${line.trim()}`).join('\n') + '\n\n'
    })

    // Convert task lists
    markdown = markdown.replace(/<li[^>]*data-checked="true"[^>]*>([\s\S]*?)<\/li>/g, '- [x] $1\n')
    markdown = markdown.replace(/<li[^>]*data-checked="false"[^>]*>([\s\S]*?)<\/li>/g, '- [ ] $1\n')

    // Convert unordered lists
    markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (match, content) => {
        const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g) || []
        return items.map((item: string) => {
            const text = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1').trim()
            // Skip if already converted (task list)
            if (text.startsWith('- [')) return text
            return `- ${text}`
        }).join('\n') + '\n\n'
    })

    // Convert ordered lists
    markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, (match, content) => {
        const items = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g) || []
        let counter = 1
        return items.map((item: string) => {
            const text = item.replace(/<li[^>]*>([\s\S]*?)<\/li>/, '$1').trim()
            return `${counter++}. ${text}`
        }).join('\n') + '\n\n'
    })

    // Convert paragraphs
    markdown = markdown.replace(/<p>([\s\S]*?)<\/p>/g, '$1\n\n')

    // Convert line breaks
    markdown = markdown.replace(/<br\s*\/?>/g, '\n')

    // Clean up HTML entities
    markdown = markdown.replace(/&nbsp;/g, ' ')
    markdown = markdown.replace(/&lt;/g, '<')
    markdown = markdown.replace(/&gt;/g, '>')
    markdown = markdown.replace(/&amp;/g, '&')
    markdown = markdown.replace(/&quot;/g, '"')

    // Remove any remaining HTML tags
    markdown = markdown.replace(/<[^>]*>/g, '')

    // Restore table placeholders
    Object.keys(tablePlaceholders).forEach(placeholder => {
        markdown = markdown.replace(placeholder, tablePlaceholders[placeholder])
    })

    // Clean up extra whitespace
    markdown = markdown.replace(/\n\n\n+/g, '\n\n')
    markdown = markdown.replace(/^\n+/, '')
    markdown = markdown.trim()

    return markdown
}
