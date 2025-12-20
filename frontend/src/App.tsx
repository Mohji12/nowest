import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingNav from "@/components/FloatingNav";
import { usePageViewTracking } from "@/hooks/usePageViewTracking";
import { Home as HomeIcon, Info, Grid3x3, Package, Phone, Share2, Images, HelpCircle } from 'lucide-react';
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
import Gallery from "@/pages/Gallery";
import GalleryDetail from "@/pages/GalleryDetail";
import ProductTypes from "@/pages/ProductTypes";
import ProductTypeDetail from "@/pages/ProductTypeDetail";
import Contact from "@/pages/Contact";
import SocialReviews from "@/pages/SocialReviews";
import Support from "@/pages/Support";
import NotFound from "@/pages/NotFound";
import APITest from "@/pages/APITest";
import PortfolioTest from "@/pages/PortfolioTest";
import Kitchen from "@/pages/Kitchen";
import Bathroom from "@/pages/Bathroom";
import Bedroom from "@/pages/Bedroom";
import LivingRoom from "@/pages/LivingRoom";
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
    const pathParts = location.split('/').filter(Boolean);
    const firstPath = pathParts[0] || '';
    
    // Handle root path
    if (location === '/' || firstPath === '' || firstPath === 'home') {
      setActiveNav('home');
    }
    // Handle sub-routes for about section
    else if (firstPath === 'our-services' || firstPath === 'why-choose-us' || firstPath === 'our-process') {
      setActiveNav(firstPath);
    } 
    // Handle gallery routes (both /gallery and /gallery/:categoryId)
    else if (firstPath === 'gallery') {
      setActiveNav('gallery');
    }
    // Handle products routes (both /products and /products/:productTypeId)
    else if (firstPath === 'products') {
      setActiveNav('products');
    }
    // Handle support route
    else if (firstPath === 'support') {
      setActiveNav('support');
    }
    // Handle all other routes
    else {
      setActiveNav(firstPath);
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
    { id: 'gallery', label: 'Gallery', icon: Images, onClick: () => setLocation('/gallery') },
    { id: 'products', label: 'Products', icon: Package, onClick: () => setLocation('/products') },
    { id: 'support', label: 'Support', icon: HelpCircle, onClick: () => setLocation('/support') },
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
                <Route path="/products" component={ProductTypes} />
                <Route path="/products/:productTypeId" component={ProductTypeDetail} />
                <Route path="/products-old" component={Products} />
                <Route path="/brochures" component={Brochures} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/gallery/:categoryId" component={GalleryDetail} />
                <Route path="/social" component={SocialReviews} />
                <Route path="/contact" component={Contact} />
                <Route path="/support" component={Support} />
                <Route path="/kitchen" component={Kitchen} />
                <Route path="/bathroom" component={Bathroom} />
                <Route path="/bedroom" component={Bedroom} />
                <Route path="/living-room" component={LivingRoom} />
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




