import React, { useMemo } from 'react';
import { CustomerDetail } from '../data/healthMetricsData';
import {
  ArrowLeft,
  AlertTriangle,
  ShieldAlert,
  Zap,
  Cpu,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Wrench,
  ExternalLink,
  Building2,
  FileText
} from 'lucide-react';

interface CustomerDetailViewProps {
  detail: CustomerDetail;
  onBack: () => void;
  onSelectStation: (stationId: string) => void;
}

const CircularProgress = ({ score, colorClass }: { score: number; colorClass: string }) => {
  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-14 h-14 shrink-0 select-none">
      <svg className="w-14 h-14 transform -rotate-90">
        <circle
          className="text-slate-900/40"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={`${colorClass} transition-all duration-700 ease-in-out`}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <span className="absolute text-[11px] font-mono font-bold text-slate-100">
        {score}
      </span>
    </div>
  );
};

export default function CustomerDetailView({ detail, onBack, onSelectStation }: CustomerDetailViewProps) {
  const [expandedSites, setExpandedSites] = React.useState<Set<string>>(new Set());

  const toggleSite = (stationId: string) => {
    setExpandedSites(prev => {
      const next = new Set(prev);
      if (next.has(stationId)) {
        next.delete(stationId);
      } else {
        next.add(stationId);
      }
      return next;
    });
  };

  const getLevelBadge = (level: 'L1' | 'L2' | 'L3' | 'L4') => {
    switch (level) {
      case 'L1':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-600/20 text-rose-400 border border-rose-500/35">L1 危急</span>;
      case 'L2':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-600/20 text-orange-400 border border-orange-500/35">L2 紧急</span>;
      case 'L3':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/35">L3 重要</span>;
      case 'L4':
        return <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-600/20 text-cyan-400 border border-cyan-500/35">L4 提示</span>;
    }
  };

  const getSiteScoreColor = (score: number) => {
    if (score >= 95) return 'text-emerald-400';
    if (score >= 90) return 'text-cyan-400';
    if (score >= 80) return 'text-amber-400';
    return 'text-rose-500 font-bold animate-pulse';
  };

  const scoreColor = detail.overallScore >= 95 ? 'text-emerald-400 font-bold' : detail.overallScore >= 90 ? 'text-cyan-400 font-bold' : detail.overallScore >= 80 ? 'text-amber-400 font-semibold' : 'text-rose-500 font-bold animate-pulse';

  const totalIssues = detail.sites.reduce((sum, s) => sum + s.issues.length, 0);
  const alarmCount = detail.sites.reduce((sum, s) => sum + s.issues.filter(i => i.type === 'alarm').length, 0);
  const warningCount = detail.sites.reduce((sum, s) => sum + s.issues.filter(i => i.type === 'warning').length, 0);
  const abnormalCount = detail.sites.reduce((sum, s) => sum + s.issues.filter(i => i.type === 'abnormal').length, 0);

  const customerLevelBadge = (level: 'A' | 'B' | 'C') => {
    switch (level) {
      case 'A':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">A级客户</span>;
      case 'B':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">B级客户</span>;
      case 'C':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-slate-500/10 text-slate-400 border border-slate-500/30 font-bold">C级客户</span>;
    }
  };

  return (
    <div className="flex-1 w-full max-w-[1920px] mx-auto px-4 md:px-6 py-6 flex flex-col space-y-6 select-none bg-[#02050e]/30">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#142544]/60 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-cyan-400 font-sans font-medium bg-[#102447]/50 hover:bg-[#1a386d]/80 border border-cyan-500/30 rounded-lg transition-all active:scale-95 cursor-pointer hover:shadow-[0_0_12px_rgba(6,182,212,0.15)]"
          >
            <ArrowLeft size={14} />
            <span>返回健康度巡检</span>
          </button>
          <div className="h-6 w-[1px] bg-[#142544] hidden sm:block" />
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl md:text-2xl font-bold font-sans tracking-wide text-white">
                {detail.customerName}
              </h2>
              {customerLevelBadge(detail.customerLevel)}
            </div>
            <p className="text-xs text-[#5f759e] mt-1 font-mono flex items-center gap-2">
              <FileText size={11} />
              合同号: {detail.contractNo} • {detail.contractName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-center">
          <div className="text-right">
            <span className="text-[10px] text-[#5f759e] block font-mono font-bold">CUSTOMER HEALTH</span>
            <span className="text-xs text-slate-300 font-medium font-sans">
              客户综合状态: <span className="font-semibold text-cyan-400">{detail.level}</span>
            </span>
          </div>
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-900 border border-[#142544] shadow-[inset_0_0_12px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 transition-all duration-300">
            <span className={`text-2xl font-bold font-mono ${scoreColor}`}>
              {detail.overallScore}
            </span>
            <span className={`text-[10px] font-sans font-medium self-end mb-1 ml-0.5 opacity-80 ${scoreColor}`}>%</span>
          </div>
        </div>
      </div>

      {/* 四大维度健康评分卡 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b1324]/80 border border-amber-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(245,158,11,0.02)] hover:border-amber-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-amber-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={15} />
              <span className="text-xs font-bold font-sans tracking-wide">预警评分</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              客户下辖所有站点的运行指标预警事件汇总评估。
            </p>
            <div className="text-[10px] font-mono text-amber-500/70">
              活动事件: <span className="font-bold underline">{warningCount} 条记录</span>
            </div>
          </div>
          <CircularProgress score={detail.warningScore} colorClass="text-amber-400" />
        </div>

        <div className="bg-[#0b1324]/80 border border-rose-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(239,68,68,0.02)] hover:border-rose-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-rose-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <ShieldAlert size={15} />
              <span className="text-xs font-bold font-sans tracking-wide">告警评分</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              客户下辖所有站点的阻断级安全告警汇总。
            </p>
            <div className="text-[10px] font-mono text-rose-400/80">
              阻断报警: <span className="font-bold underline">{alarmCount} 条记录</span>
            </div>
          </div>
          <CircularProgress score={detail.activeAlarmScore} colorClass="text-rose-400" />
        </div>

        <div className="bg-[#0b1324]/80 border border-indigo-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(99,102,241,0.02)] hover:border-indigo-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-indigo-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Zap size={14} className="animate-pulse" />
              <span className="text-xs font-bold font-sans tracking-wide">性能指标平台</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              反映客户下辖电站调频、充放能量转换效率。
            </p>
            <div className="text-[10px] font-mono text-[#a5b4fc]/80">
              劣化波动: <span className="font-bold underline">{abnormalCount} 处指标</span>
            </div>
          </div>
          <CircularProgress score={detail.performanceScore} colorClass="text-[#a5b4fc]" />
        </div>

        <div className="bg-[#0b1324]/80 border border-cyan-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(6,182,212,0.02)] hover:border-cyan-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-cyan-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Cpu size={15} />
              <span className="text-xs font-bold font-sans tracking-wide">设备状态评分</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              包含全站微机、精密冷风空调、消防门阀在线遥信健康。
            </p>
            <div className="text-[10px] font-mono text-cyan-400/80">
              下辖站点: <span className="font-bold">{detail.sites.length} 个电站</span>
            </div>
          </div>
          <CircularProgress score={detail.deviceStatusScore} colorClass="text-cyan-400" />
        </div>
      </div>

      {/* Summary strip */}
      <div className="bg-[#0a1122]/70 border border-[#142544]/60 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-4 font-mono relative">
        <div className="flex items-center gap-2 border-l-2 border-[#00f0ff] pl-2">
          <span className="text-slate-400 uppercase font-sans font-bold text-[10px] tracking-wider">客户健康度汇总:</span>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Building2 size={12} className="text-cyan-400" />
            <span className="text-slate-500 font-sans">合同:</span>
            <span className="text-cyan-400 font-bold">{detail.contractNo}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">下辖电站:</span>
            <span className="text-white font-bold">{detail.sites.length} 个</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">活动告警:</span>
            <span className="text-rose-400 font-bold">{alarmCount} 条</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">运行预警:</span>
            <span className="text-amber-400 font-bold">{warningCount} 条</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">性能劣化:</span>
            <span className="text-indigo-400 font-bold">{abnormalCount} 处</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">累计问题:</span>
            <span className="text-white font-bold">{totalIssues} 项</span>
          </div>
        </div>
      </div>

      {/* Site list - expandable */}
      <div className="bg-[#0b1222]/80 border border-[#142544]/80 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-[#050b16] px-4 py-3.5 border-b border-[#142544]/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-cyan-500/15 text-cyan-400">
              <Building2 size={15} />
            </span>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide font-sans">下辖站点健康度列表</h3>
              <p className="text-[8.5px] text-[#5f759e] font-mono leading-none">SITES UNDER CUSTOMER</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            共 {detail.sites.length} 个电站
          </span>
        </div>

        <div className="divide-y divide-[#142544]/60">
          {detail.sites.map(site => {
            const isExpanded = expandedSites.has(site.stationId);
            const siteAlarmCount = site.issues.filter(i => i.type === 'alarm').length;
            const siteWarningCount = site.issues.filter(i => i.type === 'warning').length;
            const siteAbnormalCount = site.issues.filter(i => i.type === 'abnormal').length;

            return (
              <div key={site.stationId}>
                {/* Site header row */}
                <div
                  className="flex items-center justify-between px-4 py-3.5 hover:bg-[#102447]/30 cursor-pointer transition-all"
                  onClick={() => toggleSite(site.stationId)}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-slate-400 transition-transform duration-200 shrink-0">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-sans font-semibold text-white truncate">
                          {site.siteName}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ${
                          site.overallScore >= 95 ? 'bg-emerald-500/10 text-emerald-400' :
                          site.overallScore >= 90 ? 'bg-cyan-500/10 text-cyan-400' :
                          site.overallScore >= 80 ? 'bg-amber-500/10 text-amber-400' :
                          'bg-rose-500/10 text-rose-400 animate-pulse'
                        }`}>
                          {site.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-[#5f759e]">
                        <span className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${siteAlarmCount > 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          告警 {siteAlarmCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${siteWarningCount > 0 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                          预警 {siteWarningCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${siteAbnormalCount > 0 ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
                          劣化 {siteAbnormalCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <span className="text-[9px] text-[#5f759e] font-mono block">总体健康度</span>
                      <span className={`text-sm font-mono font-bold ${getSiteScoreColor(site.overallScore)}`}>
                        {site.overallScore}%
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStation(site.stationId);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-sans font-medium rounded-lg border border-cyan-500/30 text-cyan-400 hover:bg-[#1e40a6]/40 hover:border-cyan-400 transition-all cursor-pointer shrink-0"
                      title="穿透至电站专家诊断视图"
                    >
                      <ExternalLink size={11} />
                      <span>下钻</span>
                    </button>
                  </div>
                </div>

                {/* Expanded issues list */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-[#050c18]/50">
                    {site.issues.length === 0 ? (
                      <div className="flex items-center gap-2 p-4 text-center text-slate-500">
                        <CheckCircle size={16} className="text-emerald-500/80" />
                        <span className="text-xs font-sans">该站点当前无异常记录</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {site.issues.map(issue => (
                          <div
                            key={issue.id}
                            className={`relative p-3 bg-slate-950/60 rounded-lg border pl-4 ${
                              issue.type === 'alarm' ? 'border-rose-500/30 hover:border-rose-500/50' :
                              issue.type === 'warning' ? 'border-amber-500/30 hover:border-amber-500/50' :
                              'border-indigo-500/30 hover:border-indigo-500/50'
                            }`}
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-l-lg ${
                              issue.type === 'alarm' ? 'bg-rose-500' :
                              issue.type === 'warning' ? 'bg-amber-500' :
                              'bg-indigo-500'
                            }" />
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <span className="text-[11px] font-sans font-bold text-white leading-tight">
                                {issue.device}
                              </span>
                              {getLevelBadge(issue.level)}
                            </div>
                            <div className="text-[11px] text-slate-350 bg-[#070d18]/70 border border-[#142544]/40 rounded p-2 mb-2 select-text">
                              <span className={`font-bold block mb-0.5 text-[9px] uppercase font-mono ${
                                issue.type === 'alarm' ? 'text-rose-400' :
                                issue.type === 'warning' ? 'text-amber-400' :
                                'text-indigo-400'
                              }`}>扣分原因:</span>
                              {issue.reason}
                            </div>
                            <div className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded text-[10.5px] text-emerald-400 flex items-start gap-1 select-text">
                              <Wrench size={11} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span>
                                <strong className="text-amber-400">专家措施:</strong> {issue.suggestion}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
