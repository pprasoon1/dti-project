
import React from "react";
import { Button } from "@/components/ui/button";
import { Wheat, MapPin, Recycle, TestTube } from "lucide-react";
import { Link } from "react-router-dom";
import TeamMember from "@/components/TeamMember";
import FeatureCard from "@/components/FeatureCard";
import PageLayout from "@/components/PageLayout";

const About = () => {
  const teamMembers = [
    {
      name: "Saarthak Mahajan",
      role: "Fullstack Engineer",
      bio: "Focuses on creating robust frontend-backend systems ensuring a seamless experience for all users.",
    },
    {
      name: "Ansh Kaushik",
      role: "Fullstack Engineer",
      bio: "Expert in building scalable, user-friendly interfaces that work flawlessly on web and mobile.",
    },
    {
      name: "Nitin Kumar",
      role: "ML Engineer",
      bio: "Designs and trains models that drive intelligent, location-specific agricultural recommendations.",
    },
    {
      name: "Hrehaan Ahuja",
      role: "ML Engineer",
      bio: "Specializes in data pipelines and soil-crop-fertilizer correlation for sustainable farming insights.",
    },
  ];

  const features = [
    {
      icon: <Wheat className="h-10 w-10 text-green-600" />,
      title: "AI-Based Crop & Fertilizer Recommendations",
      description:
        "Smart suggestions tailored to your farm's specific needs and conditions.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-green-600" />,
      title: "Location-aware Soil Analysis",
      description:
        "Leveraging GeoData to provide insights based on your exact location.",
    },
    {
      icon: <Recycle className="h-10 w-10 text-green-600" />,
      title: "Sustainability-focused farming",
      description:
        "Recommendations that preserve soil health and promote long-term sustainability.",
    },
    {
      icon: <TestTube className="h-10 w-10 text-green-600" />,
      title: "Organic & Chemical Fertilizer Insights",
      description:
        "Balanced approaches with preference for organic solutions when possible.",
    },
  ];

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen">
        {/* Header Section */}
        <div className="relative bg-gradient-to-b from-green-50 to-green-100 py-16 px-4 sm:px-6 lg:px-8 rounded-lg">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-[url('/fields-pattern.svg')] opacity-10" />
          </div>
          <div className="relative max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-4">
              Meet the Team Behind Krishi Mitra
            </h1>
            <p className="text-xl sm:text-2xl text-brown-600 max-w-3xl mx-auto">
              Driven by technology. Rooted in agriculture. Dedicated to sustainability.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                />
              ))}
            </div>
          </div>
        </div>

        {/* About Krishi Mitra Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
              About Krishi Mitra
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto text-center">
              Krishi Mitra (formerly Cropwise) is an AI-powered platform that provides 
              Indian farmers with personalized fertilizer and crop suggestions based on soil data 
              (pH, nutrients, type) and seasonal factors. It integrates government soil data and 
              promotes organic fertilizers to ensure long-term sustainability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>

            <div className="mt-16 text-center">
              <blockquote className="text-2xl font-semibold italic text-green-700 max-w-3xl mx-auto">
                "When we empower farmers with the right information, we cultivate prosperity."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 bg-brown-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-brown-800 mb-6">
              Want to learn more about how Krishi Mitra helps farmers thrive?
            </h2>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg"
              asChild
            >
              <Link to="/">Explore Our Platform</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
