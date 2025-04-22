import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplet,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const HomePage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch weather data from RapidAPI using dynamic geolocation
  useEffect(() => {
    // Get user's geolocation
    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch weather data using the dynamic coordinates
          fetchWeatherData(latitude, longitude);
        }, (err) => {
          setError("Failed to retrieve location.");
          setLoading(false);
        });
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    // Fetch weather data with given latitude and longitude
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://open-weather13.p.rapidapi.com/city/latlon/${latitude}/${longitude}/EN`, 
          {
            headers: {
              "x-rapidapi-key": "5c22d9bf8amshcffd37a10bbbb7ap16b95cjsnc6221d431aa5", // Use your own RapidAPI key here
              "x-rapidapi-host": "open-weather13.p.rapidapi.com",
            },
          }
        );
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching weather data");
        setLoading(false);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

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

      {/* Weather Integration Section */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real-Time Weather Updates
            </h2>
            <p className="text-xl text-gray-600">
              Stay informed about the current weather and optimize your farm's resource usage
            </p>
          </div>

          {/* Weather Information */}
          <div className="flex justify-center items-center space-x-8">
            <div className="bg-green-50 p-8 rounded-2xl shadow-lg w-64">
              <div className="flex items-center space-x-4">
                <Sun className="w-8 h-8 text-yellow-500" />
                <div>
                  <h3 className="text-2xl font-semibold">{weather.name}</h3>
                  <p className="text-gray-600">{weather.sys.country}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xl font-semibold">Temperature</h4>
                <p className="text-gray-700">
                  {Math.round(weather.main.temp - 273.15)}°C
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <Thermometer className="w-6 h-6 text-red-500" />
                <p className="ml-2 text-gray-600">Feels Like: {Math.round(weather.main.feels_like - 273.15)}°C</p>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-2xl shadow-lg w-64">
              <div className="flex items-center space-x-4">
                <CloudRain className="w-8 h-8 text-blue-500" />
                <div>
                  <h4 className="text-xl font-semibold">Weather</h4>
                  <p className="text-gray-700">{weather.weather[0].description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <Droplet className="w-6 h-6 text-blue-500" />
                <p className="ml-2 text-gray-600">Humidity: {weather.main.humidity}%</p>
              </div>
              <div className="mt-4 flex items-center">
                <Wind className="w-6 h-6 text-gray-500" />
                <p className="ml-2 text-gray-600">Wind Speed: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
