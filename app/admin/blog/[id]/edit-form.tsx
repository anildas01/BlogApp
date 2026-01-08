'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updatePost } from "@/actions/blog";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Copy } from 'lucide-react';
import { Post } from '@/types';

export default function EditPostForm({ post }: { post: Post }) {
    const [uploadedUrl, setUploadedUrl] = useState('')
    const updateWithId = updatePost.bind(null, post.id)

    const copyToClipboard = () => {
        if (uploadedUrl) {
            navigator.clipboard.writeText(`![Image](${uploadedUrl})`)
            alert("Copied Markdown image code to clipboard!")
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Post</CardTitle>
                        <CardDescription>Update your content.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={updateWithId} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" required defaultValue={post.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" name="slug" required defaultValue={post.slug} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content (Markdown)</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    required
                                    defaultValue={post.content || ''}
                                    className="min-h-[500px] font-mono"
                                />
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    name="published"
                                    defaultChecked={post.published}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="published" className="font-normal">Published</Label>
                            </div>

                            <div className="pt-4 flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
                                <Button type="submit">Update Post</Button>
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
    );
}
