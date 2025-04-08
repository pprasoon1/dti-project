
import { useLocation, Link } from 'react-router-dom';
import { Download, Leaf, ChevronRight, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CropCard from '@/components/ui/CropCard';
import FertilizerCard from '@/components/ui/FertilizerCard';
import PageTransition from '@/components/layout/PageTransition';
import { toast } from '@/hooks/use-toast';

interface SoilFormData {
  state: string;
  district: string;
  block: string;
  season: string;
  soilType: string;
}

const Results = () => {
  const location = useLocation();
  const formData = location.state as SoilFormData;
  
  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No soil data available</h2>
          <p className="text-gray-600 mb-6">Please fill the soil input form to get recommendations</p>
          <Link to="/soil-input" className="krishi-btn">
            Go to Soil Input Form
          </Link>
        </div>
      </div>
    );
  }
  
  // Sample crops based on the form data
  // In a real app, these would come from an API or backend
  const recommendedCrops = [
    {
      name: 'Wheat',
      image: 'https://images.unsplash.com/photo-1631898039144-ba1cbc93f50a?auto=format&fit=crop&q=80&w=1000',
      suitability: 'Highly Suitable',
      description: 'Wheat thrives in your soil conditions with high yield potential. Best planted in October-November for optimal results.',
    },
    {
      name: 'Rice',
      image: 'https://images.unsplash.com/photo-1536304447766-da0ed4ce183d?auto=format&fit=crop&q=80&w=1000',
      suitability: 'Suitable',
      description: 'Rice can be grown in your conditions with proper water management. Consider early-maturing varieties.',
    },
    {
      name: 'Mustard',
      image: 'https://images.unsplash.com/photo-1578594640334-b71e7e4ada26?auto=format&fit=crop&q=80&w=1000',
      suitability: 'Moderately Suitable',
      description: 'Mustard can be grown as a rotational crop. It has moderate yield potential in your soil conditions.',
    }
  ];
  
  const recommendedFertilizers = [
    {
      name: 'Vermicompost',
      type: 'organic' as const,
      nutrientN: 3,
      nutrientP: 1,
      nutrientK: 1.5,
      description: 'Excellent organic option that improves soil structure and provides slow-release nutrients ideal for your soil type.'
    },
    {
      name: 'NPK 10-26-26',
      type: 'chemical' as const,
      nutrientN: 10,
      nutrientP: 26,
      nutrientK: 26,
      description: 'Balanced fertilizer suitable for your soil\'s phosphorus and potassium requirements before sowing.'
    },
    {
      name: 'Urea',
      type: 'chemical' as const,
      nutrientN: 46,
      nutrientP: 0,
      nutrientK: 0,
      description: 'Apply as a top dressing 30-45 days after sowing to boost nitrogen levels in your soil.'
    }
  ];
  
  const soilImprovementTips = [
    'Apply organic matter like farmyard manure at 10-15 tons/hectare before sowing to improve soil structure.',
    'Consider green manuring with Sesbania or Crotalaria to add nitrogen naturally to your soil.',
    'Your soil would benefit from reduced tillage practices to prevent erosion and maintain soil structure.',
    'Based on your soil type, maintain proper drainage channels to prevent waterlogging during monsoon.'
  ];
  
  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Download started",
      description: "Your recommendation report is being generated as PDF",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        
        <div className="pt-28 pb-16">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="mb-10">
              <div className="flex items-center mb-2">
                <Leaf className="mr-2 text-krishi-500" size={20} />
                <h1 className="text-3xl font-bold text-gray-800">Recommended Crops & Fertilizers</h1>
              </div>
              <p className="text-gray-600 max-w-2xl">
                Based on your soil data ({formData.soilType}) in {formData.block}, {formData.district}, {formData.state} 
                for the {formData.season} season
              </p>
            </div>
            
            {/* Summary Card */}
            <div className="bg-krishi-50 rounded-xl p-6 mb-12 animate-fade-up">
              <div className="flex items-start">
                <Info className="text-krishi-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Analysis Summary</h3>
                  <p className="text-gray-600">
                    Our AI has analyzed your soil conditions and determined that crops requiring moderate to high fertility
                    with good water retention capacity will perform best. The recommendations below are customized for
                    your specific location and season.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Crops Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Best Crops For You</h2>
                <Link to="#" className="text-krishi-600 text-sm font-medium flex items-center group">
                  View all crops
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCrops.map((crop, index) => (
                  <div key={crop.name} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <CropCard {...crop} />
                  </div>
                ))}
              </div>
            </section>
            
            {/* Fertilizers Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Fertilizer Recommendations</h2>
                <Link to="#" className="text-krishi-600 text-sm font-medium flex items-center group">
                  View all fertilizers
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedFertilizers.map((fertilizer, index) => (
                  <div key={fertilizer.name} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <FertilizerCard {...fertilizer} />
                  </div>
                ))}
              </div>
            </section>
            
            {/* Soil Improvement Tips Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Soil Improvement Tips</h2>
              
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <ul className="space-y-4">
                  {soilImprovementTips.map((tip, index) => (
                    <li key={index} className="flex animate-fade-right" style={{ animationDelay: `${index * 100}ms` }}>
                      <span className="mr-3 text-krishi-500 flex-shrink-0">•</span>
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            
            {/* Download Button */}
            <div className="text-center">
              <button
                onClick={handleDownloadPDF}
                className="krishi-btn flex items-center mx-auto"
              >
                <Download size={18} className="mr-2" />
                Download Recommendations as PDF
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Results;
