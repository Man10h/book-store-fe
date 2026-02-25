import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">BOOKWORM HANOI</h3>
            <p className="text-sm mb-4">
              44 Phạm Hồng Thái, Ba Đình, Hà Nội
            </p>
            <p className="text-sm mb-2">📞 024 3715 3711</p>
            <p className="text-sm mb-2">📱 091 256 1800</p>
            <p className="text-sm mb-4">✉️ truongbookworm@gmail.com</p>
            <p className="text-sm">Open: 9am - 7pm</p>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">INFORMATION</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About Bookworm
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/charity" className="hover:text-amber-400 transition-colors">
                  Charity
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Help */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">QUICK HELP</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="hover:text-amber-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/payment" className="hover:text-amber-400 transition-colors">
                  Billing & Payment
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-amber-400 transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">NEWSLETTER</h3>
            <p className="text-sm mb-4">
              Subscribe for latest offers
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © 2024 Bookworm Hanoi. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

