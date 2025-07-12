
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
      <div className="text-center py-20">
        <div className="relative mb-12">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-2xl shadow-blue-500/25">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full animate-pulse" />
        </div>
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-slate-800">Analyzing Your Trading Data</h3>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Our advanced algorithms are processing your data to generate comprehensive performance insights...
          </p>
          <div className="flex justify-center space-x-3 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-20">
        <div className="relative mb-12">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full border-4 border-dashed border-slate-400">
            <TrendingUp className="h-12 w-12 text-slate-500" />
          </div>
          <div className="absolute top-0 right-0 text-2xl">📊</div>
          <div className="absolute bottom-0 left-0 text-2xl">📈</div>
        </div>
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-slate-800">Ready for Analysis</h3>
          <p className="text-slate-600 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Upload your CSV file above to generate a detailed performance report with comprehensive analytics and actionable insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header with download button */}
      <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-200 shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-green-500/25">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs">✓</span>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">Analysis Complete!</h3>
            <p className="text-slate-600 text-lg font-light">Your comprehensive trading report is ready</p>
          </div>
        </div>
        <Button
          onClick={downloadReport}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 shadow-xl shadow-green-500/25 transition-all duration-300 rounded-2xl transform hover:scale-105"
        >
          <Download className="mr-3 h-5 w-5" />
          Download Report
        </Button>
      </div>

      {/* Report content */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 backdrop-blur-sm rounded-3xl border border-slate-200 overflow-hidden shadow-2xl shadow-slate-500/10">
        <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-8 border-b border-slate-200">
          <h4 className="text-2xl font-bold text-slate-800 flex items-center">
            <svg className="w-7 h-7 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Performance Analysis Report
          </h4>
          <p className="text-slate-500 mt-2 text-lg">Generated on {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        
        <div className="p-8">
          <pre className="text-slate-700 font-mono text-sm whitespace-pre-wrap leading-relaxed bg-white/80 p-8 rounded-2xl border border-slate-200 overflow-x-auto shadow-inner">
            {report}
          </pre>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center py-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-200">
          <p className="text-slate-600 mb-6 text-lg">Need to analyze another dataset?</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Upload New File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportDisplay;
