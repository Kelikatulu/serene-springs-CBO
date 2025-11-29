import React from "react";
export default function SereneSpringsCBO() {
        const BG = "#c7d6c8"; // Soft sage green from logo background
const accent = "#3a7d44"; // Green tone from logo’s floral stem

return (
<div
className="min-h-screen text-gray-800"
style={{ backgroundColor: BG, fontFamily: "Inter, system-ui, sans-serif" }}
> 
{/* Header */}
<header className="text-center py-10">
<img 
src="/Logo.jpeg"
alt="Serene Springs CBO Logo"
className="mx-auto w-32 h-32 object-contain"
/>
<h1 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-900">
Serene Springs Community-Based Organization (CBO)
</h1>
<p className="italic text-lg text-gray-700">“Let’s Talk, Let’s Heal.”</p>
</header>

{/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-md py-3 flex flex-wrap justify-center border-b border-gray-300">
        {[
          "Home",
          "About Us",
          "Programs",
          "Impact",
          "Gallery",
          "Get Involved",
          "Resources",
          "Contact",
        ].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="mx-3 text-sm md:text-base font-medium text-gray-800 hover:text-green-700 transition"
            style={{ color: "inherit" }}
          >
{item}
          </a>
        ))}
      </nav>

      {/* Home Section */}
      <section id="home" className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Welcome to Serene Springs CBO
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We are a community-driven organization committed to promoting mental wellness, empowerment, and social resilience.
          We believe every person deserves a safe space to heal, grow, and thrive. Join us in creating a mentally healthy,
          empowered, and united community.
        </p>
      </section>
{/* About Section */}
      <section id="about-us" className="max-w-5xl mx-auto px-6 py-12 bg-white/40 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: accent }}>
          About Us
        </h2>
        <p className="text-gray-700 mb-4">
          <strong>Who We Are:</strong> Serene Springs CBO is a registered non-profit initiative working to promote mental health awareness, youth empowerment, and social well-being.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Founded:</strong> 2025
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Vision:</strong> A mentally healthy, empowered, and socially cohesive community.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Mission:</strong> To enhance community well-being through psychosocial support, empowerment programs, and inclusive community engagement.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white/60 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Core Values</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li>Compassion</li>
              <li>Integrity</li>
              <li>Inclusion</li>
              <li>Empowerment</li>
              <li>Accountability</li>
            </ul>
          </div>

          <div className="bg-white/60 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Leadership Team</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              <li>Chairperson: Martin Mwenda</li>
              <li>Secretary: Keran Mwiti</li>
              <li>Treasurer: Gloria Gakii</li>
              <li>Programs Coordinator: Faith Minayo</li>
            </ul>
          </div>

          <div className="bg-white/60 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Registration</h3>
            <p className="text-sm text-gray-700">
              Registered under the Ministry of Gender, Social Services and Affirmative Action – Reg. No: [Insert Number]
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: accent }}>
          Our Programs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Mental Health & Psychosocial Support",
              items: ["Awareness campaigns & dialogues", "Individual & group counseling", "Peer support sessions"],
            },
            {
              title: "Youth Empowerment",
              items: ["Life skills & mentorship", "Vocational training & entrepreneurship", "Sports & creative expression"],
            },
            {
              title: "Gender & Family Support",
              items: ["GBV prevention & response", "Family therapy", "Women empowerment sessions"],
            },
            {
              title: "Community Outreach",
              items: ["Clean-up drives & social action", "Community education & advocacy"],
            },
          ].map((prog, i) => (
            <div key={i} className="bg-white/40 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{prog.title}</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {prog.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="max-w-5xl mx-auto px-6 py-12 bg-white/40 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: accent }}>
          Our Impact
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
          <li>Reached over 500 community members through mental health awareness sessions.</li>
          <li>Supported youth groups with mentorship and life skills training.</li>
          <li>Partnered with local leaders to promote peace and social harmony.</li>
        </ul>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: accent }}>
          Gallery
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {['/1.jpeg', '/2.jpeg', '/3.jpeg', '/Faith.jpeg'].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Community Event ${i + 1}`}
              className="w-full aspect-square object-cover rounded-lg shadow-sm bg-white/30"
            />
          ))}
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="max-w-5xl mx-auto px-6 py-12 bg-white/40 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: accent }}>
          Get Involved
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
          <li><strong>Become a Member:</strong> Join our community network and outreach activities.</li>
          <li><strong>Volunteer:</strong> Share your skills in counseling, communication, or youth work.</li>
          <li><strong>Partner With Us:</strong> Collaborate on wellness and empowerment projects.</li>
          <li><strong>Donate:</strong> Support through financial or in-kind contributions.</li>
        </ul>
        <p className="text-sm text-gray-700 mt-4">
          <strong>Paybill:</strong> 400200<br />
          <strong>Account Number:</strong> 01102344450001<br />
          <strong>Account Name:</strong> Serene Springs CBO
        </p>
      </section>

      {/* Resources Section */}
      <section id="resources" className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: accent }}>
          Resources
        </h2>
        <div className="space-y-2 text-gray-700 text-sm">
          <a href="/Mental_Health_Awareness.pdf" className="underline">📄 Mental Health Awareness Guide</a><br />
          <a href="/Annual_Report_2025.pdf" className="underline">📄 2025 Annual Report</a><br />
          <a href="/GBV_Support_Guide.pdf" className="underline">📄 GBV Support Guide</a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-12 bg-white/40 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ color: accent }}>
          Contact Us
        </h2>
        <p className="text-sm text-gray-700">
          <strong>Address:</strong> P.O. Box 9213 - 00100<br />
          <strong>Phone:</strong> +254 705 090 366<br />
          <strong>Email:</strong> serenespringscbo@gmail.com
        </p>
        <div className="mt-4 space-x-3">
          <a href="https://facebook.com/SereneSpringsCBO" className="underline">Facebook</a>
          <a href="https://instagram.com/serenespringscbo" className="underline">Instagram</a>
          <a href="https://twitter.com/SereneSpringsKE" className="underline">Twitter/X</a>
        </div>
      </section>

{/* Footer */}
      <footer className="text-center text-sm text-gray-700 py-6">
        <p>© 2025 Serene Springs Community-Based Organization. All Rights Reserved.</p>
        <p>Promoting mental wellness and community empowerment.</p>
        <a href="#home" className="underline">Back to Top</a>
      </footer>
    </div>
  );
}
