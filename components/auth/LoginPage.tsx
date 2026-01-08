import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { login } from "@/actions/auth"

export default function LoginPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const error = searchParams?.error as string;

    return (
        <div className="flex min-h-[calc(100vh-140px)] items-center justify-center p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
                </CardHeader>
                <form action={login}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                        {error && (
                            <div className="text-sm text-red-500 font-medium">
                                Error: {error}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Sign In</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
