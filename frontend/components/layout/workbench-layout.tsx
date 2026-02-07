"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { ClientHeader } from "./client-header";
import { RightPanel } from "./right-panel";
import { ClientProfile, AIAnalysis, mockData, Customer } from "@/app/data";

// In a real app, these would come from props or context
const { client, ai_analysis } = mockData;

interface WorkbenchLayoutProps {
    children?: ReactNode; // Children can be Evidence Feed or other views,
    customers: Customer[];
    selectedUser: string;
    setSelectedUser: any;
}

export function WorkbenchLayout({ children, customers, selectedUser, setSelectedUser }: WorkbenchLayoutProps) {
    if (!customers[selectedUser]) return;
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-blue-100">
            {/* Left Sidebar */}
            <Sidebar customers={customers} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>

            {/* Main Stage */}
            <div className="flex-1 flex flex-col min-w-0 bg-white relative">
                <ClientHeader client={customers[selectedUser]} />

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
