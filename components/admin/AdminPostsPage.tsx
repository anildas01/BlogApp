import Link from "next/link";
import { Plus, Trash2, FileText, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "@/actions/blog";
import { Post } from "@/types";

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

            <div className="border rounded-lg overflow-x-auto">
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
                                        <form action={deletePost.bind(null, post.id)}>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
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
        </div>
    );
}
