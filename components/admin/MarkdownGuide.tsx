import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function MarkdownGuide() {
    const { toast } = useToast();

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: `${label} syntax copied to clipboard.`,
        });
    };

    const CodeSnippet = ({ code, label }: { code: string, label: string }) => (
        <div className="flex items-center gap-2 mb-1 group">
            <code className="bg-muted px-1 rounded flex-1 text-xs font-mono wrap-break-word whitespace-pre-wrap">{code}</code>
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(code, label)}
                title="Copy syntax"
            >
                <Copy className="h-3 w-3" />
            </Button>
        </div>
    );

    const fullGuide = `# H1 Big Header
## H2 Medium
### H3 Small

**Bold Text**
_Italic Text_
~~Strikethrough~~

- Bullet Item
1. Numbered Item

[Link Text](url)
> Blockquote
\`Inline Code\`

\`\`\`javascript
console.log("code");
\`\`\`
`.trim();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle>Markdown Guide</CardTitle>
                    <CardDescription>Basic syntax cheat sheet.</CardDescription>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(fullGuide, "Full guide")}
                    title="Copy full cheat sheet"
                >
                    <Copy className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4 text-sm mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Headers</h4>
                        <CodeSnippet code="# H1 Big Header" label="H1" />
                        <CodeSnippet code="## H2 Medium" label="H2" />
                        <CodeSnippet code="### H3 Small" label="H3" />
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Emphasis</h4>
                        <CodeSnippet code="**Bold Text**" label="Bold" />
                        <CodeSnippet code="_Italic Text_" label="Italic" />
                        <CodeSnippet code="~~Strikethrough~~" label="Strikethrough" />
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Lists</h4>
                        <CodeSnippet code="- Bullet Item" label="Bullet list" />
                        <CodeSnippet code="1. Numbered Item" label="Numbered list" />
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Links & Quotes</h4>
                        <CodeSnippet code="[Link Text](url)" label="Link" />
                        <CodeSnippet code="> Blockquote" label="Blockquote" />
                        <CodeSnippet code="`Inline Code`" label="Inline Code" />
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Code Block</h4>
                    <pre className="bg-muted p-2 rounded text-xs overflow-x-auto relative group">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background"
                            onClick={() => copyToClipboard("```javascript\nconsole.log(\"code\");\n```", "Code block")}
                        >
                            <Copy className="h-3 w-3" />
                        </Button>
                        ```javascript
                        console.log("code");
                        ```
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
}
