import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sell Books */}
          <Link
            to="/sell-books"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700">
              SELL YOUR BOOKS
            </h3>
            <p className="text-gray-600 text-sm">
              for the best price in town
            </p>
          </Link>

          {/* Discount */}
          <Link
            to="/membership"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700">
              5% DISCOUNT
            </h3>
            <p className="text-gray-600 text-sm">
              for Bookworm Online Membership
            </p>
          </Link>

          {/* Same-Day Delivery */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              SAME-DAY DELIVERY
            </h3>
            <p className="text-gray-600 text-sm">
              Free shipping &gt; 500,000₫
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


