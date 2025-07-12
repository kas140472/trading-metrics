
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl blur opacity-30 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-6xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Trading Performance
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Analyzer
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Transform your QuantConnect CSV trading data into comprehensive performance reports 
              with <span className="text-blue-400 font-medium">advanced analytics</span>, 
              <span className="text-purple-400 font-medium"> detailed insights</span>, and 
              <span className="text-cyan-400 font-medium"> professional visualizations</span>.
            </p>
          </div>

          {/* Upload Section */}
          <Card className="p-0 mb-12 bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 p-1">
              <div className="bg-slate-900/90 p-8 rounded-lg">
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/25">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Upload CSV File
                    </h2>
                    <p className="text-lg text-gray-300 font-light">
                      Select your QuantConnect trading orders CSV file to begin the analysis.
                    </p>
                  </div>
                  
                  <Separator className="bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="max-w-2xl mx-auto">
                    <FileUpload
                      onFileProcessed={handleFileProcessed}
                      onError={handleError}
                      isProcessing={isProcessing}
                      setIsProcessing={setIsProcessing}
                      onReset={handleReset}
                    />

                    {error && (
                      <div className="p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-xl mt-6 backdrop-blur-sm">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-0.5">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-red-300 text-lg">Processing Error</p>
                            <p className="text-red-200 mt-1 leading-relaxed">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Report Section */}
          <Card className="p-0 bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20 p-1">
              <div className="bg-slate-900/90 p-8 rounded-lg">
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg shadow-green-500/25">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Performance Report
                    </h2>
                    <p className="text-lg text-gray-300 font-light">
                      Your comprehensive trading analysis and insights will appear here.
                    </p>
                  </div>
                  
                  <Separator className="bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <ReportDisplay 
                    report={report} 
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Comprehensive Analytics",
                description: "Detailed performance metrics including win rate, profit factor, and position analysis with visual insights.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                ),
                title: "Futures Trading Focus",
                description: "Specialized analysis for futures contracts with proper multipliers and precise sizing calculations.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: "Downloadable Reports",
                description: "Export your analysis as beautifully formatted text files for further review and record keeping.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-30 group-hover:opacity-50 rounded-2xl blur transition-all duration-300" 
                     style={{background: `linear-gradient(to right, var(--tw-gradient-stops))`}} />
                <div className="relative text-center p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
