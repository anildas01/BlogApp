import Link from "next/link";
import { LayoutDashboard, FolderKanban, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminSidebar({ className }: SidebarProps) {
    return (
        <div className={cn("border-r bg-muted/40 h-full flex flex-col", className)}>
            <div className="p-6 border-b">
                <h2 className="text-lg font-semibold tracking-tight">Admin Console</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/admin/blog">
                        <FileText className="mr-2 h-4 w-4" />
                        Blog
                    </Link>
                </Button>
            </nav>
            <div className="p-4 border-t">
                <form action={logout}>
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    );
}
