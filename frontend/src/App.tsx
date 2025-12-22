import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingNav from "@/components/FloatingNav";
import ScrollContactCard from "@/components/ScrollContactCard";
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
import Contact from "@/pages/Contact";
import SocialReviews from "@/pages/SocialReviews";
import Gallery from "@/pages/Gallery";
import GalleryDetail from "@/pages/GalleryDetail";
import ProductDetail from "@/pages/ProductDetail";
import Support from "@/pages/Support";
// Import individual product pages
import RollerBlinds from "@/pages/products/RollerBlinds";
import VerticalBlinds from "@/pages/products/VerticalBlinds";
import VisionBlinds from "@/pages/products/VisionBlinds";
import AllusionBlinds from "@/pages/products/AllusionBlinds";
import CellularPleatedBlinds from "@/pages/products/CellularPleatedBlinds";
import PanelBlinds from "@/pages/products/PanelBlinds";
import PerfectFitBlinds from "@/pages/products/PerfectFitBlinds";
import ConservatoryBlinds from "@/pages/products/ConservatoryBlinds";
import MotorisedBlinds from "@/pages/products/MotorisedBlinds";
import VenetianBlinds from "@/pages/products/VenetianBlinds";
import UrbanShuttersLouvolite from "@/pages/products/UrbanShuttersLouvolite";
import PrecisionRollerBlindLouvolite from "@/pages/products/PrecisionRollerBlindLouvolite";
import RomaShadeLouvolite from "@/pages/products/RomaShadeLouvolite";
import PerfectFitShuttersLite from "@/pages/products/PerfectFitShuttersLite";
import ReadyMadeCurtains from "@/pages/products/ReadyMadeCurtains";
import MadeToMeasureCurtains from "@/pages/products/MadeToMeasureCurtains";
import SheerCurtains from "@/pages/products/SheerCurtains";
import BlackoutCurtains from "@/pages/products/BlackoutCurtains";
import MotorizedCurtains from "@/pages/products/MotorizedCurtains";
import RomanCurtains from "@/pages/products/RomanCurtains";
import PencilPleatCurtains from "@/pages/products/PencilPleatCurtains";
import WaveCurtains from "@/pages/products/WaveCurtains";
import EyeletCurtains from "@/pages/products/EyeletCurtains";
import PinchPleatCurtains from "@/pages/products/PinchPleatCurtains";
import Pelmets from "@/pages/products/Pelmets";
import CurtainTracksAndPoles from "@/pages/products/CurtainTracksAndPoles";
import Cushions from "@/pages/products/Cushions";
import MetalVenetianBlind from "@/pages/products/MetalVenetianBlind";
import SheerRollerBlinds from "@/pages/products/SheerRollerBlinds";
import PleatedBlinds from "@/pages/products/PleatedBlinds";
import WoodVenetianBlinds from "@/pages/products/WoodVenetianBlinds";
import VisageBlind from "@/pages/products/VisageBlind";
import FireRetardantCurtains from "@/pages/products/FireRetardantCurtains";
import VerticalBlindsCommercial from "@/pages/products/VerticalBlindsCommercial";
import SecurityGrilles from "@/pages/products/SecurityGrilles";
import CommercialMetal from "@/pages/products/CommercialMetal";
import Kitchen from "@/pages/rooms/Kitchen";
import Bathroom from "@/pages/rooms/Bathroom";
import Bedroom from "@/pages/rooms/Bedroom";
import LivingRoom from "@/pages/rooms/LivingRoom";
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
    } else if (path === 'gallery') {
      setActiveNav('gallery');
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
    { id: 'gallery', label: 'Gallery', icon: Images, onClick: () => setLocation('/gallery') },
    { id: 'products', label: 'Products', icon: Package, onClick: () => setLocation('/products') },
    { id: 'social', label: 'Social', icon: Share2, onClick: () => setLocation('/social') },
    { id: 'support', label: 'Support', icon: HelpCircle, onClick: () => setLocation('/support') },
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
                <Route path="/gallery/:categoryId" component={GalleryDetail} />
                <Route path="/gallery" component={Gallery} />
                <Route path="/products/roller-blinds" component={RollerBlinds} />
                <Route path="/products/vertical-blinds" component={VerticalBlinds} />
                <Route path="/products/vision-blinds" component={VisionBlinds} />
                <Route path="/products/allusion-blinds" component={AllusionBlinds} />
                <Route path="/products/cellular-pleated-blinds" component={CellularPleatedBlinds} />
                <Route path="/products/panel-blinds" component={PanelBlinds} />
                <Route path="/products/perfect-fit-blinds" component={PerfectFitBlinds} />
                <Route path="/products/conservatory-blinds" component={ConservatoryBlinds} />
                <Route path="/products/motorised-blinds" component={MotorisedBlinds} />
                <Route path="/products/venetian-blinds" component={VenetianBlinds} />
                <Route path="/products/urban-shutters-louvolite" component={UrbanShuttersLouvolite} />
                <Route path="/products/precision-roller-blind-louvolite" component={PrecisionRollerBlindLouvolite} />
                <Route path="/products/romashade-louvolite" component={RomaShadeLouvolite} />
                <Route path="/products/perfect-fit-shutters-lite" component={PerfectFitShuttersLite} />
                <Route path="/products/ready-made-curtains" component={ReadyMadeCurtains} />
                <Route path="/products/made-to-measure-curtains" component={MadeToMeasureCurtains} />
                <Route path="/products/sheer-curtains" component={SheerCurtains} />
                <Route path="/products/blackout-curtains" component={BlackoutCurtains} />
                <Route path="/products/motorized-curtains" component={MotorizedCurtains} />
                <Route path="/products/roman-curtains" component={RomanCurtains} />
                <Route path="/products/pencil-pleat-curtains" component={PencilPleatCurtains} />
                <Route path="/products/wave-curtains" component={WaveCurtains} />
                <Route path="/products/eyelet-curtains" component={EyeletCurtains} />
                <Route path="/products/pinch-pleat-curtains" component={PinchPleatCurtains} />
                <Route path="/products/pelmets" component={Pelmets} />
                <Route path="/products/curtain-tracks-and-poles" component={CurtainTracksAndPoles} />
                <Route path="/products/cushions" component={Cushions} />
                <Route path="/products/metal-venetian-blind" component={MetalVenetianBlind} />
                <Route path="/products/sheer-roller-blinds" component={SheerRollerBlinds} />
                <Route path="/products/pleated-blinds" component={PleatedBlinds} />
                <Route path="/products/wood-venetian-blinds" component={WoodVenetianBlinds} />
                <Route path="/products/visage-blind" component={VisageBlind} />
                <Route path="/products/fire-retardant-curtains" component={FireRetardantCurtains} />
                <Route path="/products/vertical-blinds-commercial" component={VerticalBlindsCommercial} />
                <Route path="/products/security-grilles" component={SecurityGrilles} />
                <Route path="/products/commercial-metal" component={CommercialMetal} />
                <Route path="/products/:productId" component={ProductDetail} />
                <Route path="/products" component={Products} />
                <Route path="/rooms/kitchen" component={Kitchen} />
                <Route path="/rooms/bathroom" component={Bathroom} />
                <Route path="/rooms/bedroom" component={Bedroom} />
                <Route path="/rooms/living-room" component={LivingRoom} />
                <Route path="/brochures" component={Brochures} />
                <Route path="/social" component={SocialReviews} />
                <Route path="/support" component={Support} />
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
      {!isAdminRoute && <ScrollContactCard />}
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
