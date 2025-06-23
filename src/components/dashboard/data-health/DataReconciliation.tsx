
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const DataReconciliation = () => {
  const [selectedLevel, setSelectedLevel] = useState<'region' | 'node'>('region');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [chartType, setChartType] = useState<'bar' | 'trend'>('bar');

  const regionData = [
    {
      region: 'North America',
      sourceSystem: 'ERP System',
      targetSystem: 'Data Warehouse',
      recordCount: 15420,
      matchedRecords: 15380,
      unmatchedRecords: 40,
      status: 'Success',
      lastRun: '2024-01-15 08:30:00',
      nodes: [
        { node: 'US-East', recordCount: 8500, matchedRecords: 8480, unmatchedRecords: 20, status: 'Success' },
        { node: 'US-West', recordCount: 4920, matchedRecords: 4900, unmatchedRecords: 20, status: 'Warning' },
        { node: 'Canada', recordCount: 2000, matchedRecords: 2000, unmatchedRecords: 0, status: 'Success' }
      ]
    },
    {
      region: 'Europe',
      sourceSystem: 'CRM System',
      targetSystem: 'Analytics DB',
      recordCount: 8750,
      matchedRecords: 8720,
      unmatchedRecords: 30,
      status: 'Warning',
      lastRun: '2024-01-15 08:25:00',
      nodes: [
        { node: 'Germany', recordCount: 4000, matchedRecords: 3980, unmatchedRecords: 20, status: 'Warning' },
        { node: 'France', recordCount: 2750, matchedRecords: 2740, unmatchedRecords: 10, status: 'Success' },
        { node: 'UK', recordCount: 2000, matchedRecords: 2000, unmatchedRecords: 0, status: 'Success' }
      ]
    },
    {
      region: 'Asia Pacific',
      sourceSystem: 'Inventory System',
      targetSystem: 'Reporting DB',
      recordCount: 25600,
      matchedRecords: 25600,
      unmatchedRecords: 0,
      status: 'Success',
      lastRun: '2024-01-15 08:35:00',
      nodes: [
        { node: 'Japan', recordCount: 12000, matchedRecords: 12000, unmatchedRecords: 0, status: 'Success' },
        { node: 'Australia', recordCount: 8600, matchedRecords: 8600, unmatchedRecords: 0, status: 'Success' },
        { node: 'Singapore', recordCount: 5000, matchedRecords: 5000, unmatchedRecords: 0, status: 'Success' }
      ]
    }
  ];

  const trendData = [
    { day: 'Mon', matched: 98.5, unmatched: 1.5 },
    { day: 'Tue', matched: 97.8, unmatched: 2.2 },
    { day: 'Wed', matched: 99.1, unmatched: 0.9 },
    { day: 'Thu', matched: 98.9, unmatched: 1.1 },
    { day: 'Fri', matched: 99.2, unmatched: 0.8 },
    { day: 'Sat', matched: 98.7, unmatched: 1.3 },
    { day: 'Sun', matched: 99.0, unmatched: 1.0 }
  ];

  const chartConfig = {
    matched: { label: 'Matched Records', color: '#10b981' },
    unmatched: { label: 'Unmatched Records', color: '#ef4444' }
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
    setSelectedLevel('node');
  };

  const handleDrillUp = () => {
    setSelectedRegion(null);
    setSelectedLevel('region');
  };

  const currentData = selectedLevel === 'region' 
    ? regionData 
    : regionData.find(r => r.region === selectedRegion)?.nodes || [];

  const barChartData = selectedLevel === 'region'
    ? regionData.map(item => ({
        name: item.region,
        matched: item.matchedRecords,
        unmatched: item.unmatchedRecords
      }))
    : currentData.map(item => ({
        name: item.node,
        matched: item.matchedRecords,
        unmatched: item.unmatchedRecords
      }));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Reconciliation Status</CardTitle>
          <CardDescription>Monitor data consistency across systems with drill-down capabilities</CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={chartType} onValueChange={(value: 'bar' | 'trend') => setChartType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="trend">Daily Trends</SelectItem>
              </SelectContent>
            </Select>
            {selectedLevel === 'node' && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Back to Regions
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {chartType === 'bar' ? (
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="matched" fill="var(--color-matched)" name="Matched" />
                  <Bar dataKey="unmatched" fill="var(--color-unmatched)" name="Unmatched" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="matched" stroke="var(--color-matched)" strokeWidth={2} />
                  <Line type="monotone" dataKey="unmatched" stroke="var(--color-unmatched)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedLevel === 'region' ? 'Regional Overview' : `Node Details - ${selectedRegion}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{selectedLevel === 'region' ? 'Region' : 'Node'}</TableHead>
                {selectedLevel === 'region' && <TableHead>Source System</TableHead>}
                {selectedLevel === 'region' && <TableHead>Target System</TableHead>}
                <TableHead>Total Records</TableHead>
                <TableHead>Matched</TableHead>
                <TableHead>Unmatched</TableHead>
                <TableHead>Status</TableHead>
                {selectedLevel === 'region' && <TableHead>Last Run</TableHead>}
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedLevel === 'region' 
                ? regionData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.region}</TableCell>
                      <TableCell>{item.sourceSystem}</TableCell>
                      <TableCell>{item.targetSystem}</TableCell>
                      <TableCell>{item.recordCount.toLocaleString()}</TableCell>
                      <TableCell>{item.matchedRecords.toLocaleString()}</TableCell>
                      <TableCell>{item.unmatchedRecords.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastRun}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleDrillDown(item.region)} variant="outline" size="sm">
                          Drill Down →
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : currentData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.node}</TableCell>
                      <TableCell>{item.recordCount.toLocaleString()}</TableCell>
                      <TableCell>{item.matchedRecords.toLocaleString()}</TableCell>
                      <TableCell>{item.unmatchedRecords.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataReconciliation;
