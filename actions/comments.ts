"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
    const supabase = await createClient();

    const postId = formData.get("postId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;

    if (!postId || !name || !email || !content) {
        return { error: "All fields are required" };
    }

    const { data: newComment, error } = await supabase.from("comments").insert({
        post_id: parseInt(postId),
        user_name: name,
        user_email: email,
        content: content,
    }).select().single();

    if (error) {
        console.error("Error adding comment:", error);
        return { error: "Failed to add comment" };
    }

    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true, comment: newComment };
}

export async function deleteComment(commentId: string, path?: string) {
    const supabase = await createClient();

    const { error } = await supabase.from("comments").delete().eq("id", commentId);

    if (error) {
        console.error("Error deleting comment:", error);
        return { error: "Failed to delete comment" };
    }

    if (path) {
        revalidatePath(path);
    }
    return { success: true };
}
