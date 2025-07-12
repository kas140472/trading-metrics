
import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ReportDisplay from '@/components/ReportDisplay';
import { Card } from '@/components/ui/card';

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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Creative floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-bl from-cyan-200/15 to-blue-200/15 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      
      {/* Geometric shapes */}
      <div className="absolute top-32 right-1/3 w-4 h-4 bg-blue-400 rotate-45 opacity-40" />
      <div className="absolute bottom-1/3 left-20 w-6 h-6 bg-purple-400 rounded-full opacity-30" />
      <div className="absolute top-1/2 right-10 w-8 h-1 bg-cyan-400 opacity-40" />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Compact Header */}
        <div className="text-center py-8 px-4">
          <div className="inline-flex items-center justify-center mb-4 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012-2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-bounce" />
          </div>
          
          <h1 className="text-4xl font-black mb-3 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Trading Performance Analytics
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
            Transform your QuantConnect CSV data into comprehensive insights
          </p>
        </div>

        {/* Main Content - Single Row Layout */}
        <div className="flex-1 container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full max-w-7xl mx-auto">
            
            {/* Upload Section - Left Side */}
            <div className="relative">
              <Card className="p-0 bg-white/80 backdrop-blur-xl border-white/60 shadow-2xl shadow-blue-500/10 overflow-hidden transform hover:scale-[1.02] transition-all duration-500 relative h-full">
                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-tr-full" />
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-xl shadow-blue-500/20 transform hover:rotate-12 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                      Upload Your Data
                    </h2>
                    <p className="text-md text-slate-600 font-light">
                      Drop your QuantConnect CSV file
                    </p>
                  </div>
                  
                  <div className="flex-1">
                    <FileUpload
                      onFileProcessed={handleFileProcessed}
                      onError={handleError}
                      isProcessing={isProcessing}
                      setIsProcessing={setIsProcessing}
                      onReset={handleReset}
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-2xl mt-4 shadow-lg">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5 shadow-md">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-red-700">Error</p>
                          <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Report Section - Right Side */}
            <div className="relative">
              <Card className="p-0 bg-white/80 backdrop-blur-xl border-white/60 shadow-2xl shadow-green-500/10 overflow-hidden h-full relative">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-green-500/10 to-transparent rounded-br-full" />
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-emerald-500/10 to-transparent rounded-tl-full" />
                
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4 shadow-xl shadow-green-500/20 transform hover:rotate-12 transition-transform duration-300">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                      Analytics Report
                    </h2>
                    <p className="text-md text-slate-600 font-light">
                      Comprehensive insights and metrics
                    </p>
                  </div>
                  
                  <div className="flex-1 min-h-0">
                    <ReportDisplay 
                      report={report} 
                      isProcessing={isProcessing}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
