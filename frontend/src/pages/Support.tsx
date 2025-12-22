import { useLocation } from 'wouter';
import { Phone, Mail, MessageCircle, Clock, HelpCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Support() {
  const [, setLocation] = useLocation();

  const supportOptions = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+44 (0) 1234 567890',
      action: 'Call Now',
      onClick: () => window.open('tel:+441234567890'),
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      contact: 'support@nowestinterior.com',
      action: 'Send Email',
      onClick: () => window.open('mailto:support@nowestinterior.com'),
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      contact: 'Available 9am - 5pm GMT',
      action: 'Start Chat',
      onClick: () => setLocation('/contact'),
    },
  ];

  const faqCategories = [
    {
      icon: HelpCircle,
      title: 'Product Information',
      items: [
        'What types of blinds do you offer?',
        'How do I measure my windows?',
        'What is the warranty period?',
        'Can I see samples before ordering?',
      ],
    },
    {
      icon: FileText,
      title: 'Order & Delivery',
      items: [
        'How long does delivery take?',
        'What is your returns policy?',
        'Do you offer installation services?',
        'What payment methods do you accept?',
      ],
    },
    {
      icon: Clock,
      title: 'Maintenance & Care',
      items: [
        'How do I clean my blinds?',
        'What maintenance is required?',
        'Do you offer repair services?',
        'How do I request a service call?',
      ],
    },
  ];

  // Background image path
  const supportImage = '/assets/stock_images/luxury_living_room_e_753bd7d5.jpg';

  return (
    <div>
      {/* Header section with background image - Full width */}
      <div className="relative text-center mb-12 sm:mb-16 overflow-hidden w-full" style={{ minHeight: '300px' }}>
        {/* Background image */}
        <img
          src={supportImage}
          alt="Support background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '300px', width: '100%' }}
          onError={(e) => {
            console.error('Support image failed to load:', supportImage);
            e.currentTarget.src = '/assets/LOGO PNG.png';
            e.currentTarget.className = 'absolute inset-0 w-full h-full object-contain z-0 p-8';
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
        
        {/* Content overlay - Centered with max-width */}
        <div className="relative z-20 py-12 sm:py-16 md:py-20 px-4 max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain"
            />
          </div>
          
          {/* SUPPORT - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
            SUPPORT
          </p>
          
          {/* Support - Large serif heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white px-2 drop-shadow-lg">
            Support
          </h1>
          
          {/* Golden line */}
          <div className="w-12 sm:w-16 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
          
          {/* Description */}
          <p className="text-white text-sm sm:text-base max-w-3xl mx-auto px-4 drop-shadow-md">
            We're here to help. Get in touch with our support team for assistance with your window treatment needs.
          </p>
        </div>
      </div>

      {/* Support Options Section */}
      <div className="py-16 sm:py-20 md:py-24 pb-24 sm:pb-28 md:pb-32 lg:pb-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 text-center">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base mb-4 text-center">
                    {option.description}
                  </p>
                  <p className="text-primary font-semibold mb-6 text-center">
                    {option.contact}
                  </p>
                  <Button
                    onClick={option.onClick}
                    className="w-full"
                    variant="outline"
                  >
                    {option.action}
                  </Button>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
                FREQUENTLY ASKED QUESTIONS
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                How Can We Help?
              </h2>
              <div className="w-12 sm:w-16 h-1 mx-auto mb-4" style={{ backgroundColor: '#B8860B' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {faqCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 sm:p-8"
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mr-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl font-bold">
                        {category.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-muted-foreground text-sm flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-8 sm:p-12 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is ready to assist you with any questions or concerns.
            </p>
            <Button
              size="lg"
              onClick={() => setLocation('/contact')}
              className="group"
            >
              <span>Contact Us</span>
              <div className="ml-2 w-0 group-hover:w-4 transition-all overflow-hidden">
                →
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

