import React, { useState } from 'react';
import { StationDetail, HealthDetailIssue } from '../types';
import { 
  ArrowLeft, 
  ShieldCheck, 
  ShieldAlert, 
  Thermometer, 
  Zap, 
  Battery, 
  AlertTriangle, 
  Clock, 
  HelpCircle, 
  CheckCircle,
  Database,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

interface StationDetailViewProps {
  detail: StationDetail;
  onBack: () => void;
}

type IssueFilterType = 'all' | 'warning' | 'alarm' | 'abnormal';

export default function StationDetailView({ detail, onBack }: StationDetailViewProps) {
  const [filter, setFilter] = useState<IssueFilterType>('all');
  const [hoveredIssue, setHoveredIssue] = useState<string | null>(null);

  // Filter issues based on type
  const filteredIssues = detail.issues.filter(issue => {
    if (filter === 'all') return true;
    return issue.type === filter;
  });

  // Calculate some analytics
  const alarmCount = detail.issues.filter(i => i.type === 'alarm').length;
  const warningCount = detail.issues.filter(i => i.type === 'warning').length;
  const abnormalCount = detail.issues.filter(i => i.type === 'abnormal').length;

  // Level Styling
  const getLevelBadge = (level: 'L1' | 'L2' | 'L3' | 'L4') => {
    switch (level) {
      case 'L1':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600/20 text-rose-400 border border-rose-500/30">L1 危急</span>;
      case 'L2':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-600/20 text-orange-400 border border-orange-500/30">L2 紧急</span>;
      case 'L3':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">L3 重要</span>;
      case 'L4':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">L4 提示</span>;
    }
  };

  const getCategoryTag = (type: 'warning' | 'alarm' | 'abnormal') => {
    switch (type) {
      case 'alarm':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950/40 text-red-400 border border-red-900/30">系统告警</span>;
      case 'warning':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-950/40 text-amber-400 border border-amber-900/30">指标预警</span>;
      case 'abnormal':
        return <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-950/40 text-indigo-400 border border-indigo-900/30">指标异常</span>;
    }
  };

  const scoreColor = detail.score >= 95 ? 'text-emerald-400' : detail.score >= 90 ? 'text-cyan-400' : detail.score >= 80 ? 'text-amber-400' : 'text-rose-500';

  return (
    <div className="flex-1 w-full max-w-[1920px] mx-auto px-4 md:px-6 py-6 flex flex-col space-y-6">
      
      {/* 1. Header Area with back action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#142544]/60 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-cyan-400 font-mono bg-[#102447]/50 hover:bg-[#1a386d]/80 border border-cyan-500/30 rounded-lg transition-all active:scale-95 cursor-pointer hover:shadow-[0_0_12px_rgba(6,182,212,0.15)]"
          >
            <ArrowLeft size={14} />
            <span>返回系统总览</span>
          </button>
          
          <div className="h-6 w-[1px] bg-[#142544] hidden sm:block" />

          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl md:text-2xl font-bold font-sans tracking-wide text-white">
                {detail.stationName}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                ONLINE
              </span>
            </div>
            <p className="text-xs text-[#5f759e] mt-1 font-mono">
              STATION_ID: SETS_{detail.stationId.toUpperCase()} • 运维监控诊断详情页
            </p>
          </div>
        </div>

        {/* Big Health Indicator */}
        <div className="flex items-center gap-4 self-start sm:self-center">
          <div className="text-right">
            <span className="text-[10px] text-[#5f759e] block font-mono">HEALTH RATE</span>
            <span className="text-xs text-slate-300 font-medium font-sans">
              健康诊断等级: <span className="font-semibold text-cyan-400">{detail.score >= 90 ? '优等' : '良好'}</span>
            </span>
          </div>
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-900 border border-[#142544] shadow-[inset_0_0_12px_rgba(6,182,212,0.1)]">
            <span className={`text-2xl font-bold font-mono ${scoreColor}`}>
              {detail.score}
            </span>
            <span className={`text-[10px] font-sans font-medium self-end mb-1 ml-0.5 opacity-80 ${scoreColor}`}>%</span>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Widgets Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* State of Charge (SOC) */}
        <div className="bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 flex flex-col justify-between h-[110px] relative overflow-hidden group">
          <div className="flex justify-between items-center text-xs text-[#5f759e] font-sans">
            <span className="font-medium">电池荷电状态 (SOC)</span>
            <Battery size={15} className="text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-cyan-400 transition-transform group-hover:scale-[1.03]">
            {detail.soc}%
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden border border-[#20345d]/40">
            <div 
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(6,182,212,0.3)]" 
              style={{ width: `${detail.soc}%` }}
            />
          </div>
        </div>

        {/* State of Health (SOH) */}
        <div className="bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 flex flex-col justify-between h-[110px] relative overflow-hidden group">
          <div className="flex justify-between items-center text-xs text-[#5f759e] font-sans">
            <span className="font-medium">电池健康状态 (SOH)</span>
            <ShieldCheck size={15} className="text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-400 transition-transform group-hover:scale-[1.03]">
            {detail.soh}%
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full mt-2 overflow-hidden border border-[#20345d]/40">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
              style={{ width: `${detail.soh}%` }}
            />
          </div>
        </div>

        {/* Active Power Output */}
        <div className="bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 flex flex-col justify-between h-[110px] group">
          <div className="flex justify-between items-center text-xs text-[#5f759e] font-sans">
            <span className="font-medium">当前充放功率</span>
            <Zap size={14} className="text-amber-400 animate-pulse" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-amber-400 group-hover:scale-[1.02] transition-transform">{detail.activePower.toLocaleString()}</span>
            <span className="text-xs text-[#5f759e] font-mono">kW</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">发电机状态: 额定范围内输出中</p>
        </div>

        {/* Cabin Temperature */}
        <div className="bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 flex flex-col justify-between h-[110px] group">
          <div className="flex justify-between items-center text-xs text-[#5f759e] font-sans">
            <span className="font-medium">电芯群最高温度</span>
            <Thermometer size={15} className={detail.temperature > 28 ? 'text-rose-500 animate-bounce' : 'text-cyan-400'} />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className={`text-2xl font-bold font-mono transition-colors ${detail.temperature > 28 ? 'text-rose-500' : 'text-cyan-400'}`}>{detail.temperature}</span>
            <span className="text-xs text-[#5f759e] font-mono">°C</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">空调液冷模式: 深度循环冷却</p>
        </div>

        {/* Battery Racks Total */}
        <div className="bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 flex flex-col justify-between h-[110px] group">
          <div className="flex justify-between items-center text-xs text-[#5f759e] font-sans">
            <span className="font-medium">电池簇数量</span>
            <Database size={15} className="text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold font-mono text-indigo-400 group-hover:scale-[1.02] transition-transform">{detail.rackCount}</span>
            <span className="text-xs text-[#5f759e] font-mono">Racks</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">主变联状态: 全部投运无失稳</p>
        </div>
      </div>

      {/* 3. Splitted View: Battery Matrix Panel & Diagnosis Actions Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Aspect (1/3 Width): Battery Cabin Model Illustration */}
        <section className="lg:col-span-1 bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 flex flex-col justify-between min-h-[460px] glow-panel relative">
          <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />
          
          <div className="border-l-2 border-cyan-400 pl-2 mb-3">
            <h3 className="text-xs font-semibold tracking-wider text-slate-100 font-sans">
              电池集装箱机位拓扑图
            </h3>
            <p className="text-[10px] text-[#5f759e] font-mono">MONITORING GRAPH MATRIX</p>
          </div>

          {/* Interactive status summary */}
          <div className="grid grid-cols-3 gap-2 bg-[#060c18] border border-[#142544]/60 p-2.5 rounded-lg mb-4 text-center text-[10px] font-mono">
            <div className="flex flex-col border-r border-[#142544]/60">
              <span className="text-rose-400 font-semibold">{alarmCount} 条</span>
              <span className="text-[#5f759e] scale-90">待处理告警</span>
            </div>
            <div className="flex flex-col border-r border-[#142544]/60">
              <span className="text-amber-400 font-semibold">{warningCount} 条</span>
              <span className="text-[#5f759e] scale-90">阈值预警</span>
            </div>
            <div className="flex flex-col">
              <span className="text-cyan-400 font-semibold">{abnormalCount} 处</span>
              <span className="text-[#5f759e] scale-90">异常诊断</span>
            </div>
          </div>

          {/* Graphical Rack Matrix Slots representation */}
          <div className="flex-1 bg-slate-950/80 rounded-lg p-4 border border-[#142544]/40 flex flex-col justify-center space-y-4">
            <p className="text-[10px] text-[#5f759e] font-sans leading-relaxed text-center">
              单体电芯监测系统已扫频电池簇单格拓扑模组状况
            </p>

            <div className="grid grid-cols-4 gap-2 px-1">
              {Array.from({ length: 16 }).map((_, idx) => {
                // Decorate some cells as faulty depending on score of container
                let cellColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.1)]';
                let stateLabel = '正常';
                
                if (detail.score < 70) {
                  if (idx === 3) { cellColor = 'bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-[0_0_8px_rgba(239,68,68,0.15)] animate-pulse'; stateLabel = '危急'; }
                  else if (idx === 7) { cellColor = 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-[0_0_8px_rgba(249,115,22,0.15)]'; stateLabel = '一般告警'; }
                  else if (idx === 11) { cellColor = 'bg-amber-500/20 text-amber-405 border-amber-500/50'; stateLabel = '偏差'; }
                } else if (detail.score < 90) {
                  if (idx === 5) { cellColor = 'bg-orange-500/20 text-orange-400 border-orange-500/50 animate-pulse'; stateLabel = '报警'; }
                  else if (idx === 10) { cellColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40'; stateLabel = '预警'; }
                } else {
                  if (idx === 12) { cellColor = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'; stateLabel = '诊断指标'; }
                }

                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col items-center justify-center py-2 border rounded-md text-[9px] font-mono leading-none transition-all ${cellColor}`}
                    title={`蓄电池槽簇 #${idx + 1} (${stateLabel})`}
                  >
                    <span className="font-semibold">C-{idx + 1}</span>
                    <span className="text-[7.5px] scale-90 mt-1 opacity-70">{stateLabel}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#142544]/60 flex justify-between items-center text-[9px] text-[#4d5f80] font-mono">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-emerald-500/40 inline-block" />
                <span>正常</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-orange-500/40 inline-block animate-pulse" />
                <span>预警/告警</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-cyan-500/40 inline-block" />
                <span>健康指标偏离</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[10px] text-slate-500 font-mono flex items-center gap-1 bg-[#102447]/30 border border-[#142544]/40 rounded-lg p-2">
            <Info size={12} className="text-cyan-400 shrink-0" />
            <span>机位扫频采用BMS高频采样协议，自动均衡已启用。</span>
          </div>
        </section>

        {/* Right Aspect (2/3 Width): Interactive Issues Diagnostics Center */}
        <section className="lg:col-span-2 bg-[#0d1527]/70 border border-[#142544] rounded-xl p-4 flex flex-col justify-between min-h-[460px] glow-panel relative">
          <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-cyan-500/50 to-transparent" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="border-l-2 border-cyan-400 pl-2">
              <h3 className="text-sm font-semibold tracking-wider text-slate-100 font-sans">
                异常指标及专家排障意见
              </h3>
              <p className="text-[10px] text-[#5f759e] font-mono">DIAGNOSTICS & RESOLUTIONS TABLE</p>
            </div>

            {/* Filters Navigation Controls */}
            <div className="flex items-center gap-1 border border-[#142544] bg-slate-950/80 p-1 rounded-lg">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 text-[10px] font-medium font-sans rounded transition-all cursor-pointer ${
                  filter === 'all' ? 'bg-[#1e40a6] text-[#00f0ff]' : 'text-[#5f759e] hover:text-slate-200'
                }`}
              >
                全部缺陷 ({detail.issues.length})
              </button>
              <button
                onClick={() => setFilter('alarm')}
                className={`px-2.5 py-1 text-[10px] font-medium font-sans rounded transition-all cursor-pointer ${
                  filter === 'alarm' ? 'bg-[#1e40a6] text-[#00f0ff]' : 'text-[#5f759e] hover:text-slate-200'
                }`}
              >
                告警 ({alarmCount})
              </button>
              <button
                onClick={() => setFilter('warning')}
                className={`px-2.5 py-1 text-[10px] font-medium font-sans rounded transition-all cursor-pointer ${
                  filter === 'warning' ? 'bg-[#1e40a6] text-[#00f0ff]' : 'text-[#5f759e] hover:text-slate-200'
                }`}
              >
                预警 ({warningCount})
              </button>
              <button
                onClick={() => setFilter('abnormal')}
                className={`px-2.5 py-1 text-[10px] font-medium font-sans rounded transition-all cursor-pointer ${
                  filter === 'abnormal' ? 'bg-[#1e40a6] text-[#00f0ff]' : 'text-[#5f759e] hover:text-slate-200'
                }`}
              >
                异常 ({abnormalCount})
              </button>
            </div>
          </div>

          {/* Issues table / grid list */}
          <div className="flex-1 overflow-y-auto max-h-[380px] pr-1 space-y-3.5">
            {filteredIssues.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#5f759e]">
                <CheckCircle size={32} className="text-emerald-500/80 mb-2 animate-bounce" />
                <span className="text-xs font-semibold text-slate-200">当前筛选分类下无未闭环缺陷</span>
                <span className="text-[10px] mt-1 font-mono">SITE STATE: GREEN & SECURED</span>
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const isHovered = hoveredIssue === issue.id;
                
                return (
                  <div
                    key={issue.id}
                    onMouseEnter={() => setHoveredIssue(issue.id)}
                    onMouseLeave={() => setHoveredIssue(null)}
                    className={`relative p-3.5 rounded-lg border transition-all duration-200 group flex flex-col justify-between ${
                      isHovered 
                        ? 'bg-[#102447]/60 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.1)] translate-x-[2px]' 
                        : 'bg-[#060c18] border-[#142544]/60'
                    }`}
                  >
                    {/* Top Row: category tag, level line, unit name */}
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        {getCategoryTag(issue.type)}
                        {getLevelBadge(issue.level)}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-500 font-bold bg-[#142544]/40 px-2 py-0.5 border border-cyan-900/30 rounded-md">
                        {issue.device}
                      </span>
                    </div>

                    {/* Reason text */}
                    <div className="mt-1 text-xs select-text">
                      <span className="text-slate-400 font-sans block leading-relaxed font-normal">
                        <span className="text-[#5f759e] mr-1.5 font-bold font-mono text-[9px] uppercase border border-[#5f759e]/30 px-1 py-0.2 rounded inline-block">发生原因</span> 
                        {issue.reason}
                      </span>
                    </div>

                    {/* Actionable recommendation box */}
                    <div className={`mt-2.5 p-2 bg-[#0c1c38]/70 border border-[#1b3464]/60 rounded text-[11px] text-emerald-400 leading-relaxed select-text ${
                      isHovered ? 'bg-[#0f244a]/80' : ''
                    }`}>
                      <div className="flex items-start gap-1">
                        <Sparkles size={11} className="text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                        <span>
                          <strong className="text-amber-400 mr-1.5">专家建议措施:</strong>
                          {issue.suggestion}
                        </span>
                      </div>
                    </div>

                    {/* Glowing highlight indicator */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all ${
                      issue.level === 'L1' ? 'bg-rose-500 group-hover:bg-rose-400' :
                      issue.level === 'L2' ? 'bg-orange-500 group-hover:bg-orange-400' :
                      issue.level === 'L3' ? 'bg-amber-500 group-hover:bg-amber-400' : 'bg-cyan-500'
                    }`} />
                  </div>
                );
              })
            )}
          </div>

          {/* Expert diagnostic rules footer */}
          <div className="mt-4 pt-3 border-t border-[#142544]/60 flex flex-wrap justify-between items-center text-[10px] font-mono text-[#5f759e] gap-2">
            <div>
              <span>规则库引擎: <span className="text-slate-300">SetsCore-v9.2</span></span>
            </div>
            <div>
              <span>全域参议安全状态: <span className="text-emerald-400 font-semibold">诊断模块离线值 0%</span></span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
