import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingNav from "@/components/FloatingNav";
import { usePageViewTracking } from "@/hooks/usePageViewTracking";
import { Home as HomeIcon, Info, Grid3x3, Package, Phone, Share2 } from 'lucide-react';
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import OurServices from "@/pages/OurServices";
import WhyChooseUs from "@/pages/WhyChooseUs";
import OurProcess from "@/pages/OurProcess";
import Portfolio from "@/pages/Portfolio";
import Products from "@/pages/Products";
import Brochures from "@/pages/Brochures";
import Contact from "@/pages/Contact";
import SocialReviews from "@/pages/SocialReviews";
import NotFound from "@/pages/NotFound";
import APITest from "@/pages/APITest";
import PortfolioTest from "@/pages/PortfolioTest";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminPortfolio from "@/pages/admin/AdminPortfolio";
import AdminBrochures from "@/pages/admin/AdminBrochures";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminSEO from "@/pages/admin/AdminSEO";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminLayout from "@/components/admin/AdminLayout";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function Router() {
  const [location, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState('home');

  // Track page views
  usePageViewTracking();

  useEffect(() => {
    const path = location.split('/')[1] || 'home';
    // Handle sub-routes for about section
    if (path === 'our-services' || path === 'why-choose-us' || path === 'our-process') {
      setActiveNav(path);
    } else {
      setActiveNav(path);
    }
    window.scrollTo(0, 0);
  }, [location]);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, onClick: () => setLocation('/') },
    { 
      id: 'about', 
      label: 'About', 
      icon: Info, 
      onClick: () => setLocation('/about'),
      subItems: [
        { id: 'about-main', label: 'About Us', onClick: () => setLocation('/about') },
        { id: 'our-services', label: 'Our Services', onClick: () => setLocation('/our-services') },
        { id: 'why-choose-us', label: 'Why Choose Us', onClick: () => setLocation('/why-choose-us') },
        { id: 'our-process', label: 'Our Process', onClick: () => setLocation('/our-process') },
      ]
    },
    { id: 'portfolio', label: 'Portfolio', icon: Grid3x3, onClick: () => setLocation('/portfolio') },
    { id: 'products', label: 'Products', icon: Package, onClick: () => setLocation('/products') },
    { id: 'social', label: 'Social', icon: Share2, onClick: () => setLocation('/social') },
    { id: 'contact', label: 'Contact', icon: Phone, onClick: () => setLocation('/contact') },
  ];

  const isAdminRoute = location.startsWith('/admin');

  return (
    <>
      <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/our-services" component={OurServices} />
                <Route path="/why-choose-us" component={WhyChooseUs} />
                <Route path="/our-process" component={OurProcess} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/products" component={Products} />
                <Route path="/brochures" component={Brochures} />
                <Route path="/social" component={SocialReviews} />
                <Route path="/contact" component={Contact} />
                <Route path="/api-test" component={APITest} />
                <Route path="/portfolio-test" component={PortfolioTest} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin">
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/admin/dashboard">
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/admin/products">
          <ProtectedRoute>
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/admin/portfolio">
          <ProtectedRoute>
            <AdminLayout>
              <AdminPortfolio />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/admin/brochures">
          <ProtectedRoute>
            <AdminLayout>
              <AdminBrochures />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/admin/leads">
          <ProtectedRoute>
            <AdminLayout>
              <AdminLeads />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/admin/seo">
          <ProtectedRoute>
            <AdminLayout>
              <AdminSEO />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route path="/admin/analytics">
          <ProtectedRoute>
            <AdminLayout>
              <AdminAnalytics />
            </AdminLayout>
          </ProtectedRoute>
        </Route>
        <Route component={NotFound} />
      </Switch>
      {!isAdminRoute && <FloatingNav activeItem={activeNav} items={navItems} />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
