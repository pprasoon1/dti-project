import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const Visualization = () => {
  const location = useLocation();
  const { formData, geminiResponse } = location.state || {};

  // Dummy data for visualizations
  const nutrientData = [
    { name: 'Nitrogen (N)', value: 46 },
    { name: 'Phosphorus (P)', value: 28 },
    { name: 'Potassium (K)', value: 15 },
    { name: 'Organic Matter', value: 8 },
  ];

  const monthlyYieldData = [
    { month: 'Jan', yield: 120 },
    { month: 'Feb', yield: 150 },
    { month: 'Mar', yield: 180 },
    { month: 'Apr', yield: 220 },
    { month: 'May', yield: 250 },
    { month: 'Jun', yield: 280 },
  ];

  const cropDistributionData = [
    { name: 'Wheat', value: 35 },
    { name: 'Rice', value: 25 },
    { name: 'Maize', value: 20 },
    { name: 'Pulses', value: 20 },
  ];

  const soilHealthData = [
    { subject: 'pH Level', A: 7.5, fullMark: 14 },
    { subject: 'Moisture', A: 65, fullMark: 100 },
    { subject: 'Nitrogen', A: 80, fullMark: 100 },
    { subject: 'Phosphorus', A: 60, fullMark: 100 },
    { subject: 'Potassium', A: 70, fullMark: 100 },
    { subject: 'Organic Matter', A: 55, fullMark: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Data Visualization</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nutrient Distribution Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Soil Nutrient Distribution</CardTitle>
              <CardDescription>NPK values comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nutrientData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Yield Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Yield Trends</CardTitle>
              <CardDescription>Expected crop yield over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyYieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="yield" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Crop Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Crop Distribution</CardTitle>
              <CardDescription>Based on soil analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cropDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cropDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Soil Health Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Parameters</CardTitle>
              <CardDescription>Comprehensive soil quality analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={soilHealthData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Soil Parameters"
                      dataKey="A"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Visualization;