import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SharkData } from '@/types/shark';

interface BehaviorChartProps {
  sharks: SharkData[];
}

const BehaviorChart = ({ sharks }: BehaviorChartProps) => {
  const behaviorCounts = sharks.reduce((acc, shark) => {
    const behavior = shark.comportamento;
    acc[behavior] = (acc[behavior] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const data = [
    { name: 'Transitando', value: behaviorCounts[0] || 0, color: '#3B82F6' },
    { name: 'Busca', value: behaviorCounts[1] || 0, color: '#F59E0B' },
    { name: 'Forrageando', value: behaviorCounts[2] || 0, color: '#10B981' },
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border border-border">
      <h3 className="text-lg font-semibold mb-4">Distribuição de Comportamentos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BehaviorChart;
