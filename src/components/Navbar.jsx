import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { supabase } from "../supabase";
import useAdmin from "../hooks/useAdmin";
import logo from "../assets/snapit (2).png";

export default function Navbar() {
  const { user, loading } = useAdmin();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate("/");
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-primary text-ivory px-5 py-4 sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        
        {/* LOGO + BRAND */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="SnapIt Events"
            className="h-12 md:h-16 w-auto"
          />

          <div className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-semibold tracking-wide">
              SnapIt <span className="text-gold">Events</span>
            </span>

            {/* TAGLINE */}
            <span className="text-[10px] md:text-xs text-gray-300 tracking-widest">
              Snap | Celebrate | Repeat
            </span>

            {/* GOLD UNDERLINE */}
            <span className="w-10 h-[2px] bg-gold mt-1 rounded"></span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLinks user={user} loading={loading} onLogout={handleLogout} />
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-black rounded-lg overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <MobileLink to="/" onClick={closeMenu}>Home</MobileLink>
              <MobileLink to="/gallery" onClick={closeMenu}>Gallery</MobileLink>
              <MobileLink to="/contact" onClick={closeMenu}>Contact</MobileLink>

              {!loading && user && (
                <>
                  <MobileLink to="/admin" onClick={closeMenu}>
                    Dashboard
                  </MobileLink>
                  <button
                    onClick={handleLogout}
                    className="text-left text-red-400 font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ================= REUSABLE LINKS ================= */

function NavLinks({ user, loading, onLogout }) {
  return (
    <>
      <Link to="/" className="hover:text-gold transition">Home</Link>
      <Link to="/gallery" className="hover:text-gold transition">Gallery</Link>
      <Link to="/contact" className="hover:text-gold transition">Contact</Link>

      {!loading && user && (
        <>
          <Link to="/admin" className="hover:text-gold transition">
            Dashboard
          </Link>
          <button
            onClick={onLogout}
            className="border border-gold text-gold px-3 py-1 rounded hover:bg-gold hover:text-primary transition"
          >
            Logout
          </button>
        </>
      )}
    </>
  );
}

function MobileLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="font-medium hover:text-gold transition"
    >
      {children}
    </Link>
  );
}
