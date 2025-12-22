import { useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

interface RoomDetailLayoutProps {
  roomName: string;
  subheading: string;
  description: string[];
  images: string[]; // Array of 9 image URLs
}

const RoomDetailLayout: React.FC<RoomDetailLayoutProps> = ({
  roomName,
  subheading,
  description,
  images,
}) => {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setLocation('/')}
            className="flex items-center text-gray-600 hover:text-golden-orange mb-8 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {'<'} Back to Home
          </button>

          {/* Room Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-gray-500 text-sm sm:text-base mb-2 uppercase tracking-wide">
              {subheading}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-golden-orange mb-4 sm:mb-6">
              {roomName}
            </h1>
          </div>

          {/* Description */}
          <div className="mb-12 sm:mb-16 space-y-4 max-w-3xl mx-auto">
            {description.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Image Gallery - 9 images in a 3x3 grid */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 sm:mb-8 text-center">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {images.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={image}
                    alt={`${roomName} - Image ${index + 1}`}
                    className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('Gallery image failed to load:', image);
                      e.currentTarget.src = '/assets/LOGO PNG.png';
                      e.currentTarget.className = 'w-full h-64 sm:h-80 object-contain p-8 hover:scale-105 transition-transform duration-300';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailLayout;



