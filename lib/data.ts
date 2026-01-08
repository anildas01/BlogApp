import { Project } from "@/types";

export const STATIC_PROJECTS: Partial<Project>[] = [
    {
        id: 101, // Using number IDs to match type, high number to avoid DB conflict
        slug: "magine-ai",
        title: "MagineAI – Personalized Magazine & Book Generator",
        description: "AI-based web application (Final Year Project) that generates personalized stories and magazines. Supports age-based/interest-based content, multi-language support (including Malayalam), and PDF generation with AI images.",
        technologies: ["Product", "AI", "Web App"],
        image_url: null,
        repo_link: null,
        live_link: null
    },
    {
        id: 102,
        slug: "care-connect",
        title: "CareConnect – Medical Service App",
        description: "All-in-one medical assistance application focused on user-friendly healthcare access.",
        technologies: ["Flutter", "Mobile", "Healthcare"],
        image_url: null,
        repo_link: null,
        live_link: null
    },
    {
        id: 103,
        slug: "academic-pms",
        title: "Academic Project Management System",
        description: "Google Classroom-inspired platform for faculty-student collaboration. Features include groups, chat, file sharing, tasks, and evaluation.",
        technologies: ["Web", "Collaboration", "Management"],
        image_url: null,
        repo_link: null,
        live_link: null
    },
    {
        id: 104,
        slug: "pharmacy-ims",
        title: "Pharmacy Management Inventory System",
        description: "Desktop application developed in Java to manage medicine stock, billing, and records.",
        technologies: ["Java", "Desktop", "Management"],
        image_url: null,
        repo_link: null,
        live_link: null
    },
];
