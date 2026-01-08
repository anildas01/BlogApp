"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { useState, useEffect } from "react";

export function AdminMobileNav() {
    const [isMounted, setIsMounted] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
            </Button>
        );
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
                <SheetTitle className="sr-only">Admin Menu</SheetTitle>
                <SheetDescription className="sr-only">Navigation sidebar for admin dashboard</SheetDescription>
                <AdminSidebar className="border-none" onClose={() => setOpen(false)} />
            </SheetContent>
        </Sheet>
    );
}
