"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { deletePost } from "@/actions/blog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function DeletePostButton({ postId }: { postId: number }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this post?")) return

        setIsDeleting(true)
        try {
            const result = await deletePost(postId)
            if (result.success) {
                toast({
                    title: "Post deleted",
                    description: "The post has been successfully removed.",
                })
                router.refresh()
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error || "Failed to delete post",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred",
            })
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            title="Delete Post"
        >
            {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </Button>
    )
}
