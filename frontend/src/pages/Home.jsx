export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sparkling Clean, Stress-Free Living
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Experience top-notch residential and commercial cleaning with CleanService.
          </p>
          <a
            href="/booking-form"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
           Book Now
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose CleanService?</h2>
        <p className="max-w-3xl mx-auto text-gray-600 mb-12">
          We’re passionate about delivering sparkling results with eco-friendly practices, trusted staff, and flexible service plans. From regular upkeep to deep sanitization, we keep your spaces fresh, healthy, and welcoming.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Residential Cleaning",
              desc: "Regular or one-time cleaning tailored to your home’s needs for comfort and hygiene.",
            },
            {
              title: "Commercial Spaces",
              desc: "Offices, retail stores, and other business premises cleaned professionally and on schedule.",
            },
            {
              title: "Move-In / Move-Out",
              desc: "Make transitions easy with thorough, wall-to-wall cleaning before or after a move.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 shadow-md rounded-xl">
            <p className="text-gray-600 italic mb-4">
              "CleanService is reliable, fast, and incredibly thorough. My house has never felt more comfortable!"
            </p>
            <h4 className="font-semibold">— Sarah M.</h4>
          </div>
          <div className="bg-white p-6 shadow-md rounded-xl">
            <p className="text-gray-600 italic mb-4">
              "We use them for our office weekly. The attention to detail is fantastic and the team is always on time."
            </p>
            <h4 className="font-semibold">— Jason K.</h4>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-50 py-12 px-4 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to enjoy a spotless space?
        </h3>
        <p className="text-gray-600 mb-6">
          Book a cleaning with us today and see the difference.
        </p>
        <a
          href="/booking-form"
          className="bg-green-600 hover:bg-green-600/100 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          Book Now
        </a>
      </section>
    </div>
  );
}
