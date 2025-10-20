import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, CheckCircle2, Clock } from 'lucide-react';
import { ProgressChart } from './progress-chart';

const stats = [
  {
    title: 'Modules Completed',
    value: '1 / 5',
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Time Watched',
    value: '25 Mins',
    icon: <Clock className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Badges Earned',
    value: '3',
    icon: <Award className="h-6 w-6 text-primary" />,
  },
];

export default function ProgressDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressChart />
        </CardContent>
      </Card>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
