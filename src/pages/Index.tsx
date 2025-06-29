
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Trading Performance Analyzer
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform your QuantConnect CSV trading data into comprehensive 
              performance reports with detailed analytics, insights, and professional visualizations.
            </p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-10 hover:shadow-2xl transition-all duration-300">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">
                  Upload CSV File
                </h2>
                <p className="text-lg text-slate-600">
                  Select your QuantConnect trading orders CSV file to begin the analysis.
                </p>
              </div>
              
              <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              
              <div className="max-w-2xl mx-auto">
                <FileUpload
                  onFileProcessed={handleFileProcessed}
                  onError={handleError}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                  onReset={handleReset}
                />

                {error && (
                  <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-400 rounded-r-lg mt-6 animate-fade-in">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-semibold text-red-800">Processing Error</p>
                        <p className="text-red-700 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Report Section */}
          <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-3">
                  Performance Report
                </h2>
                <p className="text-lg text-slate-600">
                  Your comprehensive trading analysis and insights will appear here.
                </p>
              </div>
              
              <Separator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              
              <ReportDisplay 
                report={report} 
                isProcessing={isProcessing}
              />
            </div>
          </Card>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white/70 rounded-2xl backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Comprehensive Analytics</h3>
              <p className="text-slate-600 leading-relaxed">Detailed performance metrics including win rate, profit factor, and position analysis with visual insights.</p>
            </div>

            <div className="group text-center p-8 bg-white/70 rounded-2xl backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Futures Trading Focus</h3>
              <p className="text-slate-600 leading-relaxed">Specialized analysis for futures contracts with proper multipliers and precise sizing calculations.</p>
            </div>

            <div className="group text-center p-8 bg-white/70 rounded-2xl backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Downloadable Reports</h3>
              <p className="text-slate-600 leading-relaxed">Export your analysis as beautifully formatted text files for further review and record keeping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
