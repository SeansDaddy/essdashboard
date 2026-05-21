import React, { useState } from 'react';
import { TrendData } from '../types';
import { LineChart, Activity, Zap } from 'lucide-react';

interface PerformanceTrendPanelProps {
  trendData: TrendData[];
}

export default function PerformanceTrendPanel({ trendData }: PerformanceTrendPanelProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // SVG parameters
  const width = 600;
  const height = 150;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  // Max value calculations
  const maxAlarm = 500; // standard ceiling
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Coordinates mapping functions
  const getX = (index: number) => {
    return paddingLeft + (index / (trendData.length - 1)) * chartWidth;
  };

  const getYAlarm = (val: number) => {
    return paddingTop + chartHeight - (val / maxAlarm) * chartHeight;
  };

  const getYRate = (val: number) => {
    // successRate is 0 to 100
    return paddingTop + chartHeight - (val / 100) * chartHeight;
  };

  // Construct SVG paths
  const alarmPoints = trendData.map((d, i) => `${getX(i)},${getYAlarm(d.alarmCount)}`).join(' ');
  const ratePoints = trendData.map((d, i) => `${getX(i)},${getYRate(d.successRate)}`).join(' ');

  // Gradient definitions ID
  const alarmGradId = 'alarm-gradient';
  const rateGradId = 'rate-gradient';

  return (
    <div id="performance-trend-panel" className="relative flex flex-col h-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Decorative cyber grid headers */}
      <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />

      {/* Title */}
      <div className="flex items-center justify-between mb-2 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            系统版本及性能趋势
          </span>
          <LineChart size={14} className="text-cyan-400/80 animate-pulse" />
        </div>
        
        {/* Colors Legend */}
        <div className="flex items-center gap-3 text-[10px] font-sans">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-[#00f0ff] rounded-full inline-block" />
            <span className="text-[#5f759e]">告警发生率 (次/日)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-1 bg-[#1e40a6] rounded-full inline-block" />
            <span className="text-[#5f759e]">充放电系统效率 (%)</span>
          </div>
        </div>
      </div>

      {/* Line Chart Area */}
      <div className="flex-1 min-h-[140px] relative select-none">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full"
        >
          {/* Gradients */}
          <defs>
            <linearGradient id={alarmGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={rateGradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e40a6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1e40a6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = paddingTop + ratio * chartHeight;
            const label = Math.round(maxAlarm - ratio * maxAlarm);
            return (
              <g key={i} className="opacity-40">
                <line 
                  x1={paddingLeft} 
                  y1={y} 
                  x2={width - paddingRight} 
                  y2={y} 
                  stroke="#142544" 
                  strokeWidth="1" 
                  strokeDasharray="2,4" 
                />
                <text 
                  x={paddingLeft - 8} 
                  y={y + 3} 
                  fill="#4d5f80" 
                  fontSize="8" 
                  fontFamily="monospace" 
                  textAnchor="end"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* SVG Poly-Areas for smooth look */}
          <polygon
            points={`${getX(0)},${paddingTop + chartHeight} ${alarmPoints} ${getX(trendData.length - 1)},${paddingTop + chartHeight}`}
            fill={`url(#${alarmGradId})`}
          />
          <polygon
            points={`${getX(0)},${paddingTop + chartHeight} ${ratePoints} ${getX(trendData.length - 1)},${paddingTop + chartHeight}`}
            fill={`url(#${rateGradId})`}
          />

          {/* Lines */}
          <polyline
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.8"
            points={alarmPoints}
            className="drop-shadow-[0_0_4px_rgba(6,182,212,0.6)]"
          />
          <polyline
            fill="none"
            stroke="#1e40a6"
            strokeWidth="1.5"
            points={ratePoints}
          />

          {/* Markers / Hover nodes */}
          {trendData.map((d, i) => {
            const alarmX = getX(i);
            const alarmY = getYAlarm(d.alarmCount);
            const rateY = getYRate(d.successRate);
            
            return (
              <g key={i}>
                {/* Horizontal hover column focus */}
                {hoverIndex === i && (
                  <line
                    x1={alarmX}
                    y1={paddingTop}
                    x2={alarmX}
                    y2={paddingTop + chartHeight}
                    stroke="rgba(6, 182, 212, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                )}

                {/* Alarm marker */}
                <circle
                  cx={alarmX}
                  cy={alarmY}
                  r={hoverIndex === i ? '5' : '3'}
                  fill="#020617"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="cursor-pointer transition-all duration-150"
                />

                {/* Rate marker */}
                <circle
                  cx={alarmX}
                  cy={rateY}
                  r={hoverIndex === i ? '4' : '2'}
                  fill="#020617"
                  stroke="#1e40a6"
                  strokeWidth="1.5"
                />

                {/* Date labels on bottom line */}
                <text
                  x={alarmX}
                  y={paddingTop + chartHeight + 14}
                  fill="#4d5f80"
                  fontSize="8"
                  fontFamily="sans-serif"
                  textAnchor="middle"
                  className="font-medium"
                >
                  {d.date}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip details on hover */}
        {hoverIndex !== null && trendData[hoverIndex] && (
          <div 
            className="absolute bg-[#091022]/95 border border-cyan-500/40 rounded px-2 py-1 text-[9px] font-mono shadow-md z-10 text-slate-300 select-none flex flex-col pointer-events-none"
            style={{ 
              left: `${(hoverIndex / (trendData.length - 1)) * 75 + 10}%`,
              top: '10px'
            }}
          >
            <span className="text-slate-400 font-semibold mb-0.5 border-b border-cyan-900/30">
              日期: {trendData[hoverIndex].date}
            </span>
            <span className="text-[#00f0ff]">告警: {trendData[hoverIndex].alarmCount} 次</span>
            <span className="text-[#10b981]">系统效率: {trendData[hoverIndex].successRate}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
