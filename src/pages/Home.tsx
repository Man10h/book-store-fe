import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import HeroSection from '../components/HeroSection';

const Home = () => {
  const categories = [
    { name: 'Fiction', type: 'Fiction'},
    { name: 'Non-Fiction', type: 'Non-Fiction'},
    { name: "Children's Books", type: 'Children'},
    { name: 'Romance', type: 'Romance'},
    { name: 'Crime & Thriller', type: 'Crime'},
    { name: 'Sci-Fi & Fantasy', type: 'Sci-Fi'},
  ];

  return (
    <div className="bg-gray-50">
      {/* Image Slider */}
      <ImageSlider />

      {/* Hero Section */}
      <HeroSection />

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by category</h2>
              <p className="mt-1 text-sm text-gray-600">
                Quickly jump into the genres you love.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.type}
                to={`/books?type=${category.type}`}
                className="bg-white rounded-xl shadow-sm px-4 py-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="px-4">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">15,000 BOOKS</h3>
              <p className="text-gray-600 text-sm">Fiction &amp; non-fiction titles to explore.</p>
            </div>
            <div className="px-4">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">SAVE MONEY</h3>
              <p className="text-gray-600 text-sm">Sell books back and save on your next order.</p>
            </div>
            <div className="px-4">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">UNIQUE BOOKSHOP</h3>
              <p className="text-gray-600 text-sm">A curated selection for every type of reader.</p>
            </div>
            <div className="px-4">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">5 STAR RATING</h3>
              <p className="text-gray-600 text-sm">Friendly, fast and reliable service.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

