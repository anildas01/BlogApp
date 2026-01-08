
export interface Post {
    id: number;
    created_at: string;
    title: string;
    slug: string;
    content: string | null;
    published: boolean;
    published_at: string | null;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    image_url: string | null;
    repo_link: string | null;
    live_link: string | null;
    created_at?: string;
}
