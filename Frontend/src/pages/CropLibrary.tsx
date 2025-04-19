import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CropLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const crops = [
    { name: 'Wheat', season: 'Rabi', duration: '120-150 days', waterReq: 'Medium', soil: 'Well-drained loamy', pH: '6.0-7.0' },
    { name: 'Rice', season: 'Kharif', duration: '115-150 days', waterReq: 'High', soil: 'Clay loamy', pH: '5.5-6.5' },
    { name: 'Maize', season: 'Both', duration: '90-130 days', waterReq: 'Medium', soil: 'Well-drained loamy', pH: '5.5-7.0' },
    { name: 'Soybean', season: 'Kharif', duration: '95-130 days', waterReq: 'Medium', soil: 'Well-drained', pH: '6.0-7.0' },
    { name: 'Cotton', season: 'Kharif', duration: '150-180 days', waterReq: 'Medium', soil: 'Black cotton soil', pH: '6.0-7.5' },
    { name: 'Sugarcane', season: 'Year-round', duration: '360-420 days', waterReq: 'High', soil: 'Deep rich loamy', pH: '6.5-7.5' },
    { name: 'Potato', season: 'Rabi', duration: '90-120 days', waterReq: 'Medium', soil: 'Sandy loam', pH: '5.5-6.5' },
    { name: 'Tomato', season: 'Year-round', duration: '90-120 days', waterReq: 'Medium', soil: 'Well-drained loamy', pH: '6.0-7.0' },
    { name: 'Mustard', season: 'Rabi', duration: '110-140 days', waterReq: 'Low', soil: 'Well-drained loamy', pH: '6.0-7.0' },
    { name: 'Groundnut', season: 'Kharif', duration: '120-140 days', waterReq: 'Medium', soil: 'Sandy loam', pH: '6.0-6.8' },
    { name: 'Chickpea', season: 'Rabi', duration: '120-150 days', waterReq: 'Low', soil: 'Sandy loam', pH: '6.0-8.0' },
    { name: 'Pigeon Pea', season: 'Kharif', duration: '150-180 days', waterReq: 'Low', soil: 'Well-drained', pH: '6.5-7.5' },
    { name: 'Green Gram', season: 'Both', duration: '65-70 days', waterReq: 'Low', soil: 'Well-drained loamy', pH: '6.5-7.5' },
    { name: 'Black Gram', season: 'Kharif', duration: '90-120 days', waterReq: 'Low', soil: 'Well-drained', pH: '6.5-7.5' },
    { name: 'Onion', season: 'Rabi', duration: '130-150 days', waterReq: 'Medium', soil: 'Sandy loam', pH: '6.0-7.0' },
    { name: 'Garlic', season: 'Rabi', duration: '130-150 days', waterReq: 'Medium', soil: 'Sandy loam', pH: '6.0-7.0' },
    { name: 'Cauliflower', season: 'Rabi', duration: '90-120 days', waterReq: 'Medium', soil: 'Well-drained loamy', pH: '6.0-7.0' },
    { name: 'Cabbage', season: 'Rabi', duration: '90-120 days', waterReq: 'Medium', soil: 'Well-drained loamy', pH: '6.0-7.0' },
    { name: 'Peas', season: 'Rabi', duration: '90-120 days', waterReq: 'Medium', soil: 'Well-drained loamy', pH: '6.0-7.5' },
    { name: 'Sunflower', season: 'Both', duration: '90-110 days', waterReq: 'Medium', soil: 'Well-drained', pH: '6.5-7.5' },
    { name: 'Sorghum', season: 'Kharif', duration: '100-120 days', waterReq: 'Low', soil: 'Well-drained', pH: '6.0-7.0' },
    { name: 'Pearl Millet', season: 'Kharif', duration: '90-110 days', waterReq: 'Low', soil: 'Sandy loam', pH: '6.5-7.5' },
    { name: 'Finger Millet', season: 'Kharif', duration: '90-120 days', waterReq: 'Low', soil: 'Sandy loam', pH: '6.0-7.5' },
    { name: 'Barley', season: 'Rabi', duration: '120-150 days', waterReq: 'Low', soil: 'Well-drained', pH: '6.0-7.0' },
    { name: 'Lentil', season: 'Rabi', duration: '120-150 days', waterReq: 'Low', soil: 'Well-drained loamy', pH: '6.0-7.5' }
  ];

  const fertilizers = [
    { 
      name: 'Urea', 
      type: 'chemical' as const,
      nutrientN: 46, 
      nutrientP: 0, 
      nutrientK: 0,
      description: 'High nitrogen fertilizer suitable for most crops',
      usage: 'Best for leafy growth and vegetative stage',
      application: '150-200 kg/hectare depending on crop',
      timing: 'Apply in 2-3 splits: at sowing, vegetative stage, and pre-flowering',
      precautions: 'Avoid direct contact with seeds, apply when soil is moist',
      bestFor: ['Wheat', 'Rice', 'Maize', 'Cotton'],
      storage: 'Keep in dry place, away from moisture'
    },
    { 
      name: 'DAP (Di-Ammonium Phosphate)', 
      type: 'chemical' as const,
      nutrientN: 18, 
      nutrientP: 46, 
      nutrientK: 0,
      description: 'High phosphorus fertilizer for root development',
      usage: 'Primary fertilizer for initial crop growth stages',
      application: '100-150 kg/hectare as basal dose',
      timing: 'Apply at sowing or transplanting time',
      precautions: 'Mix well with soil, avoid application in standing water',
      bestFor: ['Wheat', 'Pulses', 'Oilseeds', 'Vegetables'],
      storage: 'Store in moisture-proof bags, avoid direct sunlight'
    },
    { 
      name: 'MOP (Muriate of Potash)', 
      type: 'chemical' as const,
      nutrientN: 0, 
      nutrientP: 0, 
      nutrientK: 60,
      description: 'High potassium fertilizer for better yield quality',
      usage: 'Enhances crop quality, disease resistance, and stress tolerance',
      application: '50-100 kg/hectare based on soil test',
      timing: 'Apply in 2 splits: basal dose and at flowering stage',
      precautions: 'Avoid excess application, can cause soil salinity',
      bestFor: ['Potato', 'Sugarcane', 'Banana', 'Vegetables'],
      storage: 'Store in dry conditions, avoid moisture contact'
    },
    { 
      name: 'NPK 10:26:26', 
      type: 'chemical' as const,
      nutrientN: 10, 
      nutrientP: 26, 
      nutrientK: 26,
      description: 'Balanced fertilizer for overall crop growth',
      usage: 'Complete fertilizer for balanced nutrition',
      application: '200-250 kg/hectare depending on crop',
      timing: 'Apply as basal dose and top dressing',
      precautions: 'Ensure uniform application, avoid root contact',
      bestFor: ['Cotton', 'Sugarcane', 'Vegetables', 'Fruits'],
      storage: 'Keep in moisture-proof bags in dry area'
    },
    { 
      name: 'SSP (Single Super Phosphate)', 
      type: 'chemical' as const,
      nutrientN: 0, 
      nutrientP: 16, 
      nutrientK: 0,
      description: 'Phosphatic fertilizer with added sulfur',
      usage: 'Promotes root growth and flowering',
      application: '200-250 kg/hectare as per requirement',
      timing: 'Apply before sowing or transplanting',
      precautions: 'Mix well with soil, avoid direct contact with seeds',
      bestFor: ['Oilseeds', 'Pulses', 'Vegetables', 'Fruits'],
      storage: 'Store in dry place away from moisture'
    },
    { 
      name: 'Vermicompost', 
      type: 'organic' as const,
      nutrientN: 3, 
      nutrientP: 1, 
      nutrientK: 1,
      description: 'Natural fertilizer rich in beneficial microorganisms',
      usage: 'Improves soil structure and microbial activity',
      application: '2.5-5 tonnes/hectare',
      timing: 'Apply 2-3 weeks before sowing',
      precautions: 'Keep moisture level optimal during application',
      bestFor: ['All Crops', 'Vegetables', 'Fruits', 'Flowers'],
      storage: 'Store in cool, shaded area with proper aeration'
    },
    { 
      name: 'Farm Yard Manure', 
      type: 'organic' as const,
      nutrientN: 0.5, 
      nutrientP: 0.2, 
      nutrientK: 0.5,
      description: 'Traditional organic manure from farm animals',
      usage: 'Improves soil organic matter and structure',
      application: '10-15 tonnes/hectare',
      timing: 'Apply 3-4 weeks before sowing',
      precautions: 'Ensure proper decomposition before application',
      bestFor: ['All Crops', 'Vegetables', 'Cereals'],
      storage: 'Store in covered pits with proper drainage'
    },
    { 
      name: 'Bone Meal', 
      type: 'organic' as const,
      nutrientN: 4, 
      nutrientP: 20, 
      nutrientK: 0,
      description: 'Natural source of phosphorus and calcium',
      usage: 'Excellent for root development and flowering',
      application: '200-300 kg/hectare',
      timing: 'Apply during land preparation',
      precautions: 'Mix thoroughly with soil before planting',
      bestFor: ['Flowers', 'Fruits', 'Root Vegetables'],
      storage: 'Store in airtight containers in dry place'
    },
    { 
      name: 'Neem Cake', 
      type: 'organic' as const,
      nutrientN: 4, 
      nutrientP: 2, 
      nutrientK: 1,
      description: 'Organic fertilizer with pest control properties',
      usage: 'Dual purpose: fertilizer and pest management',
      application: '250-500 kg/hectare',
      timing: 'Apply during soil preparation or as top dressing',
      precautions: 'Avoid application during heavy rains',
      bestFor: ['Cotton', 'Vegetables', 'Pulses', 'Cereals'],
      storage: 'Store in dry place away from direct sunlight'
    },
    { 
      name: 'Green Manure', 
      type: 'organic' as const,
      nutrientN: 2, 
      nutrientP: 0.5, 
      nutrientK: 2,
      description: 'Made from leguminous plants, rich in nitrogen',
      usage: 'Improves soil fertility and structure',
      application: 'Grow and incorporate 8-10 tonnes/hectare',
      timing: 'Incorporate into soil 45-60 days after sowing',
      precautions: 'Ensure proper decomposition before main crop',
      bestFor: ['Rice', 'Sugarcane', 'Cotton', 'Vegetables'],
      storage: 'Not required - grown and incorporated in field'
    }
  ];

  const CropCard = ({ name, season, duration, waterReq, soil, pH }) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-800">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Season:</span> {season}</p>
          <p><span className="font-medium">Duration:</span> {duration}</p>
          <p><span className="font-medium">Water Requirement:</span> {waterReq}</p>
          <p><span className="font-medium">Soil Type:</span> {soil}</p>
          <p><span className="font-medium">pH Range:</span> {pH}</p>
        </div>
      </CardContent>
    </Card>
  );

  // Update FertilizerCard component to show new details
  const FertilizerCard = ({ name, type, nutrientN, nutrientP, nutrientK, description, usage, application, timing, precautions, bestFor, storage }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-green-800 flex items-center justify-between">
          {name}
          <span className={`text-xs px-2 py-1 rounded ${
            type === 'organic' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {type}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-sm font-medium">N</p>
              <p className="text-lg">{nutrientN}%</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-sm font-medium">P</p>
              <p className="text-lg">{nutrientP}%</p>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="text-sm font-medium">K</p>
              <p className="text-lg">{nutrientK}%</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">{description}</p>
            
            <div className="mt-3">
              <h4 className="font-semibold text-green-700 mb-1">Usage</h4>
              <p className="text-gray-600">{usage}</p>
            </div>
            
            <div className="mt-3">
              <h4 className="font-semibold text-green-700 mb-1">Application Rate</h4>
              <p className="text-gray-600">{application}</p>
            </div>
            
            <div className="mt-3">
              <h4 className="font-semibold text-green-700 mb-1">Timing</h4>
              <p className="text-gray-600">{timing}</p>
            </div>
            
            <div className="mt-3">
              <h4 className="font-semibold text-green-700 mb-1">Precautions</h4>
              <p className="text-gray-600">{precautions}</p>
            </div>
            
            <div className="mt-3">
              <h4 className="font-semibold text-green-700 mb-1">Best For</h4>
              <div className="flex flex-wrap gap-1">
                {bestFor.map((crop, idx) => (
                  <span key={idx} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                    {crop}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-3">
              <h4 className="font-semibold text-green-700 mb-1">Storage</h4>
              <p className="text-gray-600">{storage}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Crop & Fertilizer Library</h1>
        
        <Input
          placeholder="Search crops or fertilizers..."
          className="max-w-md mb-6"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Tabs defaultValue="crops" className="w-full">
          <TabsList>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="fertilizers">Fertilizers</TabsTrigger>
          </TabsList>

          <TabsContent value="crops">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {crops
                .filter(crop => 
                  crop.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((crop, idx) => (
                  <CropCard key={idx} {...crop} />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="fertilizers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fertilizers
                .filter(fertilizer => 
                  fertilizer.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((fertilizer, idx) => (
                  <FertilizerCard key={idx} {...fertilizer} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default CropLibrary;