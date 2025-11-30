import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Grid3x3, 
  Users, 
  Eye
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '33',
      description: 'Active products',
      icon: Package
    },
    {
      title: 'Portfolio Items',
      value: '23',
      description: 'Showcase projects',
      icon: Grid3x3
    },
    {
      title: 'New Leads',
      value: '5',
      description: 'Awaiting contact',
      icon: Users
    },
    {
      title: 'Page Views (30d)',
      value: '527',
      description: 'Last 30 days',
      icon: Eye
    }
  ];


  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome to your admin portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
                  <Icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
          <p className="text-gray-600 mb-6">Use the sidebar to navigate to different sections of the admin portal.</p>
        </CardContent>
      </Card>
    </div>
  );
}
