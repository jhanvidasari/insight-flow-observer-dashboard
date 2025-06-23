
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EgressMetricReconciliation = () => {
  const [selectedLevel, setSelectedLevel] = useState<'interface' | 'detail'>('interface');
  const [selectedInterface, setSelectedInterface] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const egressData = [
    {
      interface: 'API-001',
      source: 'Internal System A',
      destination: 'External Partner 1',
      region: 'North America',
      expectedRecords: 12500,
      actualRecords: 12480,
      variance: -20,
      status: 'Warning',
      lastSync: '2024-01-15 09:15:00',
      details: [
        { endpoint: '/api/customers', expected: 5000, actual: 4990, variance: -10, status: 'Warning' },
        { endpoint: '/api/orders', expected: 4500, actual: 4490, variance: -10, status: 'Warning' },
        { endpoint: '/api/products', expected: 3000, actual: 3000, variance: 0, status: 'Success' }
      ]
    },
    {
      interface: 'API-002',
      source: 'Internal System B',
      destination: 'External Partner 2',
      region: 'Europe',
      expectedRecords: 8900,
      actualRecords: 8900,
      variance: 0,
      status: 'Success',
      lastSync: '2024-01-15 09:10:00',
      details: [
        { endpoint: '/api/inventory', expected: 4000, actual: 4000, variance: 0, status: 'Success' },
        { endpoint: '/api/suppliers', expected: 2900, actual: 2900, variance: 0, status: 'Success' },
        { endpoint: '/api/transactions', expected: 2000, actual: 2000, variance: 0, status: 'Success' }
      ]
    },
    {
      interface: 'API-003',
      source: 'Internal System C',
      destination: 'External Partner 3',
      region: 'Asia Pacific',
      expectedRecords: 15600,
      actualRecords: 15580,
      variance: -20,
      status: 'Warning',
      lastSync: '2024-01-15 09:20:00',
      details: [
        { endpoint: '/api/users', expected: 8000, actual: 7990, variance: -10, status: 'Warning' },
        { endpoint: '/api/payments', expected: 4600, actual: 4590, variance: -10, status: 'Warning' },
        { endpoint: '/api/reports', expected: 3000, actual: 3000, variance: 0, status: 'Success' }
      ]
    },
    {
      interface: 'FTP-001',
      source: 'Data Warehouse',
      destination: 'Reporting System',
      region: 'North America',
      expectedRecords: 25000,
      actualRecords: 24950,
      variance: -50,
      status: 'Error',
      lastSync: '2024-01-15 09:05:00',
      details: [
        { endpoint: 'daily_summary.csv', expected: 15000, actual: 14970, variance: -30, status: 'Error' },
        { endpoint: 'weekly_report.csv', expected: 10000, actual: 9980, variance: -20, status: 'Warning' }
      ]
    }
  ];

  const statuses = ['all', 'Success', 'Warning', 'Error'];
  const regions = ['all', 'North America', 'Europe', 'Asia Pacific'];

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

  const handleDrillDown = (interfaceName: string) => {
    setSelectedInterface(interfaceName);
    setSelectedLevel('detail');
  };

  const handleDrillUp = () => {
    setSelectedInterface(null);
    setSelectedLevel('interface');
  };

  const filteredData = egressData.filter(item => {
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
    const regionMatch = selectedRegion === 'all' || item.region === selectedRegion;
    return statusMatch && regionMatch;
  });

  const getCurrentDetails = () => {
    const interfaceData = egressData.find(item => item.interface === selectedInterface);
    return interfaceData?.details || [];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Egress 09 Metric Reconciliation</CardTitle>
          <CardDescription>
            Monitor data egress interfaces with drill-down capabilities
            {selectedLevel === 'detail' && ` - ${selectedInterface} Details`}
          </CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Region Filter" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region === 'all' ? 'All Regions' : region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedLevel === 'detail' && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Back to Interfaces
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {selectedLevel === 'interface' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interface</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Expected Records</TableHead>
                  <TableHead>Actual Records</TableHead>
                  <TableHead>Variance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.interface}</TableCell>
                    <TableCell>{item.source}</TableCell>
                    <TableCell>{item.destination}</TableCell>
                    <TableCell>{item.region}</TableCell>
                    <TableCell>{item.expectedRecords.toLocaleString()}</TableCell>
                    <TableCell>{item.actualRecords.toLocaleString()}</TableCell>
                    <TableCell className={getVarianceColor(item.variance)}>
                      {item.variance}
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.lastSync}</TableCell>
                    <TableCell>
                      <Button 
                        onClick={() => handleDrillDown(item.interface)} 
                        variant="outline" 
                        size="sm"
                      >
                        Drill Down →
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint/File</TableHead>
                  <TableHead>Expected Records</TableHead>
                  <TableHead>Actual Records</TableHead>
                  <TableHead>Variance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCurrentDetails().map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{detail.endpoint}</TableCell>
                    <TableCell>{detail.expected.toLocaleString()}</TableCell>
                    <TableCell>{detail.actual.toLocaleString()}</TableCell>
                    <TableCell className={getVarianceColor(detail.variance)}>
                      {detail.variance}
                    </TableCell>
                    <TableCell>{getStatusBadge(detail.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interface Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredData.filter(item => item.status === 'Success').length}
              </div>
              <div className="text-sm text-green-600">Successful</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredData.filter(item => item.status === 'Warning').length}
              </div>
              <div className="text-sm text-yellow-600">Warning</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {filteredData.filter(item => item.status === 'Error').length}
              </div>
              <div className="text-sm text-red-600">Error</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {filteredData.reduce((sum, item) => sum + Math.abs(item.variance), 0)}
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
