import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { toast } from '@/hooks/use-toast';

const SoilInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    block: '',
    season: '',
    soilType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emptyFields = Object.entries(formData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast({
        title: "Incomplete form",
        description: `Please fill in all fields: ${emptyFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    navigate('/results', { state: formData });
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-soil-100/80 rounded-2xl shadow-md p-8 animate-fade-up">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Leaf className="mr-2 text-krishi-500" />
                    Soil Analysis Form
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Fill in the details below to get personalized crop and fertilizer recommendations for your farm
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">LOCATION:</h3>

                    <div className="mb-4">
                      <label htmlFor="state" className="block text-gray-700 font-medium mb-1">STATE:</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter your state"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-krishi-300 transition"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="district" className="block text-gray-700 font-medium mb-1">DISTRICT:</label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Enter your district"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-krishi-300 transition"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="block" className="block text-gray-700 font-medium mb-1">BLOCK:</label>
                      <input
                        type="text"
                        id="block"
                        name="block"
                        value={formData.block}
                        onChange={handleInputChange}
                        placeholder="Enter your block"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-krishi-300 transition"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="season" className="block text-gray-700 font-medium mb-1">SEASON:</label>
                      <input
                        type="text"
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleInputChange}
                        placeholder="Enter the season (e.g., Kharif, Rabi)"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-krishi-300 transition"
                      />
                    </div>

                    <div className="mb-8">
                      <label htmlFor="soilType" className="block text-gray-700 font-medium mb-1">SOIL TYPE:</label>
                      <input
                        type="text"
                        id="soilType"
                        name="soilType"
                        value={formData.soilType}
                        onChange={handleInputChange}
                        placeholder="Enter your soil type"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-krishi-300 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="krishi-btn w-full text-center uppercase"
                  >
                    GET RESULTS
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default SoilInput;
