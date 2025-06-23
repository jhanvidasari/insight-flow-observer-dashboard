
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Data Observability Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Monitor your data ecosystem health, track performance metrics, and ensure data quality across your organization
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Domain Health</CardTitle>
              <CardDescription>
                Monitor forecast vs actual performance with comprehensive metric tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Forecast vs Actual Analysis</li>
                <li>• Metric Performance Tracking</li>
                <li>• Variance Analysis</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Data Health</CardTitle>
              <CardDescription>
                Comprehensive data quality monitoring with 6 specialized sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Data Reconciliation</li>
                <li>• Regional Variance Reports</li>
                <li>• Historical Trend Analysis</li>
                <li>• Global Inventory Forecasting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Pipeline Health</CardTitle>
              <CardDescription>
                Real-time monitoring of data pipeline performance and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pipeline Status Monitoring</li>
                <li>• Performance Metrics</li>
                <li>• Error Tracking</li>
                <li>• Success Rate Analysis</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={() => navigate('/dashboard')}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          Launch Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
