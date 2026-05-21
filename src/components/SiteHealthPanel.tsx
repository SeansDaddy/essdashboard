import React from 'react';
import { SiteHealth } from '../types';
import { ShieldAlert, TrendingUp, Cpu } from 'lucide-react';

interface SiteHealthPanelProps {
  data: SiteHealth[];
}

export default function SiteHealthPanel({ data }: SiteHealthPanelProps) {
  // Sort by score descending to ensure health ranking is correct
  const sortedData = [...data].sort((a, b) => b.score - a.score);

  const getStatusColor = (score: number) => {
    if (score >= 95) return { text: 'text-emerald-400', bar: 'bg-gradient-to-r from-emerald-500/30 to-emerald-400', glow: 'shadow-emerald-500/20' };
    if (score >= 90) return { text: 'text-cyan-400', bar: 'bg-gradient-to-r from-cyan-500/30 to-cyan-400', glow: 'shadow-cyan-500/20' };
    if (score >= 80) return { text: 'text-amber-400', bar: 'bg-gradient-to-r from-amber-500/30 to-amber-400', glow: 'shadow-amber-500/20' };
    return { text: 'text-rose-500', bar: 'bg-gradient-to-r from-rose-600/30 to-rose-500', glow: 'shadow-rose-500/20' };
  };

  const getScoreRating = (score: number) => {
    if (score >= 95) return '极佳';
    if (score >= 90) return '优秀';
    if (score >= 80) return '良好';
    return '一般';
  };

  return (
    <div id="site-health-panel" className="relative flex flex-col h-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Visual cyber-grid headers */}
      <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
      
      {/* Title */}
      <div className="flex items-center justify-between mb-4 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            站点健康度排名
          </span>
          <Cpu size={14} className="text-cyan-400/80 animate-pulse" />
        </div>
        <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/60 rounded-full px-2 py-0.5 font-mono">
          HEALTH INDEX
        </span>
      </div>

      {/* Main Content Info */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
        {sortedData.map((item, index) => {
          const { text, bar, glow } = getStatusColor(item.score);
          const rating = getScoreRating(item.score);
          
          return (
            <div key={item.id} className="relative group flex flex-col space-y-1 select-none">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 max-w-[70%]">
                  {/* Rank Badge */}
                  <span className={`flex items-center justify-center w-4 h-4 rounded text-[10px] font-bold ${
                    index === 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 text-glow-red' :
                    index === 1 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 text-glow-orange' :
                    index === 2 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' :
                    'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-slate-300 font-sans truncate text-[11px] group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-medium px-1 bg-[#102447]/50 border border-slate-800 rounded text-slate-400`}>
                    {rating}
                  </span>
                  <span className={`font-semibold ${text} w-8 text-right font-mono`}>
                    {item.score}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-slate-950/80 rounded-full overflow-hidden border border-[#142544]">
                <div 
                  className={`h-full ${bar} rounded-full transition-all duration-1000 relative shadow-sm ${glow}`}
                  style={{ width: `${item.score}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer statistics card */}
      <div className="mt-4 pt-3 border-t border-[#142544]/60 flex justify-between items-center text-[10px] font-mono text-[#5f759e]">
        <div className="flex items-center gap-1">
          <TrendingUp size={11} className="text-[#10b981]" />
          <span>平均度: <span className="text-slate-300 font-semibold font-mono">90.3%</span></span>
        </div>
        <div>
          <span>参评站点: <span className="text-cyan-400 font-semibold font-mono">24</span> 个</span>
        </div>
      </div>
    </div>
  );
}
