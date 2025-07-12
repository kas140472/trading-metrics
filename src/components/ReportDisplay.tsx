
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText, TrendingUp } from 'lucide-react';

interface ReportDisplayProps {
  report: string | null;
  isProcessing: boolean;
}

const ReportDisplay = ({ report, isProcessing }: ReportDisplayProps) => {
  const downloadReport = () => {
    if (!report) return;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isProcessing) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8 shadow-xl">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Processing Your Data</h3>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Analyzing your trading data and generating comprehensive performance insights...
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8 border-2 border-dashed border-white/30">
          <TrendingUp className="h-8 w-8 text-gray-400" />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready for Analysis</h3>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Upload your CSV file above to generate a detailed performance report with analytics and insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with download button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Analysis Complete</h3>
            <p className="text-gray-300">Your trading performance report is ready</p>
          </div>
        </div>
        <Button
          onClick={downloadReport}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 shadow-lg shadow-green-500/25 transition-all duration-300"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Report content */}
      <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-6 border-b border-white/10">
          <h4 className="text-lg font-semibold text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Performance Analysis
          </h4>
          <p className="text-gray-400 text-sm mt-1">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="p-6">
          <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed bg-slate-900/50 p-6 rounded-xl border border-white/5 overflow-x-auto">
            {report}
          </pre>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center py-6">
        <p className="text-gray-400 mb-4">Need to analyze another dataset?</p>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
        >
          Upload New File
        </Button>
      </div>
    </div>
  );
};

export default ReportDisplay;
