import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">
        
        {/* Brand */}
        <div>
          <h3 className="font-bold text-lg">SnapIt Events</h3>
          <p className="text-sm text-gray-400">
            Creating unforgettable moments.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>

          <p className="text-sm">
            📞{" "}
            <a
              href="tel:+918453846060"
              className="hover:text-yellow-400"
            >
              8453846060
            </a>
          </p>

          <p className="text-sm">
            📸{" "}
            <a
              href="https://instagram.com/snapit_events"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              @snapit_events
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>

          <p className="text-sm">
            <Link to="/" className="hover:text-yellow-400">
              Home
            </Link>
          </p>

          <p className="text-sm">
            <Link to="/gallery" className="hover:text-yellow-400">
              Gallery
            </Link>
          </p>

          <p className="text-sm">
            <Link to="/contact" className="hover:text-yellow-400">
              Contact
            </Link>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-400 pb-4">
        © {new Date().getFullYear()} SnapIt Events. All rights reserved.
      </div>
    </footer>
  );
}
