
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const RegionalVarianceReport = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [drillLevel, setDrillLevel] = useState<'region' | 'country' | 'city'>('region');

  const regionData = [
    {
      region: 'North America',
      currentDay: 45000,
      previousDay: 42000,
      variance: 7.14,
      countries: [
        { name: 'United States', currentDay: 35000, previousDay: 33000, variance: 6.06 },
        { name: 'Canada', currentDay: 10000, previousDay: 9000, variance: 11.11 }
      ]
    },
    {
      region: 'Europe',
      currentDay: 38000,
      previousDay: 40000,
      variance: -5.00,
      countries: [
        { name: 'Germany', currentDay: 18000, previousDay: 19000, variance: -5.26 },
        { name: 'France', currentDay: 12000, previousDay: 13000, variance: -7.69 },
        { name: 'UK', currentDay: 8000, previousDay: 8000, variance: 0.00 }
      ]
    },
    {
      region: 'Asia Pacific',
      currentDay: 32000,
      previousDay: 30000,
      variance: 6.67,
      countries: [
        { name: 'Japan', currentDay: 15000, previousDay: 14000, variance: 7.14 },
        { name: 'Australia', currentDay: 10000, previousDay: 9500, variance: 5.26 },
        { name: 'Singapore', currentDay: 7000, previousDay: 6500, variance: 7.69 }
      ]
    }
  ];

  const trendData = [
    { day: 'Mon', value: 42000 },
    { day: 'Tue', value: 44000 },
    { day: 'Wed', value: 43000 },
    { day: 'Thu', value: 45000 },
    { day: 'Fri', value: 46000 },
    { day: 'Sat', value: 44000 },
    { day: 'Sun', value: 45000 }
  ];

  const chartConfig = {
    value: {
      label: 'Daily Volume',
      color: '#3b82f6'
    }
  };

  const handleDrillDown = (regionName: string) => {
    setSelectedRegion(regionName);
    setDrillLevel('country');
  };

  const handleDrillUp = () => {
    setSelectedRegion(null);
    setDrillLevel('region');
  };

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'text-green-600';
    if (variance < -5) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regional Daily Variance Analysis</CardTitle>
          <CardDescription>Day-over-day comparison across regions with drill-down capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Current Level: </span>
              <span className="capitalize font-semibold">{drillLevel}</span>
              {selectedRegion && (
                <>
                  <span className="text-gray-400">›</span>
                  <span className="font-medium">{selectedRegion}</span>
                </>
              )}
            </div>
            {selectedRegion && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Drill Up
              </Button>
            )}
          </div>

          {drillLevel === 'region' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Current Day</TableHead>
                  <TableHead>Previous Day</TableHead>
                  <TableHead>Variance (%)</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regionData.map((region, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{region.region}</TableCell>
                    <TableCell>{region.currentDay.toLocaleString()}</TableCell>
                    <TableCell>{region.previousDay.toLocaleString()}</TableCell>
                    <TableCell className={getVarianceColor(region.variance)}>
                      {region.variance > 0 ? '+' : ''}{region.variance}%
                    </TableCell>
                    <TableCell>
                      <Button 
                        onClick={() => handleDrillDown(region.region)}
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
                  <TableHead>Country</TableHead>
                  <TableHead>Current Day</TableHead>
                  <TableHead>Previous Day</TableHead>
                  <TableHead>Variance (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regionData
                  .find(r => r.region === selectedRegion)
                  ?.countries.map((country, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{country.name}</TableCell>
                      <TableCell>{country.currentDay.toLocaleString()}</TableCell>
                      <TableCell>{country.previousDay.toLocaleString()}</TableCell>
                      <TableCell className={getVarianceColor(country.variance)}>
                        {country.variance > 0 ? '+' : ''}{country.variance}%
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>7-Day Trend Analysis</CardTitle>
          <CardDescription>Daily volume trends for variance analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-value)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-value)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalVarianceReport;
