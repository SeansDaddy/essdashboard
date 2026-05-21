import React from 'react';
import { Target, AlertOctagon } from 'lucide-react';

export default function RootCausePanel() {
  const signalCount = 22850;
  
  const causes = [
    { name: '电网电压偶发生畸变', percent: 35, color: '#ff3b30' },
    { name: '绝缘回路阻抗偏低', percent: 28, color: '#f97316' },
    { name: '电池舱高温热堆积', percent: 22, color: '#06b6d4' },
    { name: '通信偶发丢包重试', percent: 15, color: '#10b981' }
  ];

  return (
    <div id="root-cause-panel" className="relative flex flex-col h-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Decorative cyber grid headers */}
      <div className="absolute bottom-0 left-0 w-24 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />

      {/* Title */}
      <div className="flex items-center justify-between mb-4 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            TOP 异常根因分析
          </span>
          <Target size={14} className="text-cyan-400/80" />
        </div>
        <span className="text-[10px] text-cyan-400 font-mono">
          ROOT CAUSE
        </span>
      </div>

      {/* Circular stats wheel + breakdown list */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-around gap-4 min-h-[140px]">
        
        {/* Ring graphic */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Outline grey circle */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(20, 37, 68, 0.4)" strokeWidth="6" />
            
            {/* Layered strokes representing percentage parts */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="#ff3b30" strokeWidth="7" strokeDasharray="92 263" strokeDashoffset="0" className="transition-all duration-1000" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f97316" strokeWidth="7" strokeDasharray="73 263" strokeDashoffset="-92" className="transition-all duration-1000" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#00f0ff" strokeWidth="7" strokeDasharray="58 263" strokeDashoffset="-165" className="transition-all duration-1000" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="7" strokeDasharray="40 263" strokeDashoffset="-223" className="transition-all duration-1000" />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center leading-none select-none">
            <span className="text-[12px] font-bold font-mono text-slate-100 tracking-wide">{signalCount.toLocaleString()}</span>
            <span className="text-[7.5px] font-sans text-slate-400 mt-1.5 uppercase scale-90">Total Signals</span>
          </div>
        </div>

        {/* Breakdown progress horizontal lines */}
        <div className="flex-1 flex flex-col justify-center space-y-2 select-none w-full sm:w-auto">
          {causes.map((item, index) => (
            <div key={index} className="flex flex-col space-y-0.5">
              <div className="flex justify-between text-[10px] items-baseline font-mono">
                <span className="text-slate-400 font-sans truncate pr-1.5 max-w-[130px]">{item.name}</span>
                <span className="font-semibold text-slate-200" style={{ color: item.color }}>{item.percent}%</span>
              </div>
              <div className="h-1 w-full bg-slate-950/80 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
