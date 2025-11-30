import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Trash2, Phone, Mail, FileText, User, Calendar } from 'lucide-react';
import { getAdminLeads, updateAdminLeadStatus, deleteAdminLead } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export default function AdminLeads() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Fetch leads from API
  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['admin-leads'],
    queryFn: getAdminLeads,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Calculate lead statistics
  const leadStats = {
    new: leads.filter((lead: any) => lead.status === 'new').length,
    contacted: leads.filter((lead: any) => lead.status === 'contacted').length,
    converted: leads.filter((lead: any) => lead.status === 'converted').length,
    archived: leads.filter((lead: any) => lead.status === 'archived').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await updateAdminLeadStatus(leadId, newStatus);
      toast({
        title: 'Status Updated',
        description: 'Lead status has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update lead status. Please try again.',
        type: 'error',
      });
    }
  };

  const handleDeleteLead = async (leadId: string, leadName: string) => {
    if (window.confirm(`Are you sure you want to delete the lead "${leadName}"?`)) {
      try {
        await deleteAdminLead(leadId);
        toast({
          title: 'Lead Deleted',
          description: 'Lead has been successfully deleted.',
        });
        queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
        // Close modal if the deleted lead is currently open
        if (selectedLead && selectedLead.id === leadId) {
          setIsDetailsModalOpen(false);
          setSelectedLead(null);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete lead. Please try again.',
          type: 'error',
        });
      }
    }
  };

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setIsDetailsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedLead(null);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-lg text-gray-600">Manage customer inquiries and track lead status</p>
        </div>
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Leads Management</h1>
          <p className="text-lg text-gray-600">Manage customer inquiries and track lead status</p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg">
          <FileText className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{leads.length} Total Leads</span>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{leadStats.new}</div>
              <div className="text-sm text-gray-600">New</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{leadStats.contacted}</div>
              <div className="text-sm text-gray-600">Contacted</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{leadStats.converted}</div>
              <div className="text-sm text-gray-600">Converted</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200 rounded-lg">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{leadStats.archived}</div>
              <div className="text-sm text-gray-600">Archived</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      {error ? (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Failed to load leads.</p>
          <p className="text-gray-400 text-sm mt-2">Please try refreshing the page.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead: any) => (
            <Card key={lead.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {/* Lead Name and Status */}
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{lead.name}</h3>
                      <Badge className={`${getStatusColor(lead.status)} text-xs px-2 py-1`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        {formatTimeAgo(lead.created_at)}
                      </div>
                    </div>

                    {/* Project Details */}
                    {lead.project_details && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Project Details:</span> {lead.project_details}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {/* Status Dropdown */}
                    <Select value={lead.status} onValueChange={(value) => handleStatusChange(lead.id, value)}>
                      <SelectTrigger className="w-32 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewLead(lead)}
                      className="h-9 w-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLead(lead.id, lead.name)}
                      className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty State */}
          {leads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No leads found.</p>
              <p className="text-gray-400 text-sm mt-2">New leads will appear here when customers contact you.</p>
            </div>
          )}
        </div>
      )}

      {/* Lead Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Lead Details
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Complete information for this lead inquiry
            </DialogDescription>
          </DialogHeader>
          
          {selectedLead && (
            <div className="space-y-6 py-4">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Contact Person</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{selectedLead.name}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Email Address</span>
                    </div>
                    <button
                      onClick={() => handleEmailClick(selectedLead.email)}
                      className="text-golden-orange hover:text-golden-orange/80 font-medium transition-colors"
                    >
                      {selectedLead.email}
                    </button>
                  </div>

                  {selectedLead.phone && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Phone Number</span>
                      </div>
                      <button
                        onClick={() => handlePhoneClick(selectedLead.phone)}
                        className="text-golden-orange hover:text-golden-orange/80 font-medium transition-colors"
                      >
                        {selectedLead.phone}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Submitted</span>
                    </div>
                    <p className="text-sm text-gray-900">{formatDateTime(selectedLead.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              {selectedLead.project_details && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Project Details</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedLead.project_details}</p>
                  </div>
                </div>
              )}

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <Badge className={`${getStatusColor(selectedLead.status)} text-xs px-3 py-1`}>
                    {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                  </Badge>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    handleDeleteLead(selectedLead.id, selectedLead.name);
                    handleCloseModal();
                  }}
                  className="flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Lead</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
