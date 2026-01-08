import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/types";
import { Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

export default async function BlogPage() {
    const supabase = await createClient();
    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .returns<Post[]>();

    return (
        <div className="min-h-screen pt-32 pb-12 md:pt-40 md:pb-20 relative">
            <div className="absolute  left-6 md:top-2 md:left-10 w-32 h-16 md:w-40 md:h-20 z-10">
                <Image
                    src="/logo.png"
                    alt="Anil Das P Logo"
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div>
            <div className="container px-4 md:px-6 max-w-5xl mx-auto">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Writing & <span className="text-primary">Thoughts</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-175">
                        Articles on technology, development, and my experiences.
                    </p>
                </div>

                <div className="grid gap-8">
                    {posts?.map((post) => (
                        <div key={post.id} className="group flex flex-col md:flex-row gap-6 md:gap-8 items-start border p-6 rounded-2xl hover:border-primary/50 transition-all">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {post.published_at ? new Date(post.published_at).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : "Draft"}
                                    </div>
                                    {/* Add category if available later */}
                                </div>

                                <Link href={`/blog/${post.slug}`}>
                                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                </Link>

                                <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 text-base">
                                    {post.content?.replace(/[#*`]/g, '').slice(0, 250)}...
                                </p>

                                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4 mt-2">
                                    Read Article <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {(!posts || posts.length === 0) && (
                        <div className="text-center py-20 border rounded-2xl border-dashed">
                            <p className="text-xl font-medium mb-2">No posts yet</p>
                            <p className="text-muted-foreground">Stay tuned for updates!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
