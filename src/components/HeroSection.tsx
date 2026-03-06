import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-14">
      <div className="container-shell">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <Link to="/sell-books" className="card-shell p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">📚</div>
            <h3 className="text-lg font-bold text-gray-900">SELL YOUR BOOKS</h3>
            <p className="mt-2 text-sm text-gray-600">Get the best resale value for your books.</p>
          </Link>

          <Link to="/membership" className="card-shell p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">🎁</div>
            <h3 className="text-lg font-bold text-gray-900">5% DISCOUNT</h3>
            <p className="mt-2 text-sm text-gray-600">Exclusive discount with online membership.</p>
          </Link>

          <div className="card-shell p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">🚚</div>
            <h3 className="text-lg font-bold text-gray-900">SAME-DAY DELIVERY</h3>
            <p className="mt-2 text-sm text-gray-600">Free shipping for orders above 500,000 VND.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
