import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SharkData } from '@/types/shark';

interface ForagingChartProps {
  sharks: SharkData[];
}

const ForagingChart = ({ sharks }: ForagingChartProps) => {
  // Simulate time series data by using shark IDs as time points
  const data = sharks.map((shark, index) => ({
    time: `T${index + 1}`,
    probability: shark.p_forrageio * 100,
    sharkId: shark.id,
  })).slice(0, 10); // Show last 10 data points

  return (
    <div className="bg-card rounded-lg p-6 shadow-md border border-border">
      <h3 className="text-lg font-semibold mb-4">Probabilidade de Forrageio</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
            label={{ value: '%', position: 'insideLeft' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Probabilidade']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="probability" 
            stroke="hsl(var(--accent))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--accent))', r: 5 }}
            activeDot={{ r: 7 }}
            name="Probabilidade"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForagingChart;
