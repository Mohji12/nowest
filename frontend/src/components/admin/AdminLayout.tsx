import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, Grid3x3, Users, Settings, FileText, LogOut, BookOpen } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, setLocation] = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { title: "Products", icon: Package, path: "/admin/products" },
    { title: "Portfolio", icon: Grid3x3, path: "/admin/portfolio" },
    { title: "Brochures", icon: BookOpen, path: "/admin/brochures" },
    { title: "Leads", icon: Users, path: "/admin/leads" },
    { title: "SEO", icon: FileText, path: "/admin/seo" },
    { title: "Analytics", icon: Settings, path: "/admin/analytics" },
  ];

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider 
      style={style as React.CSSProperties}
      defaultOpen={false}
    >
      <div className="flex h-screen w-full">
        <Sidebar 
          collapsible="offcanvas"
          className="border-r bg-white"
        >
          <SidebarHeader className="border-b p-3 sm:p-4 bg-white">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 flex items-center justify-center">
                <img 
                  src="/assets/LOGO PNG.png" 
                  alt="Nowest Interior Ltd" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-sm text-gray-900">Nowest Interior</p>
                <p className="text-xs text-gray-600">Admin Portal</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2 sm:p-4 bg-white">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.path)}
                    isActive={location === item.path}
                    data-testid={`nav-${item.title.toLowerCase()}`}
                    className={`w-full justify-start px-3 py-2 text-sm ${
                      location === item.path 
                        ? 'bg-golden-orange text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    <span className="truncate">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="border-t p-3 sm:p-4 mt-auto bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm hidden sm:block">
                <p className="font-medium text-gray-900">{user?.username || "Admin"}</p>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs sm:text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => {
                logout();
                setLocation("/admin/login");
              }}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">Logout</span>
            </Button>
          </div>
        </Sidebar>
        <div className="flex flex-col flex-1 min-w-0 bg-white">
          <header className="flex items-center justify-between p-3 sm:p-4 border-b bg-white">
            <div className="flex items-center gap-3">
              <SidebarTrigger 
                data-testid="button-sidebar-toggle"
                className="lg:hidden"
              />
              <div className="sm:hidden">
                <p className="font-bold text-sm text-gray-900">Nowest Interior</p>
                <p className="text-xs text-gray-600">Admin Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm sm:hidden">
                <p className="font-medium text-xs text-gray-900">{user?.username || "Admin"}</p>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-3 sm:p-6 bg-white">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
