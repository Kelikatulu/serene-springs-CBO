import React, { useEffect, useState } from "react";

export default function SereneSpringsCBO() {
  const BG = "#c7d6c8"; // Soft sage green
  const accent = "#3a7d44"; // Green tone

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const [counters, setCounters] = useState({ members: 0, trees: 0, women: 0 });
  useEffect(() => {
    const target = { members: 500, trees: 1000, women: 50 };
    const duration = 2000;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newCounters = {};
      Object.keys(target).forEach((key) => {
        newCounters[key] = Math.min(Math.floor((progress / duration) * target[key]), target[key]);
      });
      setCounters(newCounters);
      if (progress < duration) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const images = Array.from({ length: 10 }, (_, i) => `/images/photo${i + 1}.jpg`);

  return (
    <div style={{ backgroundColor: BG, fontFamily: "Inter, system-ui, sans-serif" }} className="min-h-screen text-gray-800">
      {/* Header */}
      <header className="text-center py-12 relative">
        <div className="max-w-5xl mx-auto px-6">
          <img src="/logo.png" alt="Serene Springs CBO Logo" className="mx-auto w-32 h-32 object-contain mb-4" />
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900">
            Serene Springs Community-Based Organization
          </h1>
          <p className="italic text-lg md:text-xl text-gray-700 mb-6">“Let’s Talk, Let’s Heal.”</p>
          <button
            style={{ backgroundColor: accent }}
            className="text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition"
            onClick={() => scrollToSection("get-involved")}
          >
            Get Involved
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md py-3 flex flex-wrap justify-center border-b border-gray-300">
        {["Home", "About Us", "Programs", "Impact", "Gallery", "Get Involved", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, "-"))}
            className="mx-3 text-sm md:text-base font-medium text-gray-800 hover:text-[#3a7d44] transition"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Sections (Home, About, Programs, Impact, Gallery, Get Involved, Contact) */}
      {/* ...You can copy the rest from the cleaned code I sent earlier... */}
    </div>
  );
}
