
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DomainHealth from '@/components/dashboard/DomainHealth';
import DataHealth from '@/components/dashboard/DataHealth';
import PipelineHealth from '@/components/dashboard/PipelineHealth';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Data Observability Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your data ecosystem health and performance</p>
        </div>

        <Tabs defaultValue="domain" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="domain">Domain Health</TabsTrigger>
            <TabsTrigger value="data">Data Health</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline Health</TabsTrigger>
          </TabsList>

          <TabsContent value="domain" className="mt-6">
            <DomainHealth />
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <DataHealth />
          </TabsContent>

          <TabsContent value="pipeline" className="mt-6">
            <PipelineHealth />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
