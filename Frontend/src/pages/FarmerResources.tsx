import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Youtube } from 'lucide-react';

const FarmerResources = () => {
  const schemes = [
    {
      name: "PM-KISAN",
      description: "Direct income support of ₹6000 per year to farmer families",
      link: "https://pmkisan.gov.in/"
    },
    {
      name: "Soil Health Card",
      description: "Free soil testing and recommendations for farmers",
      link: "https://soilhealth.dac.gov.in/"
    },
    {
      name: "PM Fasal Bima Yojana",
      description: "Crop insurance scheme for farmers",
      link: "https://pmfby.gov.in/"
    }
  ];

  const videos = [
    {
      title: "Modern Farming Techniques",
      channel: "Agriculture Today",
      thumbnail: "https://img.youtube.com/vi/SAMPLE1/maxresdefault.jpg",
      link: "https://youtube.com/watch?v=SAMPLE1"
    },
    {
      title: "Organic Farming Guide",
      channel: "Krishi Darshan",
      thumbnail: "https://img.youtube.com/vi/SAMPLE2/maxresdefault.jpg",
      link: "https://youtube.com/watch?v=SAMPLE2"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Farmer Resources</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Government Schemes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {scheme.name}
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{scheme.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Farming Tips & Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <Card key={idx} className="overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.channel}</p>
                  <a 
                    href={video.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-red-600 mt-2"
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