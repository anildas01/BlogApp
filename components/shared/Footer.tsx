import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-6 md:py-8 border-t bg-background/50 backdrop-blur-sm">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 text-xs md:text-sm text-muted-foreground">
                <p className="text-center md:text-left">© 2026 Anil Das P. Designed & Developed by Me.</p>
                <nav className="flex gap-6 md:gap-4">
                    <Link href="#" className="hover:underline underline-offset-4 hover:text-foreground transition-colors">
                        Privacy
                    </Link>
                    <Link href="#" className="hover:underline underline-offset-4 hover:text-foreground transition-colors">
                        Terms
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
