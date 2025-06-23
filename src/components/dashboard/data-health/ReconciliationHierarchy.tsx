
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HierarchyData {
  interface: string;
  typeCode: string;
  inventoryChannel: string;
  nodeCode: string;
  recordCount: number;
  reconciledCount: number;
  status: string;
}

const ReconciliationHierarchy = () => {
  const [drillLevel, setDrillLevel] = useState<'interface' | 'typeCode' | 'inventoryChannel' | 'nodeCode'>('interface');
  const [selectedValues, setSelectedValues] = useState<{[key: string]: string}>({});

  const hierarchyData: HierarchyData[] = [
    { interface: 'API-001', typeCode: 'INBOUND', inventoryChannel: 'RETAIL', nodeCode: 'N001', recordCount: 50000, reconciledCount: 49500, status: 'Success' },
    { interface: 'API-001', typeCode: 'INBOUND', inventoryChannel: 'ONLINE', nodeCode: 'N002', recordCount: 30000, reconciledCount: 29800, status: 'Warning' },
    { interface: 'API-002', typeCode: 'OUTBOUND', inventoryChannel: 'RETAIL', nodeCode: 'N003', recordCount: 25000, reconciledCount: 25000, status: 'Success' },
    { interface: 'API-002', typeCode: 'OUTBOUND', inventoryChannel: 'WHOLESALE', nodeCode: 'N004', recordCount: 40000, reconciledCount: 39200, status: 'Warning' },
    { interface: 'FTP-001', typeCode: 'BATCH', inventoryChannel: 'DISTRIBUTION', nodeCode: 'N005', recordCount: 60000, reconciledCount: 58800, status: 'Error' }
  ];

  const getFilteredData = () => {
    let filtered = hierarchyData;
    
    Object.entries(selectedValues).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter(item => {
          const itemValue = item[key as keyof HierarchyData];
          return String(itemValue) === value;
        });
      }
    });

    return filtered;
  };

  const getGroupedData = () => {
    const filtered = getFilteredData();
    const grouped = new Map();

    filtered.forEach(item => {
      const key = String(item[drillLevel]);
      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          recordCount: 0,
          reconciledCount: 0,
          items: []
        });
      }
      
      const group = grouped.get(key);
      group.recordCount += item.recordCount;
      group.reconciledCount += item.reconciledCount;
      group.items.push(item);
    });

    return Array.from(grouped.values());
  };

  const getStatusBadge = (reconciliationRate: number) => {
    if (reconciliationRate >= 98) return 'bg-green-100 text-green-800';
    if (reconciliationRate >= 95) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getUniqueValues = (field: keyof HierarchyData) => {
    const values = Array.from(new Set(hierarchyData.map(item => String(item[field]))));
    return ['all', ...values];
  };

  const drillLevels = [
    { value: 'interface', label: 'Interface' },
    { value: 'typeCode', label: 'Type Code' },
    { value: 'inventoryChannel', label: 'Inventory Channel' },
    { value: 'nodeCode', label: 'Node Code' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reconciliation Hierarchy Report</CardTitle>
        <CardDescription>Configurable drill-down view across multiple dimensions</CardDescription>
        <div className="flex flex-wrap gap-4">
          <Select value={drillLevel} onValueChange={(value: any) => setDrillLevel(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select drill level" />
            </SelectTrigger>
            <SelectContent>
              {drillLevels.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  Group by {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={selectedValues.interface || 'all'} 
            onValueChange={(value) => setSelectedValues(prev => ({...prev, interface: value}))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Interface" />
            </SelectTrigger>
            <SelectContent>
              {getUniqueValues('interface').map(value => (
                <SelectItem key={value} value={value}>
                  {value === 'all' ? 'All' : value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={selectedValues.typeCode || 'all'} 
            onValueChange={(value) => setSelectedValues(prev => ({...prev, typeCode: value}))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type Code" />
            </SelectTrigger>
            <SelectContent>
              {getUniqueValues('typeCode').map(value => (
                <SelectItem key={value} value={value}>
                  {value === 'all' ? 'All' : value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={selectedValues.inventoryChannel || 'all'} 
            onValueChange={(value) => setSelectedValues(prev => ({...prev, inventoryChannel: value}))}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              {getUniqueValues('inventoryChannel').map(value => (
                <SelectItem key={value} value={value}>
                  {value === 'all' ? 'All' : value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setSelectedValues({})} variant="outline" size="sm">
            Clear Filters
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="capitalize">{drillLevel.replace(/([A-Z])/g, ' $1')}</TableHead>
              <TableHead>Total Records</TableHead>
              <TableHead>Reconciled</TableHead>
              <TableHead>Success Rate</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getGroupedData().map((group, index) => {
              const successRate = ((group.reconciledCount / group.recordCount) * 100).toFixed(2);
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{group.key}</TableCell>
                  <TableCell>{group.recordCount.toLocaleString()}</TableCell>
                  <TableCell>{group.reconciledCount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(parseFloat(successRate))}`}>
                      {successRate}%
                    </span>
                  </TableCell>
                  <TableCell>{group.items.length} items</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReconciliationHierarchy;
