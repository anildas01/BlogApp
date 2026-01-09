import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image"; // Note: Original didn't use Image for banner but ReactMarkdown? Let's check. 
// Actually original used ReactMarkdown for content. 
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import CommentSection from "@/components/blog/CommentSection";
import { Post } from "@/types";

export const dynamic = 'force-dynamic';

export default async function PostDetailPage({ slug }: { slug: string }) {
    const supabase = await createClient();
    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single<Post>();

    if (!post) {
        notFound();
    }

    // Fetch comments
    const { data: comments } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });

    return (
        <div className="container px-4 md:px-6 py-8 md:py-10 max-w-3xl mx-auto">
            <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 md:-ml-4">
                <Link href="/">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Link>
            </Button>

            <article>
                <header className="mb-6 md:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4 leading-tight">
                        {post.title}
                    </h1>
                    <div className="text-sm md:text-base text-muted-foreground">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : "Draft"}
                    </div>
                </header>

                <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none mb-12 md:mb-16">
                    <ReactMarkdown>{post.content || ""}</ReactMarkdown>
                </div>

                <CommentSection
                    postId={post.id}
                    slug={post.slug}
                    initialComments={comments || []}
                />
            </article>
        </div>
    );
}
