import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Printer, Loader2, ChevronRight, Menu, X, Bot, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Book, GanttChart, Lightbulb, Sprout, Droplets, Sun, ScanSearch } from 'lucide-react';
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
  icon: JSX.Element;
  content: JSX.Element;
}

interface ChatMessage {
  role: "user" | "bot";
  content: string;
  language?: string;
}

// Gemini client setup
const genAI = new GoogleGenerativeAI("AIzaSyAPYV4Xo4t9CoQG-Amk4f5KgcnuYr7qOGA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const sectionIcons: { [key: string]: JSX.Element } = {
  introduction: <ScanSearch className="w-5 h-5" />,
  crops: <Sprout className="w-5 h-5" />,
  irrigation: <Droplets className="w-5 h-5" />,
  fertilizers: <Sun className="w-5 h-5" />,
  default: <GanttChart className="w-5 h-5" />
};

const ChatBotModal = ({ content }: { content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const systemPrompt = `You are an agriculture expert assistant. Use this context to help farmers:
  ${content}
  
  Guidelines:
  1. Respond in ${language}
  2. Keep answers simple and practical
  3. Use local measurement units
  4. Explain technical terms
  5. Prioritize sustainable practices`;

  const generateResponse = async (userInput: string) => {
    setLoading(true);
    try {
      const fullPrompt = `${systemPrompt}\n\nUser Question: ${userInput}`;
      const result = await model.generateContent(fullPrompt);
      const text = await result.response.text();
      
      setMessages(prev => [
        ...prev,
        { role: "bot", content: text, language }
      ]);
      speak(text);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "bot", content: "Sorry, I'm having trouble connecting. Please try again later." }
      ]);
    }
    setLoading(false);
  };

  const speak = (text: string) => {
    if (synth && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(language);
      synth.speak(utterance);
      setIsSpeaking(true);
      
      utterance.onend = () => setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (synth?.speaking) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  const getLanguageCode = (lang: string) => {
    const codes: { [key: string]: string } = {
      English: "en-US",
      Hindi: "hi-IN",
      Tamil: "ta-IN",
      Telugu: "te-IN",
      Kannada: "kn-IN",
      Malayalam: "ml-IN",
      Bengali: "bn-IN",
      Marathi: "mr-IN"
    };
    return codes[lang] || "en-US";
  };

  return (
    <>
      <Button
        className="fixed bottom-8 right-8 rounded-full p-6 shadow-lg bg-green-600 hover:bg-green-700 text-white"
        onClick={() => setIsOpen(true)}
      >
        <Bot size={24} />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="fixed bottom-24 right-8 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col h-[600px]">
            <div className="bg-green-600 p-4 rounded-t-xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bot className="text-white" />
                <h3 className="text-white font-semibold">Farm Assistant</h3>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-green-700 text-white rounded px-2 py-1 text-sm ml-2"
                >
                  {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam", "Bengali", "Marathi"].map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  stopSpeaking();
                }}
                className="text-white hover:bg-green-700"
              >
                <X size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.role === "bot" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 p-1 h-auto text-gray-500 hover:text-green-600"
                        onClick={() => isSpeaking ? stopSpeaking() : speak(msg.content)}
                      >
                        {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!input.trim()) return;
                  
                  const userMessage = input;
                  setMessages(prev => [...prev, { role: "user", content: userMessage }]);
                  setInput("");
                  await generateResponse(userMessage);
                }}
              >
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about farming practices..."
                    className="resize-none"
                    disabled={loading}
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Send"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});

  const [formData, setFormData] = useState<SoilFormData | null>(null);
  const [responseData, setResponseData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handlePrint = () => window.print();
  
  const handleDownload = () => {
    const cleanContent = responseData.replace(/\*\*/g, '');
    const element = document.createElement("a");
    const file = new Blob([`Smart Farming Recommendations\n\nLocation: ${formData?.state}, ${formData?.district}, ${formData?.block}\nSeason: ${formData?.season}\nSoil Type: ${formData?.soilType}\n\n${cleanContent}`], 
                        { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "farming_recommendations.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionRefs.current[sectionId]?.current) {
      sectionRefs.current[sectionId].current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sections.length) return;
      
      let closestSection = sections[0].id;
      let closestDistance = Infinity;

      sections.forEach(section => {
        const ref = sectionRefs.current[section.id];
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section.id;
          }
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  useEffect(() => {
    const locationState = location.state as {
      formData: SoilFormData;
      geminiResponse: string;
    };

    if (!locationState?.formData || !locationState.geminiResponse) {
      setError("Form data or AI response is missing.");
      setLoading(false);
      return;
    }

    setFormData(locationState.formData);
    setResponseData(locationState.geminiResponse);
    parseResponse(locationState.geminiResponse);
    
    toast({
      title: "Recommendations Ready",
      description: "Personalized results have been loaded successfully.",
    });
    
    setLoading(false);
  }, [location.state, toast]);

  const parseResponse = (response: string) => {
    const cleanedResponse = response.replace(/\*\*/g, '');
    const sectionMatches = cleanedResponse.split(/(\d+\.\s+[^:]+):/g);
    
    const parsedSections: Section[] = [];
    let introText = sectionMatches[0].trim();
    
    if (introText) {
      parsedSections.push({
        id: "introduction",
        title: "Overview",
        icon: sectionIcons.introduction,
        content: renderSectionContent(introText)
      });
    }
    
    for (let i = 1; i < sectionMatches.length; i += 2) {
      if (i + 1 < sectionMatches.length) {
        const title = sectionMatches[i].replace(/^\d+\.\s/, '').trim();
        const content = sectionMatches[i + 1].trim();
        const id = `section-${title.toLowerCase().replace(/\s+/g, '-')}`;
        
        const iconKey = title.toLowerCase().includes('crop') ? 'crops' :
                        title.toLowerCase().includes('irrigation') ? 'irrigation' :
                        title.toLowerCase().includes('fertilizer') ? 'fertilizers' : 'default';

        parsedSections.push({
          id,
          title,
          icon: sectionIcons[iconKey],
          content: renderSectionContent(content)
        });
      }
    }
    
    setSections(parsedSections);
    if (parsedSections.length > 0) {
      setActiveSection(parsedSections[0].id);
    }
  };

  const renderSectionContent = (content: string) => {
    const processedContent = content
      .replace(/\*(?=\s)/g, '•')
      .replace(/\n\s*\n/g, '\n')
      .split(/(•\s.*(?:\n|$))/g)
      .filter(Boolean);

    return (
      <div className="prose prose-green max-w-none">
        {processedContent.map((part, index) => {
          if (part.startsWith('•')) {
            return (
              <ul key={index} className="space-y-2 pl-5 my-3">
                {part.split('\n')
                  .filter(line => line.trim())
                  .map((line, idx) => (
                    <li key={idx} className="relative pl-3 text-gray-700">
                      <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-green-600 rounded-full" />
                      {line.replace('•', '').trim()}
                    </li>
                  ))}
              </ul>
            );
          }
          return (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {part.trim()}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-green-50/20 to-gray-50">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed top-16 left-4 z-20 print:hidden">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white shadow-lg border-green-300/50 hover:bg-green-50"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        
        {/* Sidebar navigation */}
        <div className={`
          fixed md:relative z-10
          w-64 md:w-72 shrink-0 bg-white/95 backdrop-blur-md
          transition-transform duration-300 ease-in-out
          border-r border-green-200/50
          print:hidden
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          h-screen overflow-y-auto
        `}>
          <div className="sticky top-0 p-4 bg-white/90 border-b border-green-100/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-green-800">Contents</h2>
              <Button 
                variant="ghost" 
                size="sm"
                className="md:hidden text-green-700 hover:bg-green-100/50" 
                onClick={() => setSidebarOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <nav className="p-4">
            <div className="mb-6 border-b border-green-100/30 pb-4">
              <h3 className="text-xs uppercase tracking-wider text-green-600/80 font-semibold mb-2">Location Details</h3>
              {formData && (
                <dl className="text-sm space-y-1.5 text-gray-600">
                  <div className="flex justify-between">
                    <dt className="font-medium">State:</dt>
                    <dd className="text-green-700">{formData.state}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">District:</dt>
                    <dd className="text-green-700">{formData.district}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Block:</dt>
                    <dd className="text-green-700">{formData.block}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Season:</dt>
                    <dd className="text-green-700">{formData.season}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Soil Type:</dt>
                    <dd className="text-green-700 capitalize">{formData.soilType.toLowerCase()}</dd>
                  </div>
                </dl>
              )}
            </div>
            
            <h3 className="text-xs uppercase tracking-wider text-green-600/80 font-semibold mb-3">Report Sections</h3>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      scrollToSection(section.id);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2
                      transition-all duration-200 text-sm
                      ${activeSection === section.id 
                        ? 'bg-green-600/10 text-green-800 font-semibold ring-1 ring-green-600/20'
                        : 'hover:bg-green-50/50 text-gray-600 hover:text-green-800'}
                    `}
                  >
                    <span className="text-green-700">{section.icon}</span>
                    <span className="truncate">{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300/50 hover:bg-green-100/50 hover:border-green-400/50"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 opacity-80" />
                Print Report
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300/50 hover:bg-green-100/50 hover:border-green-400/50"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 opacity-80" />
                Download PDF
              </Button>
              
              <Link to="/" className="block mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full flex items-center justify-center gap-2 text-green-800 border-green-300/50 hover:bg-green-100/50 hover:border-green-400/50"
                >
                  <ArrowLeft className="h-4 w-4 opacity-80" />
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
            <div className="bg-white/90 backdrop-blur-sm border border-green-200/50 rounded-2xl shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-green-900 mb-2 flex items-center gap-3">
                <span className="text-2xl">🌱</span> 
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  Smart Farming Plan
                </span>
              </h1>
              <p className="text-green-700/90 text-base leading-relaxed">
                Custom agricultural recommendations generated for your specific location and soil conditions.
                Optimized for {formData?.season.toLowerCase()} season cultivation and {formData?.soilType.toLowerCase()} soil management.
              </p>
            </div>

            {loading && (
              <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-2xl p-6 text-green-700 font-medium flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing soil data and generating recommendations...
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-700 p-6 rounded-2xl shadow-sm font-medium border border-red-200/80">
                ❌ {error}
              </div>
            )}

            {!loading && !error && (
              <div className="space-y-6">
                {sections.map((section) => (
                  <div 
                    key={section.id} 
                    id={section.id}
                    ref={el => {
                      if (!sectionRefs.current[section.id]) {
                        sectionRefs.current[section.id] = { current: el };
                      }
                    }}
                    className="bg-white/90 backdrop-blur-sm border border-green-200/50 rounded-2xl shadow-sm overflow-hidden scroll-mt-24"
                  >
                    <div className="bg-gradient-to-r from-green-50/50 to-green-100/20 px-6 py-4 border-b border-green-200/30 flex items-center gap-3">
                      <span className="text-green-700">{section.icon}</span>
                      <h2 className="text-xl font-bold text-green-900">{section.title}</h2>
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

        {/* Floating action buttons */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-green-200/50 print:hidden">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-green-800 hover:bg-green-50/50 border-green-300/50 hover:border-green-400/50"
            onClick={() => navigate('/visualization', { state: { formData, responseData } })}
          >
            <BarChart className="h-4 w-4 opacity-80" />
            Visualize Data
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 text-green-800 hover:bg-green-50/50 border-green-300/50 hover:border-green-400/50"
            onClick={() => navigate('/crop-library')}
          >
            <Book className="h-4 w-4 opacity-80" />
            Crop Library
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2 text-green-800 hover:bg-green-50/50 border-green-300/50 hover:border-green-400/50"
            onClick={() => navigate('/farmer-resources')}
          >
            <Lightbulb className="h-4 w-4 opacity-80" />
            Resources
          </Button>
        </div>

        {/* Chatbot */}
        {!loading && !error && (
          <ChatBotModal content={responseData} />
        )}
      </div>
    </PageLayout>
  );
};

export default Results;