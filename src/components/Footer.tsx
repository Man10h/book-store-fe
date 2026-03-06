import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-amber-100 bg-slate-900 text-slate-300">
      <div className="container-shell py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">BOOKWORM HANOI</h3>
            <p className="mb-2 text-sm">44 Pham Hong Thai, Ba Dinh, Ha Noi</p>
            <p className="mb-2 text-sm">Phone: 024 3715 3711</p>
            <p className="mb-2 text-sm">Mobile: 091 256 1800</p>
            <p className="mb-2 text-sm">Email: truongbookworm@gmail.com</p>
            <p className="text-sm">Open: 9am - 7pm</p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">INFORMATION</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="transition-colors hover:text-amber-400">
                  About Bookworm
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-amber-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/charity" className="transition-colors hover:text-amber-400">
                  Charity
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-amber-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">QUICK HELP</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shipping" className="transition-colors hover:text-amber-400">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/payment" className="transition-colors hover:text-amber-400">
                  Billing and Payment
                </Link>
              </li>
              <li>
                <Link to="/returns" className="transition-colors hover:text-amber-400">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-amber-400">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">NEWSLETTER</h3>
            <p className="mb-4 text-sm">Subscribe for latest offers.</p>
            <form className="space-y-2">
              <input type="email" placeholder="Your email" className="input-control border-slate-700 bg-slate-800 text-slate-100" />
              <button type="submit" className="btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm md:flex-row">
          <p>© 2026 Bookworm Hanoi. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-amber-400">
              Facebook
            </a>
            <a href="#" className="transition-colors hover:text-amber-400">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
