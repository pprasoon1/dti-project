import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-green-600" strokeWidth={2.5} />
              <span className="text-xl font-bold text-gray-800">CropWise</span>
            </div>
            <p className="text-gray-600 text-sm">
              Empowering farmers with AI-driven crop and fertilizer recommendations
              for sustainable and profitable agriculture.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-600 text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-green-600 text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/soil-input" className="text-gray-600 hover:text-green-600 text-sm">Soil Analysis</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-green-600 text-sm">Login</Link>
              </li>
              
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-600 text-sm">Bennett University, Greater Noida</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-green-600 flex-shrink-0" />
                <a href="mailto:e23ceu0243@bennett.edu.in" className="text-gray-600 hover:text-green-600 text-sm">
                  e23ceu0243@bennett.edu.in
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-green-600 flex-shrink-0" />
                <a href="tel:+918824446045" className="text-gray-600 hover:text-green-600 text-sm">
                  +91 8824446045
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Credits */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CropWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
