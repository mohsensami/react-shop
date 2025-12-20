import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <StorefrontIcon className="text-white text-2xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Shop
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Your one-stop destination for quality products. We offer the best
              prices and fastest delivery to make your shopping experience
              unforgettable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 text-sm">
                  📞 +1 (555) 123-4567
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">
                  ✉️ support@shop.com
                </span>
              </li>
              <li>
                <span className="text-gray-400 text-sm">
                  🕒 Mon-Fri: 9AM-6PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-400">
            © 2025 Shop. All Rights Reserved.
          </span>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
