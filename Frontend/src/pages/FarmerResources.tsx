import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Youtube, Info } from 'lucide-react';

const FarmerResources = () => {
  const schemes = [
    {
      name: "PM-KISAN",
      description: "Provides direct income support of ₹6000/year to eligible farmer families, paid in three equal installments.",
      benefits: ["Direct cash transfer", "Minimum documentation", "Covers small & marginal farmers"],
      link: "https://www.pmkisanstatus.com/"
    },
    {
      name: "Soil Health Card",
      description: "Government initiative offering free soil testing and nutrient-based guidance to enhance crop productivity.",
      benefits: ["Free soil testing", "Tailored fertilizer usage", "Improved yields"],
      link: "https://soilhealth.dac.gov.in/"
    },
    {
      name: "PM Fasal Bima Yojana",
      description: "Crop insurance scheme that provides financial support in case of crop loss due to natural calamities.",
      benefits: ["Low premium rates", "Full sum insured", "Covers natural disasters"],
      link: "https://www.myscheme.gov.in/schemes/pmfby"
    }
  ];

  const videos = [
    {
      title: "Modern Farming Techniques",
      channel: "Think School",
      duration: "1:34:46",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3tNOgrWAu6IDqwlI4iktv0mp7EUMNWVYLKQ&s",
      link: "https://www.youtube.com/watch?v=nNP4o1wE6Vo",
      description: "Explore latest equipment and irrigation practices that boost efficiency and reduce cost."
    },
    {
      title: "Organic Farming Guide",
      channel: "Quick Pathshala",
      duration: "05:00",
      thumbnail: "https://paidepo.com/cdn/shop/articles/Organic_Farming.png?v=1642694022",
      link: "https://www.youtube.com/watch?v=yuijJKPVFUs",
      description: "Step-by-step tutorial on transitioning to chemical-free organic farming."
    },
    {
      title: "Use of chemical fertilizers",
      channel: "Gardening is my passion",
      duration: "10:00",
      thumbnail: "https://getfarms.in/assets/images/blog/different-types-of-chemical-fertilizers-used-in-indian-agriculture.webp",
      link: "https://www.youtube.com/watch?v=SVYQGPIbzNE",
      description: "Step-by-step tutorial on transitioning to chemical-free organic farming."
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">👨‍🌾 Farmer Resources</h1>

        {/* ✅ Government Schemes */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🌱 Government Schemes & Subsidies</h2>
          <p className="text-gray-600 mb-6">
            Access support from various central government initiatives that can improve income, yield, and resilience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, idx) => (
              <Card key={idx} className="border-green-200 shadow-sm hover:shadow-md transition">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-green-800">
                    {scheme.name}
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer" title="Visit official site">
                      <ExternalLink className="h-5 w-5 text-green-600 hover:text-green-800" />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700">{scheme.description}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {scheme.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                  <a 
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-green-700 hover:underline"
                  >
                    Learn More →
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ✅ YouTube Farming Tips */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🎥 Farming Tips & Video Tutorials</h2>
          <p className="text-gray-600 mb-6">
            Learn practical farming techniques and sustainable methods directly from trusted agriculture channels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <Card key={idx} className="overflow-hidden border-green-200 shadow-sm hover:shadow-md transition">
                <div className="relative group">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-48 object-cover group-hover:brightness-90 transition"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-green-800">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{video.channel}</p>
                  <p className="text-sm text-gray-700 mb-2">{video.description}</p>
                  <a 
                    href={video.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-red-600 hover:underline text-sm font-medium"
                  >
                    <Youtube className="h-4 w-4 mr-1" />
                    Watch on YouTube
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FarmerResources;
