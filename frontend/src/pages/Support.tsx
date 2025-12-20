import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Settings, BookOpen, Video, HelpCircle, ArrowRight } from 'lucide-react';

export default function Support() {
  const [, setLocation] = useLocation();

  // Support cards data
  const supportCards = [
    {
      id: 'motorised',
      title: 'Motorised Help',
      description: 'Here you will find helpful guides for any motorised issues.',
      icon: Settings,
      image: 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/hands_adjusting_eleg_fcd31de0.jpg',
      onClick: () => {
        // Navigate to motorised help section or page
        console.log('Motorised Help clicked');
      }
    },
    {
      id: 'fitting',
      title: 'Useful Fitting Guides',
      description: 'Explore our guides to find the right fitting instructions for you.',
      icon: BookOpen,
      image: 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/professional_install_712bd200.jpg',
      onClick: () => {
        // Navigate to fitting guides section or page
        console.log('Fitting Guides clicked');
      }
    },
    {
      id: 'videos',
      title: 'Help Videos',
      description: 'A range of helpful videos to help guide you with any problems.',
      icon: Video,
      image: 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/attached_assets/stock_images/motorized_smart_blin_1121900b.jpg',
      onClick: () => {
        // Navigate to help videos section or page
        console.log('Help Videos clicked');
      }
    }
  ];

  // Background image for support page
  const supportBackgroundImage = 'https://jgi-menteetrackers.s3.ap-south-1.amazonaws.com/Nowest_Image/Landscape_Petal_White_Liv-1024x731.jpg.webp';

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section className="relative text-center mb-8 sm:mb-12 md:mb-16 overflow-hidden w-full" style={{ minHeight: '400px' }}>
        {/* Background image */}
        <img
          src={supportBackgroundImage}
          alt="Support background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '400px', width: '100%' }}
          onError={(e) => {
            console.error('Support background image failed to load:', supportBackgroundImage);
            e.currentTarget.style.display = 'none';
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        
        {/* Content overlay */}
        <div className="relative z-20 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto object-contain"
            />
          </div>
          
          {/* Welcome to Technical Support */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg px-2">
            Welcome to
          </h1>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg px-2">
            Technical Support
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 drop-shadow-md px-2">
            Here to help you!
          </p>
        </div>
      </section>

      {/* Support Cards Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20">
            {supportCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={card.onClick}
                  className="group cursor-pointer bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  {/* Card Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        console.error(`Failed to load image for ${card.title}`);
                      }}
                    />
                    {/* Icon overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-gray-800" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Matter over Thread Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-gray-900 px-2">
            What is Matter over Thread?
          </h2>
          <Button
            onClick={() => {
              // Navigate to Matter over Thread information page
              console.log('Find out more about Matter over Thread');
            }}
            variant="outline"
            size="lg"
            className="group border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm sm:text-base"
          >
            <span>FIND OUT MORE</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* How can we assist you Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 pb-32 sm:pb-40 md:pb-48">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8 md:mb-12">
            <HelpCircle className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6 text-gray-400" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-gray-900 px-2">
              How can we assist you?
            </h2>
            <div className="w-20 sm:w-24 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          {/* Contact Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
            <Button
              onClick={() => setLocation('/contact')}
              variant="outline"
              size="lg"
              className="group h-auto py-6 px-8 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <div className="text-left w-full">
                <div className="font-bold text-lg mb-2">Contact Us</div>
                <div className="text-sm text-gray-600 group-hover:text-white/90">
                  Get in touch with our support team
                </div>
              </div>
              <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => {
                // Open live chat or support ticket
                console.log('Start live chat');
              }}
              variant="outline"
              size="lg"
              className="group h-auto py-6 px-8 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              <div className="text-left w-full">
                <div className="font-bold text-lg mb-2">Live Chat</div>
                <div className="text-sm text-gray-600 group-hover:text-white/90">
                  Chat with our support team in real-time
                </div>
              </div>
              <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

