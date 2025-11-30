import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, Instagram, Facebook, Twitter, Award, Users, CheckCircle, Heart, TrendingUp, Linkedin, ShieldCheck, ExternalLink } from 'lucide-react';

export default function SocialReviews() {
  const reviews = [
    {
      id: '1',
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Absolutely fantastic service! The team was professional, punctual, and the quality of work exceeded our expectations. Our new curtains look stunning.',
      date: '2024-01-15',
      source: 'Google',
    },
    {
      id: '2',
      name: 'Michael Chen',
      rating: 5,
      text: 'From consultation to installation, everything was seamless. The attention to detail and craftsmanship is outstanding. Highly recommended!',
      date: '2024-01-10',
      source: 'Trustpilot',
    },
    {
      id: '3',
      name: 'Emma Williams',
      rating: 5,
      text: 'The team transformed our living room with beautiful blinds. Great communication throughout the process and excellent value for money.',
      date: '2024-01-08',
      source: 'Facebook',
    },
    {
      id: '4',
      name: 'David Thompson',
      rating: 5,
      text: 'Professional installation and top-quality products. The blackout curtains have made such a difference to our bedroom. Thank you!',
      date: '2024-01-05',
      source: 'Google',
    },
    {
      id: '5',
      name: 'Lisa Brown',
      rating: 5,
      text: 'Excellent service from start to finish. The team was friendly, knowledgeable, and delivered exactly what we wanted. Will definitely use again.',
      date: '2024-01-02',
      source: 'Trustpilot',
    },
    {
      id: '6',
      name: 'James Wilson',
      rating: 5,
      text: 'Outstanding quality and service. The shutters look amazing and the installation was quick and clean. Very happy with the result.',
      date: '2023-12-28',
      source: 'Google',
    },
  ];

  const socialPosts = [
    {
      id: '1',
      platform: 'Instagram',
      content: 'Beautiful sheer curtains creating the perfect ambiance in this luxury living room ✨',
      image: '/api/placeholder/400/400',
      likes: 124,
      date: '2024-01-12',
    },
    {
      id: '2',
      platform: 'Facebook',
      content: 'Another successful commercial project completed! Modern office blinds installed with precision.',
      image: '/api/placeholder/400/400',
      likes: 89,
      date: '2024-01-10',
    },
    {
      id: '3',
      platform: 'Instagram',
      content: 'Roman blinds adding elegance to this beautiful bedroom design 🏠',
      image: '/api/placeholder/400/400',
      likes: 156,
      date: '2024-01-08',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Connect With Us Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-black">
              Connect With Us
            </h1>
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#B8860B' }}></div>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Follow our journey, explore our latest projects, and discover what our clients have to say about their experience with Nowest Interior Ltd.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                <Award className="w-8 h-8" style={{ color: '#B8860B' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#B8860B' }}>
                20+ Years
              </h3>
              <p className="text-gray-600">
                Industry Excellence
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                <Users className="w-8 h-8" style={{ color: '#B8860B' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#B8860B' }}>
                5,000+
              </h3>
              <p className="text-gray-600">
                Happy Clients
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                <CheckCircle className="w-8 h-8" style={{ color: '#B8860B' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#B8860B' }}>
                98%
              </h3>
              <p className="text-gray-600">
                Satisfaction Rate
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                <Heart className="w-8 h-8" style={{ color: '#B8860B' }} />
              </div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: '#B8860B' }}>
                10K+
              </h3>
              <p className="text-gray-600">
                Social Followers
              </p>
            </div>
          </div>
        </section>

        {/* Follow Our Work Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 mr-2" style={{ color: '#B8860B' }} />
              <p className="text-sm font-medium tracking-wider uppercase" style={{ color: '#B8860B' }}>
                SOCIAL PRESENCE
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-black">
              Follow Our Work
            </h2>
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#B8860B' }}></div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Stay updated with our latest projects, design inspiration, and behind-the-scenes content
            </p>
          </div>

          {/* Social Media Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <a 
              href="https://www.instagram.com/nowest_interior/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8860B' }}>
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Instagram
              </h3>
              <p className="text-2xl font-bold mb-2" style={{ color: '#B8860B' }}>
                2.5K
              </p>
              <p className="text-gray-600 text-sm">
                Daily Updates
              </p>
            </a>

            <a 
              href="https://www.facebook.com/nowest.fitters/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8860B' }}>
                <Facebook className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Facebook
              </h3>
              <p className="text-2xl font-bold mb-2" style={{ color: '#B8860B' }}>
                3.2K
              </p>
              <p className="text-gray-600 text-sm">
                Active Community
              </p>
            </a>

            <a 
              href="https://www.linkedin.com/in/nowest-interior-586366b5/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8860B' }}>
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                LinkedIn
              </h3>
              <p className="text-2xl font-bold mb-2" style={{ color: '#B8860B' }}>
                1.8K
              </p>
              <p className="text-gray-600 text-sm">
                Professional Network
              </p>
            </a>

            <a 
              href="https://x.com/nowestfitters" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8860B' }}>
                <Twitter className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Twitter
              </h3>
              <p className="text-2xl font-bold mb-2" style={{ color: '#B8860B' }}>
                1.5K
              </p>
              <p className="text-gray-600 text-sm">
                Latest News
              </p>
            </a>

            <a 
              href="https://www.pinterest.com/nowestinterior/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8860B' }}>
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.873-1.878.095-.4.57-2.4.57-2.4s-.146-.293-.146-.725c0-.678.393-1.185.881-1.185.415 0 .616.312.616.686 0 .415-.264 1.035-.4 1.61-.113.479.24.87.712.87.855 0 1.512-.902 1.512-1.204 0-.629-.48-1.07-1.165-1.07-.81 0-1.23.608-1.23 1.24 0 .45.17.755.17.755s-.58 2.45-.686 2.91c-.204.87-.15 1.08-.892 1.08-.67 0-1.19-.7-1.19-1.53 0-1.09.79-1.86 1.79-1.86.85 0 1.26.64 1.26 1.4 0 .85-.54 1.58-1.28 1.58-.25 0-.49-.13-.57-.29 0 0-.13.5-.16.62-.05.2-.16.4-.26.54z"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Pinterest
              </h3>
              <p className="text-2xl font-bold mb-2" style={{ color: '#B8860B' }}>
                4.1K
              </p>
              <p className="text-gray-600 text-sm">
                Design Inspiration
              </p>
            </a>
          </div>
        </section>

        {/* What Our Clients Say Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <p className="text-sm font-medium tracking-wider uppercase mb-4" style={{ color: '#B8860B' }}>
              CLIENT STORIES
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-black">
              What Our Clients Say
            </h2>
            <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#B8860B' }}></div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4" style={{ color: '#B8860B' }}>
                "
              </div>
              <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                Exceptional craftsmanship and attention to detail. The curtains transformed our home completely!
              </p>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ color: '#B8860B' }} fill="currentColor" />
                ))}
              </div>
              <div>
                <h4 className="font-bold text-lg text-black">Sarah M.</h4>
                <p className="text-gray-600">Homeowner, Hampstead</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4" style={{ color: '#B8860B' }}>
                "
              </div>
              <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                Professional service from start to finish. Highly recommend Nowest Interior for luxury window treatments.
              </p>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ color: '#B8860B' }} fill="currentColor" />
                ))}
              </div>
              <div>
                <h4 className="font-bold text-lg text-black">David L.</h4>
                <p className="text-gray-600">Property Developer</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4" style={{ color: '#B8860B' }}>
                "
              </div>
              <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                The team went above and beyond. Beautiful blinds that exceeded our expectations.
              </p>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-5 h-5" style={{ color: '#B8860B' }} fill="currentColor" />
                ))}
              </div>
              <div>
                <h4 className="font-bold text-lg text-black">Emma R.</h4>
                <p className="text-gray-600">Interior Designer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 mr-2" style={{ color: '#B8860B' }} />
              <p className="text-sm font-medium tracking-wider uppercase" style={{ color: '#B8860B' }}>
                VERIFIED REVIEWS
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-black">
              Customer Reviews
            </h2>
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: '#B8860B' }}></div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Read authentic reviews from our satisfied clients across multiple trusted platforms
            </p>
          </div>

          {/* Review Platform Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Google Reviews */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-2xl text-black">Google Reviews</h3>
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-yellow-800 font-bold">4.9</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">127 reviews</p>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">See what our customers say on Google</p>
              <a 
                href="https://www.google.com/search?q=nowest+interior+reviews" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium hover:underline"
                style={{ color: '#B8860B' }}
              >
                View All Reviews
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Yell */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-2xl text-black">Yell</h3>
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-yellow-800 font-bold">5.0</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">43 reviews</p>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 fill-current" 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">Read our verified Yell reviews</p>
              <a 
                href="https://www.yell.com/biz/nowest-interior-ltd-london-12345678/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium hover:underline"
                style={{ color: '#B8860B' }}
              >
                View All Reviews
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Houzz */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-2xl text-black">Houzz</h3>
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-yellow-800 font-bold">4.8</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">89 reviews</p>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">Explore our Houzz profile and reviews</p>
              <a 
                href="https://www.houzz.co.uk/professionals/interior-designers/nowest-interior-ltd-pfvwgb-pf~12345678" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium hover:underline"
                style={{ color: '#B8860B' }}
              >
                View All Reviews
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Trustpilot */}
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-2xl text-black">Trustpilot</h3>
                <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="text-yellow-800 font-bold">4.9</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">156 reviews</p>
              <div className="flex mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6">Check our Trustpilot ratings</p>
              <a 
                href="https://www.trustpilot.com/review/nowestinterior.co.uk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium hover:underline"
                style={{ color: '#B8860B' }}
              >
                View All Reviews
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </section>

        {/* Share Your Experience Section */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-12 text-center border border-orange-200">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-5 h-5 mr-2" style={{ color: '#B8860B' }} />
                <p className="text-sm font-medium tracking-wider uppercase" style={{ color: '#B8860B' }}>
                  SHARE YOUR EXPERIENCE
                </p>
                <Heart className="w-5 h-5 ml-2" style={{ color: '#B8860B' }} />
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-black">
                Had an Experience With Us?
              </h2>
              <div className="w-16 h-1 mx-auto mb-8" style={{ backgroundColor: '#B8860B' }}></div>
              
              <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
                We'd love to hear your feedback. Share your experience on any of the platforms above.
              </p>
              
              <p className="text-gray-600 text-base max-w-2xl mx-auto">
                Your reviews help us improve and assist others in making informed decisions about their luxury window treatment needs.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
