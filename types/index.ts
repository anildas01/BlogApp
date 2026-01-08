
export interface Post {
    id: number;
    created_at: string;
    title: string;
    slug: string;
    content: string | null;
    published: boolean;
    published_at: string | null;
}
