"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addComment } from "@/actions/comments";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
    id: string;
    user_name: string;
    user_email: string;
    content: string;
    created_at: string;
}

interface CommentSectionProps {
    postId: number;
    slug: string;
    initialComments: Comment[];
}

export default function CommentSection({ postId, slug, initialComments }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        formData.set("postId", postId.toString());
        formData.set("slug", slug);

        const result = await addComment(formData);

        if (result?.error) {
            toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
            });
        } else if (result?.comment) {
            setComments([...comments, result.comment]);
            toast({
                title: "Success",
                description: "Comment added successfully!",
            });

            const form = document.querySelector("form") as HTMLFormElement;
            form?.reset();
        }
        setIsSubmitting(false);
    }

    return (
        <section className="mt-16 py-8 border-t">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                Comments ({comments.length})
            </h2>

            {/* Comment List */}
            <div className="space-y-6 mb-12">
                {comments.length === 0 ? (
                    <p className="text-muted-foreground italic">No comments yet. Be the first to share your thoughts!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-secondary/20">
                            <Avatar>
                                <AvatarFallback>{comment.user_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold">{comment.user_name}</h4>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(comment.created_at).toLocaleDateString("en-US")}
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/90">{comment.content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Comment Form */}
            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
                <form action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input id="name" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">Message</label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="Share your thoughts..."
                            className="min-h-25"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                Post Comment
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </section>
    );
}
