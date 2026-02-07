export interface ClientProfile {
    name: string;
    id: string;
    riskRating: string;
    age: number;
    occupation: string;
    citizenship: string;
    address: string;
    taxResidency: string;
    tenure: string;
    products: string[];
}

export interface Article {
    source: string;
    date: string;
    snippet: string;
    sentiment: "Positive" | "Negative" | "Neutral";
    relevanceScore: number;
    mismatchHighlight?: string;
}

export interface Customer {
    first_name: string;
    last_name: string;
}

export interface AIAnalysis {
    summary: string;
    confidence: number;
    articles: Article[];
}

export interface CaseData {
    client: ClientProfile;
    ai_analysis: AIAnalysis;
}

export const mockData: CaseData = {
    client: {
        name: "John Smith",
        id: "CUST-8839201",
        riskRating: "Low",
        age: 24,
        occupation: "Student",
        citizenship: "India",
        address: "123 Ocean Dr, Miami, FL",
        taxResidency: "USA",
        tenure: "2.5 months",
        products: ["Checking", "Savings"]
    },
    ai_analysis: {
        summary: "Mismatch detected on Age and Location.",
        confidence: 98,
        articles: [
            {
                source: "Miami Herald",
                date: "2023-10-12",
                snippet: "Local student John Smith wins charity run... The 24-year-old dedicated his win to...",
                sentiment: "Positive",
                relevanceScore: 85
            },
            {
                source: "Chicago Tribune",
                date: "2023-09-01",
                snippet: "55-year-old John Smith arrested for wire fraud... The investigation revealed a scheme involving...",
                sentiment: "Negative",
                relevanceScore: 92,
                mismatchHighlight: "55-year-old"
            },
            {
                source: "BBC News",
                date: "2023-08-20",
                snippet: "Global markets react to new tech regulations... Analysts predict a shift in...",
                sentiment: "Neutral",
                relevanceScore: 12
            }
        ]
    }
};

export interface QueueItem {
    id: string;
    name: string;
    alertType: "Adverse Media" | "Sanctions";
    sla: string;
    status: "active" | "pending" | "closed";
    timeLeft: string;
}

export const mockQueue: QueueItem[] = [
    {
        id: "1",
        name: "John Smith",
        alertType: "Adverse Media",
        sla: "2h left",
        status: "active",
        timeLeft: "2h"
    },
    {
        id: "2",
        name: "Acme Corp Ltd.",
        alertType: "Sanctions",
        sla: "4h left",
        status: "pending",
        timeLeft: "4h"
    },
    {
        id: "3",
        name: "Robert Doe",
        alertType: "Adverse Media",
        sla: "1d left",
        status: "pending",
        timeLeft: "1d"
    }
];
