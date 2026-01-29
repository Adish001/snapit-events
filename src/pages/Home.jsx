import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import AnimatedPage from "../components/AnimatedPage";
import { useEffect } from "react";
import { setSEO } from "../utils/seo";
useEffect(() => {
  setSEO({
    title: "SnapIt Events | Wedding & Event Management in India",
    description:
      "SnapIt Events offers premium wedding planning, sangeet decor, reception lighting, and corporate event management. Snap • Celebrate • Repeat.",
    canonical: "https://snapitevents.in/",
  });
}, []);

export default function Home() {
  return (
    <AnimatedPage>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>SnapIt Events | Wedding & Event Management in India</title>
        <meta
          name="description"
          content="SnapIt Events offers premium wedding planning, sangeet decor, reception lighting, and corporate event management. Snap • Celebrate • Repeat."
        />
        <meta
          name="keywords"
          content="SnapIt Events, wedding planners, sangeet decor, event lighting, corporate events"
        />
        <link rel="canonical" href="https://snapitevents.in/" />
      </Helmet>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-ivory"
          >
            SnapIt <span className="text-gold">Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl mb-8 text-gray-200"
          >
            Snap • Celebrate • Repeat — Creating unforgettable moments for
            weddings, birthdays & corporate events
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap mb-10"
          >
            <Link
              to="/gallery"
              className="bg-gold text-primary px-6 py-3 rounded font-medium hover:opacity-90 transition"
            >
              View Gallery
            </Link>

            <Link
              to="/contact"
              className="border border-ivory text-ivory px-6 py-3 rounded hover:bg-ivory hover:text-primary transition"
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-10 text-2xl"
          >
            <a
              href="https://wa.me/918453846060"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:scale-110 transition"
            >
              <FaWhatsapp />
            </a>

            <a
              href="tel:+918453846060"
              className="text-gold hover:scale-110 transition"
            >
              <FaPhoneAlt />
            </a>

            <a
              href="https://www.instagram.com/snapit_events"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-center mb-12"
        >
          Our Event Services
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            title="Weddings"
            desc="Luxury wedding décor, premium lighting & flawless execution."
          />
          <ServiceCard
            title="Birthdays"
            desc="Creative birthday themes with vibrant lighting setups."
          />
          <ServiceCard
            title="Corporate Events"
            desc="Professional truss, line array systems & stage production."
          />
        </div>
      </section>
    </AnimatedPage>
  );
}

function ServiceCard({ title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-6 text-center shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted">{desc}</p>
    </motion.div>
  );
}
