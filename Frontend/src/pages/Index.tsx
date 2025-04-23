import React from "react";
import { Sun, CloudRain, Wind, Thermometer, Droplet } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

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
          <Link to="/login">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2 ml-[120px]">
              <span>Get Started</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Weather Section Placeholder (Can be replaced with static info or another feature) */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-Time Weather Updates
            </h2>
            <p className="text-xl text-gray-600">
              Weather integration is temporarily unavailable.
            </p>
          </div>
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-64 text-center">
              <Sun className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
              <h3 className="text-xl font-semibold text-gray-700">Weather Info</h3>
              <p className="text-gray-500 mt-2">Coming Soon...</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-64 text-center">
              <CloudRain className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <h3 className="text-xl font-semibold text-gray-700">Conditions</h3>
              <p className="text-gray-500 mt-2">Stay tuned for updates</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
