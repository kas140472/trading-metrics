
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ReportDisplay from '@/components/ReportDisplay';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [report, setReport] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileProcessed = (reportContent: string) => {
    setReport(reportContent);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setReport(null);
  };

  const handleReset = () => {
    setReport(null);
    setError(null);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Creative floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-bl from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-tr from-purple-200/25 to-pink-200/25 rounded-full blur-3xl" />
      
      {/* Geometric shapes */}
      <div className="absolute top-32 right-1/3 w-4 h-4 bg-blue-400 rotate-45 opacity-60" />
      <div className="absolute bottom-1/3 left-20 w-6 h-6 bg-purple-400 rounded-full opacity-40" />
      <div className="absolute top-1/2 right-10 w-8 h-1 bg-cyan-400 opacity-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Creative Header Section */}
          <div className="text-center mb-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-full blur-3xl scale-150" />
            
            <div className="relative mb-12">
              <div className="inline-flex items-center justify-center mb-8 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-7xl font-black mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent block">
                Trading Performance
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block transform -skew-x-6 inline-block">
                Analytics
              </span>
            </h1>
            
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-2xl text-slate-600 leading-relaxed font-light">
                Transform your QuantConnect CSV data into 
                <span className="font-semibold text-blue-600 mx-2 relative">
                  comprehensive insights
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                </span>
                with advanced analytics and professional visualizations
              </p>
            </div>

            {/* Creative stats or features mini-cards */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                { icon: "⚡", text: "Instant Analysis", color: "from-yellow-400 to-orange-400" },
                { icon: "📊", text: "Visual Reports", color: "from-blue-400 to-cyan-400" },
                { icon: "🎯", text: "Precise Metrics", color: "from-purple-400 to-pink-400" },
              ].map((item, index) => (
                <div key={index} className={`bg-gradient-to-r ${item.color} text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                  <span className="mr-2">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Section - Creative Card */}
          <Card className="p-0 mb-16 bg-white/70 backdrop-blur-xl border-white/40 shadow-2xl shadow-blue-500/10 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 p-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg">
                <div className="p-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-xl shadow-blue-500/20 transform hover:rotate-12 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">
                      Upload Your Data
                    </h2>
                    <p className="text-xl text-slate-600 font-light max-w-lg mx-auto">
                      Drop your QuantConnect CSV file and watch the magic happen
                    </p>
                  </div>
                  
                  <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />
                  
                  <div className="max-w-2xl mx-auto">
                    <FileUpload
                      onFileProcessed={handleFileProcessed}
                      onError={handleError}
                      isProcessing={isProcessing}
                      setIsProcessing={setIsProcessing}
                      onReset={handleReset}
                    />

                    {error && (
                      <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl mt-8 shadow-lg">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-0.5 shadow-md">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-red-700 text-lg">Oops! Something went wrong</p>
                            <p className="text-red-600 mt-2 leading-relaxed">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Report Section - Creative Card */}
          <Card className="p-0 bg-white/70 backdrop-blur-xl border-white/40 shadow-2xl shadow-green-500/10 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 p-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg">
                <div className="p-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-xl shadow-green-500/20 transform hover:rotate-12 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">
                      Your Analytics Report
                    </h2>
                    <p className="text-xl text-slate-600 font-light max-w-lg mx-auto">
                      Comprehensive insights and performance metrics
                    </p>
                  </div>
                  
                  <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8" />
                  
                  <ReportDisplay 
                    report={report} 
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Creative Features Grid */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📈",
                title: "Advanced Analytics",
                description: "Deep dive into performance metrics with comprehensive win rates, profit factors, and detailed position analysis.",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50"
              },
              {
                icon: "🎯",
                title: "Futures Precision",
                description: "Specialized calculations for futures contracts with accurate multipliers and precise position sizing.",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50"
              },
              {
                icon: "💾",
                title: "Export Ready",
                description: "Download beautifully formatted reports for record keeping, sharing, and further analysis.",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
                <div className={`relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 border border-white/50 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl`}>
                  <div className="text-center">
                    <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-light">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Creative bottom decoration */}
          <div className="mt-24 text-center">
            <div className="inline-flex items-center space-x-2 text-slate-400">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-300 rounded-full" />
              <span className="text-sm font-light">Powered by Advanced Analytics</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
