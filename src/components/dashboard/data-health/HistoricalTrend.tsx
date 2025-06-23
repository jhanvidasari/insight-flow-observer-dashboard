
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const HistoricalTrend = () => {
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [selectedTab, setSelectedTab] = useState('day');

  const dayData = [
    { period: '00:00', current: 1200, previous: 1100, target: 1300 },
    { period: '04:00', current: 800, previous: 750, target: 900 },
    { period: '08:00', current: 2500, previous: 2400, target: 2600 },
    { period: '12:00', current: 3200, previous: 3000, target: 3100 },
    { period: '16:00', current: 2800, previous: 2700, target: 2900 },
    { period: '20:00', current: 1800, previous: 1750, target: 1900 }
  ];

  const weekData = [
    { period: 'Week 1', current: 45000, previous: 42000, target: 47000 },
    { period: 'Week 2', current: 47000, previous: 44000, target: 48000 },
    { period: 'Week 3', current: 46000, previous: 45000, target: 47500 },
    { period: 'Week 4', current: 48000, previous: 46000, target: 49000 }
  ];

  const monthData = [
    { period: 'Jan', current: 180000, previous: 175000, target: 185000 },
    { period: 'Feb', current: 185000, previous: 180000, target: 190000 },
    { period: 'Mar', current: 190000, previous: 185000, target: 195000 },
    { period: 'Apr', current: 195000, previous: 188000, target: 200000 },
    { period: 'May', current: 200000, previous: 195000, target: 205000 },
    { period: 'Jun', current: 205000, previous: 200000, target: 210000 }
  ];

  const customData = [
    { period: 'Jan 15', current: 15000, previous: 14000, target: 16000 },
    { period: 'Jan 22', current: 16000, previous: 15500, target: 16500 },
    { period: 'Jan 29', current: 15500, previous: 16000, target: 16200 },
    { period: 'Feb 05', current: 17000, previous: 15800, target: 17200 }
  ];

  const chartConfig = {
    current: { label: 'Current Period', color: '#3b82f6' },
    previous: { label: 'Previous Period', color: '#10b981' },
    target: { label: 'Target', color: '#f59e0b' }
  };

  const getKPIs = (data: any[]) => {
    const totalCurrent = data.reduce((sum, item) => sum + item.current, 0);
    const totalPrevious = data.reduce((sum, item) => sum + item.previous, 0);
    const totalTarget = data.reduce((sum, item) => sum + item.target, 0);
    const variance = ((totalCurrent - totalPrevious) / totalPrevious * 100);
    const targetAchievement = (totalCurrent / totalTarget * 100);
    
    return {
      totalCurrent,
      totalPrevious,
      totalTarget,
      variance,
      targetAchievement,
      avgCurrent: totalCurrent / data.length,
      maxCurrent: Math.max(...data.map(d => d.current)),
      minCurrent: Math.min(...data.map(d => d.current))
    };
  };

  const getCurrentData = () => {
    switch (selectedTab) {
      case 'day': return dayData;
      case 'week': return weekData;
      case 'month': return monthData;
      case 'custom': return customData;
      default: return dayData;
    }
  };

  const kpis = getKPIs(getCurrentData());

  const renderChart = (data: any[], title: string) => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="current" stroke="var(--color-current)" strokeWidth={2} />
                <Line type="monotone" dataKey="previous" stroke="var(--color-previous)" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {kpis.totalCurrent.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">Total Current</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className={`text-2xl font-bold ${kpis.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {kpis.variance > 0 ? '+' : ''}{kpis.variance.toFixed(2)}%
              </div>
              <div className="text-sm text-gray-600">Variance vs Previous</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className={`text-2xl font-bold ${kpis.targetAchievement >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                {kpis.targetAchievement.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Target Achievement</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {kpis.avgCurrent.toLocaleString()}
              </div>
              <div className="text-sm text-purple-600">Average</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-600">
                {kpis.maxCurrent.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Peak Value</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold text-gray-600">
                {kpis.minCurrent.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Minimum Value</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historical Trend Analysis</CardTitle>
          <CardDescription>Compare data trends across different time periods with KPI insights</CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
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
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Custom Date Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-center">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <Input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <Input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="mt-6">
                  Apply Range
                </Button>
              </div>
            </CardContent>
          </Card>
          {renderChart(customData, "Custom Range Comparison")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoricalTrend;
