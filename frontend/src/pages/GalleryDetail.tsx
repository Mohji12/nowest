import { useLocation, useRoute } from 'wouter';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Gallery categories with their folder names, descriptions, and image lists
const galleryCategories: Record<string, { name: string; folder: string; description: string; images: string[] }> = {
  allusion: {
    name: 'Allusion®',
    folder: 'allusion',
    description: 'A combination of sheer and opaque textured fabric for our most elegant blind yet. Allusion® blinds create a sophisticated look with alternating translucent and opaque stripes, providing the perfect balance of light control and privacy while maintaining an elegant aesthetic.',
    images: [
      'Allusion-Landscape-size-Horizon_Nordic_Dine.jpg.webp',
      'Allusion-Landscape-size-Natural_Pearl_Liv_Teal_Wall.jpg.webp',
      'Allusion-Landscape-size-Shadow_Sand_Liv_Blue_walls_Open.jpg.webp',
      'Allusion-Landscape-size-Shadow_Stone_Liv_Green_Walls_Open.jpg.webp',
      'Allusion-Portrait-size-Natural_Grey_Cameo_Fabric.jpg.webp',
      'Allusion-Portrait-size-Natural_Pearl_Liv.jpg.webp',
      'Allusion-Portrait-size-Natural_Wood_Hallway.jpg.webp'
    ]
  },
  cellur: {
    name: 'Cellular & Pleated',
    folder: 'cellur',
    description: 'A charming selection of colourways and patterns boasting year-round benefits. Our cellular and pleated blinds feature innovative honeycomb cell structures that provide excellent insulation, energy efficiency, and light control. Available in a wide range of colors and textures to complement any interior design.',
    images: [
      'Landscape-Cell_Celeste_LF_Anthracite-700x500-1.jpg.webp',
      'Landscape-Cell_Celeste_LF_Red_Rust-700x500-1.jpg.webp',
      'Landscape-Cell_Halo_Sea_Mist-700x500-1.jpg.webp',
      'Landscape-Cell_Luna_Cool_Blue-700x500-1.jpg.webp',
      'Landscape-Cell_Mirage_Mocha-700x500-1.jpg.webp',
      'Landscape-Cell_Raffia_Flax-700x500-1.jpg.webp',
      'Portait_Bugs-Life_BO_Kids_Mid3-1097x1536.jpg.webp',
      'Portrait-Cell_Luna_Sage_Room-700x500-1.jpg.webp',
      'Portrait-Cell-Astral_Blush-500x700-1.jpg.webp',
      'Portrait-Cell-Halo_Marine-500x700-1.jpg.webp',
      'Portrait-Plt_Festival_SR_Petrol_Blue-700x500-1.jpg.webp',
      'Portrait-Plt-Festival_SPC_Raven-500x700-1.jpg.webp',
      'Portrait-Plt-Festival_SR_Fern-500x700-1.jpg.webp',
      'Portrait-Plt-Monroe_Onyx-500x700-1.jpg.webp',
      'Portrait-Plt-Shot_Silk-500x700-1.jpg.webp',
      'Portrait-Plt-Voile_Moondust-500x700-1.jpg.webp'
    ]
  },
  collection: {
    name: 'Children\'s Collection',
    folder: 'collection',
    description: 'Inspire playtimes and ensure a restful night\'s sleep with our charming children\'s prints. Our children\'s collection features fun, colorful designs with blackout options to create the perfect environment for both play and sleep. Made with child-safe materials and easy-to-use mechanisms.',
    images: [
      'Landscape_Haven-Oatmeal_BO_Kids-1536x1097.jpg.webp',
      'Portait_Bugs-Life_BO_Kids_Mid3-1097x1536.jpg (1).webp',
      'Portait_Daisy-Linen_BO_Kids_Mid1-1097x1536.jpg.webp',
      'Portait_Daisy-Pink_BO_Kids-1097x1536.jpg.webp',
      'Portait_Haven-Blackout-Oatmeal_BO_Kids_Main-1097x1536.jpg.webp',
      'Portait_Kaleidoscope-Colour_BO_Kids_Main-1097x1536.jpg.webp',
      'Portait_Pop-Blackout-Saffron-Bedroom-1097x1536.jpg.webp'
    ]
  },
  perfect: {
    name: 'Perfect Fit®',
    folder: 'perfect',
    description: 'Choose innovative Perfect Fit® to complement your roller, vision, and pleated/cellular blinds. Perfect Fit® blinds are designed to fit seamlessly within your window frame without the need for drilling or screws. They provide a clean, modern look with easy installation and removal.',
    images: [
      'Landscape_Perfect_Fit_Next_Generation_Cellular_Halo_Marine_Liv-1536x1097.jpg.webp',
      'Landscape-PF.jpg.webp',
      'Landscape-PF3.jpg.webp',
      'PFNG-Image.jpg.webp',
      'Portrait_Kitchen_Perfect_Fit_NG_Roller_Bubbles_White.jpg.webp'
    ]
  },
  roller: {
    name: 'Roller',
    folder: 'roller',
    description: 'Simple and stylish in its design, featuring an exciting array of prints, plains, and textures. Roller blinds offer a clean, minimalist aesthetic with smooth operation and excellent light control. Available in a vast selection of fabrics, from sheer to blackout, to suit every room and style preference.',
    images: [
      'Landscape_Petal_White_Liv-1024x731.jpg.webp',
      'Landscape_Roller_Kaleidoscope-Colour_BO_Kids-1024x731.jpg.webp',
      'Landscape-size-Birdsong-Colour-Crush_Kit.jpg',
      'Landscape-size-Carnival-Ochre_Liv.jpg.webp',
      'Landscape-size-Como-Bella_BO.jpg.webp',
      'Landscape-size-Nordic_Duckegg_Kit.jpg.webp',
      'Roll-Portrait-size-Azalea-Pink_BO_Bath.jpg.webp',
      'Roll-Portrait-size-Carnival_Bubblegum_Liv.jpg.webp',
      'Roll-Portrait-size-Carnival-Blackout-Terracotta_Bath.jpg.webp',
      'Roll-Portrait-size-Cherry-Blossom-Misty-Blue_Dine.jpg.webp',
      'Roll-Portrait-size-Daisy-Khaki_BO_Dine.jpg.webp',
      'Roll-Portrait-size-Didsbury-Navy_BO_Dine.jpg.webp'
    ]
  },
  urban: {
    name: 'Urban Shutters',
    folder: 'urban',
    description: 'Transform your home with our classical selection of made-to-measure frames and door styles to suit any interior. Urban shutters provide timeless elegance, excellent light control, and enhanced privacy. Available in various materials and finishes, they add architectural interest and value to your home.',
    images: [
      'Landscape-FH-Cafe-Moda-Multi-L-Frame-Living-700x500-1.jpg.webp',
      'Landscape-FH-Moda-Multi-L-Frame-Bathroom-Cameo-700x500-1.jpg.webp',
      'Landscape-FH-Moda-Multi-L-Frame-Living-700x500-1.jpg.webp',
      'Portrait-Cafe-Moda-L-Frame-Cameo-500x700-1.jpg.webp',
      'Portrait-Classic-Tier-Living-500x700-1.jpg.webp',
      'Portrait-Contempo-Maxi-L-Frame-Bedroom-500x700-1.jpg.webp',
      'Portrait-FH-Moda-Multi-L-Frame-500x700-1.jpg.webp',
      'Portrait-FH-Moda-Multi-L-Frame-Bathroom-Split-500x700-1.jpg.webp'
    ]
  },
  vertical: {
    name: 'Vertical',
    folder: 'vertical',
    description: 'Elegant vertical blinds that offer superior light control and privacy for large windows and sliding doors. Our vertical blinds feature smooth-operating slats that can be tilted, drawn, or stacked to one side. Available in a wide range of fabrics, colors, and textures to complement any interior style.',
    images: [
      'Portrait-size-Dune_Linen_Liv.jpg.webp',
      'Portrait-size-Petal-White_Liv.jpg.webp',
      'Portrait-size-Savanna_Dim-Out_Grass_Dine.jpg.webp',
      'Portrait-size-Windsor_Dim-Out_Rust.jpg.webp',
      'Portrait-Vertical_Bamboo_pacific-700x500-1.jpg.webp',
      'Portrait-Vertical_Collina_Diamond_Dust-700x500-1.jpg.webp',
      'Vert-Landscape-size-Ex-Lite-Blue_Kit.jpg.webp',
      'Vert-Landscape-size-Matrix-Monochrome_BO_Liv.jpg.webp',
      'Vert-Landscape-size-Petal-Terracotta_Bed_Main.jpg.webp',
      'Vert-Landscape-size-Pop-Fern_Liv.jpg.webp'
    ]
  },
  vision: {
    name: 'Vision®',
    folder: 'vision',
    description: 'Our sleek and modern Vision® blinds elevate the style of your home, making an eye-catching impression both indoors and out. Designed with two fabric layers featuring alternating translucent and opaque stripes, they provide the perfect balance of light control and privacy. Vision® blinds allow you to adjust the amount of light entering your space while maintaining your view and privacy.',
    images: [
      '2023-Landscape_Arrezzo_Beige.jpg.webp',
      '2023-Landscape_Classica_Dove.jpg.webp',
      '2023-Landscape_Firenze_Walnut.jpg.webp',
      '2023-Landscape-Fiore_Mineral.jpg.webp',
      '2023-Portrait-Linoso-Blush.jpg.webp',
      '2023-Portrait-Vision_Cirro_Sage.jpg.webp',
      '2023-Portrait-Vision_Fiore_Ochre.jpg.webp',
      '2023-Portrait-Vision_Firenze_Natural.jpg.webp',
      '2023-Portrait-Vision_Floreale_Marine.jpg.webp',
      '2023-Portrait-Vision_Linoso_Navy.jpg.webp',
      '2023-Portrait-Vision_Modina_Storm.jpg.webp',
      '2023-Portrait-Vision_Rimini_Frost.jpg.webp'
    ]
  }
};

export default function GalleryDetail() {
  const [, params] = useRoute('/gallery/:categoryId');
  const [, setLocation] = useLocation();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const categoryId = params?.categoryId || '';

  const category = galleryCategories[categoryId];

  // If category doesn't exist, redirect to gallery
  useEffect(() => {
    if (!category && categoryId) {
      setLocation('/gallery');
    }
  }, [category, categoryId, setLocation]);

  if (!category) {
    return (
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <button
            onClick={() => setLocation('/gallery')}
            className="text-blue-600 hover:underline"
          >
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const imageBasePath = `/assets/brochures/NowestImages/${category.folder}`;

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? category.images.length - 1 : selectedImageIndex - 1
      );
    } else {
      setSelectedImageIndex(
        selectedImageIndex === category.images.length - 1 ? 0 : selectedImageIndex + 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex]);

  return (
    <div className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <img 
              src="/assets/LOGO PNG.png" 
              alt="Nowest Interior Ltd" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto object-contain"
            />
          </div>
          
          {/* Back Button */}
          <button
            onClick={() => setLocation('/gallery')}
            className="mb-6 text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center mx-auto"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>Back to Gallery</span>
          </button>
          
          {/* Category Name - Small uppercase text */}
          <p className="text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4" style={{ color: '#B8860B' }}>
            {category.name.toUpperCase()}
          </p>
          
          {/* Category Title - Large serif heading */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-black px-2">
            {category.name}
          </h1>
          
          {/* Golden line */}
          <div className="w-12 sm:w-16 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#B8860B' }}></div>
          
          {/* Image count */}
          <p className="text-gray-600 text-sm sm:text-base mb-8 sm:mb-12">
            {category.images.length} {category.images.length === 1 ? 'Image' : 'Images'}
          </p>
        </div>

        {/* Description Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="text-center px-4 sm:px-6">
            <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-light">
              {category.description}
            </p>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {category.images.map((image, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden relative bg-gray-100">
                <img
                  src={`${imageBasePath}/${image}`}
                  alt={`${category.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/LOGO PNG.png';
                    e.currentTarget.className = 'w-full h-full object-contain p-4 transition-all duration-700 group-hover:scale-110';
                    e.currentTarget.onerror = null;
                  }}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg 
                      className="w-12 h-12 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Buttons */}
          {category.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
          >
            <img
              src={`${imageBasePath}/${category.images[selectedImageIndex]}`}
              alt={`${category.name} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = '/assets/LOGO PNG.png';
                e.currentTarget.className = 'max-w-full max-h-full object-contain p-8';
                e.currentTarget.onerror = null;
              }}
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {selectedImageIndex + 1} / {category.images.length}
          </div>
        </div>
      )}

      {/* Get Quote Button Section */}
      <section className="py-12 sm:py-16 md:py-20 pb-24 sm:pb-28 md:pb-32 px-4 sm:px-6 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => setLocation('/contact')}
            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg"
          >
            Get Quote
          </button>
        </div>
      </section>
    </div>
  );
}

