
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HierarchyNode {
  id: string;
  name: string;
  level: number;
  recordCount: number;
  reconciledCount: number;
  children?: HierarchyNode[];
}

const ReconciliationHierarchy = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const hierarchyData: HierarchyNode[] = [
    {
      id: 'root',
      name: 'Global Data',
      level: 0,
      recordCount: 1000000,
      reconciledCount: 995000,
      children: [
        {
          id: 'region-1',
          name: 'North America',
          level: 1,
          recordCount: 400000,
          reconciledCount: 398000,
          children: [
            {
              id: 'country-1',
              name: 'United States',
              level: 2,
              recordCount: 300000,
              reconciledCount: 299000
            },
            {
              id: 'country-2',
              name: 'Canada',
              level: 2,
              recordCount: 100000,
              reconciledCount: 99000
            }
          ]
        },
        {
          id: 'region-2',
          name: 'Europe',
          level: 1,
          recordCount: 350000,
          reconciledCount: 347000,
          children: [
            {
              id: 'country-3',
              name: 'Germany',
              level: 2,
              recordCount: 150000,
              reconciledCount: 149000
            },
            {
              id: 'country-4',
              name: 'France',
              level: 2,
              recordCount: 120000,
              reconciledCount: 119000
            }
          ]
        }
      ]
    }
  ];

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: HierarchyNode) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const reconciliationRate = ((node.reconciledCount / node.recordCount) * 100).toFixed(2);

    return (
      <div key={node.id} className="mb-2">
        <div 
          className={`flex items-center p-3 border rounded-lg hover:bg-gray-50 ${
            node.level === 0 ? 'bg-blue-50 border-blue-200' : 
            node.level === 1 ? 'bg-green-50 border-green-200 ml-4' : 'bg-gray-50 border-gray-200 ml-8'
          }`}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleNode(node.id)}
              className="mr-2 p-1 h-6 w-6"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">{node.name}</span>
              <div className="flex space-x-4 text-sm">
                <span>Records: {node.recordCount.toLocaleString()}</span>
                <span>Reconciled: {node.reconciledCount.toLocaleString()}</span>
                <span className={`font-medium ${parseFloat(reconciliationRate) >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {reconciliationRate}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="mt-2">
            {node.children!.map(child => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reconciliation Hierarchy Report</CardTitle>
        <CardDescription>Hierarchical view of data reconciliation across regions and countries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hierarchyData.map(node => renderNode(node))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReconciliationHierarchy;
