import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-6 border-t bg-background/50 backdrop-blur-sm">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6 text-sm text-muted-foreground">
                <p>© 2026 Anil Das P. Designed & Developed by Me.</p>
                <nav className="flex gap-4">
                    <Link href="#" className="hover:underline underline-offset-4">
                        Privacy
                    </Link>
                    <Link href="#" className="hover:underline underline-offset-4">
                        Terms
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
