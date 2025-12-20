import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { createLead } from '@/services/api';

// Form schema matching the leads table
const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().transform((val) => val?.trim() || undefined).optional(),
  projectDetails: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectDetails: '',
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return createLead({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        message: data.projectDetails,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Message sent!',
        description: 'We\'ll get back to you as soon as possible.',
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message. Please try again.',
        type: 'error',
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    createLeadMutation.mutate(data);
  };

  // Background image path - using portfolio image from S3
  const contactImage = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp';

  return (
    <div>
      {/* Header section with background image - Full width */}
      <div className="relative text-center mb-8 sm:mb-12 md:mb-16 overflow-hidden w-full" style={{ minHeight: '350px' }}>
        {/* Background image */}
        <img
          src={contactImage}
          alt="Contact background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '350px', width: '100%' }}
          onError={(e) => {
            console.error('Contact image failed to load:', contactImage);
            e.currentTarget.src = '/assets/LOGO PNG.png';
            e.currentTarget.className = 'absolute inset-0 w-full h-full object-contain z-0 p-8';
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
        
        {/* Content overlay - Centered with max-width */}
        <div className="relative z-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto object-contain"
            />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 px-2 text-white drop-shadow-lg" data-testid="text-contact-title">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto px-4 drop-shadow-md">
            Ready to elevate your space with bespoke window treatments? 
            We'd love to hear about your project.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your.email@example.com"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          data-testid="input-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us about your project..."
                          rows={6}
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={createLeadMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  {createLeadMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="p-6 sm:p-8 bg-card border border-card-border rounded-md">
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm sm:text-base">Phone</p>
                    <p className="text-muted-foreground text-sm sm:text-base" data-testid="text-phone">
                      02035617431 / 07859897256
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm sm:text-base">Email</p>
                    <p className="text-muted-foreground text-sm sm:text-base" data-testid="text-email">nowest@mail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-sm sm:text-base">Address</p>
                    <p className="text-muted-foreground text-sm sm:text-base" data-testid="text-address">
                      Nowest Interior Ltd<br />
                      Kingsbury House<br />
                      468 Church Lane<br />
                      Kingsbury Green<br />
                      London NW9 8UA<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-primary/5 border border-primary/20 rounded-md">
              <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 sm:mb-3">Visit Us</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We welcome you to visit our showroom by appointment. Contact us via phone or email to schedule a consultation and explore our extensive collection of luxury curtains and blinds.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
