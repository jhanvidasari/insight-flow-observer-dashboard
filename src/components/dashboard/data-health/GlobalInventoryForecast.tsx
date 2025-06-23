
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface InventoryData {
  region: string;
  category: string;
  subCategory: string;
  currentStock: number;
  forecastedDemand: number;
  recommendedStock: number;
  status: string;
}

const GlobalInventoryForecast = () => {
  const [drillLevel, setDrillLevel] = useState<'region' | 'category' | 'subCategory'>('region');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const inventoryData: InventoryData[] = [
    { region: 'North America', category: 'Electronics', subCategory: 'Smartphones', currentStock: 25000, forecastedDemand: 22000, recommendedStock: 28000, status: 'Adequate' },
    { region: 'North America', category: 'Electronics', subCategory: 'Laptops', currentStock: 15000, forecastedDemand: 18000, recommendedStock: 20000, status: 'Low' },
    { region: 'North America', category: 'Clothing', subCategory: 'Shirts', currentStock: 35000, forecastedDemand: 30000, recommendedStock: 38000, status: 'Optimal' },
    { region: 'Europe', category: 'Electronics', subCategory: 'Smartphones', currentStock: 18000, forecastedDemand: 20000, recommendedStock: 22000, status: 'Low' },
    { region: 'Europe', category: 'Electronics', subCategory: 'Tablets', currentStock: 12000, forecastedDemand: 15000, recommendedStock: 18000, status: 'Critical' },
    { region: 'Europe', category: 'Clothing', subCategory: 'Jackets', currentStock: 28000, forecastedDemand: 25000, recommendedStock: 30000, status: 'Optimal' },
    { region: 'Asia Pacific', category: 'Electronics', subCategory: 'Smartphones', currentStock: 30000, forecastedDemand: 28000, recommendedStock: 32000, status: 'Optimal' },
    { region: 'Asia Pacific', category: 'Clothing', subCategory: 'Pants', currentStock: 20000, forecastedDemand: 25000, recommendedStock: 28000, status: 'Critical' }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      'Optimal': 'bg-green-100 text-green-800',
      'Adequate': 'bg-blue-100 text-blue-800',
      'Low': 'bg-yellow-100 text-yellow-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status as keyof typeof colors] || ''}>{status}</Badge>;
  };

  const getFilteredData = () => {
    let filtered = inventoryData;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    if (drillLevel === 'category' && selectedRegion) {
      filtered = filtered.filter(item => item.region === selectedRegion);
    }
    
    if (drillLevel === 'subCategory' && selectedRegion && selectedCategory) {
      filtered = filtered.filter(item => 
        item.region === selectedRegion && item.category === selectedCategory
      );
    }
    
    return filtered;
  };

  const getGroupedData = () => {
    const filtered = getFilteredData();
    const grouped = new Map();

    filtered.forEach(item => {
      let key = '';
      if (drillLevel === 'region') key = item.region;
      else if (drillLevel === 'category') key = item.category;
      else key = item.subCategory;

      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          currentStock: 0,
          forecastedDemand: 0,
          recommendedStock: 0,
          items: []
        });
      }
      
      const group = grouped.get(key);
      group.currentStock += item.currentStock;
      group.forecastedDemand += item.forecastedDemand;
      group.recommendedStock += item.recommendedStock;
      group.items.push(item);
    });

    return Array.from(grouped.values());
  };

  const handleDrillDown = (key: string) => {
    if (drillLevel === 'region') {
      setSelectedRegion(key);
      setDrillLevel('category');
    } else if (drillLevel === 'category') {
      setSelectedCategory(key);
      setDrillLevel('subCategory');
    }
  };

  const handleDrillUp = () => {
    if (drillLevel === 'subCategory') {
      setSelectedCategory(null);
      setDrillLevel('category');
    } else if (drillLevel === 'category') {
      setSelectedRegion(null);
      setDrillLevel('region');
    }
  };

  const getBreadcrumb = () => {
    let breadcrumb = 'All Regions';
    if (selectedRegion) breadcrumb += ` > ${selectedRegion}`;
    if (selectedCategory) breadcrumb += ` > ${selectedCategory}`;
    return breadcrumb;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Global Inventory Forecast</CardTitle>
          <CardDescription>Configurable inventory analysis with drill-down capabilities</CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Optimal">Optimal</SelectItem>
                <SelectItem value="Adequate">Adequate</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            
            {(selectedRegion || selectedCategory) && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Drill Up
              </Button>
            )}
            
            <div className="text-sm text-gray-600 flex items-center">
              <span className="font-medium">Path: </span>
              <span className="ml-1">{getBreadcrumb()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="capitalize">
                  {drillLevel === 'region' ? 'Region' : 
                   drillLevel === 'category' ? 'Category' : 'Sub Category'}
                </TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Forecasted Demand</TableHead>
                <TableHead>Recommended Stock</TableHead>
                <TableHead>Utilization %</TableHead>
                <TableHead>Items Count</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getGroupedData().map((group, index) => {
                const utilization = ((group.currentStock / group.recommendedStock) * 100).toFixed(1);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{group.key}</TableCell>
                    <TableCell>{group.currentStock.toLocaleString()}</TableCell>
                    <TableCell>{group.forecastedDemand.toLocaleString()}</TableCell>
                    <TableCell>{group.recommendedStock.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        parseFloat(utilization) > 90 ? 'text-green-600' :
                        parseFloat(utilization) > 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {utilization}%
                      </span>
                    </TableCell>
                    <TableCell>{group.items.length}</TableCell>
                    <TableCell>
                      {drillLevel !== 'subCategory' && (
                        <Button 
                          onClick={() => handleDrillDown(group.key)}
                          variant="outline" 
                          size="sm"
                        >
                          Drill Down →
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalInventoryForecast;
