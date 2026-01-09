'use client'

import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    ListTodo,
    Link as LinkIcon,
    Image as ImageIcon,
    Quote,
    Code2,
    Table,
    Undo2,
    Redo2,
    Minus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUpload } from './ImageUpload'

interface EditorToolbarProps {
    editor: Editor
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
    const [linkDialogOpen, setLinkDialogOpen] = useState(false)
    const [imageDialogOpen, setImageDialogOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [linkText, setLinkText] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageAlt, setImageAlt] = useState('')

    const ToolbarButton = ({
        onClick,
        isActive = false,
        disabled = false,
        children,
        title,
    }: {
        onClick: () => void
        isActive?: boolean
        disabled?: boolean
        children: React.ReactNode
        title: string
    }) => (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'h-8 w-8 p-0',
                isActive && 'bg-muted'
            )}
            title={title}
        >
            {children}
        </Button>
    )

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const { from, to } = editor.state.selection
        const text = editor.state.doc.textBetween(from, to, '')

        setLinkUrl(previousUrl || '')
        setLinkText(text || '')
        setLinkDialogOpen(true)
    }

    const handleLinkSubmit = () => {
        if (linkUrl) {
            if (linkText && !editor.state.selection.empty) {
                editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
            } else if (linkText) {
                editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
            } else {
                editor.chain().focus().setLink({ href: linkUrl }).run()
            }
        }
        setLinkDialogOpen(false)
        setLinkUrl('')
        setLinkText('')
    }

    const handleImageUpload = (url: string) => {
        setImageUrl(url)
    }

    const handleImageSubmit = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt || 'Image' }).run()
        }
        setImageDialogOpen(false)
        setImageUrl('')
        setImageAlt('')
    }

    return (
        <>
            <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30">
                {/* Text Formatting */}
                <div className="flex items-center gap-1 pr-2 border-r">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        isActive={editor.isActive('bold')}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        isActive={editor.isActive('italic')}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        isActive={editor.isActive('strike')}
                        title="Strikethrough"
                    >
                        <Strikethrough className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        isActive={editor.isActive('code')}
                        title="Inline Code (Ctrl+E)"
                    >
                        <Code className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {/* Headings */}
                <div className="flex items-center gap-1 pr-2 border-r">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        isActive={editor.isActive('heading', { level: 1 })}
                        title="Heading 1"
                    >
                        <Heading1 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        isActive={editor.isActive('heading', { level: 2 })}
                        title="Heading 2"
                    >
                        <Heading2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        isActive={editor.isActive('heading', { level: 3 })}
                        title="Heading 3"
                    >
                        <Heading3 className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {/* Lists */}
                <div className="flex items-center gap-1 pr-2 border-r">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        isActive={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        isActive={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <ListOrdered className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleTaskList().run()}
                        isActive={editor.isActive('taskList')}
                        title="Task List"
                    >
                        <ListTodo className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {/* Link & Image */}
                <div className="flex items-center gap-1 pr-2 border-r">
                    <ToolbarButton
                        onClick={setLink}
                        isActive={editor.isActive('link')}
                        title="Insert Link (Ctrl+K)"
                    >
                        <LinkIcon className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => setImageDialogOpen(true)}
                        title="Insert Image"
                    >
                        <ImageIcon className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {/* Block Elements */}
                <div className="flex items-center gap-1 pr-2 border-r">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        title="Blockquote"
                    >
                        <Quote className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        isActive={editor.isActive('codeBlock')}
                        title="Code Block"
                    >
                        <Code2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                        title="Insert Table"
                    >
                        <Table className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        title="Horizontal Rule"
                    >
                        <Minus className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {/* Undo/Redo */}
                <div className="flex items-center gap-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editor.can().undo()}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editor.can().redo()}
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo2 className="h-4 w-4" />
                    </ToolbarButton>
                </div>
            </div>

            {/* Link Dialog */}
            <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Link</DialogTitle>
                        <DialogDescription>
                            Add a link to your content
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="link-text">Link Text</Label>
                            <Input
                                id="link-text"
                                placeholder="Click here"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="link-url">URL</Label>
                            <Input
                                id="link-url"
                                placeholder="https://example.com"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleLinkSubmit}>Insert Link</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Image Dialog */}
            <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image</DialogTitle>
                        <DialogDescription>
                            Upload an image or paste an image URL
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Upload Image</Label>
                            <ImageUpload
                                value={imageUrl}
                                onChange={handleImageUpload}
                                bucketName="blog-images"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image-url">Or paste image URL</Label>
                            <Input
                                id="image-url"
                                placeholder="https://example.com/image.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image-alt">Alt Text (optional)</Label>
                            <Input
                                id="image-alt"
                                placeholder="Description of the image"
                                value={imageAlt}
                                onChange={(e) => setImageAlt(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleImageSubmit} disabled={!imageUrl}>
                            Insert Image
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
