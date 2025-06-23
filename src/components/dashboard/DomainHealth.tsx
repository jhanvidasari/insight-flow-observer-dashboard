
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const DomainHealth = () => {
  // Sample data for Forecast vs Actual
  const forecastData = [
    {
      forecastName: 'Sales Forecast Q1',
      metricName: 'Revenue',
      forecastMeasureName: 'Projected Revenue',
      actualMeasureName: 'Actual Revenue',
      forecastValue: 1000000,
      actualValue: 950000,
      variance: -5.0
    },
    {
      forecastName: 'Customer Growth Q1',
      metricName: 'New Customers',
      forecastMeasureName: 'Projected Customers',
      actualMeasureName: 'Actual Customers',
      forecastValue: 5000,
      actualValue: 5200,
      variance: 4.0
    },
    {
      forecastName: 'Product Usage Q1',
      metricName: 'Active Users',
      forecastMeasureName: 'Projected Users',
      actualMeasureName: 'Actual Users',
      forecastValue: 25000,
      actualValue: 23500,
      variance: -6.0
    }
  ];

  const chartData = forecastData.map(item => ({
    name: item.forecastName,
    forecast: item.forecastValue,
    actual: item.actualValue
  }));

  const chartConfig = {
    forecast: {
      label: 'Forecast',
      color: '#3b82f6'
    },
    actual: {
      label: 'Actual',
      color: '#10b981'
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Domain Health Overview</CardTitle>
          <CardDescription>Monitor forecast accuracy and performance metrics</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forecast vs Actual Performance</CardTitle>
          <CardDescription>Compare forecasted values against actual results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="forecast" fill="var(--color-forecast)" name="Forecast" />
                    <Bar dataKey="actual" fill="var(--color-actual)" name="Actual" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Forecast Name</TableHead>
                    <TableHead>Metric</TableHead>
                    <TableHead>Variance %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forecastData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.forecastName}</TableCell>
                      <TableCell>{item.metricName}</TableCell>
                      <TableCell className={item.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {item.variance > 0 ? '+' : ''}{item.variance}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-4">Detailed Metrics</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Forecast Name</TableHead>
                  <TableHead>Metric Name</TableHead>
                  <TableHead>Forecast Measure Name</TableHead>
                  <TableHead>Actual Measure Name</TableHead>
                  <TableHead>Forecast Value</TableHead>
                  <TableHead>Actual Value</TableHead>
                  <TableHead>Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecastData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.forecastName}</TableCell>
                    <TableCell>{item.metricName}</TableCell>
                    <TableCell>{item.forecastMeasureName}</TableCell>
                    <TableCell>{item.actualMeasureName}</TableCell>
                    <TableCell>{item.forecastValue.toLocaleString()}</TableCell>
                    <TableCell>{item.actualValue.toLocaleString()}</TableCell>
                    <TableCell className={item.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {item.variance > 0 ? '+' : ''}{item.variance}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainHealth;
