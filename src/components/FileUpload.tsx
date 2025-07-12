
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
    <div className="space-y-6">
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-400 bg-blue-500/10 scale-105' 
              : 'border-gray-600 hover:border-gray-500 bg-white/5'
          } backdrop-blur-sm`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
              <Upload className="h-8 w-8 text-white" />
            </div>
            
            <div>
              <p className="text-2xl font-bold text-white mb-3">
                Drop your CSV file here
              </p>
              <p className="text-gray-300 mb-6 text-lg">
                or click to browse files
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 px-8 py-3 text-lg font-medium backdrop-blur-sm transition-all duration-300"
            >
              Select File
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            
            <p className="text-sm text-gray-400 mt-6 font-light">
              Maximum file size: 10MB • Supported format: CSV
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white text-lg">{selectedFile.name}</p>
                <p className="text-gray-300">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFile}
              disabled={isProcessing}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            onClick={processFile} 
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 text-lg shadow-xl shadow-blue-500/25 transition-all duration-300"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Report
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
