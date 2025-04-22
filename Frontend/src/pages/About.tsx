import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Award, Leaf, Info, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center bg-gradient-to-r from-green-400 via-green-600 to-green-800">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">About CropsWise</h1>
          <p className="text-xl md:text-2xl mb-4">
            Empowering Farmers with Smart Solutions for a Sustainable Future
          </p>
          <Link to="/login">
            <button className="bg-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition-colors duration-300">
              Join Now
            </button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What is CropsWise?</h2>
          <p className="text-xl text-gray-600">
            CropsWise is an innovative platform designed to support farmers in making smarter agricultural decisions. 
            With personalized fertilizer recommendations, crop suggestions based on location, and awareness of government schemes, 
            CropsWise aims to create a positive impact on farming practices across the globe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1: Fertilizer & Crop Recommendations */}
          <div className="bg-green-50 p-8 rounded-2xl shadow-lg">
            <Leaf className="w-12 h-12 text-green-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Personalized Fertilizer & Crop Recommendations</h3>
            <p className="text-gray-600">
              Using data from your location, CropsWise provides precise recommendations on the best fertilizers and crops suited 
              to your region. Our platform ensures optimal growth and maximizes yield by offering tailored advice.
            </p>
          </div>

          {/* Feature 2: Government Schemes */}
          <div className="bg-blue-50 p-8 rounded-2xl shadow-lg">
            <Award className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Stay Updated on Government Schemes</h3>
            <p className="text-gray-600">
              CropsWise keeps you informed about the latest government schemes, grants, and subsidies available to farmers. 
              Our platform makes it easier for farmers to access financial aid and support.
            </p>
          </div>

          {/* Feature 3: Farming Techniques */}
          <div className="bg-yellow-50 p-8 rounded-2xl shadow-lg">
            <Info className="w-12 h-12 text-yellow-600 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Farming Techniques and Tips</h3>
            <p className="text-gray-600">
              Learn about the latest farming techniques, pest management strategies, and sustainable farming practices. 
              CropsWise provides tips and resources to help you improve productivity and protect your crops.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600">
            At CropsWise, our mission is to empower farmers with the knowledge and tools they need to make informed decisions. 
            By combining technology, data-driven insights, and personalized recommendations, we aim to create a smarter, more sustainable agricultural future.
          </p>
        </div>
      </div>

      {/* Community Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600 mb-8">
            CropsWise is not just a platform, it's a community of forward-thinking farmers who are committed to improving agriculture. 
            We believe in collaboration, learning, and growing together to build a more prosperous future for everyone.
          </p>
          <Link to="/login">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
              Get Started Today
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
