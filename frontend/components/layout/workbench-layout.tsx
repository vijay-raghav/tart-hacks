// components/layout/workbench-layout.tsx
"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { ClientHeader } from "./client-header";
import { RightPanel } from "./right-panel";
import { Customer, AIAnalysis } from "@/app/data";

type RightPanelEvent =
    | { id: string; kind: "run"; title: string; status: "running" | "complete"; ts: number }
    | { id: string; kind: "tool"; title: string; status: "info"; ts: number; rawToolName?: string }
    | { id: string; kind: "text"; markdown: string; ts: number };

interface WorkbenchLayoutProps {
    children?: ReactNode;
    customers: Record<string, Customer>;
    selectedUser: string;
    setSelectedUser: (id: string) => void;
    aiAnalysis?: AIAnalysis | null;
    analysisResults?: Record<string, { analysis: AIAnalysis; summary: any; events?: RightPanelEvent[] }>;
    runAdjudication?: () => void;
    isAnalyzing: boolean;
    rightPanelEvents?: RightPanelEvent[];
    caseActions?: Record<string, "closed" | "escalated">;
    onCloseCase?: () => void;
    onEscalate?: () => void;
}

export function WorkbenchLayout({
    children,
    customers,
    selectedUser,
    setSelectedUser,
    aiAnalysis,
    analysisResults,
    runAdjudication,
    isAnalyzing,
    rightPanelEvents = [],
    caseActions = {},
    onCloseCase,
    onEscalate,
}: WorkbenchLayoutProps) {
    if (!customers || !selectedUser || !customers[selectedUser]) {
        return <div className="p-10">Loading customers...</div>;
    }

    const currentClient = customers[selectedUser];
    const currentAnalysis = analysisResults?.[selectedUser];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-blue-100">
            <Sidebar
                customers={Object.values(customers)}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                isAnalyzing={!!isAnalyzing}
                analysisResults={analysisResults}
                caseActions={caseActions}
            />

            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                <ClientHeader
                    client={currentClient}
                    onAnalyze={runAdjudication}
                    isAnalyzing={isAnalyzing}
                    analysisStatus={currentAnalysis?.summary}
                    caseAction={caseActions?.[selectedUser]}
                />

                <main className="flex-1 overflow-y-auto scroll-smooth">
                    {children}
                </main>
            </div>

            <RightPanel
                analysis={aiAnalysis}
                runAdjudication={runAdjudication}
                isAnalyzing={isAnalyzing}
                events={rightPanelEvents}
                onCloseCase={onCloseCase}
                onEscalate={onEscalate}
                caseAction={caseActions?.[selectedUser]}
            />
        </div>
    );
}
