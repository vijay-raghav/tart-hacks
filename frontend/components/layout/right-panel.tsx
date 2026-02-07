"use client";

import { AIAnalysis } from "@/app/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/libf/utils";

interface RightPanelProps {
    analysis: AIAnalysis;
}

export function RightPanel({ analysis }: RightPanelProps) {
    return (
        <div className="w-[350px] border-l border-slate-200 bg-white flex flex-col h-full shadow-xl shadow-slate-200/50 z-20">

            {/* Header */}
            <div className="h-14 flex items-center px-4 border-b border-slate-100 flex-shrink-0 bg-slate-50/50">
                <span className="font-semibold text-sm text-slate-800 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                    AI Copilot
                </span>
                <Badge variant="secondary" className="ml-auto bg-blue-50 text-blue-700 text-[10px] border-blue-100">
                    v2.4 active
                </Badge>
            </div>

            {/* Reasoning Trace (Scrollable) */}
            <ScrollArea className="flex-1 p-4">
                {/* Step 1 */}
                <div className="flex gap-3 mb-6 opacity-50">
                    <div className="mt-0.5 text-emerald-500">
                        <CheckCircle2 size={16} />
                    </div>
                    <div className="text-xs text-slate-500">
                        <p>Initiating search across 12 data sources...</p>
                        <p className="text-[10px] mt-1 text-slate-400">0.4s elapsed</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 mb-6 opacity-75">
                    <div className="mt-0.5 text-emerald-500">
                        <CheckCircle2 size={16} />
                    </div>
                    <div className="text-xs text-slate-600">
                        <p>Analyzed 42 articles. Found 3 matches.</p>
                        <div className="flex gap-1 mt-1.5">
                            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">BBC</span>
                            <span className="bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded text-[10px]">Miami Herald</span>
                        </div>
                    </div>
                </div>

                {/* Step 3: Insight */}
                <div className="flex gap-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mt-0.5 text-blue-600">
                        <div className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                        {/* Note: I'll replace spinner with icon if completed. Assuming completed for view. */}
                    </div>
                    <div className="w-full">
                        <p className="text-xs font-medium text-slate-700 mb-2">Synthesizing Narrative...</p>
                        <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-sm text-slate-800 leading-relaxed shadow-sm">
                            <p>
                                I found 3 high-confidence matches. However, the subject in the news is a <span className="bg-white px-1 border border-slate-200 rounded font-medium text-slate-900 mx-0.5">60-year-old contractor</span>.
                            </p>
                            <p className="mt-2">
                                Your client is a <span className="bg-white px-1 border border-slate-200 rounded font-medium text-slate-900 mx-0.5">24-year-old student</span>.
                            </p>
                            <div className="mt-3 flex items-center gap-2 p-2 bg-white rounded border border-blue-100 text-blue-700 text-xs font-semibold">
                                <AlertTriangle size={14} />
                                Likely False Positive
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Decision Box (Sticky Footer) */}
            <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-4">
                {/* Risk Gauge */}
                <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Score</div>
                    <div className="flex items-center gap-2">
                        <div className="relative h-10 w-20 overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-full bg-emerald-200 rounded-t-full origin-bottom" />
                            {/* Gauge Mask */}
                            <div className="absolute top-2 left-2 h-[calc(100%-4px)] w-[calc(100%-16px)] bg-slate-50 rounded-t-full z-10 flex items-end justify-center pb-0">
                                <span className="text-emerald-700 font-bold text-lg leading-none">15</span>
                            </div>
                        </div>
                        <div className="text-xs text-slate-400 font-medium self-end mb-1">Low Risk</div>
                    </div>
                </div>

                {/* Draft Note */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-slate-500 uppercase">Reasoning</label>
                    <Textarea
                        className="text-xs bg-white border-slate-200 min-h-[80px] text-slate-700 resize-none focus-visible:ring-blue-500/20"
                        defaultValue="Recommending closure. Name match only. Negative confirmation on age/occupation data."
                    />
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 h-9 text-xs">
                        Escalate
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-xs shadow-sm shadow-emerald-200">
                        Quick Close
                        <ArrowRight size={14} className="ml-1 opacity-80" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
