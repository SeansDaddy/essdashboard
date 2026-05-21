import React from 'react';
import { EnergyStation } from '../types';
import { BatteryCharging } from 'lucide-react';

interface EnergyRankingPanelProps {
  stations: EnergyStation[];
}

export default function EnergyRankingPanel({ stations }: EnergyRankingPanelProps) {
  const maxValue = Math.max(...stations.map(s => s.value), 1);

  return (
    <div id="energy-ranking-panel" className="relative flex flex-col h-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Visual cyber-grid headers */}
      <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
      
      {/* Title */}
      <div className="flex items-center justify-between mb-4 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            日蓄能充放量排行
          </span>
          <BatteryCharging size={14} className="text-cyan-400/80 animate-pulse" />
        </div>
        <span className="text-[10px] text-cyan-400 font-mono">
          DAILY THROUGHPUT
        </span>
      </div>

      {/* Ranks list */}
      <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
        {stations.map((item, index) => {
          const percent = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col space-y-1 select-none">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-300 font-sans truncate pr-2 text-[11px]">
                  {item.name}
                </span>
                <span className="font-semibold text-cyan-400 font-mono">
                  {item.value.toLocaleString()} <span className="text-[9px] text-[#4d5f80] font-sans">kWh</span>
                </span>
              </div>
              
              {/* Sleek rounded neon bar */}
              <div className="h-2 w-full bg-slate-950/80 rounded-full border border-[#142544]/60 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full transition-all duration-1000 relative shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
