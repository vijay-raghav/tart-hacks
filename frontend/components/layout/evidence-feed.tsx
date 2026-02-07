import { Article } from "@/app/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/libf/utils";
import { ExternalLink } from "lucide-react";

interface EvidenceFeedProps {
    articles: Article[];
}

export function EvidenceFeed({ articles }: EvidenceFeedProps) {
    return (
        <div className="p-6 space-y-4 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    Evidence Stream
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200">
                        {articles.length} Results
                    </Badge>
                </h3>
            </div>

            {articles.map((article, idx) => (
                <ArticleCard key={idx} article={article} />
            ))}

            <div className="h-12 flex items-center justify-center text-xs text-slate-400 italic">
                End of search results
            </div>
        </div>
    );
}

function ArticleCard({ article }: { article: Article }) {
    // Helper to highlight keywords
    const renderSnippet = (text: string, mismatch?: string) => {
        // This is a simple mock implementation. In refined version, use regex replace.
        // For now, if mismatch exists, we split by it.

        if (!mismatch) {
            // Highlight mock keywords if present
            const keywords = ["arrested", "fraud", "witness", "charity", "win"];
            let parts = [text];

            // Very basic highlighter for demonstration
            // A real implementation would be more robust
            return <p className="text-sm text-slate-600 leading-relaxed">{text}</p>;
        }

        const parts = text.split(mismatch);
        return (
            <p className="text-sm text-slate-600 leading-relaxed">
                {parts[0]}
                <span className="bg-green-100 text-green-800 font-medium px-1 rounded mx-0.5 border border-green-200">
                    {mismatch}
                </span>
                {parts[1]}
            </p>
        );
    }

    return (
        <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200 uppercase">
                        {article.source.substring(0, 2)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{article.source}</span>
                            <span className="text-xs text-slate-400">• {article.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className={cn(
                                "text-[10px] px-1.5 h-4 border",
                                article.sentiment === "Negative" ? "bg-red-50 text-red-700 border-red-200" :
                                    article.sentiment === "Positive" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                        "bg-slate-50 text-slate-600 border-slate-200"
                            )}>
                                {article.sentiment}
                            </Badge>
                            <span className="text-[10px] text-slate-400">
                                Match Score: <span className={cn(
                                    "font-medium",
                                    article.relevanceScore > 80 ? "text-slate-900" : "text-slate-500"
                                )}>{article.relevanceScore}%</span>
                            </span>
                        </div>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 p-2">
                    <ExternalLink size={16} />
                </button>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                {renderSnippet(article.snippet, article.mismatchHighlight)}
            </CardContent>
        </Card>
    );
}
