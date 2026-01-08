import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Post } from "@/types";
import EditPostForm from "./edit-form";
import AdminCommentList from "@/components/admin/AdminCommentList";

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();

    // In Next 15+ we await params.
    const { id } = await params;

    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single<Post>();

    if (!post) {
        notFound();
    }

    // Fetch comments for this post
    const { data: comments } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: false });

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Edit Post</h1>
                    <p className="text-muted-foreground">Update your blog post.</p>
                </div>
                <EditPostForm post={post} />
            </div>

            <div className="border-t pt-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Comments</h2>
                    <p className="text-muted-foreground">Manage user comments for this post.</p>
                </div>
                <AdminCommentList postId={post.id} initialComments={comments || []} />
            </div>
        </div>
    );
}
