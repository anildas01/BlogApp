import Link from "next/link";
import { Plus, FileText, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/types";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export default async function AdminPostsPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).returns<Post[]>();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                <Button asChild>
                    <Link href="/admin/blog/create">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            {/* Desktop Table View - Hidden on Mobile */}
            <div className="hidden md:block border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground uppercase font-medium">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Published At</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {posts?.map((post) => (
                            <tr key={post.id} className="bg-card hover:bg-secondary/50 transition-colors">
                                <td className="px-4 py-3 font-medium">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {post.title}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : "-"}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button variant="ghost" size="icon" asChild title="View on Site">
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/blog/${post.id}`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <DeletePostButton postId={post.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!posts || posts.length === 0) && (
                            <tr>
                                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                                    No posts found. Write something new!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View - Hidden on Desktop */}
            <div className="md:hidden space-y-4">
                {posts?.map((post) => (
                    <div key={post.id} className="border rounded-lg p-4 bg-card hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <h3 className="font-semibold text-base truncate">{post.title}</h3>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Not published"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t">
                            <Button variant="ghost" size="icon" asChild title="View">
                                <Link href={`/blog/${post.slug}`} target="_blank">
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild title="Edit">
                                <Link href={`/admin/blog/${post.id}`}>
                                    <Edit className="h-4 w-4" />
                                </Link>
                            </Button>
                            <DeletePostButton postId={post.id} />
                        </div>
                    </div>
                ))}
                {(!posts || posts.length === 0) && (
                    <div className="border border-dashed rounded-lg p-8 text-center text-muted-foreground">
                        No posts found. Write something new!
                    </div>
                )}
            </div>
        </div>
    );
}
