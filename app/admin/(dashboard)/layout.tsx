import { AdminSidebar } from "@/components/admin/Sidebar";
import type { Metadata } from "next";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Secure CMS for Portfolio",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <AdminSidebar className="hidden md:flex w-64" />

            {/* Mobile Header */}
            <div className="md:hidden p-4 border-b flex items-center bg-background sticky top-0 z-50">
                <AdminMobileNav />
                <span className="ml-4 font-semibold">Admin Dashboard</span>
            </div>

            <main className="flex-1 p-4 md:p-8 bg-background overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
