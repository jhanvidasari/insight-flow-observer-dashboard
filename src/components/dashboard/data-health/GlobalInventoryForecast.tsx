
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GlobalInventoryForecast = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [drillLevel, setDrillLevel] = useState<'global' | 'region' | 'warehouse'>('global');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const globalData = [
    {
      region: 'North America',
      regionName: 'North America',
      totalInventory: 1250000,
      forecastedDemand: 1100000,
      variance: 13.6,
      status: 'Overstock',
      warehouses: [
        {
          name: 'Warehouse NYC',
          currentStock: 450000,
          forecastedDemand: 400000,
          recommendedStock: 420000,
          status: 'Optimal',
          variance: 12.5,
          type: 'Distribution Center'
        },
        {
          name: 'Warehouse LA',
          currentStock: 380000,
          forecastedDemand: 350000,
          recommendedStock: 365000,
          status: 'Overstock',
          variance: 8.6,
          type: 'Regional Hub'
        },
        {
          name: 'Warehouse Chicago',
          currentStock: 420000,
          forecastedDemand: 350000,
          recommendedStock: 365000,
          status: 'Overstock',
          variance: 20.0,
          type: 'Distribution Center'
        }
      ]
    },
    {
      region: 'Europe',
      regionName: 'Europe',
      totalInventory: 980000,
      forecastedDemand: 950000,
      variance: 3.2,
      status: 'Optimal',
      warehouses: [
        {
          name: 'Warehouse London',
          currentStock: 320000,
          forecastedDemand: 310000,
          recommendedStock: 315000,
          status: 'Optimal',
          variance: 3.2,
          type: 'Regional Hub'
        },
        {
          name: 'Warehouse Berlin',
          currentStock: 280000,
          forecastedDemand: 270000,
          recommendedStock: 275000,
          status: 'Optimal',
          variance: 3.7,
          type: 'Distribution Center'
        },
        {
          name: 'Warehouse Paris',
          currentStock: 380000,
          forecastedDemand: 370000,
          recommendedStock: 375000,
          status: 'Optimal',
          variance: 2.7,
          type: 'Regional Hub'
        }
      ]
    },
    {
      region: 'Asia Pacific',
      regionName: 'Asia Pacific',
      totalInventory: 750000,
      forecastedDemand: 800000,
      variance: -6.3,
      status: 'Understock',
      warehouses: [
        {
          name: 'Warehouse Tokyo',
          currentStock: 280000,
          forecastedDemand: 320000,
          recommendedStock: 310000,
          status: 'Understock',
          variance: -12.5,
          type: 'Regional Hub'
        },
        {
          name: 'Warehouse Sydney',
          currentStock: 220000,
          forecastedDemand: 240000,
          recommendedStock: 235000,
          status: 'Understock',
          variance: -8.3,
          type: 'Distribution Center'
        },
        {
          name: 'Warehouse Singapore',
          currentStock: 250000,
          forecastedDemand: 240000,
          recommendedStock: 245000,
          status: 'Optimal',
          variance: 4.2,
          type: 'Regional Hub'
        }
      ]
    }
  ];

  const categories = ['all', 'Distribution Center', 'Regional Hub'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'text-green-600';
      case 'Overstock': return 'text-yellow-600';
      case 'Understock': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) > 10) return 'text-red-600';
    if (Math.abs(variance) > 5) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleDrillDown = (regionName: string) => {
    setSelectedRegion(regionName);
    setDrillLevel(drillLevel === 'global' ? 'region' : 'warehouse');
  };

  const handleDrillUp = () => {
    if (drillLevel === 'warehouse') {
      setDrillLevel('region');
    } else {
      setSelectedRegion(null);
      setDrillLevel('global');
    }
  };

  const filteredGlobalData = globalData.filter(region => 
    selectedCategory === 'all' || 
    region.warehouses.some(warehouse => warehouse.type === selectedCategory)
  );

  const selectedRegionData = globalData.find(r => r.regionName === selectedRegion);
  const filteredWarehouses = selectedRegionData?.warehouses.filter(warehouse =>
    selectedCategory === 'all' || warehouse.type === selectedCategory
  ) || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Global Inventory Forecast</CardTitle>
          <CardDescription>Regional inventory analysis with drill-down capabilities</CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedRegion && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Back to {drillLevel === 'warehouse' ? 'Region' : 'Global'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {drillLevel === 'global' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Total Inventory</TableHead>
                  <TableHead>Forecasted Demand</TableHead>
                  <TableHead>Variance (%)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGlobalData.map((region, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{region.regionName}</TableCell>
                    <TableCell>{region.totalInventory.toLocaleString()}</TableCell>
                    <TableCell>{region.forecastedDemand.toLocaleString()}</TableCell>
                    <TableCell className={getVarianceColor(region.variance)}>
                      {region.variance > 0 ? '+' : ''}{region.variance.toFixed(1)}%
                    </TableCell>
                    <TableCell className={getStatusColor(region.status)}>{region.status}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDrillDown(region.regionName)} variant="outline" size="sm">
                        Drill Down →
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{selectedRegion} - Warehouse Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Forecasted Demand</TableHead>
                    <TableHead>Recommended Stock</TableHead>
                    <TableHead>Variance (%)</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWarehouses.map((warehouse, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{warehouse.name}</TableCell>
                      <TableCell>{warehouse.currentStock.toLocaleString()}</TableCell>
                      <TableCell>{warehouse.forecastedDemand.toLocaleString()}</TableCell>
                      <TableCell>{warehouse.recommendedStock.toLocaleString()}</TableCell>
                      <TableCell className={getVarianceColor(warehouse.variance)}>
                        {warehouse.variance > 0 ? '+' : ''}{warehouse.variance.toFixed(1)}%
                      </TableCell>
                      <TableCell>{warehouse.type}</TableCell>
                      <TableCell className={getStatusColor(warehouse.status)}>{warehouse.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalInventoryForecast;
