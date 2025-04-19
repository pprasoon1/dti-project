
import React from "react";
import {
  Sprout,
  Sun,
  CloudRain,
  BarChart,
  Users,
  ArrowRight,
  Plane,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const HomePage = () => {

  return (
    <div className="min-h-screen">
      <Navbar/>
      {/* Hero Section with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/wheat.jpg"
            alt="Farm field at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            CropsWise
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Cultivating Success Through Smart Agriculture
          </p>
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2 ml-[120px]">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Smart Farming Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Empowering farmers with cutting-edge technology and data-driven
              insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Plane className="w-8 h-8 text-green-600" />,
                title: "Crop Management",
                description:
                  "Monitor crop health, growth stages, and optimize yield with precision agriculture techniques.",
              },
              {
                icon: <CloudRain className="w-8 h-8 text-green-600" />,
                title: "Weather Integration",
                description:
                  "Real-time weather forecasts and intelligent irrigation scheduling for optimal resource usage.",
              },
              {
                icon: <BarChart className="w-8 h-8 text-green-600" />,
                title: "Yield Analytics",
                description:
                  "Advanced analytics and predictive modeling to maximize your farm's productivity.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-green-50 p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section with Parallax */}
      <div className="relative py-24 bg-fixed bg-cover bg-center">
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1920/1080"
            alt="Agricultural technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-center">
            {[
              { number: "10,000+", label: "Farmers" },
              { number: "50,000", label: "Acres Managed" },
              { number: "30%", label: "Yield Increase" },
              { number: "25%", label: "Resource Savings" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-green-50 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Sprout className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers who are already growing smarter with
            CropsWise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
              Start Free Trial
            </button>
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">CropsWise</h3>
            <p className="text-gray-400">
              Transforming agriculture through innovation and technology
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Case Studies", "Resources"],
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Blog", "Contact"],
            },
            {
              title: "Support",
              links: [
                "Help Center",
                "Documentation",
                "API Status",
                "Community",
              ],
            },
          ].map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default HomePage;