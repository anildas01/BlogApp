import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

export default function Page() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <LoginPage />
        </Suspense>
    );
}
