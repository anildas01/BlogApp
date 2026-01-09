'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createPost } from "@/actions/blog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { MarkdownGuide } from "@/components/admin/MarkdownGuide";
import { useRouter } from "next/navigation";
import { Copy, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CreatePostPage() {
    const [uploadedUrl, setUploadedUrl] = useState('')
    const { toast } = useToast()
    const router = useRouter()

    const copyToClipboard = () => {
        if (uploadedUrl) {
            navigator.clipboard.writeText(`![Image](${uploadedUrl})`)
            toast({
                title: "Copied!",
                description: "Markdown image code copied to clipboard.",
            })
        }
    }

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [showPreview, setShowPreview] = useState(false)

    const generateSlug = (text: string) => {
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const titleSlug = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        return `${titleSlug}-${date}`;
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    }

    const handleSubmit = async (formData: FormData) => {
        // ... handled manually or via FormData, but since we have state, 
        // the inputs will have names so FormData still works.
        // But we might want to ensure the state values are what's submitted if we used purely state.
        // However, standard inputs with name/value/onChange work fine with FormData.
        const result = await createPost(formData)

        if (result.success) {
            toast({
                title: "Success",
                description: "Post created successfully.",
            })
            router.push('/admin/blog')
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error || "Failed to create post",
            })
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Write New Post</h1>
                <p className="text-muted-foreground">Share your thoughts with the world.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardContent>
                            <form action={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        required
                                        placeholder="The Future of Web Dev"
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        required
                                        placeholder="the-future-of-web-dev"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="content">Content</Label>
                                        <div className="flex gap-1 border rounded-md p-1">
                                            <Button
                                                type="button"
                                                variant={showPreview ? "ghost" : "secondary"}
                                                size="sm"
                                                onClick={() => setShowPreview(false)}
                                                className="h-7 px-3"
                                            >
                                                Editor
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={showPreview ? "secondary" : "ghost"}
                                                size="sm"
                                                onClick={() => setShowPreview(true)}
                                                className="h-7 px-3"
                                            >
                                                <Eye className="w-3 h-3 mr-1" />
                                                Preview
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Keep editor mounted but toggle visibility */}
                                    <div style={{ display: showPreview ? 'none' : 'block' }}>
                                        <RichTextEditor
                                            id="content"
                                            name="content"
                                            required
                                            placeholder="Start writing your post..."
                                            className="h-[70vh]"
                                            onChange={setContent}
                                        />
                                    </div>

                                    {/* Show preview when toggled */}
                                    {showPreview && (
                                        <div className="border rounded-lg shadow-sm bg-background min-h-[70vh] overflow-y-auto">
                                            <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none p-6">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {content || "*Start typing in the editor to see preview...*"}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <input type="checkbox" id="published" name="published" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <Label htmlFor="published" className="font-normal">Publish immediately</Label>
                                </div>

                                <div className="pt-4 flex justify-end gap-2">
                                    <Button type="submit">Create Post</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 sticky top-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Image Helper</CardTitle>
                            <CardDescription>Upload images to get Markdown URL.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ImageUpload value="" onChange={setUploadedUrl} bucketName="blog-images" />

                            {uploadedUrl && (
                                <div className="space-y-2">
                                    <Label>Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input readOnly value={`![Image](${uploadedUrl})`} />
                                        <Button size="icon" onClick={copyToClipboard}>
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Copy and paste into your content.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <MarkdownGuide />
                </div>
            </div>
        </div>
    );
}
