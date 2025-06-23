
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const DataReconciliation = () => {
  const reconciliationData = [
    {
      sourceSystem: 'ERP System',
      targetSystem: 'Data Warehouse',
      recordCount: 15420,
      matchedRecords: 15380,
      unmatchedRecords: 40,
      status: 'Success',
      lastRun: '2024-01-15 08:30:00'
    },
    {
      sourceSystem: 'CRM System',
      targetSystem: 'Analytics DB',
      recordCount: 8750,
      matchedRecords: 8720,
      unmatchedRecords: 30,
      status: 'Warning',
      lastRun: '2024-01-15 08:25:00'
    },
    {
      sourceSystem: 'Inventory System',
      targetSystem: 'Reporting DB',
      recordCount: 25600,
      matchedRecords: 25600,
      unmatchedRecords: 0,
      status: 'Success',
      lastRun: '2024-01-15 08:35:00'
    }
  ];

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Reconciliation Status</CardTitle>
        <CardDescription>Monitor data consistency across systems</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source System</TableHead>
              <TableHead>Target System</TableHead>
              <TableHead>Total Records</TableHead>
              <TableHead>Matched</TableHead>
              <TableHead>Unmatched</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Run</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reconciliationData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.sourceSystem}</TableCell>
                <TableCell>{item.targetSystem}</TableCell>
                <TableCell>{item.recordCount.toLocaleString()}</TableCell>
                <TableCell>{item.matchedRecords.toLocaleString()}</TableCell>
                <TableCell>{item.unmatchedRecords.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{item.lastRun}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataReconciliation;
