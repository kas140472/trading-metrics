
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { processCSV } from '@/utils/csvProcessor';

interface FileUploadProps {
  onFileProcessed: (report: string) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  onReset: () => void;
}

const FileUpload = ({ onFileProcessed, onError, isProcessing, setIsProcessing, onReset }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    console.log('Selected file:', file.name, file.type, file.size);
    
    if (!file.name.toLowerCase().endsWith('.csv')) {
      onError('Please select a CSV file.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      onError('File size must be less than 10MB.');
      return;
    }
    
    setSelectedFile(file);
    onError(''); // Clear any previous errors
  };

  const processFile = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    try {
      console.log('Processing file:', selectedFile.name);
      const report = await processCSV(selectedFile);
      console.log('Processing complete, report length:', report.length);
      onFileProcessed(report);
    } catch (error) {
      console.error('Processing error:', error);
      onError(error instanceof Error ? error.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetFile = () => {
    setSelectedFile(null);
    onReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-500 ${
            dragActive 
              ? 'border-blue-400 bg-blue-50 scale-105 shadow-xl shadow-blue-500/20' 
              : 'border-slate-300 hover:border-blue-300 bg-gradient-to-br from-slate-50/50 to-blue-50/50 hover:shadow-xl hover:shadow-blue-500/10'
          } backdrop-blur-sm`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/25 transform hover:rotate-12 transition-transform duration-300">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-8 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
            </div>
            
            <div>
              <p className="text-3xl font-bold text-slate-800 mb-4">
                Drop your CSV file here
              </p>
              <p className="text-slate-600 mb-8 text-lg font-light">
                or click the button below to browse
              </p>
            </div>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-10 py-4 text-lg rounded-2xl shadow-xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 border-0"
            >
              <Upload className="mr-3 h-5 w-5" />
              Choose File
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            
            <p className="text-sm text-slate-500 mt-8 font-light">
              Maximum file size: 10MB • Supported format: CSV
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between p-8 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm rounded-3xl border border-green-200 shadow-xl shadow-green-500/10">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-xl">{selectedFile.name}</p>
                <p className="text-slate-600 text-lg">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFile}
              disabled={isProcessing}
              className="text-slate-500 hover:text-slate-700 hover:bg-white/50 rounded-xl"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <Button 
            onClick={processFile} 
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 text-xl shadow-2xl shadow-blue-500/25 transition-all duration-300 rounded-2xl transform hover:scale-105"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-4 h-6 w-6 animate-spin" />
                Analyzing your data...
              </>
            ) : (
              <>
                <svg className="mr-4 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Analytics Report
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
