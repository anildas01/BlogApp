import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    onImageUploadClick?: () => void;
}

export function MarkdownEditor({ className, label, onImageUploadClick, defaultValue, ...props }: MarkdownEditorProps) {
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
    const [content, setContent] = useState(defaultValue?.toString() || props.value?.toString() || "");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <div className={cn("flex flex-col border rounded-md shadow-sm focus-within:ring-2 focus-within:ring-ring bg-background", className)}>
            <div className="flex items-center gap-2 p-2 bg-muted/50 border-b rounded-t-md">
                <div className="flex p-1 bg-muted rounded-md">
                    <button
                        type="button"
                        onClick={() => setActiveTab('write')}
                        className={cn(
                            "px-3 py-1 text-sm font-medium rounded-sm transition-all",
                            activeTab === 'write' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Write
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={cn(
                            "px-3 py-1 text-sm font-medium rounded-sm transition-all",
                            activeTab === 'preview' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Preview
                    </button>
                </div>
            </div>

            {activeTab === 'write' ? (
                <Textarea
                    ref={textareaRef}
                    className="flex-1 font-mono border-0 focus-visible:ring-0 rounded-b-md resize-none p-4 overflow-y-auto"
                    {...props}
                    value={content}
                    onChange={handleChange}
                />
            ) : (
                <div className="flex-1 p-4 overflow-y-auto prose prose-sm md:prose-base dark:prose-invert max-w-none">
                    {content ? (
                        <ReactMarkdown>{content}</ReactMarkdown>
                    ) : (
                        <p className="text-muted-foreground italic">Nothing to preview yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}
