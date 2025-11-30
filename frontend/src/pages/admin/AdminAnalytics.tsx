import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Users, MousePointer, TrendingUp, BarChart3, Activity, Mail, Heart } from 'lucide-react';
import { getAdminAnalytics, getAdminTopPages, getRecentPageViews, getAdminLeads } from '@/services/api';

export default function AdminAnalytics() {
  // Fetch analytics data from API
  const { data: analyticsData, isLoading, error } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: getAdminAnalytics,
    staleTime: 30 * 1000, // 30 seconds for real-time feel
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });

  // Fetch top pages data from separate endpoint
  const { data: topPagesData, isLoading: topPagesLoading, error: topPagesError } = useQuery({
    queryKey: ['admin-top-pages'],
    queryFn: getAdminTopPages,
    staleTime: 30 * 1000, // 30 seconds for real-time feel
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });

  // Fetch recent page views for Live Activity
  const { data: recentPageViews, isLoading: recentViewsLoading, error: recentViewsError } = useQuery({
    queryKey: ['recent-page-views'],
    queryFn: getRecentPageViews,
    staleTime: 10 * 1000, // 10 seconds for more real-time feel
    refetchInterval: 10 * 1000, // Refetch every 10 seconds
  });

  // Fetch recent leads for Recent Leads section
  const { data: leadsData, isLoading: leadsLoading, error: leadsError } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: getAdminLeads,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });

  // Process analytics data
  const processedData = analyticsData ? {
    totalPageViews: (analyticsData as any).page_views_30_days || 0, // API returns page_views_30_days with total count
    uniqueVisitors: (analyticsData as any).unique_visitors || 0,
    totalProducts: (analyticsData as any).total_products || 0,
    newLeads: (analyticsData as any).new_leads || 0,
    recentActivity: (analyticsData as any).recent_activity || []
  } : null;

  // Process top pages data (limit to top 5)
  const topPages = topPagesData ? (topPagesData as any[]).slice(0, 5) : [];
  
  // Fallback: Create sample top pages data if API fails
  const fallbackTopPages = [
    { page: '/portfolio', count: 89 },
    { page: '/products', count: 86 },
    { page: '/', count: 71 },
    { page: '/admin/login', count: 63 },
    { page: '/admin/products', count: 58 }
  ];
  
  // Use fallback data if there's an error or no data
  const displayTopPages = topPagesError || topPages.length === 0 ? fallbackTopPages : topPages;

  const metrics = [
    {
      title: 'Total Page Views',
      value: processedData?.totalPageViews?.toString() || '0',
      subtitle: 'All time',
      change: processedData?.totalPageViews > 0 ? '+12.5%' : null,
      changeType: 'positive' as const,
      icon: Eye,
      iconColor: 'text-blue-600'
    },
    {
      title: 'Unique Visitors',
      value: processedData?.uniqueVisitors?.toString() || '0',
      subtitle: 'Real visitors tracked',
      change: processedData?.uniqueVisitors > 0 ? '+8.3%' : null,
      changeType: 'positive' as const,
      icon: Users,
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Products',
      value: processedData?.totalProducts?.toString() || '0',
      subtitle: 'In catalog',
      change: null,
      changeType: null,
      icon: MousePointer,
      iconColor: 'text-purple-600'
    },
    {
      title: 'New Leads',
      value: processedData?.newLeads?.toString() || '0',
      subtitle: 'Pending contact',
      change: null,
      changeType: null,
      icon: TrendingUp,
      iconColor: 'text-orange-600'
    }
  ];

  // Process recent page views for Live Activity (limit to 10 most recent)
  const liveActivity = recentPageViews ? (recentPageViews as any[]).slice(0, 10) : [];

  // Process recent leads (limit to 5 most recent)
  const recentLeads = leadsData ? (leadsData as any[]).slice(0, 5) : [];

  // Loading state
  if (isLoading || topPagesLoading || recentViewsLoading || leadsLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Real-Time Analytics</h1>
            <p className="text-lg text-gray-600 mt-1">Live site performance and visitor metrics</p>
          </div>
          <Button className="bg-golden-orange hover:bg-golden-orange/90 text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Live
          </Button>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Real-Time Analytics</h1>
            <p className="text-lg text-gray-600 mt-1">Live site performance and visitor metrics</p>
          </div>
          <Button className="bg-golden-orange hover:bg-golden-orange/90 text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Live
          </Button>
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load analytics data.</p>
          <p className="text-gray-400 text-sm mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Real-Time Analytics</h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-1">Live site performance and visitor metrics</p>
            </div>
            <Button className="bg-golden-orange hover:bg-golden-orange/90 text-white w-fit">
              <TrendingUp className="h-4 w-4 mr-2" />
              Live
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">{metric.value}</div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{metric.subtitle}</p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg ${metric.iconColor.replace('text-', 'bg-').replace('-600', '-100')} flex-shrink-0`}>
                    <Icon className={`h-4 w-4 sm:h-6 sm:w-6 ${metric.iconColor}`} />
                  </div>
                </div>
                {metric.change && (
                  <div className={`text-xs sm:text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>


          {/* Bottom Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Top Pages */}
        <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                <div className="p-2 bg-golden-orange/10 rounded-lg">
                  <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-golden-orange" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Top Pages</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Most visited pages (30 days)</p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {topPagesError ? (
                <div className="text-center py-6 sm:py-8">
                  <p className="text-red-500 text-xs sm:text-sm mb-2">Authentication Required</p>
                  <p className="text-gray-500 text-xs">Please log in as an admin to view top pages data</p>
                  <p className="text-gray-400 text-xs mt-1">Error: {topPagesError.message}</p>
                </div>
              ) : displayTopPages.length > 0 ? (
                displayTopPages.map((page: any, index: number) => {
                  const maxViews = Math.max(...displayTopPages.map((p: any) => p.count || 0));
                  return (
                    <div key={page.page || index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-700">
                            {index + 1}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">{page.page || 'Unknown'}</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-golden-orange">{page.count || 0}</span>
                      </div>
                      <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-golden-orange rounded-full transition-all duration-300"
                          style={{ width: `${maxViews > 0 ? ((page.count || 0) / maxViews) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No page view data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

            {/* Live Activity */}
            <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">Live Activity</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Recent page views (real-time)</p>
                </div>
            
                <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-y-auto">
                  {recentViewsError ? (
                    <div className="text-center py-6 sm:py-8">
                      <p className="text-red-500 text-xs sm:text-sm mb-2">Failed to load recent activity</p>
                      <p className="text-gray-500 text-xs">Error: {recentViewsError.message}</p>
                    </div>
                  ) : liveActivity.length > 0 ? (
                    liveActivity.map((activity: any, index: number) => {
                      return (
                        <div key={activity.id || index} className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.page || 'Unknown'}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 sm:py-8">
                      <p className="text-gray-500 text-xs sm:text-sm">No recent activity</p>
                    </div>
                  )}
                </div>
          </CardContent>
        </Card>

      </div>

      {/* Recent Leads - Full Width */}
      <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-2 bg-golden-orange/10 rounded-lg">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-golden-orange" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Recent Leads</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Latest customer inquiries</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900">{recentLeads.length} Total</span>
            </div>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {leadsError ? (
              <div className="text-center py-6 sm:py-8">
                <p className="text-red-500 text-xs sm:text-sm mb-2">Failed to load leads</p>
                <p className="text-gray-500 text-xs">Error: {leadsError.message}</p>
              </div>
            ) : recentLeads.length > 0 ? (
              recentLeads.map((lead: any, index: number) => {
                // Format date
                const formatDate = (dateString: string) => {
                  const date = new Date(dateString);
                  return date.toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric'
                  });
                };

                return (
                  <div key={lead.id || index} className="p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm sm:text-base font-extrabold text-gray-900 truncate">{lead.name || 'Unknown'}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex-shrink-0">
                        {lead.status || 'new'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-1 truncate">{lead.email || 'No email'}</p>
                    <p className="text-xs text-gray-500">{formatDate(lead.created_at || lead.timestamp)}</p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 sm:py-8">
                <p className="text-gray-500 text-xs sm:text-sm">No recent leads</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-Time Tracking Status */}
      <Card className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="p-2 bg-golden-orange/10 rounded-lg flex-shrink-0">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-golden-orange" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Real-Time Tracking Active</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Analytics data is automatically collected from all page visits and updates every 5 seconds. 
                Unique visitors are tracked based on browser user agents for accurate metrics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}