
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataReconciliation from '@/components/dashboard/data-health/DataReconciliation';
import ReconciliationHierarchy from '@/components/dashboard/data-health/ReconciliationHierarchy';
import RegionalVarianceReport from '@/components/dashboard/data-health/RegionalVarianceReport';
import HistoricalTrend from '@/components/dashboard/data-health/HistoricalTrend';
import GlobalInventoryForecast from '@/components/dashboard/data-health/GlobalInventoryForecast';
import EgressMetricReconciliation from '@/components/dashboard/data-health/EgressMetricReconciliation';

const DataHealth = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Health Monitoring</CardTitle>
          <CardDescription>Comprehensive data quality and reconciliation dashboard</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="reconciliation" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="reconciliation">Data Reconciliation</TabsTrigger>
          <TabsTrigger value="hierarchy">Hierarchy Report</TabsTrigger>
          <TabsTrigger value="regional">Regional Variance</TabsTrigger>
          <TabsTrigger value="historical">Historical Trend</TabsTrigger>
          <TabsTrigger value="inventory">Global Inventory</TabsTrigger>
          <TabsTrigger value="egress">Egress 09 Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="reconciliation" className="mt-6">
          <DataReconciliation />
        </TabsContent>

        <TabsContent value="hierarchy" className="mt-6">
          <ReconciliationHierarchy />
        </TabsContent>

        <TabsContent value="regional" className="mt-6">
          <RegionalVarianceReport />
        </TabsContent>

        <TabsContent value="historical" className="mt-6">
          <HistoricalTrend />
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <GlobalInventoryForecast />
        </TabsContent>

        <TabsContent value="egress" className="mt-6">
          <EgressMetricReconciliation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataHealth;
