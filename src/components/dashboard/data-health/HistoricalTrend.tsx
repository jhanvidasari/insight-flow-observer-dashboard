
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const HistoricalTrend = () => {
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

  const yearData = [
    { period: '2020', current: 2100000, previous: 2000000 },
    { period: '2021', current: 2300000, previous: 2100000 },
    { period: '2022', current: 2500000, previous: 2300000 },
    { period: '2023', current: 2700000, previous: 2500000 },
    { period: '2024', current: 2900000, previous: 2700000 }
  ];

  const chartConfig = {
    current: {
      label: 'Current Period',
      color: '#3b82f6'
    },
    previous: {
      label: 'Previous Period',
      color: '#10b981'
    }
  };

  const renderChart = (data: any[], title: string) => (
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
          <CardDescription>Compare data trends across different time periods</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="day" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="day">1 Day Comparison</TabsTrigger>
          <TabsTrigger value="week">1 Week Comparison</TabsTrigger>
          <TabsTrigger value="month">1 Month Comparison</TabsTrigger>
          <TabsTrigger value="year">1 Year Comparison</TabsTrigger>
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

        <TabsContent value="year" className="mt-6">
          {renderChart(yearData, "Yearly Comparison - Historical Trend")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HistoricalTrend;
