import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard = ({ title, value, subtitle, icon: Icon, trend }: StatsCardProps) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-1">{value}</h3>
          {subtitle && (
            <p className={`text-sm ${trend ? trendColors[trend] : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="bg-primary/10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
