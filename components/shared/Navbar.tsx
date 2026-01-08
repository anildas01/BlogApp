"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AboutDrawer } from "./AboutDrawer";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-border/50 shadow-sm" : "bg-transparent"
            )}
        >
            <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
                <Link href="/" className="text-xl font-bold text-primary hover:text-primary/80 transition-all">
                    Anil Das P.
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        Blog
                    </Link>
                    <AboutDrawer />
                </nav>

                <div className="flex items-center gap-4">
                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetDescription className="sr-only">Main site navigation</SheetDescription>
                                <nav className="flex flex-col gap-6 mt-8">
                                    <Link href="/blog" className="text-lg font-medium hover:text-primary transition-colors">
                                        Blog
                                    </Link>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm text-muted-foreground">More</p>
                                        <AboutDrawer />
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
