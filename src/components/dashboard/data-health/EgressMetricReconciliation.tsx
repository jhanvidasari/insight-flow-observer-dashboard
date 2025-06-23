
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const EgressMetricReconciliation = () => {
  const egressData = [
    {
      interface: 'API-001',
      source: 'Internal System A',
      destination: 'External Partner 1',
      expectedRecords: 12500,
      actualRecords: 12480,
      variance: -20,
      status: 'Warning',
      lastSync: '2024-01-15 09:15:00'
    },
    {
      interface: 'API-002',
      source: 'Internal System B',
      destination: 'External Partner 2',
      expectedRecords: 8900,
      actualRecords: 8900,
      variance: 0,
      status: 'Success',
      lastSync: '2024-01-15 09:10:00'
    },
    {
      interface: 'API-003',
      source: 'Internal System C',
      destination: 'External Partner 3',
      expectedRecords: 15600,
      actualRecords: 15580,
      variance: -20,
      status: 'Warning',
      lastSync: '2024-01-15 09:20:00'
    },
    {
      interface: 'FTP-001',
      source: 'Data Warehouse',
      destination: 'Reporting System',
      expectedRecords: 25000,
      actualRecords: 24950,
      variance: -50,
      status: 'Error',
      lastSync: '2024-01-15 09:05:00'
    }
  ];

  const chartData = egressData.map(item => ({
    interface: item.interface,
    expected: item.expectedRecords,
    actual: item.actualRecords
  }));

  const chartConfig = {
    expected: {
      label: 'Expected',
      color: '#3b82f6'
    },
    actual: {
      label: 'Actual',
      color: '#10b981'
    }
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

  const getVarianceColor = (variance: number) => {
    if (variance === 0) return 'text-green-600';
    if (variance > -10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Egress 09 Metric Reconciliation</CardTitle>
          <CardDescription>Monitor data egress interfaces and reconciliation status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interface</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Expected Records</TableHead>
                <TableHead>Actual Records</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {egressData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.interface}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell>{item.destination}</TableCell>
                  <TableCell>{item.expectedRecords.toLocaleString()}</TableCell>
                  <TableCell>{item.actualRecords.toLocaleString()}</TableCell>
                  <TableCell className={getVarianceColor(item.variance)}>
                    {item.variance}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{item.lastSync}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expected vs Actual Records Comparison</CardTitle>
          <CardDescription>Visual comparison of data flow expectations vs reality</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="interface" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="expected" fill="var(--color-expected)" name="Expected" />
                <Bar dataKey="actual" fill="var(--color-actual)" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interface Performance Summary</CardTitle>
          <CardDescription>Overall performance metrics for egress interfaces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {egressData.filter(item => item.status === 'Success').length}
              </div>
              <div className="text-sm text-green-600">Successful</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {egressData.filter(item => item.status === 'Warning').length}
              </div>
              <div className="text-sm text-yellow-600">Warning</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {egressData.filter(item => item.status === 'Error').length}
              </div>
              <div className="text-sm text-red-600">Error</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {egressData.reduce((sum, item) => sum + Math.abs(item.variance), 0)}
              </div>
              <div className="text-sm text-blue-600">Total Variance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EgressMetricReconciliation;
