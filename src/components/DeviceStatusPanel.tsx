import React from 'react';
import { DeviceStatus } from '../types';
import { Tablet, Wifi, WifiOff } from 'lucide-react';

interface DeviceStatusPanelProps {
  status: DeviceStatus;
}

export default function DeviceStatusPanel({ status }: DeviceStatusPanelProps) {
  return (
    <div id="device-status-panel" className="relative flex flex-col h-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Decorative cyber grid headers */}
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />
      
      {/* Title */}
      <div className="flex items-center justify-between mb-3 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            设备实时状态
          </span>
          <Tablet size={14} className="text-cyan-400/80" />
        </div>
        <span className="text-[10px] text-cyan-400 font-mono">
          REAL-TIME STAT
        </span>
      </div>

      {/* Online/Offline Large Numbers */}
      <div className="grid grid-cols-2 gap-2 mb-3 bg-[#081021]/60 border border-[#142544]/60 rounded-lg p-2.5">
        <div className="flex flex-col items-center border-r border-[#142544]/60">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-sans">
            <Wifi size={11} className="text-emerald-400 animate-pulse" />
            <span>在线蓄能单元</span>
          </div>
          <span className="text-xl md:text-2xl font-bold font-mono text-emerald-400 glow-green tracking-tight">
            {status.online.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-sans">
            <WifiOff size={11} className="text-rose-400 animate-pulse" />
            <span>故障/离线单元</span>
          </div>
          <span className="text-xl md:text-2xl font-bold font-mono text-rose-500 glow-red tracking-tight">
            {status.offline}
          </span>
        </div>
      </div>

      {/* Mini Listing Table */}
      <div className="flex-1 overflow-y-auto pr-1">
        <table className="w-full text-[10px] text-[#5f759e] font-sans">
          <thead>
            <tr className="border-b border-[#142544]/60 uppercase tracking-wider font-semibold text-slate-400">
              <th className="text-left pb-1.5 w-[55%]">站点/储能站</th>
              <th className="text-center pb-1.5 w-[25%]">区域</th>
              <th className="text-right pb-1.5 w-[20%]">单元数</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#142544]/30 font-mono">
            {status.list.map((item, index) => (
              <tr key={index} className="hover:bg-[#102447]/30 transition-all group">
                <td className="py-2 text-left font-sans text-slate-300 truncate max-w-[120px] group-hover:text-cyan-300 transition-colors">
                  <span className="text-cyan-500/80 mr-1.5 font-bold font-mono">{index + 1}</span>
                  {item.name}
                </td>
                <td className="py-2 text-center text-slate-400 font-sans">{item.region}</td>
                <td className="py-2 text-right font-semibold text-cyan-400">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
