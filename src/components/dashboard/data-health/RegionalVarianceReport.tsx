
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RegionalVarianceReport = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [drillLevel, setDrillLevel] = useState<'region' | 'country'>('region');
  const [startDate, setStartDate] = useState<string>('2024-01-01');
  const [endDate, setEndDate] = useState<string>('2024-01-07');

  const regionData = [
    {
      region: 'North America',
      dateWiseData: [
        { date: '2024-01-01', current: 45000, previous: 42000, variance: 7.14 },
        { date: '2024-01-02', current: 44000, previous: 45000, variance: -2.22 },
        { date: '2024-01-03', current: 46000, previous: 44000, variance: 4.55 },
        { date: '2024-01-04', current: 41000, previous: 46000, variance: -10.87 },
        { date: '2024-01-05', current: 48000, previous: 41000, variance: 17.07 },
        { date: '2024-01-06', current: 43000, previous: 48000, variance: -10.42 },
        { date: '2024-01-07', current: 45000, previous: 43000, variance: 4.65 }
      ],
      countries: [
        {
          name: 'United States',
          dateWiseData: [
            { date: '2024-01-01', current: 35000, previous: 33000, variance: 6.06 },
            { date: '2024-01-02', current: 34000, previous: 35000, variance: -2.86 },
            { date: '2024-01-03', current: 36000, previous: 34000, variance: 5.88 },
            { date: '2024-01-04', current: 31000, previous: 36000, variance: -13.89 },
            { date: '2024-01-05', current: 38000, previous: 31000, variance: 22.58 },
            { date: '2024-01-06', current: 33000, previous: 38000, variance: -13.16 },
            { date: '2024-01-07', current: 35000, previous: 33000, variance: 6.06 }
          ]
        }
      ]
    },
    {
      region: 'Europe',
      dateWiseData: [
        { date: '2024-01-01', current: 38000, previous: 40000, variance: -5.00 },
        { date: '2024-01-02', current: 39000, previous: 38000, variance: 2.63 },
        { date: '2024-01-03', current: 37000, previous: 39000, variance: -5.13 },
        { date: '2024-01-04', current: 40000, previous: 37000, variance: 8.11 },
        { date: '2024-01-05', current: 36000, previous: 40000, variance: -10.00 },
        { date: '2024-01-06', current: 41000, previous: 36000, variance: 13.89 },
        { date: '2024-01-07', current: 38000, previous: 41000, variance: -7.32 }
      ],
      countries: [
        {
          name: 'Germany',
          dateWiseData: [
            { date: '2024-01-01', current: 18000, previous: 19000, variance: -5.26 },
            { date: '2024-01-02', current: 19000, previous: 18000, variance: 5.56 },
            { date: '2024-01-03', current: 17000, previous: 19000, variance: -10.53 },
            { date: '2024-01-04', current: 20000, previous: 17000, variance: 17.65 },
            { date: '2024-01-05', current: 16000, previous: 20000, variance: -20.00 },
            { date: '2024-01-06', current: 21000, previous: 16000, variance: 31.25 },
            { date: '2024-01-07', current: 18000, previous: 21000, variance: -14.29 }
          ]
        }
      ]
    }
  ];

  const getVarianceColor = (current: number, previous: number) => {
    const variance = ((current - previous) / previous) * 100;
    if (Math.abs(variance) >= 5) return 'bg-red-100 text-red-800';
    return '';
  };

  const getVarianceCellClass = (current: number, previous: number) => {
    const variance = ((current - previous) / previous) * 100;
    if (Math.abs(variance) >= 5) return 'bg-red-100';
    return '';
  };

  const handleDrillDown = (regionName: string) => {
    setSelectedRegion(regionName);
    setDrillLevel('country');
  };

  const handleDrillUp = () => {
    setSelectedRegion(null);
    setDrillLevel('region');
  };

  const getFilteredData = (data: any[]) => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return itemDate >= start && itemDate <= end;
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regional Daily Variance Analysis</CardTitle>
          <CardDescription>Date-wise comparison with configurable date range (Red: ≥5% variance from previous day)</CardDescription>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">From:</span>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">To:</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-40"
              />
            </div>
            {selectedRegion && (
              <Button onClick={handleDrillUp} variant="outline" size="sm">
                ← Back to Regions
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {drillLevel === 'region' ? (
            <div className="space-y-6">
              {regionData.map((region, regionIndex) => (
                <div key={regionIndex}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{region.region}</h3>
                    <Button onClick={() => handleDrillDown(region.region)} variant="outline" size="sm">
                      Drill Down →
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Current Value</TableHead>
                        <TableHead>Previous Value</TableHead>
                        <TableHead>Variance (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredData(region.dateWiseData).map((day, dayIndex) => (
                        <TableRow key={dayIndex}>
                          <TableCell className="font-medium">{day.date}</TableCell>
                          <TableCell className={getVarianceCellClass(day.current, day.previous)}>
                            {day.current.toLocaleString()}
                          </TableCell>
                          <TableCell>{day.previous.toLocaleString()}</TableCell>
                          <TableCell className={getVarianceColor(day.current, day.previous)}>
                            {day.variance > 0 ? '+' : ''}{day.variance.toFixed(2)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {regionData
                .find(r => r.region === selectedRegion)
                ?.countries.map((country, countryIndex) => (
                  <div key={countryIndex}>
                    <h3 className="text-lg font-semibold mb-4">{country.name}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Current Value</TableHead>
                          <TableHead>Previous Value</TableHead>
                          <TableHead>Variance (%)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredData(country.dateWiseData).map((day, dayIndex) => (
                          <TableRow key={dayIndex}>
                            <TableCell className="font-medium">{day.date}</TableCell>
                            <TableCell className={getVarianceCellClass(day.current, day.previous)}>
                              {day.current.toLocaleString()}
                            </TableCell>
                            <TableCell>{day.previous.toLocaleString()}</TableCell>
                            <TableCell className={getVarianceColor(day.current, day.previous)}>
                              {day.variance > 0 ? '+' : ''}{day.variance.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalVarianceReport;
