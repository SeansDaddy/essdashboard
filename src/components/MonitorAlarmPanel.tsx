import React from 'react';
import { AlarmStat } from '../types';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface MonitorAlarmPanelProps {
  stats: AlarmStat[];
}

export default function MonitorAlarmPanel({ stats }: MonitorAlarmPanelProps) {
  const total = stats.reduce((acc, curr) => acc + curr.value, 0);

  // SVG Circle stroke calculation
  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke segments
  let accumulatedAngle = 0;
  const segments = stats.map((stat) => {
    const percentage = (stat.value / total) * 100;
    const strokeDasharray = `${(stat.value / total) * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle;
    accumulatedAngle += (stat.value / total) * circumference;
    return {
      ...stat,
      percentage,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div id="monitor-alarm-panel" className="relative flex flex-col h-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Decorative cyber grid headers */}
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />

      {/* Title */}
      <div className="flex items-center justify-between mb-4 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            监控告警统计
          </span>
          <AlertCircle size={14} className="text-cyan-400/80" />
        </div>
        <span className="text-[10px] text-cyan-400 font-mono">
          MONITOR STAT
        </span>
      </div>

      {/* Chart and Legend container */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-4 min-h-[140px]">
        {/* SVG Ring Chart */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle outline */}
            <circle 
              cx="60" 
              cy="60" 
              r={radius} 
              fill="none" 
              stroke="rgba(20, 37, 68, 0.4)" 
              strokeWidth={strokeWidth} 
            />
            {/* Colored segments */}
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={seg.strokeDasharray}
                strokeDashoffset={seg.strokeDashoffset}
                strokeLinecap={seg.value > 0 ? 'round' : 'butt'}
                className="transition-all duration-1000 ease-out"
              />
            ))}
          </svg>

          {/* Central Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none select-none">
            <span className="text-[10px] font-mono tracking-wider text-slate-400">TOTAL</span>
            <span className="text-xl font-bold font-mono text-slate-200 mt-1">{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 flex flex-col justify-center space-y-2.5 w-full sm:w-auto">
          {segments.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-xs font-mono select-none">
              <div className="flex items-center gap-2">
                {/* Colored dot indicator */}
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}80` }}
                />
                <span className="text-slate-300 font-sans text-[11px] truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#4d5f80] text-[9.5px]">({item.percentage.toFixed(0)}%)</span>
                <span className="font-semibold text-slate-200 text-right w-8">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
