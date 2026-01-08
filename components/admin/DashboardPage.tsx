import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const start = performance.now();
    const { count: postCount, data: allPosts } = await supabase.from("posts").select("*", { count: "exact" });
    const end = performance.now();
    const latency = Math.round(end - start);

    // Calculate approximate memory usage
    const postSize = (JSON.stringify(allPosts).length / 1024).toFixed(2); // KB

    // Fetch latest activity timestamp
    const lastPost = allPosts?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
    const lastActivity = lastPost?.created_at;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Content Stats */}
                <div className="flex flex-col gap-6">
                    <div className="p-6 border rounded-lg shadow-sm bg-card hover:border-primary/50 transition-colors h-full flex flex-col justify-center">
                        <h3 className="font-medium text-muted-foreground mb-4">Total Blog Posts</h3>
                        <div className="text-4xl font-bold">{postCount || 0}</div>
                        <p className="text-sm text-muted-foreground mt-2">published articles</p>
                    </div>
                </div>

                {/* System Health */}
                <div className="p-6 border rounded-lg shadow-sm bg-card hover:border-primary/50 transition-colors flex flex-col justify-between">
                    <div>
                        <h3 className="font-medium text-muted-foreground mb-4">System Health</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="text-2xl font-bold text-green-500">Online</div>
                            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm border-b pb-2">
                            <span className="text-muted-foreground">Database Latency</span>
                            <span className="font-mono font-medium">{latency}ms</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b pb-2">
                            <span className="text-muted-foreground">Last Activity</span>
                            <span className="font-medium">{lastActivity ? new Date(lastActivity).toLocaleDateString() : "Never"}</span>
                        </div>
                    </div>
                </div>

                {/* Storage Analysis */}
                <div className="col-span-1 md:col-span-2 p-6 border rounded-lg shadow-sm bg-card hover:border-primary/50 transition-colors">
                    <h3 className="font-medium text-muted-foreground mb-4">Storage Analysis (Approx.)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Total Data Usage</div>
                            <div className="text-3xl font-bold">{postSize} KB</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground mb-1">Blog Posts Data</div>
                            <div className="text-xl font-medium">{postSize} KB</div>
                            <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
                                <div className="bg-orange-500 h-full rounded-full" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
