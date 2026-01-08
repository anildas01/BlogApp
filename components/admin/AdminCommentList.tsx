"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteComment } from "@/actions/comments";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface Comment {
    id: string;
    user_name: string;
    user_email: string;
    content: string;
    created_at: string;
}

interface AdminCommentListProps {
    postId: number;
    initialComments: Comment[];
}

export default function AdminCommentList({ postId, initialComments }: AdminCommentListProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const { toast } = useToast();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleDelete(commentId: string) {
        setDeletingId(commentId);
        const result = await deleteComment(commentId, `/admin/blog/${postId}`);

        if (result?.error) {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        } else {
            setComments(comments.filter(c => c.id !== commentId));
            toast({
                title: "Success",
                description: "Comment deleted.",
            });
        }
        setDeletingId(null);
    }

    if (comments.length === 0) {
        return (
            <div className="border rounded-lg p-8 text-center bg-card">
                <p className="text-muted-foreground">No comments on this post yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="flex items-start justify-between p-4 border rounded-lg bg-card">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{comment.user_name}</span>
                            <span className="text-xs text-muted-foreground">
                                {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="text-xs text-muted-foreground">{comment.user_email}</div>
                        <p className="text-sm mt-2">{comment.content}</p>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently remove the comment from the database.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => handleDelete(comment.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    {deletingId === comment.id ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            ))}
        </div>
    );
}
