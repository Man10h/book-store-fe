import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=1200&h=500&fit=crop',
      title: 'Welcome to Bookworm Hanoi',
      description: 'Discover your next favorite book in our cozy bookstore',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507842741202-7b2e4b8c3a3f?w=1200&h=500&fit=crop',
      title: 'Curated Collections',
      description: 'Handpicked selections for every reader',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=500&fit=crop',
      title: 'Local & International Books',
      description: 'Explore diverse authors and genres',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=500&fit=crop',
      title: 'Reader-Friendly Space',
      description: 'Perfect place to browse and relax',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1507842072343-583f20270319?w=1200&h=500&fit=crop',
      title: 'Book Café Coming Soon',
      description: 'Enjoy coffee while you browse your favorite books',
    },
  ];

  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoplay, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoplay(false);
  };

  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  return (
    <section className="container-shell mt-6">
      <div className="relative h-[320px] w-full overflow-hidden rounded-3xl border border-amber-100 bg-black shadow-xl md:h-[460px]">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
            
            {/* Text Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-3xl px-6 text-center text-white md:px-10">
                <h2 className="mb-3 text-3xl font-extrabold tracking-tight drop-shadow-lg md:text-5xl">
                  {slide.title}
                </h2>
                <p className="text-base text-white/90 md:text-xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 p-3 text-white transition-all duration-300 hover:bg-black/50"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/35 p-3 text-white transition-all duration-300 hover:bg-black/50"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-amber-500'
                : 'w-3 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute right-6 top-6 z-10 rounded-lg bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
        {currentSlide + 1} / {slides.length}
      </div>
      </div>
    </section>
  );
};

export default ImageSlider;
