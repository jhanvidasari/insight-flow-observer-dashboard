
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const HistoricalTrend = () => {
  const [customStartDate, setCustomStartDate] = useState<string>('2024-01-01');
  const [customEndDate, setCustomEndDate] = useState<string>('2024-01-31');

  const dayData = [
    { period: '00:00', current: 1200, previous: 1100 },
    { period: '04:00', current: 800, previous: 750 },
    { period: '08:00', current: 2500, previous: 2400 },
    { period: '12:00', current: 3200, previous: 3000 },
    { period: '16:00', current: 2800, previous: 2700 },
    { period: '20:00', current: 1800, previous: 1750 }
  ];

  const weekData = [
    { period: 'Week 1', current: 45000, previous: 42000 },
    { period: 'Week 2', current: 47000, previous: 44000 },
    { period: 'Week 3', current: 46000, previous: 45000 },
    { period: 'Week 4', current: 48000, previous: 46000 }
  ];

  const monthData = [
    { period: 'Jan', current: 180000, previous: 175000 },
    { period: 'Feb', current: 185000, previous: 180000 },
    { period: 'Mar', current: 190000, previous: 185000 },
    { period: 'Apr', current: 195000, previous: 188000 },
    { period: 'May', current: 200000, previous: 195000 },
    { period: 'Jun', current: 205000, previous: 200000 }
  ];

  const customData = [
    { period: 'Jan 1-7', current: 45000, previous: 42000 },
    { period: 'Jan 8-14', current: 47000, previous: 44000 },
    { period: 'Jan 15-21', current: 46000, previous: 45000 },
    { period: 'Jan 22-28', current: 48000, previous: 46000 },
    { period: 'Jan 29-31', current: 44000, previous: 43000 }
  ];

  const chartConfig = {
    current: { label: 'Current Period', color: '#3b82f6' },
    previous: { label: 'Previous Period', color: '#10b981' }
  };

  const calculateKPIs = (data: any[]) => {
    const totalCurrent = data.reduce((sum, item) => sum + item.current, 0);
    const totalPrevious = data.reduce((sum, item) => sum + item.previous, 0);
    const variance = ((totalCurrent - totalPrevious) / totalPrevious) * 100;
    const avgCurrent = totalCurrent / data.length;
    const avgPrevious = totalPrevious / data.length;

    return {
      totalCurrent,
      totalPrevious,
      variance,
      avgCurrent,
      avgPrevious
    };
  };

  const renderKPIs = (data: any[], title: string) => {
    const kpis = calculateKPIs(data);
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {kpis.totalCurrent.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">Current Total</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {kpis.totalPrevious.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">Previous Total</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className={`text-2xl font-bold ${kpis.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {kpis.variance > 0 ? '+' : ''}{kpis.variance.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-600">Variance</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(kpis.avgCurrent).toLocaleString()}
          </div>
          <div className="text-sm text-purple-600">Current Avg</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {Math.round(kpis.avgPrevious).toLocaleString()}
          </div>
          <div className="text-sm text-orange-600">Previous Avg</div>
        </div>
      </div>
    );
  };

  const renderChart = (data: any[], title: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderKPIs(data, title)}
        <ChartContainer config={chartConfig} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="current" 
                stroke="var(--color-current)"
                strokeWidth={2}
                name="Current Period"
              />
              <Line 
                type="monotone" 
                dataKey="previous" 
                stroke="var(--color-previous)"
                strokeWidth={2}
                name="Previous Period"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historical Trend Analysis</CardTitle>
          <CardDescription>Compare data trends with KPIs across different time periods</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="day" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="day">1 Day</TabsTrigger>
          <TabsTrigger value="week">1 Week</TabsTrigger>
          <TabsTrigger value="month">1 Month</TabsTrigger>
          <TabsTrigger value="custom">Custom Range</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="mt-6">
          {renderChart(dayData, "Hourly Comparison - Current vs Previous Day")}
        </TabsContent>

        <TabsContent value="week" className="mt-6">
          {renderChart(weekData, "Weekly Comparison - Current vs Previous Month")}
        </TabsContent>

        <TabsContent value="month" className="mt-6">
          {renderChart(monthData, "Monthly Comparison - Current vs Previous Year")}
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Date Range Analysis</CardTitle>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">From:</span>
                  <Input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-40"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">To:</span>
                  <Input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-40"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderKPIs(customData, "Custom Range")}
              <ChartContainer config={chartConfig} className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={customData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="current" 
                      stroke="var(--color-current)"
                      strokeWidth={2}
                      name="Current Period"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previous" 
                      stroke="var(--color-previous)"
                      strokeWidth={2}
                      name="Previous Period"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoricalTrend;
