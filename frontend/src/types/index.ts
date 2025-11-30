// Common types
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// Product types
export interface Product extends BaseEntity {
  name: string;
  description: string;
  category: ProductCategory;
  price?: number;
  images: string[];
  features: string[];
  specifications?: Record<string, any>;
  is_active: boolean;
  sort_order: number;
}

export type ProductCategory = 'blinds' | 'curtains' | 'shutters' | 'commercial';

// Portfolio types
export interface PortfolioItem extends BaseEntity {
  title: string;
  description: string;
  category: PortfolioCategory;
  images: string[];
  location?: string;
  completion_date?: string;
  client_name?: string;
  is_featured: boolean;
  sort_order: number;
}

export type PortfolioCategory = 'residential' | 'commercial' | 'hospitality' | 'all';

// Brochure types
export interface Brochure extends BaseEntity {
  title: string;
  description: string;
  file_url: string;
  file_size: number;
  category: BrochureCategory;
  is_active: boolean;
  sort_order: number;
}

export type BrochureCategory = 'products' | 'services' | 'portfolio' | 'general';

// Lead types
export interface Lead extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  assigned_to?: string;
  notes?: string;
  follow_up_date?: string;
}

export type LeadSource = 'website' | 'phone' | 'email' | 'referral' | 'social' | 'other';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed_won' | 'closed_lost';
export type LeadPriority = 'low' | 'medium' | 'high' | 'urgent';

// SEO types
export interface SEOItem extends BaseEntity {
  page: string;
  title: string;
  description: string;
  keywords: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical_url?: string;
  meta_robots?: string;
  structured_data?: Record<string, any>;
}

// Analytics types
export interface AnalyticsData {
  page_views: number;
  unique_visitors: number;
  bounce_rate: number;
  avg_session_duration: number;
  top_pages: Array<{
    page: string;
    views: number;
  }>;
  traffic_sources: Array<{
    source: string;
    visitors: number;
  }>;
  device_types: Array<{
    device: string;
    percentage: number;
  }>;
  date_range: {
    start: string;
    end: string;
  };
}

// Admin types
export interface AdminUser extends BaseEntity {
  username: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
  last_login?: string;
}

export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
}

export interface LeadForm extends ContactForm {
  service_interest?: string;
  budget_range?: string;
  timeline?: string;
  property_type?: string;
}

// File upload types
export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  children?: NavItem[];
  onClick?: () => void;
}

// Theme types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    primary: string;
    heading: string;
  };
}

// Toast types
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Modal types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
}

// Table types
export interface TableColumn<T = any> {
  key: keyof T | string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((record: T) => string);
  onRow?: (record: T, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
  };
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Chart types
export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }>;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  created_at: string;
  action_url?: string;
}

// Settings types
export interface AppSettings {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  social_links: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  seo_settings: {
    default_title: string;
    default_description: string;
    default_keywords: string[];
  };
  analytics: {
    google_analytics_id?: string;
    facebook_pixel_id?: string;
  };
}
