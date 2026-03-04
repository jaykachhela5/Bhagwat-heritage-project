import { memo } from "react";
import { Link } from "react-router-dom";

export const Footer = memo(function Footer() {
  return (
    <footer className="bg-[#0d3b66] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-3 text-[#f4a261]">Bhagwat Heritage</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Serving faith, culture and humanity through devotion, seva and spiritual programs.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-[#f4a261]">Contact Info</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <i className="fas fa-map-marker-alt mr-2" />
              Swaminarayan Temple, Kasturba Road, ChandraPur, Maharashtra
            </li>
            <li>
              <i className="fas fa-envelope mr-2" />
              info@bhagwatheritage.org
            </li>
            <li>
              <i className="fas fa-phone mr-2" />
              +91 9876543210
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-[#f4a261]">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.facebook.com/share/1AtpQtn1SL/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-white flex items-center gap-2"
              >
                <i className="fab fa-facebook-f" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/bhagwat.heritage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-300 hover:text-white flex items-center gap-2"
              >
                <i className="fab fa-instagram" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@bhagwatheritage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-white flex items-center gap-2"
              >
                <i className="fab fa-youtube" /> YouTube
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/918668897445"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-white flex items-center gap-2"
              >
                <i className="fab fa-whatsapp" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-[#f4a261]">Temple Timing</h3>
          <p className="text-sm text-gray-300">Morning: 09:00 AM – 12:00 PM</p>
          <p className="text-sm text-gray-300">Evening: 04:00 PM – 09:00 PM</p>
          <div className="mt-4 flex gap-2">
            <Link to="/mandir/gallery" className="btn-secondary text-sm">
              Gallery
            </Link>
            <Link to="/donate" className="btn-secondary text-sm">
              Donate
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Bhagwat Heritage Service Foundation Trust. All Rights Reserved.
      </div>
    </footer>
  );
});
