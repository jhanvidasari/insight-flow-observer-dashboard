
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RegionalVarianceReport = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [drillLevel, setDrillLevel] = useState<'region' | 'country'>('region');
  const [selectedInterface, setSelectedInterface] = useState<string>('all');

  const regionData = [
    {
      region: 'North America',
      interface: 'API-001',
      dailyData: [
        { day: 'Monday', current: 45000, previous: 42000, variance: 7.14 },
        { day: 'Tuesday', current: 44000, previous: 46000, variance: -4.35 },
        { day: 'Wednesday', current: 46000, previous: 45000, variance: 2.22 },
        { day: 'Thursday', current: 47000, previous: 44000, variance: 6.82 },
        { day: 'Friday', current: 48000, previous: 50000, variance: -4.00 },
        { day: 'Saturday', current: 43000, previous: 42000, variance: 2.38 },
        { day: 'Sunday', current: 45000, previous: 47000, variance: -4.26 }
      ],
      countries: [
        {
          name: 'United States',
          dailyData: [
            { day: 'Monday', current: 35000, previous: 33000, variance: 6.06 },
            { day: 'Tuesday', current: 34000, previous: 36000, variance: -5.56 },
            { day: 'Wednesday', current: 36000, previous: 35000, variance: 2.86 },
            { day: 'Thursday', current: 37000, previous: 34000, variance: 8.82 },
            { day: 'Friday', current: 38000, previous: 40000, variance: -5.00 },
            { day: 'Saturday', current: 33000, previous: 32000, variance: 3.13 },
            { day: 'Sunday', current: 35000, previous: 37000, variance: -5.41 }
          ]
        },
        {
          name: 'Canada',
          dailyData: [
            { day: 'Monday', current: 10000, previous: 9000, variance: 11.11 },
            { day: 'Tuesday', current: 10000, previous: 10000, variance: 0.00 },
            { day: 'Wednesday', current: 10000, previous: 10000, variance: 0.00 },
            { day: 'Thursday', current: 10000, previous: 10000, variance: 0.00 },
            { day: 'Friday', current: 10000, previous: 10000, variance: 0.00 },
            { day: 'Saturday', current: 10000, previous: 10000, variance: 0.00 },
            { day: 'Sunday', current: 10000, previous: 10000, variance: 0.00 }
          ]
        }
      ]
    },
    {
      region: 'Europe',
      interface: 'API-002',
      dailyData: [
        { day: 'Monday', current: 38000, previous: 40000, variance: -5.00 },
        { day: 'Tuesday', current: 39000, previous: 41000, variance: -4.88 },
        { day: 'Wednesday', current: 37000, previous: 38000, variance: -2.63 },
        { day: 'Thursday', current: 40000, previous: 39000, variance: 2.56 },
        { day: 'Friday', current: 41000, previous: 42000, variance: -2.38 },
        { day: 'Saturday', current: 36000, previous: 37000, variance: -2.70 },
        { day: 'Sunday', current: 38000, previous: 40000, variance: -5.00 }
      ],
      countries: [
        {
          name: 'Germany',
          dailyData: [
            { day: 'Monday', current: 18000, previous: 19000, variance: -5.26 },
            { day: 'Tuesday', current: 19000, previous: 20000, variance: -5.00 },
            { day: 'Wednesday', current: 17000, previous: 18000, variance: -5.56 },
            { day: 'Thursday', current: 20000, previous: 19000, variance: 5.26 },
            { day: 'Friday', current: 21000, previous: 22000, variance: -4.55 },
            { day: 'Saturday', current: 16000, previous: 17000, variance: -5.88 },
            { day: 'Sunday', current: 18000, previous: 20000, variance: -10.00 }
          ]
        }
      ]
    }
  ];

  const interfaces = ['all', 'API-001', 'API-002', 'FTP-001'];

  const getVarianceColor = (variance: number) => {
    if (Math.abs(variance) < 5) return 'bg-red-100 text-red-800';
    if (variance > 0) return 'text-green-600';
    return 'text-yellow-600';
  };

  const getVarianceCellClass = (variance: number) => {
    if (Math.abs(variance) < 5) return 'bg-red-100';
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

  const filteredData = selectedInterface === 'all' 
    ? regionData 
    : regionData.filter(item => item.interface === selectedInterface);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regional Daily Variance Analysis</CardTitle>
          <CardDescription>Day-over-day comparison with variance highlighting (Red: &lt;5% variance)</CardDescription>
          <div className="flex flex-wrap gap-4">
            <Select value={selectedInterface} onValueChange={setSelectedInterface}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Interface" />
              </SelectTrigger>
              <SelectContent>
                {interfaces.map(interface => (
                  <SelectItem key={interface} value={interface}>
                    {interface === 'all' ? 'All Interfaces' : interface}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {filteredData.map((region, regionIndex) => (
                <div key={regionIndex}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{region.region} - {region.interface}</h3>
                    <Button onClick={() => handleDrillDown(region.region)} variant="outline" size="sm">
                      Drill Down →
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead>Current Day</TableHead>
                        <TableHead>Previous Day</TableHead>
                        <TableHead>Variance (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {region.dailyData.map((day, dayIndex) => (
                        <TableRow key={dayIndex}>
                          <TableCell className="font-medium">{day.day}</TableCell>
                          <TableCell>{day.current.toLocaleString()}</TableCell>
                          <TableCell>{day.previous.toLocaleString()}</TableCell>
                          <TableCell className={`${getVarianceCellClass(day.variance)} ${getVarianceColor(day.variance)}`}>
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
              {filteredData
                .find(r => r.region === selectedRegion)
                ?.countries.map((country, countryIndex) => (
                  <div key={countryIndex}>
                    <h3 className="text-lg font-semibold mb-4">{country.name}</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Day</TableHead>
                          <TableHead>Current Day</TableHead>
                          <TableHead>Previous Day</TableHead>
                          <TableHead>Variance (%)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {country.dailyData.map((day, dayIndex) => (
                          <TableRow key={dayIndex}>
                            <TableCell className="font-medium">{day.day}</TableCell>
                            <TableCell>{day.current.toLocaleString()}</TableCell>
                            <TableCell>{day.previous.toLocaleString()}</TableCell>
                            <TableCell className={`${getVarianceCellClass(day.variance)} ${getVarianceColor(day.variance)}`}>
                              {day.variance > 0 ? '+' : ''}{day.variance.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionalVarianceReport;
