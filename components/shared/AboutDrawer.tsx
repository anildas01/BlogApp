"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Phone, User, X, Facebook, Youtube, Menu } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function AboutDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* Fixed Sidebar Controls */}
            <div className="fixed right-4 md:right-8 top-4 md:top-8 z-50 flex flex-col items-center gap-4">
                {/* Menu Trigger */}
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white border-0 transition-transform hover:scale-105"
                    >
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </SheetTrigger>

                {/* Separator */}
                <div className="w-8 h-px bg-border/60 my-2" />

                {/* Social Icons Stack */}
                <div className="flex flex-col gap-3">
                    <SocialIcon href={SITE_CONFIG.socials.facebook || "#"} icon={Facebook} />
                    <SocialIcon href={SITE_CONFIG.socials.twitter} icon={Twitter} />
                    <SocialIcon href={SITE_CONFIG.socials.linkedin} icon={Linkedin} />
                    <SocialIcon href={SITE_CONFIG.socials.instagram} icon={Instagram} />
                    <SocialIcon href={SITE_CONFIG.socials.github} icon={Github} />
                    <SocialIcon href={SITE_CONFIG.socials.youtube || "#"} icon={Youtube} />
                    <SocialIcon href={`mailto:${SITE_CONFIG.email}`} icon={Mail} />
                </div>
            </div>

            <SheetContent
                side="right"
                className="w-full sm:w-[450px] p-0 border-l"
                showClose={false}
            >
                <SheetTitle className="sr-only">About Me</SheetTitle>
                <div className="h-full flex flex-col bg-white">
                    {/* Header */}
                    <div className="p-8 flex justify-between items-center border-b border-gray-100">
                        <div className="relative w-32 h-10">
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
                            className="rounded-full hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 sm:p-12 flex flex-col gap-12">
                        {/* About Section */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">ABOUT</h3>
                            <p className="text-base leading-8 text-gray-600 font-light">
                                {SITE_CONFIG.bio}
                            </p>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-8">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">CONTACT</h3>
                            <div className="space-y-6">
                                <ContactItem icon={Phone} label="Phone" value={SITE_CONFIG.phone} sub="Mon-Sat 9AM-6PM" />
                                <ContactItem icon={Mail} label="Email" value={SITE_CONFIG.email} sub="online support" href={`mailto:${SITE_CONFIG.email}`} />
                                <ContactItem icon={MapPin} label="Location" value={SITE_CONFIG.location} sub="Kerala, India" />
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function SocialIcon({ href, icon: Icon }: { href: string; icon: any }) {
    if (!href) return null;
    return (
        <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 bg-white border-gray-200 hover:border-primary hover:text-primary shadow-sm transition-all"
            asChild
        >
            <Link href={href} target="_blank">
                <Icon className="w-5 h-5" />
            </Link>
        </Button>
    );
}

function ContactItem({ icon: Icon, label, value, sub, href }: { icon: any, label: string, value: string, sub: string, href?: string }) {
    return (
        <div className="flex items-start gap-5 group">
            <div className="p-3 rounded-full bg-gray-50 text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
                {href ? (
                    <a href={href} className="text-base text-gray-900 font-medium hover:text-primary transition-colors block">
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
