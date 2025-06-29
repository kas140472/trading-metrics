
import { Button } from '@/components/ui/button';
import { Download, FileText, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

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
      <div className="flex items-center justify-center h-64 text-center">
        <div className="space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <div>
            <p className="font-medium text-gray-900">Processing your CSV file...</p>
            <p className="text-sm text-gray-600 mt-1">
              Analyzing trades and generating performance report
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex items-center justify-center h-64 text-center">
        <div className="space-y-4">
          <FileText className="h-12 w-12 mx-auto text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">No report generated yet</p>
            <p className="text-sm text-gray-600 mt-1">
              Upload a CSV file to generate your trading performance report
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-green-600" />
          <span className="font-medium text-gray-900">Report Generated</span>
        </div>
        <Button onClick={downloadReport} size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>

      <ScrollArea className="h-96 w-full rounded-md border bg-gray-50 p-4">
        <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap leading-relaxed">
          {report}
        </pre>
      </ScrollArea>

      <div className="text-xs text-gray-500 text-center">
        Report generated successfully. Click download to save as a text file.
      </div>
    </div>
  );
};

export default ReportDisplay;
