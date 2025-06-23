
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const PipelineHealth = () => {
  const pipelineData = [
    {
      pipelineName: 'Customer Data Pipeline',
      status: 'Running',
      lastRun: '2024-01-15 09:30:00',
      duration: '45m 30s',
      recordsProcessed: 150000,
      successRate: 99.8,
      errors: 2
    },
    {
      pipelineName: 'Sales Analytics Pipeline',
      status: 'Running',
      lastRun: '2024-01-15 09:25:00',
      duration: '32m 15s',
      recordsProcessed: 85000,
      successRate: 100.0,
      errors: 0
    },
    {
      pipelineName: 'Inventory Sync Pipeline',
      status: 'Failed',
      lastRun: '2024-01-15 09:20:00',
      duration: '12m 45s',
      recordsProcessed: 25000,
      successRate: 85.2,
      errors: 15
    },
    {
      pipelineName: 'Financial Reporting Pipeline',
      status: 'Warning',
      lastRun: '2024-01-15 09:15:00',
      duration: '1h 5m 30s',
      recordsProcessed: 200000,
      successRate: 95.5,
      errors: 8
    }
  ];

  const performanceData = [
    { time: '06:00', throughput: 1200, latency: 150 },
    { time: '07:00', throughput: 1500, latency: 180 },
    { time: '08:00', throughput: 2000, latency: 200 },
    { time: '09:00', throughput: 2500, latency: 250 },
    { time: '10:00', throughput: 2200, latency: 220 },
    { time: '11:00', throughput: 1800, latency: 190 }
  ];

  const chartConfig = {
    throughput: {
      label: 'Throughput (records/min)',
      color: '#3b82f6'
    },
    latency: {
      label: 'Latency (ms)',
      color: '#10b981'
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Running':
        return <Badge className="bg-green-100 text-green-800">Running</Badge>;
      case 'Warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'Stopped':
        return <Badge className="bg-gray-100 text-gray-800">Stopped</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 99) return 'text-green-600';
    if (rate >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Health Overview</CardTitle>
          <CardDescription>Monitor data pipeline status and performance metrics</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Status Monitor</CardTitle>
          <CardDescription>Real-time status of all data pipelines</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pipeline Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Records Processed</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Errors</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pipelineData.map((pipeline, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{pipeline.pipelineName}</TableCell>
                  <TableCell>{getStatusBadge(pipeline.status)}</TableCell>
                  <TableCell>{pipeline.lastRun}</TableCell>
                  <TableCell>{pipeline.duration}</TableCell>
                  <TableCell>{pipeline.recordsProcessed.toLocaleString()}</TableCell>
                  <TableCell className={getSuccessRateColor(pipeline.successRate)}>
                    {pipeline.successRate}%
                  </TableCell>
                  <TableCell className={pipeline.errors > 0 ? 'text-red-600' : 'text-green-600'}>
                    {pipeline.errors}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Performance Metrics</CardTitle>
          <CardDescription>Throughput and latency trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="var(--color-throughput)"
                  strokeWidth={2}
                  name="Throughput"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="latency" 
                  stroke="var(--color-latency)"
                  strokeWidth={2}
                  name="Latency"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Pipelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {pipelineData.filter(p => p.status === 'Running').length}
            </div>
            <p className="text-xs text-green-600">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Pipelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {pipelineData.filter(p => p.status === 'Failed').length}
            </div>
            <p className="text-xs text-red-600">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(pipelineData.reduce((sum, p) => sum + p.successRate, 0) / pipelineData.length).toFixed(1)}%
            </div>
            <p className="text-xs text-blue-600">Across all pipelines</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Records/Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {(pipelineData.reduce((sum, p) => sum + p.recordsProcessed, 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-purple-600">Records processed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PipelineHealth;
