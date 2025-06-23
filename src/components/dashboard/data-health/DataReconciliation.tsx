
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const DataReconciliation = () => {
  const [viewLevel, setViewLevel] = useState<'region' | 'node'>('region');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const regionData = [
    {
      region: 'North America',
      recordCount: 15420,
      matchedRecords: 15380,
      unmatchedRecords: 40,
      status: 'Success',
      lastRun: '2024-01-15 08:30:00',
      nodes: [
        { name: 'NA-Node-001', recordCount: 7800, matchedRecords: 7790, unmatchedRecords: 10, status: 'Success' },
        { name: 'NA-Node-002', recordCount: 7620, matchedRecords: 7590, unmatchedRecords: 30, status: 'Warning' }
      ]
    },
    {
      region: 'Europe',
      recordCount: 8750,
      matchedRecords: 8720,
      unmatchedRecords: 30,
      status: 'Warning',
      lastRun: '2024-01-15 08:25:00',
      nodes: [
        { name: 'EU-Node-001', recordCount: 4500, matchedRecords: 4485, unmatchedRecords: 15, status: 'Success' },
        { name: 'EU-Node-002', recordCount: 4250, matchedRecords: 4235, unmatchedRecords: 15, status: 'Warning' }
      ]
    },
    {
      region: 'Asia Pacific',
      recordCount: 25600,
      matchedRecords: 25600,
      unmatchedRecords: 0,
      status: 'Success',
      lastRun: '2024-01-15 08:35:00',
      nodes: [
        { name: 'AP-Node-001', recordCount: 12800, matchedRecords: 12800, unmatchedRecords: 0, status: 'Success' },
        { name: 'AP-Node-002', recordCount: 12800, matchedRecords: 12800, unmatchedRecords: 0, status: 'Success' }
      ]
    }
  ];

  const dailyTrendData = [
    { day: 'Mon', matched: 42000, unmatched: 120 },
    { day: 'Tue', matched: 44000, unmatched: 95 },
    { day: 'Wed', matched: 43000, unmatched: 110 },
    { day: 'Thu', matched: 45000, unmatched: 85 },
    { day: 'Fri', matched: 46000, unmatched: 70 },
    { day: 'Sat', matched: 44000, unmatched: 90 },
    { day: 'Sun', matched: 45000, unmatched: 80 }
  ];

  const chartConfig = {
    matched: { label: 'Matched Records', color: '#10b981' },
    unmatched: { label: 'Unmatched Records', color: '#ef4444' },
    recordCount: { label: 'Total Records', color: '#3b82f6' }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'Warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'Error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleDrillDown = (regionName: string) => {
    setSelectedRegion(regionName);
    setViewLevel('node');
  };

  const handleDrillUp = () => {
    setSelectedRegion(null);
    setViewLevel('region');
  };

  const getCurrentData = () => {
    if (viewLevel === 'region') {
      return regionData;
    } else {
      const region = regionData.find(r => r.region === selectedRegion);
      return region?.nodes || [];
    }
  };

  const getChartData = () => {
    const currentData = getCurrentData();
    return currentData.map(item => ({
      name: viewLevel === 'region' ? item.region : item.name,
      recordCount: item.recordCount,
      matchedRecords: item.matchedRecords,
      unmatchedRecords: item.unmatchedRecords
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Reconciliation Status</CardTitle>
          <CardDescription>Monitor data consistency across systems with configurable views</CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={chartType} onValueChange={(value: 'bar' | 'line') => setChartType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
              </SelectContent>
            </Select>
            {viewLevel === 'node' && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Back to Regions
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Records Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                      <BarChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="matchedRecords" fill="var(--color-matched)" name="Matched" />
                        <Bar dataKey="unmatchedRecords" fill="var(--color-unmatched)" name="Unmatched" />
                      </BarChart>
                    ) : (
                      <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="recordCount" stroke="var(--color-recordCount)" strokeWidth={2} />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="matched" stroke="var(--color-matched)" strokeWidth={2} />
                      <Line type="monotone" dataKey="unmatched" stroke="var(--color-unmatched)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{viewLevel === 'region' ? 'Region' : 'Node'}</TableHead>
                <TableHead>Total Records</TableHead>
                <TableHead>Matched</TableHead>
                <TableHead>Unmatched</TableHead>
                <TableHead>Status</TableHead>
                {viewLevel === 'region' && <TableHead>Last Run</TableHead>}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentData().map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {viewLevel === 'region' ? item.region : item.name}
                  </TableCell>
                  <TableCell>{item.recordCount.toLocaleString()}</TableCell>
                  <TableCell>{item.matchedRecords.toLocaleString()}</TableCell>
                  <TableCell>{item.unmatchedRecords.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  {viewLevel === 'region' && <TableCell>{item.lastRun}</TableCell>}
                  <TableCell>
                    {viewLevel === 'region' && (
                      <Button 
                        onClick={() => handleDrillDown(item.region)}
                        variant="outline" 
                        size="sm"
                      >
                        Drill Down →
                      </Button>
                    )}
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

export default DataReconciliation;
