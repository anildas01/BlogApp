'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createPost } from "@/actions/blog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Copy } from 'lucide-react';

export default function CreatePostPage() {
    const [uploadedUrl, setUploadedUrl] = useState('')

    const copyToClipboard = () => {
        if (uploadedUrl) {
            navigator.clipboard.writeText(`![Image](${uploadedUrl})`)
            alert("Copied Markdown image code to clipboard!")
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Write New Post</h1>
                <p className="text-muted-foreground">Share your thoughts with the world.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Content</CardTitle>
                            <CardDescription>Target URL and Markdown body.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={createPost} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" required placeholder="The Future of Web Dev" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" name="slug" required placeholder="the-future-of-web-dev" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content (Markdown)</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        required
                                        placeholder="# Introduction\n\nWrite your post here..."
                                        className="min-h-[500px] font-mono"
                                    />
                                </div>

                                <div className="flex items-center space-x-2 pt-2">
                                    <input type="checkbox" id="published" name="published" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                    <Label htmlFor="published" className="font-normal">Publish immediately</Label>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button type="submit">Create Post</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
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
                </div>
            </div>
        </div>
    );
}
