"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Phone, User, X, Facebook, Youtube, Menu } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function AboutDrawer() {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="fixed right-3 md:right-8 top-3 md:top-8 z-50">
                <Button
                    size="icon"
                    className="h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white border-0"
                >
                    <Menu className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
            </div>
        );
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* Fixed Menu Button */}
            <div className="fixed right-3 md:right-8 top-3 md:top-8 z-50">
                {/* Menu Trigger */}
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        className="h-12 w-12 md:h-14 md:w-14 rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white border-0 transition-transform hover:scale-105"
                    >
                        <Menu className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </SheetTrigger>
            </div>

            <SheetContent
                side="right"
                className="w-[70vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] max-w-md p-0 border-l"
                showClose={false}
            >
                <SheetTitle className="sr-only">About Me</SheetTitle>
                <div className="h-full flex flex-col bg-white">
                    {/* Header */}
                    <div className="p-5 md:p-8 flex justify-between items-center border-b border-gray-100">
                        <div className="relative w-24 h-8 md:w-32 md:h-10">
                            <Image
                                src="/logo.png"
                                alt="Anil Das P Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-gray-100 h-10 w-10 md:h-12 md:w-12"
                            onClick={() => setOpen(false)}
                        >
                            <X className="h-5 w-5 md:h-6 md:w-6" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-12 flex flex-col gap-10 md:gap-12">
                        {/* About Section */}
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">ABOUT</h3>
                            <p className="text-sm md:text-base leading-7 md:leading-8 text-gray-600 font-light">
                                {SITE_CONFIG.bio}
                            </p>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-6 md:space-y-8">
                            <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">CONTACT</h3>
                            <div className="space-y-5 md:space-y-6">
                                <ContactItem icon={Phone} label="Phone" value={SITE_CONFIG.phone} sub="Mon-Sat 9AM-6PM" onClose={() => setOpen(false)} />
                                <ContactItem icon={Mail} label="Email" value={SITE_CONFIG.email} sub="online support" href={`mailto:${SITE_CONFIG.email}`} onClose={() => setOpen(false)} />
                                <ContactItem icon={MapPin} label="Location" value={SITE_CONFIG.location} sub="Kerala, India" onClose={() => setOpen(false)} />
                            </div>
                        </div>

                        {/* Follow Us Section */}
                        <div className="space-y-6 md:space-y-8">
                            <h3 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">FOLLOW US</h3>
                            <div className="flex flex-wrap gap-3">
                                <SocialIcon href={SITE_CONFIG.socials.facebook || "#"} icon={Facebook} onClose={() => setOpen(false)} />
                                <SocialIcon href={SITE_CONFIG.socials.twitter} icon={Twitter} onClose={() => setOpen(false)} />
                                <SocialIcon href={SITE_CONFIG.socials.linkedin} icon={Linkedin} onClose={() => setOpen(false)} />
                                <SocialIcon href={SITE_CONFIG.socials.instagram} icon={Instagram} onClose={() => setOpen(false)} />
                                <SocialIcon href={SITE_CONFIG.socials.github} icon={Github} onClose={() => setOpen(false)} />
                                <SocialIcon href={SITE_CONFIG.socials.youtube || "#"} icon={Youtube} onClose={() => setOpen(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function SocialIcon({ href, icon: Icon, onClose }: { href: string; icon: any; onClose?: () => void }) {
    if (!href) return null;
    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-white border-gray-200 hover:border-primary hover:text-primary shadow-sm transition-all"
            asChild
        >
            <Link href={href} target="_blank" onClick={onClose}>
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
        </Button>
    );
}

function ContactItem({ icon: Icon, label, value, sub, href, onClose }: { icon: any, label: string, value: string, sub: string, href?: string, onClose?: () => void }) {
    return (
        <div className="flex items-start gap-5 group">
            <div className="p-3 rounded-full bg-gray-50 text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
                {href ? (
                    <a href={href} className="text-base text-gray-900 font-medium hover:text-primary transition-colors block" onClick={onClose}>
                        {value}
                    </a>
                ) : (
                    <p className="text-base text-gray-900 font-medium">{value}</p>
                )}
                <p className="text-xs text-gray-400 uppercase tracking-wider">{sub}</p>
            </div>
        </div>
    );
}
