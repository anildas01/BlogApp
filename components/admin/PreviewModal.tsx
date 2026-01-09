'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface PreviewModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    content: string
}

export function PreviewModal({ open, onOpenChange, title, content }: PreviewModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Preview</DialogTitle>
                </DialogHeader>

                <article className="mt-4">
                    <header className="mb-6 md:mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 leading-tight">
                            {title || "Untitled"}
                        </h1>
                        <div className="text-sm md:text-base text-muted-foreground">
                            {new Date().toLocaleDateString()}
                        </div>
                    </header>

                    <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content || "*No content yet...*"}
                        </ReactMarkdown>
                    </div>
                </article>
            </DialogContent>
        </Dialog>
    )
}
