import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Printer, Loader2, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Book, GanttChart, Lightbulb } from 'lucide-react';
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";

// Types
interface SoilFormData {
  state: string;
  district: string;
  block: string;
  season: string;
  soilType: string;
}

interface Section {
  id: string;
  title: string;
  content: JSX.Element;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Add this line
  const { toast } = useToast();
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  const [formData, setFormData] = useState<SoilFormData | null>(null);
  const [responseData, setResponseData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to download as text file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([`Smart Farming Recommendations\n\nLocation: ${formData?.state}, ${formData?.district}, ${formData?.block}\nSeason: ${formData?.season}\nSoil Type: ${formData?.soilType}\n\n${responseData}`], 
                          { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "farming_recommendations.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    if (sectionRefs.current[sectionId] && sectionRefs.current[sectionId].current) {
      sectionRefs.current[sectionId].current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  // Track scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;
      
      // Find the section closest to the top of the viewport
      let closestSection = sections[0].id;
      let closestDistance = Infinity;

      for (const section of sections) {
        const ref = sectionRefs.current[section.id];
        if (ref && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section.id;
          }
        }
      }

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    const locationState = location.state as {
      formData: SoilFormData;
      geminiResponse: string;
    };

    if (!locationState || !locationState.formData || !locationState.geminiResponse) {
      setError("Form data or AI response is missing.");
      setLoading(false);
      return;
    }

    setFormData(locationState.formData);
    setResponseData(locationState.geminiResponse);
    
    // Parse and format the response into sections
    parseResponse(locationState.geminiResponse);
    
    toast({
      title: "Recommendations Ready",
      description: "Personalized results have been loaded successfully.",
    });
    
    setLoading(false);
  }, [location.state, toast]);

  // Parse the response into sections
  const parseResponse = (response: string) => {
    const sectionMatches = response.split(/\*\*\d+\.\s+([^:]+):\*\*/g);
    
    // If we couldn't parse properly, use the full content as one section
    if (sectionMatches.length <= 1) {
      const singleSection = {
        id: "recommendations",
        title: "Recommendations",
        content: <div className="whitespace-pre-wrap">{response}</div>
      };
      
      sectionRefs.current["recommendations"] = React.createRef();
      setSections([singleSection]);
      setActiveSection("recommendations");
      return;
    }

    // Add introduction if exists
    const parsedSections: Section[] = [];
    let introText = sectionMatches[0].trim();
    
    if (introText) {
      const introSection = {
        id: "introduction",
        title: "Introduction",
        content: renderSectionContent(introText)
      };
      parsedSections.push(introSection);
      sectionRefs.current["introduction"] = React.createRef();
    }
    
    // Process each section
    for (let i = 1; i < sectionMatches.length; i += 2) {
      if (i + 1 < sectionMatches.length) {
        const title = sectionMatches[i];
        const content = sectionMatches[i + 1];
        const id = `section-${i}`;
        
        const section = {
          id,
          title,
          content: renderSectionContent(content)
        };
        
        parsedSections.push(section);
        sectionRefs.current[id] = React.createRef();
      }
    }
    
    setSections(parsedSections);
    
    // Set initial active section
    if (parsedSections.length > 0) {
      setActiveSection(parsedSections[0].id);
    }
  };

  // Helper function to render section content with proper formatting
  const renderSectionContent = (content: string) => {
    // Process lists
    let processedContent = content.replace(/\*\s+(.*?)(?=\n\*\s+|\n\n|\n$|$)/gs, '<li>$1</li>');
    
    // Process subsections
    const parts = processedContent.split(/\*\*([^*]+)\*\*/g);
    
    const renderedContent = parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a subsection title
        return <h3 key={index} className="font-semibold text-lg text-green-700 mt-4 mb-2">{part}</h3>;
      } else if (part.trim()) {
        // This is content
        // Check if this part contains list items
        if (part.includes('<li>')) {
          const listItems = part.split('<li>').map((item, idx) => {
            if (idx === 0) return null; // Skip the first split which is before any list item
            // Remove the closing </li> tag if it exists
            const cleanItem = item.replace('</li>', '').trim();
            if (!cleanItem) return null;
            return <li key={idx} className="ml-6 mb-1 list-disc">{cleanItem}</li>;
          }).filter(Boolean);
          
          return <ul key={index} className="mt-2 mb-4">{listItems}</ul>;
        }
        
        // Regular paragraph content
        const paragraphs = part.split('\n\n').filter(p => p.trim());
        return (
          <React.Fragment key={index}>
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-3 text-gray-700">{p.trim()}</p>
            ))}
          </React.Fragment>
        );
      }
      return null;
    });

    return <div className="prose max-w-none">{renderedContent}</div>;
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed top-16 left-4 z-20 print:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white shadow-md border-green-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        
        {/* Sidebar navigation */}
        <div className={`
          fixed md:relative z-10
          w-64 md:w-72 shrink-0 bg-white shadow-md md:shadow-none
          transition-all duration-300 ease-in-out
          border-r border-green-100
          print:hidden
          ${sidebarOpen ? 'left-0' : '-left-72'}
          h-screen overflow-y-auto
        `}>
          <div className="sticky top-0 p-4 bg-white border-b border-green-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-green-800">Contents</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="md:hidden" 
                onClick={() => setSidebarOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <nav className="p-4">
            <div className="mb-6 border-b border-green-100 pb-4">
              <h3 className="text-xs uppercase tracking-wider text-green-600 font-semibold mb-2">Location</h3>
              {formData && (
                <div className="text-sm text-gray-700">
                  <p className="mb-1"><span className="font-medium">State:</span> {formData.state}</p>
                  <p className="mb-1"><span className="font-medium">District:</span> {formData.district}</p>
                  <p className="mb-1"><span className="font-medium">Block:</span> {formData.block}</p>
                  <p className="mb-1"><span className="font-medium">Season:</span> {formData.season}</p>
                  <p><span className="font-medium">Soil Type:</span> {formData.soilType}</p>
                </div>
              )}
            </div>
            
            <h3 className="text-xs uppercase tracking-wider text-green-600 font-semibold mb-3">Navigation</h3>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      scrollToSection(section.id);
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg flex items-center
                      transition-colors duration-150 text-sm
                      ${activeSection === section.id 
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'hover:bg-gray-100 text-gray-700'}
                    `}
                  >
                    <ChevronRight size={16} className={`
                      mr-1 transition-transform
                      ${activeSection === section.id ? 'text-green-600' : 'text-gray-400'}
                    `} />
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300 hover:bg-green-100"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                Print Recommendations
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300 hover:bg-green-100"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                Download as Text
              </Button>
              
              <Link to="/" className="block mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300 hover:bg-green-100"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Input
                </Button>
              </Link>
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="flex-grow p-4 md:p-6 pt-20 md:pt-24 pb-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-white border border-green-200 rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-green-800 mb-2 flex items-center gap-2">
                <span className="text-2xl">🌾</span> Smart Farming Recommendations
              </h1>
              <p className="text-green-700 text-base">
                Based on your provided soil and location inputs, here are AI-powered suggestions
                tailored for better yield and sustainability.
              </p>
            </div>

            {loading && (
              <div className="bg-white border border-green-200 rounded-xl shadow-sm p-6 text-green-700 font-medium flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Preparing your eco-smart farming recommendations...
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 p-6 rounded-xl shadow-sm font-medium border border-red-200">
                ❌ {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-6">
                {sections.map((section) => (
                  <div 
                    key={section.id} 
                    id={section.id}
                    ref={sectionRefs.current[section.id]} 
                    className="bg-white border border-green-200 rounded-xl shadow-sm overflow-hidden scroll-mt-24"
                  >
                    <div className="bg-green-50 px-6 py-3 border-b border-green-100">
                      <h2 className="text-xl font-bold text-green-800">{section.title}</h2>
                    </div>
                    <div className="p-6">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white p-4 rounded-lg shadow-lg border border-green-100 print:hidden">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/visualization', { state: { formData, responseData } })}
          >
            <BarChart className="h-4 w-4" />
            Visualize Data
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/crop-library')}
          >
            <Book className="h-4 w-4" />
            Crop Library
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate('/farmer-resources')}
          >
            <Lightbulb className="h-4 w-4" />
            Farmer Resources
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Results;