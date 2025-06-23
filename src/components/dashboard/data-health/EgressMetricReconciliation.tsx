
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface EgressData {
  interface: string;
  source: string;
  destination: string;
  expectedRecords: number;
  actualRecords: number;
  variance: number;
  status: string;
  lastSync: string;
  endpoints?: EndpointData[];
}

interface EndpointData {
  endpoint: string;
  expectedRecords: number;
  actualRecords: number;
  variance: number;
  status: string;
  responseTime: number;
}

const EgressMetricReconciliation = () => {
  const [drillLevel, setDrillLevel] = useState<'interface' | 'endpoint'>('interface');
  const [selectedInterface, setSelectedInterface] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const egressData: EgressData[] = [
    {
      interface: 'API-001',
      source: 'Internal System A',
      destination: 'External Partner 1',
      expectedRecords: 12500,
      actualRecords: 12480,
      variance: -20,
      status: 'Warning',
      lastSync: '2024-01-15 09:15:00',
      endpoints: [
        { endpoint: '/api/orders', expectedRecords: 6000, actualRecords: 5990, variance: -10, status: 'Warning', responseTime: 250 },
        { endpoint: '/api/customers', expectedRecords: 4000, actualRecords: 4000, variance: 0, status: 'Success', responseTime: 180 },
        { endpoint: '/api/products', expectedRecords: 2500, actualRecords: 2490, variance: -10, status: 'Warning', responseTime: 320 }
      ]
    },
    {
      interface: 'API-002',
      source: 'Internal System B',
      destination: 'External Partner 2',
      expectedRecords: 8900,
      actualRecords: 8900,
      variance: 0,
      status: 'Success',
      lastSync: '2024-01-15 09:10:00',
      endpoints: [
        { endpoint: '/api/inventory', expectedRecords: 5000, actualRecords: 5000, variance: 0, status: 'Success', responseTime: 200 },
        { endpoint: '/api/shipments', expectedRecords: 3900, actualRecords: 3900, variance: 0, status: 'Success', responseTime: 150 }
      ]
    },
    {
      interface: 'FTP-001',
      source: 'Data Warehouse',
      destination: 'Reporting System',
      expectedRecords: 25000,
      actualRecords: 24950,
      variance: -50,
      status: 'Error',
      lastSync: '2024-01-15 09:05:00',
      endpoints: [
        { endpoint: '/ftp/daily-reports', expectedRecords: 15000, actualRecords: 14980, variance: -20, status: 'Warning', responseTime: 500 },
        { endpoint: '/ftp/analytics', expectedRecords: 10000, actualRecords: 9970, variance: -30, status: 'Error', responseTime: 650 }
      ]
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

  const getVarianceColor = (variance: number) => {
    if (variance === 0) return 'text-green-600';
    if (variance > -10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFilteredData = () => {
    let filtered = egressData;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(item => item.source === sourceFilter);
    }
    
    return filtered;
  };

  const handleDrillDown = (interfaceName: string) => {
    setSelectedInterface(interfaceName);
    setDrillLevel('endpoint');
  };

  const handleDrillUp = () => {
    setSelectedInterface(null);
    setDrillLevel('interface');
  };

  const getUniqueValues = (field: keyof EgressData) => {
    return ['all', ...Array.from(new Set(egressData.map(item => item[field] as string)))];
  };

  const getCurrentEndpoints = () => {
    const currentInterface = egressData.find(item => item.interface === selectedInterface);
    return currentInterface?.endpoints || [];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Egress 09 Metric Reconciliation</CardTitle>
          <CardDescription>Configurable egress interface monitoring with drill-down capabilities</CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Source System" />
              </SelectTrigger>
              <SelectContent>
                {getUniqueValues('source').map(value => (
                  <SelectItem key={value} value={value}>
                    {value === 'all' ? 'All Sources' : value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {drillLevel === 'endpoint' && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Back to Interfaces
              </Button>
            )}
            
            <div className="text-sm text-gray-600 flex items-center">
              <span className="font-medium">Level: </span>
              <span className="ml-1 capitalize">{drillLevel}</span>
              {selectedInterface && <span className="ml-1">→ {selectedInterface}</span>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {drillLevel === 'interface' ? (
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
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredData().map((item, index) => (
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
            <div>
              <h3 className="text-lg font-semibold mb-4">Endpoints for {selectedInterface}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Expected Records</TableHead>
                    <TableHead>Actual Records</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time (ms)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getCurrentEndpoints().map((endpoint, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{endpoint.endpoint}</TableCell>
                      <TableCell>{endpoint.expectedRecords.toLocaleString()}</TableCell>
                      <TableCell>{endpoint.actualRecords.toLocaleString()}</TableCell>
                      <TableCell className={getVarianceColor(endpoint.variance)}>
                        {endpoint.variance}
                      </TableCell>
                      <TableCell>{getStatusBadge(endpoint.status)}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          endpoint.responseTime < 200 ? 'text-green-600' :
                          endpoint.responseTime < 400 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {endpoint.responseTime}ms
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {drillLevel === 'interface' && (
        <Card>
          <CardHeader>
            <CardTitle>Summary Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {getFilteredData().filter(item => item.status === 'Success').length}
                </div>
                <div className="text-sm text-green-600">Successful</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {getFilteredData().filter(item => item.status === 'Warning').length}
                </div>
                <div className="text-sm text-yellow-600">Warning</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {getFilteredData().filter(item => item.status === 'Error').length}
                </div>
                <div className="text-sm text-red-600">Error</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {getFilteredData().reduce((sum, item) => sum + Math.abs(item.variance), 0)}
                </div>
                <div className="text-sm text-blue-600">Total Variance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EgressMetricReconciliation;
