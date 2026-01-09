import PostDetailPage from "@/components/blog/PostDetailPage";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <PostDetailPage slug={slug} />;
}
