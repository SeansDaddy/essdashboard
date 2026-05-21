import React from 'react';
import { HighFreqAlarm } from '../types';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface HighFreqAlarmPanelProps {
  alarms: HighFreqAlarm[];
}

export default function HighFreqAlarmPanel({ alarms }: HighFreqAlarmPanelProps) {
  return (
    <div id="high-freq-alarm-panel" className="relative flex flex-col h-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Decorative cyber grid headers */}
      <div className="absolute bottom-0 right-0 w-24 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />

      {/* Title */}
      <div className="flex items-center justify-between mb-4 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            实时高频告警排行
          </span>
          <ShieldAlert size={14} className="text-cyan-400/80" />
        </div>
        <span className="text-[10px] text-cyan-400 font-mono">
          HIGH-FREQ WARNING
        </span>
      </div>

      {/* Listing ranking with values */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="w-full text-[10px] text-[#5f759e] font-sans pb-1.5 flex justify-between border-b border-[#142544]/60 uppercase tracking-wider font-semibold text-slate-400">
          <span>故障类型/告警名称</span>
          <span>数值</span>
        </div>
        
        <div className="divide-y divide-[#142544]/25">
          {alarms.map((item, index) => (
            <div 
              key={index} 
              className="py-2.5 flex items-center justify-between select-none hover:bg-[#102447]/20 px-1 rounded transition-all group"
            >
              <div className="flex items-center gap-3 max-w-[80%]">
                {/* Ranking order index */}
                <span className={`flex items-center justify-center w-4 .5 h-4 rounded-sm text-[9.5px] font-bold ${
                  index === 0 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                  index === 1 ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30' :
                  index === 2 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                  'bg-slate-800/60 text-slate-400 border border-slate-700/50'
                }`}>
                  {index + 1}
                </span>

                <span className="text-slate-300 font-sans text-[11px] truncate group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </span>
              </div>
              
              <span className="font-semibold text-cyan-400 font-mono text-xs text-glow-cyan mr-1.5">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
