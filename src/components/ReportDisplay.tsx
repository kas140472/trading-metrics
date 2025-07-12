
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
      <div className="text-center py-12">
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-xl shadow-blue-500/25">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800">Analyzing Data</h3>
          <p className="text-slate-600 max-w-md mx-auto font-light leading-relaxed">
            Processing your trading data to generate comprehensive insights...
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-12">
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full border-4 border-dashed border-slate-400">
            <TrendingUp className="h-10 w-10 text-slate-500" />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800">Awaiting Data</h3>
          <p className="text-slate-600 max-w-md mx-auto font-light leading-relaxed">
            Upload your CSV file to generate a detailed performance report with analytics and insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with download button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">✓</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Report Ready!</h3>
            <p className="text-slate-600 text-sm font-light">Analysis complete</p>
          </div>
        </div>
        <Button
          onClick={downloadReport}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-2 shadow-lg shadow-green-500/25 transition-all duration-300 rounded-xl transform hover:scale-105"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Report content */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-4 border-b border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Performance Report
          </h4>
          <p className="text-slate-500 mt-1 text-sm">Generated {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          <pre className="text-slate-700 font-mono text-xs whitespace-pre-wrap leading-relaxed bg-white/80 p-4 rounded-xl border border-slate-200 overflow-x-auto">
            {report}
          </pre>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center py-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <p className="text-slate-600 mb-4">Analyze another dataset?</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Upload New File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportDisplay;
