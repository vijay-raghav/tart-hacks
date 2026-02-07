"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { ClientHeader } from "./client-header";
import { RightPanel } from "./right-panel";
import { ClientProfile, AIAnalysis, mockData } from "@/app/data";

// In a real app, these would come from props or context
const { client, ai_analysis } = mockData;

interface WorkbenchLayoutProps {
    children?: ReactNode; // Children can be Evidence Feed or other views
}

export function WorkbenchLayout({ children }: WorkbenchLayoutProps) {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-blue-100">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Stage */}
            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                <ClientHeader client={client} />

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto scroll-smooth">
                    {children}
                </main>
            </div>

            {/* Right Panel */}
            <RightPanel analysis={ai_analysis} />
        </div>
    );
}
