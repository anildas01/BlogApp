"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/shared/Footer";
import { AboutDrawer } from "@/components/shared/AboutDrawer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isPublicPage = !pathname.startsWith("/admin") && !pathname.startsWith("/login");

    if (!isPublicPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col min-h-screen relative">
            <AboutDrawer />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
