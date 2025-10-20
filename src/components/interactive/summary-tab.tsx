import { summaryData } from '@/lib/data';

export default function SummaryTab() {
  return (
    <div className="space-y-4 text-sm">
      <h3 className="font-bold text-lg">{summaryData.title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {summaryData.content}
      </p>
    </div>
  );
}
