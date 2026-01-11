import { useState } from "react";
import { supabase } from "../supabase";
import emailjs from "@emailjs/browser";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";
import Section from "../components/Section";
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    /* 1️⃣ SAVE TO SUPABASE */
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });

    if (error) {
      setStatus("Failed to save message.");
      setLoading(false);
      return;
    }

    /* 2️⃣ SEND EMAIL (ADMIN + AUTO-REPLY) */
    emailjs
      .send(
        "service_ma9zui2",      // your service ID
        "template_hvvwgpo",     // your template ID
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        "IUYytXT3UCNt7pluq"     // your public key
      )
      .then(() => {
        setStatus("Message sent successfully! ✅");
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setLoading(false);
      })
      .catch(() => {
        setStatus("Message saved but email failed.");
        setLoading(false);
      });
  };

  return (
    <AnimatedPage>
      <PageWrapper>
        <Section
          title="Get in Touch"
          subtitle="Let’s create something unforgettable"
        >
          <div className="grid md:grid-cols-2 gap-10 items-start">
            
            {/* CONTACT INFO */}
            <div className="space-y-6 text-gray-300">
              <p>
                We’d love to be part of your celebration.  
                Reach out to us via phone, WhatsApp, Instagram,  
                or simply drop a message here.
              </p>

              <div className="flex gap-6 text-2xl">
                <a
                  href="tel:+918453846060"
                  className="text-gold hover:scale-110 transition"
                  title="Call us"
                >
                  <FaPhoneAlt />
                </a>

                <a
                  href="https://wa.me/918453846060"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:scale-110 transition"
                  title="WhatsApp"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href="https://www.instagram.com/snapit_events"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:scale-110 transition"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* CONTACT FORM */}
            <form
              onSubmit={handleSubmit}
              className="bg-black/40 backdrop-blur border border-gray-700 rounded-xl p-6 space-y-4"
            >
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-gray-600 rounded px-4 py-2 text-ivory focus:outline-none focus:border-gold"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-gray-600 rounded px-4 py-2 text-ivory focus:outline-none focus:border-gold"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-gray-600 rounded px-4 py-2 text-ivory focus:outline-none focus:border-gold"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-gray-600 rounded px-4 py-2 text-ivory focus:outline-none focus:border-gold"
              />

              <button
                disabled={loading}
                className="w-full bg-gold text-primary font-semibold py-2 rounded hover:opacity-90 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {status && (
                <p className="text-sm text-center text-green-400 font-medium">
                  {status}
                </p>
              )}
            </form>
          </div>
        </Section>
      </PageWrapper>
    </AnimatedPage>
  );
}
