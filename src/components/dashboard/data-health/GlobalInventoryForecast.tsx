
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const GlobalInventoryForecast = () => {
  const forecastData = [
    { month: 'Jan', actual: 85000, forecast: 87000, variance: -2.3 },
    { month: 'Feb', actual: 82000, forecast: 84000, variance: -2.4 },
    { month: 'Mar', actual: 88000, forecast: 86000, variance: 2.3 },
    { month: 'Apr', actual: 91000, forecast: 89000, variance: 2.2 },
    { month: 'May', actual: 94000, forecast: 92000, variance: 2.2 },
    { month: 'Jun', actual: 96000, forecast: 95000, variance: 1.1 }
  ];

  const inventoryByRegion = [
    {
      region: 'North America',
      currentStock: 45000,
      forecastedDemand: 42000,
      recommendedStock: 48000,
      status: 'Adequate'
    },
    {
      region: 'Europe',
      currentStock: 32000,
      forecastedDemand: 35000,
      recommendedStock: 38000,
      status: 'Low'
    },
    {
      region: 'Asia Pacific',
      currentStock: 28000,
      forecastedDemand: 26000,
      recommendedStock: 29000,
      status: 'Optimal'
    },
    {
      region: 'Latin America',
      currentStock: 15000,
      forecastedDemand: 18000,
      recommendedStock: 20000,
      status: 'Critical'
    }
  ];

  const chartConfig = {
    actual: {
      label: 'Actual',
      color: '#3b82f6'
    },
    forecast: {
      label: 'Forecast',
      color: '#10b981'
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'Optimal': 'bg-green-100 text-green-800',
      'Adequate': 'bg-blue-100 text-blue-800',
      'Low': 'bg-yellow-100 text-yellow-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status as keyof typeof colors] || ''}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Global Inventory Forecast</CardTitle>
          <CardDescription>Inventory forecasting and optimization across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="forecast" 
                  stackId="1"
                  stroke="var(--color-forecast)"
                  fill="var(--color-forecast)"
                  fillOpacity={0.3}
                  name="Forecast"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stackId="2"
                  stroke="var(--color-actual)"
                  fill="var(--color-actual)"
                  fillOpacity={0.3}
                  name="Actual"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regional Inventory Analysis</CardTitle>
          <CardDescription>Current stock levels vs forecasted demand by region</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Region</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Forecasted Demand</TableHead>
                <TableHead>Recommended Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryByRegion.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.region}</TableCell>
                  <TableCell>{item.currentStock.toLocaleString()}</TableCell>
                  <TableCell>{item.forecastedDemand.toLocaleString()}</TableCell>
                  <TableCell>{item.recommendedStock.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forecast Accuracy</CardTitle>
          <CardDescription>Monthly variance between actual and forecasted inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Forecast</TableHead>
                <TableHead>Variance (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecastData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.month}</TableCell>
                  <TableCell>{item.actual.toLocaleString()}</TableCell>
                  <TableCell>{item.forecast.toLocaleString()}</TableCell>
                  <TableCell className={item.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {item.variance > 0 ? '+' : ''}{item.variance}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalInventoryForecast;
