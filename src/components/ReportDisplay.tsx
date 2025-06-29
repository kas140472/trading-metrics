
import { Button } from '@/components/ui/button';
import { Download, FileText, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReportDisplayProps {
  report: string | null;
  isProcessing: boolean;
}

interface ParsedReport {
  generatedOn: string;
  overallPerformance: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: string;
    avgGain: string;
    avgLoss: string;
    totalPL: string;
    profitFactor: string;
    avgSize: string;
  };
  positionBreakdown: {
    longTrades: number;
    shortTrades: number;
    longPL: string;
    shortPL: string;
  };
  trades: Array<{
    id: string;
    symbol: string;
    type: string;
    position: string;
    entryTime: string;
    exitTime: string;
    qty: string;
    entry: string;
    exit: string;
    profit: string;
    gainPercent: string;
    sizePercent: string;
  }>;
  performanceByProduct: Array<{
    symbol: string;
    type: string;
    trades: string;
    winPercent: string;
    totalPL: string;
    avgPercent: string;
  }>;
  performanceByPosition: Array<{
    position: string;
    trades: string;
    winPercent: string;
    totalPL: string;
    avgPercent: string;
  }>;
  source: string;
  capitalBase: string;
}

const parseReport = (reportText: string): ParsedReport => {
  const lines = reportText.split('\n');
  
  // Extract generated date
  const generatedLine = lines.find(line => line.includes('Generated on:'));
  const generatedOn = generatedLine ? generatedLine.split('Generated on: ')[1] : '';

  // Extract overall performance
  const overallStart = lines.findIndex(line => line.includes('OVERALL PERFORMANCE'));
  const overallPerformance = {
    totalTrades: parseInt(lines[overallStart + 2]?.split('Total Trades:')[1]?.trim() || '0'),
    winningTrades: parseInt(lines[overallStart + 3]?.split('Winning Trades:')[1]?.trim() || '0'),
    losingTrades: parseInt(lines[overallStart + 4]?.split('Losing Trades:')[1]?.trim() || '0'),
    winRate: lines[overallStart + 5]?.split('Win Rate:')[1]?.trim() || '',
    avgGain: lines[overallStart + 6]?.split('Average Gain:')[1]?.trim() || '',
    avgLoss: lines[overallStart + 7]?.split('Average Loss:')[1]?.trim() || '',
    totalPL: lines[overallStart + 8]?.split('Total P/L:')[1]?.trim() || '',
    profitFactor: lines[overallStart + 9]?.split('Profit Factor:')[1]?.trim() || '',
    avgSize: lines[overallStart + 10]?.split('Average Size:')[1]?.trim() || '',
  };

  // Extract position breakdown
  const positionStart = lines.findIndex(line => line.includes('POSITION BREAKDOWN'));
  const positionBreakdown = {
    longTrades: parseInt(lines[positionStart + 1]?.split('Long Trades:')[1]?.trim() || '0'),
    shortTrades: parseInt(lines[positionStart + 2]?.split('Short Trades:')[1]?.trim() || '0'),
    longPL: lines[positionStart + 3]?.split('Long P/L:')[1]?.trim() || '',
    shortPL: lines[positionStart + 4]?.split('Short P/L:')[1]?.trim() || '',
  };

  // Extract trades
  const tradesStart = lines.findIndex(line => line.includes('REALIZED TRADES'));
  const tradesHeaderStart = tradesStart + 2;
  const trades: ParsedReport['trades'] = [];
  
  for (let i = tradesHeaderStart + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.includes('---') || line.includes('PERFORMANCE') || line.includes('OPEN POSITIONS')) break;
    
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 12) {
      trades.push({
        id: parts[0],
        symbol: parts[1],
        type: parts[2],
        position: parts[3],
        entryTime: `${parts[4]} ${parts[5]}`,
        exitTime: `${parts[6]} ${parts[7]}`,
        qty: parts[8],
        entry: parts[9],
        exit: parts[10],
        profit: parts[11],
        gainPercent: parts[12],
        sizePercent: parts[13],
      });
    }
  }

  // Extract performance by product
  const productStart = lines.findIndex(line => line.includes('PERFORMANCE BY PRODUCT'));
  const performanceByProduct: ParsedReport['performanceByProduct'] = [];
  
  for (let i = productStart + 4; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.includes('---') || line.includes('PERFORMANCE BY POSITION')) break;
    
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 6) {
      performanceByProduct.push({
        symbol: parts[0],
        type: parts[1],
        trades: parts[2],
        winPercent: parts[3],
        totalPL: parts[4],
        avgPercent: parts[5],
      });
    }
  }

  // Extract performance by position
  const positionTypeStart = lines.findIndex(line => line.includes('PERFORMANCE BY POSITION TYPE'));
  const performanceByPosition: ParsedReport['performanceByPosition'] = [];
  
  for (let i = positionTypeStart + 4; i < lines.length; i++) {
    const line = lines[i];
    if (!line || line.includes('---') || line.includes('Source:')) break;
    
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 5) {
      performanceByPosition.push({
        position: parts[0],
        trades: parts[1],
        winPercent: parts[2],
        totalPL: parts[3],
        avgPercent: parts[4],
      });
    }
  }

  // Extract source and capital base
  const sourceLine = lines.find(line => line.includes('Source:'));
  const capitalLine = lines.find(line => line.includes('Capital base:'));
  
  return {
    generatedOn,
    overallPerformance,
    positionBreakdown,
    trades,
    performanceByProduct,
    performanceByPosition,
    source: sourceLine?.split('Source: ')[1] || '',
    capitalBase: capitalLine?.split('Capital base: ')[1] || '',
  };
};

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

  const parsedReport = parseReport(report);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-green-600" />
          <span className="font-medium text-gray-900">Trading Performance Report</span>
        </div>
        <Button onClick={downloadReport} size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download TXT
        </Button>
      </div>

      <ScrollArea className="h-[600px] w-full">
        <div className="space-y-6 pr-4">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">FUTURES TRADING PERFORMANCE REPORT</CardTitle>
              <p className="text-center text-sm text-gray-600">Generated on: {parsedReport.generatedOn}</p>
            </CardHeader>
          </Card>

          {/* Overall Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{parsedReport.overallPerformance.totalTrades}</p>
                  <p className="text-sm text-gray-600">Total Trades</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{parsedReport.overallPerformance.winningTrades}</p>
                  <p className="text-sm text-gray-600">Winning Trades</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{parsedReport.overallPerformance.losingTrades}</p>
                  <p className="text-sm text-gray-600">Losing Trades</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{parsedReport.overallPerformance.winRate}</p>
                  <p className="text-sm text-gray-600">Win Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{parsedReport.overallPerformance.totalPL}</p>
                  <p className="text-sm text-gray-600">Total P/L</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{parsedReport.overallPerformance.profitFactor}</p>
                  <p className="text-sm text-gray-600">Profit Factor</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>Average Gain: <span className="font-medium">{parsedReport.overallPerformance.avgGain}</span></div>
                <div>Average Loss: <span className="font-medium">{parsedReport.overallPerformance.avgLoss}</span></div>
                <div>Average Size: <span className="font-medium">{parsedReport.overallPerformance.avgSize}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Position Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Position Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-blue-600">{parsedReport.positionBreakdown.longTrades}</p>
                  <p className="text-sm text-gray-600">Long Trades</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-red-600">{parsedReport.positionBreakdown.shortTrades}</p>
                  <p className="text-sm text-gray-600">Short Trades</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">{parsedReport.positionBreakdown.longPL}</p>
                  <p className="text-sm text-gray-600">Long P/L</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">{parsedReport.positionBreakdown.shortPL}</p>
                  <p className="text-sm text-gray-600">Short P/L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Realized Trades */}
          {parsedReport.trades.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Realized Trades ({parsedReport.trades.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Entry Time</TableHead>
                        <TableHead>Exit Time</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Entry</TableHead>
                        <TableHead>Exit</TableHead>
                        <TableHead>Profit</TableHead>
                        <TableHead>Gain %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedReport.trades.map((trade, index) => (
                        <TableRow key={index}>
                          <TableCell>{trade.id}</TableCell>
                          <TableCell className="font-medium">{trade.symbol}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs ${
                              trade.position === 'long' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {trade.position}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs">{trade.entryTime}</TableCell>
                          <TableCell className="text-xs">{trade.exitTime}</TableCell>
                          <TableCell>{trade.qty}</TableCell>
                          <TableCell>{trade.entry}</TableCell>
                          <TableCell>{trade.exit}</TableCell>
                          <TableCell className={`font-medium ${
                            trade.profit.includes('-') ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {trade.profit}
                          </TableCell>
                          <TableCell className={`${
                            trade.gainPercent.includes('-') ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {trade.gainPercent}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Performance by Product */}
          {parsedReport.performanceByProduct.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Performance by Product</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Trades</TableHead>
                      <TableHead>Win %</TableHead>
                      <TableHead>Total P/L</TableHead>
                      <TableHead>Avg %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedReport.performanceByProduct.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{product.symbol}</TableCell>
                        <TableCell>{product.type}</TableCell>
                        <TableCell>{product.trades}</TableCell>
                        <TableCell>{product.winPercent}</TableCell>
                        <TableCell className={`font-medium ${
                          product.totalPL.includes('-') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {product.totalPL}
                        </TableCell>
                        <TableCell>{product.avgPercent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Performance by Position Type */}
          {parsedReport.performanceByPosition.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Performance by Position Type</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Trades</TableHead>
                      <TableHead>Win %</TableHead>
                      <TableHead>Total P/L</TableHead>
                      <TableHead>Avg %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedReport.performanceByPosition.map((position, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <span className={`px-2 py-1 rounded text-xs ${
                            position.position === 'Long' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {position.position}
                          </span>
                        </TableCell>
                        <TableCell>{position.trades}</TableCell>
                        <TableCell>{position.winPercent}</TableCell>
                        <TableCell className={`font-medium ${
                          position.totalPL.includes('-') ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {position.totalPL}
                        </TableCell>
                        <TableCell>{position.avgPercent}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600 space-y-1">
                <p>Source: {parsedReport.source}</p>
                <p>Capital base: {parsedReport.capitalBase}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReportDisplay;
