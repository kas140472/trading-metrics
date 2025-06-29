
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Trading Performance Analyzer
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Upload your QuantConnect CSV trading data to generate comprehensive 
              performance reports with detailed analytics and insights.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                    Upload CSV File
                  </h2>
                  <p className="text-slate-600">
                    Select your QuantConnect trading orders CSV file to analyze.
                  </p>
                </div>
                
                <Separator />
                
                <FileUpload
                  onFileProcessed={handleFileProcessed}
                  onError={handleError}
                  isProcessing={isProcessing}
                  setIsProcessing={setIsProcessing}
                  onReset={handleReset}
                />

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 font-medium">Error:</p>
                    <p className="text-red-600 text-sm mt-1">{error}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Report Section */}
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                    Performance Report
                  </h2>
                  <p className="text-slate-600">
                    Your detailed trading analysis will appear here.
                  </p>
                </div>
                
                <Separator />
                
                <ReportDisplay 
                  report={report} 
                  isProcessing={isProcessing}
                />
              </div>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Comprehensive Analytics</h3>
              <p className="text-sm text-slate-600">Detailed performance metrics including win rate, profit factor, and position analysis.</p>
            </div>

            <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Futures Trading Focus</h3>
              <p className="text-sm text-slate-600">Specialized analysis for futures contracts with proper multipliers and sizing calculations.</p>
            </div>

            <div className="text-center p-6 bg-white/60 rounded-lg backdrop-blur">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Downloadable Reports</h3>
              <p className="text-sm text-slate-600">Export your analysis as a formatted text file for further review and record keeping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
