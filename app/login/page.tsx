import LoginPage from "@/components/auth/LoginPage";

export default function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    return <LoginPage searchParams={searchParams} />;
}
