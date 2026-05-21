import React from 'react';
import { AlarmSummary } from '../types';
import { AlertCircle, AlertTriangle, ShieldCheck, Activity, Bell } from 'lucide-react';

interface AlarmSummaryPanelProps {
  summary: AlarmSummary;
}

export default function AlarmSummaryPanel({ summary }: AlarmSummaryPanelProps) {
  const totalAlarms = summary.fatal + summary.urgent + summary.important + summary.warning;

  const cards = [
    {
      title: '危急告警',
      level: 'FATAL / L1',
      value: summary.fatal,
      colorClass: 'text-rose-500',
      bgColor: 'bg-rose-950/20',
      borderColor: 'border-rose-900/40',
      glowColor: 'glow-red',
      icon: <AlertTriangle className="text-rose-500 animate-bounce" size={24} />,
      desc: '涉及核心安全/离线、熔丝熔断等',
      labelColor: 'bg-rose-500/15 text-rose-400'
    },
    {
      title: '紧急告警',
      level: 'CRITICAL / L2',
      value: summary.urgent,
      colorClass: 'text-orange-500',
      bgColor: 'bg-orange-950/20',
      borderColor: 'border-orange-900/40',
      glowColor: 'glow-orange',
      icon: <AlertCircle className="text-orange-500 animate-pulse" size={24} />,
      desc: '模块异常、温度过高、断线预警',
      labelColor: 'bg-orange-500/15 text-orange-400'
    },
    {
      title: '重要告警',
      level: 'IMPORTANT / L3',
      value: summary.important,
      colorClass: 'text-amber-400',
      bgColor: 'bg-amber-950/20',
      borderColor: 'border-amber-900/40',
      glowColor: 'glow-orange',
      icon: <Bell className="text-amber-400" size={24} />,
      desc: 'BMS通信超时、单体电压压差过大',
      labelColor: 'bg-amber-500/15 text-amber-400'
    },
    {
      title: '提示告警',
      level: 'WARNING / L4',
      value: summary.warning,
      colorClass: 'text-cyan-400',
      bgColor: 'bg-cyan-950/20',
      borderColor: 'border-cyan-900/40',
      glowColor: 'glow-cyan',
      icon: <Bell className="text-cyan-400" size={24} />,
      desc: '箱体温湿度偏差、风机轻微震动、限位状态',
      labelColor: 'bg-cyan-500/15 text-cyan-400'
    }
  ];

  return (
    <div className="relative flex flex-col w-full bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Decorative cyber grid headers */}
      <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />
      
      {/* Container Title */}
      <div className="flex items-center justify-between mb-3 border-l-2 border-cyan-400 pl-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
            告警等级汇总数量
          </span>
          <span className="text-[10px] text-[#5f759e] font-mono">
            ALARM LEVELS TOTAL
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="text-[#5f759e]">当前总告警:</span>
          <span className="text-[#00f0ff] font-bold px-1.5 py-0.5 bg-cyan-950/50 border border-cyan-800/40 rounded">
            {totalAlarms} 条
          </span>
        </div>
      </div>

      {/* Grid of alarm classes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, i) => (
          <div 
            key={i} 
            className={`relative flex flex-col p-3 rounded-lg border ${card.borderColor} ${card.bgColor} overflow-hidden hover:bg-[#102447]/40 transition-all duration-300 group`}
          >
            {/* Top row: icon and class flag */}
            <div className="flex items-start justify-between">
              <span className={`text-[9px] font-mono font-medium rounded-full px-2 py-0.5 ${card.labelColor}`}>
                {card.level}
              </span>
              <div className="opacity-80 group-hover:opacity-100 transition-opacity">
                {card.icon}
              </div>
            </div>

            {/* Middle: Count & Label */}
            <div className="mt-2.5 flex items-baseline gap-1 select-none">
              <span className={`text-2xl md:text-3xl font-bold font-mono tracking-tight ${card.colorClass} ${card.glowColor} transition-transform group-hover:scale-105 duration-300`}>
                {card.value.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 font-sans font-medium">{card.title}</span>
            </div>

            {/* Bottom description */}
            <p className="mt-2 text-[10px] text-slate-500 leading-normal line-clamp-1 group-hover:text-slate-400 transition-colors">
              {card.desc}
            </p>

            {/* Decorative bottom corner glow line */}
            <div className={`absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-${card.colorClass.replace('text-', '')}-500/40 to-transparent`} />
          </div>
        ))}
      </div>
    </div>
  );
}
