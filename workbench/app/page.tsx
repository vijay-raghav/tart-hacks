import { WorkbenchLayout } from "@/components/layout/workbench-layout";
import { EvidenceFeed } from "@/components/layout/evidence-feed";
import { mockData } from "@/app/data";

export default function Home() {
  return (
    <WorkbenchLayout>
      <EvidenceFeed articles={mockData.ai_analysis.articles} />
    </WorkbenchLayout>
  );
}
