
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const GlobalInventoryForecast = () => {
  const [selectedLevel, setSelectedLevel] = useState<'global' | 'region' | 'country'>('global');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const globalData = [
    {
      region: 'North America',
      currentStock: 45000,
      forecastedDemand: 42000,
      recommendedStock: 48000,
      status: 'Adequate',
      variance: 7.14,
      category: 'Electronics',
      countries: [
        {
          name: 'United States',
          currentStock: 35000,
          forecastedDemand: 33000,
          recommendedStock: 38000,
          status: 'Adequate',
          variance: 6.06,
          category: 'Electronics'
        },
        {
          name: 'Canada',
          currentStock: 10000,
          forecastedDemand: 9000,
          recommendedStock: 10000,
          status: 'Optimal',
          variance: 11.11,
          category: 'Electronics'
        }
      ]
    },
    {
      region: 'Europe',
      currentStock: 32000,
      forecastedDemand: 35000,
      recommendedStock: 38000,
      status: 'Low',
      variance: -8.57,
      category: 'Automotive',
      countries: [
        {
          name: 'Germany',
          currentStock: 18000,
          forecastedDemand: 20000,
          recommendedStock: 22000,
          status: 'Low',
          variance: -10.00,
          category: 'Automotive'
        },
        {
          name: 'France',
          currentStock: 14000,
          forecastedDemand: 15000,
          recommendedStock: 16000,
          status: 'Low',
          variance: -6.67,
          category: 'Automotive'
        }
      ]
    },
    {
      region: 'Asia Pacific',
      currentStock: 28000,
      forecastedDemand: 26000,
      recommendedStock: 29000,
      status: 'Optimal',
      variance: 7.69,
      category: 'Consumer Goods',
      countries: [
        {
          name: 'Japan',
          currentStock: 15000,
          forecastedDemand: 14000,
          recommendedStock: 16000,
          status: 'Optimal',
          variance: 7.14,
          category: 'Consumer Goods'
        },
        {
          name: 'Australia',
          currentStock: 13000,
          forecastedDemand: 12000,
          recommendedStock: 13000,
          status: 'Optimal',
          variance: 8.33,
          category: 'Consumer Goods'
        }
      ]
    }
  ];

  const metrics = ['all', 'current_stock', 'forecasted_demand', 'recommended_stock'];
  const categories = ['all', 'Electronics', 'Automotive', 'Consumer Goods'];

  const getStatusBadge = (status: string) => {
    const colors = {
      'Optimal': 'bg-green-100 text-green-800',
      'Adequate': 'bg-blue-100 text-blue-800',
      'Low': 'bg-yellow-100 text-yellow-800',
      'Critical': 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[status as keyof typeof colors] || ''}>{status}</Badge>;
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'text-green-600';
    if (variance < -5) return 'text-red-600';
    return 'text-yellow-600';
  };

  const handleDrillDown = (regionName: string) => {
    setSelectedRegion(regionName);
    setSelectedLevel('country');
  };

  const handleDrillUp = () => {
    if (selectedLevel === 'country') {
      setSelectedRegion(null);
      setSelectedLevel('region');
    } else if (selectedLevel === 'region') {
      setSelectedLevel('global');
    }
  };

  const filteredData = selectedCategory === 'all' 
    ? globalData 
    : globalData.filter(item => item.category === selectedCategory);

  const getCurrentData = () => {
    if (selectedLevel === 'global') {
      return filteredData.map(region => ({
        name: `${region.region} (${region.category})`,
        currentStock: region.currentStock,
        forecastedDemand: region.forecastedDemand,
        recommendedStock: region.recommendedStock,
        status: region.status,
        variance: region.variance,
        type: 'region',
        regionName: region.region
      }));
    } else if (selectedLevel === 'region') {
      return filteredData.map(region => ({
        name: region.region,
        currentStock: region.currentStock,
        forecastedDemand: region.forecastedDemand,
        recommendedStock: region.recommendedStock,
        status: region.status,
        variance: region.variance,
        type: 'region',
        regionName: region.region
      }));
    } else {
      const selectedRegionData = filteredData.find(r => r.region === selectedRegion);
      return selectedRegionData?.countries.map(country => ({
        name: country.name,
        currentStock: country.currentStock,
        forecastedDemand: country.forecastedDemand,
        recommendedStock: country.recommendedStock,
        status: country.status,
        variance: country.variance,
        type: 'country'
      })) || [];
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Global Inventory Forecast</CardTitle>
          <CardDescription>
            Inventory forecasting with drill-down capabilities
            {selectedLevel === 'country' && ` - ${selectedRegion}`}
          </CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Metrics</SelectItem>
                <SelectItem value="current_stock">Current Stock</SelectItem>
                <SelectItem value="forecasted_demand">Forecasted Demand</SelectItem>
                <SelectItem value="recommended_stock">Recommended Stock</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedLevel !== 'global' && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Drill Up
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{selectedLevel === 'country' ? 'Country' : 'Region'}</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Forecasted Demand</TableHead>
                <TableHead>Recommended Stock</TableHead>
                <TableHead>Variance (%)</TableHead>
                <TableHead>Status</TableHead>
                {selectedLevel !== 'country' && <TableHead>Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentData().map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.currentStock.toLocaleString()}</TableCell>
                  <TableCell>{item.forecastedDemand.toLocaleString()}</TableCell>
                  <TableCell>{item.recommendedStock.toLocaleString()}</TableCell>
                  <TableCell className={getVarianceColor(item.variance)}>
                    {item.variance > 0 ? '+' : ''}{item.variance.toFixed(2)}%
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  {selectedLevel !== 'country' && (
                    <TableCell>
                      <Button 
                        onClick={() => handleDrillDown(item.regionName)} 
                        variant="outline" 
                        size="sm"
                      >
                        Drill Down →
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {getCurrentData().reduce((sum, item) => sum + item.currentStock, 0).toLocaleString()}
              </div>
              <div className="text-sm text-blue-600">Total Current Stock</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {getCurrentData().reduce((sum, item) => sum + item.forecastedDemand, 0).toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Total Forecasted Demand</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {getCurrentData().reduce((sum, item) => sum + item.recommendedStock, 0).toLocaleString()}
              </div>
              <div className="text-sm text-yellow-600">Total Recommended Stock</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {getCurrentData().filter(item => item.status === 'Optimal').length}
              </div>
              <div className="text-sm text-purple-600">Optimal Regions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalInventoryForecast;
