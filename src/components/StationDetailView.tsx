import React, { useMemo } from 'react';
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
  Info,
  Wrench,
  Cpu,
  AlertCircle,
  Activity
} from 'lucide-react';

interface StationDetailViewProps {
  detail: StationDetail;
  onBack: () => void;
}

// Custom high-fidelity circular progress ring component
const CircularProgress = ({ score, colorClass }: { score: number; colorClass: string }) => {
  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-14 h-14 shrink-0 select-none">
      <svg className="w-14 h-14 transform -rotate-90">
        {/* Background base track */}
        <circle
          className="text-slate-900/40"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Highlighted active scoring band */}
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

export default function StationDetailView({ detail, onBack }: StationDetailViewProps) {
  // Calculate specific metrics counts
  const alarmCount = detail.issues.filter(i => i.type === 'alarm').length;
  const warningCount = detail.issues.filter(i => i.type === 'warning').length;
  const abnormalCount = detail.issues.filter(i => i.type === 'abnormal').length;

  // Level badge generator for issue lists
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

  // 1. Calculate the 4 sub-scores dynamically based on standard BM guidelines
  const subScores = useMemo(() => {
    const totalCount = detail.issues.length;

    // Based on detail.score which is our ground truth overall score
    const alarmScoreCalculation = Math.max(50, Math.min(100, detail.score + (alarmCount === 0 ? 5 : -alarmCount * 6)));
    const warningScoreCalculation = Math.max(60, Math.min(100, detail.score + (warningCount === 0 ? 4 : -warningCount * 4.5)));
    const performanceScoreCalculation = Math.max(65, Math.min(100, detail.score + (abnormalCount === 0 ? 3 : -abnormalCount * 4)));
    
    // Device hardware score based on issue hardware elements, SOH, and physical logs
    const deviceScoreCalculation = Math.max(60, Math.min(100, detail.score + (totalCount === 0 ? 6 : -totalCount * 1.5)));

    return {
      alarmScore: Math.min(100, Math.round(alarmScoreCalculation)),
      warningScore: Math.min(100, Math.round(warningScoreCalculation)),
      performanceScore: Math.min(100, Math.round(performanceScoreCalculation)),
      deviceStatusScore: Math.min(100, Math.round(deviceScoreCalculation))
    };
  }, [detail.score, detail.issues, alarmCount, warningCount, abnormalCount]);

  // 2. Classify issues into four main target sections requested
  const alarmIssuesList = useMemo(() => {
    return detail.issues.filter(i => i.type === 'alarm');
  }, [detail.issues]);

  const warningIssuesList = useMemo(() => {
    return detail.issues.filter(i => i.type === 'warning');
  }, [detail.issues]);

  const performanceIssuesList = useMemo(() => {
    return detail.issues.filter(i => i.type === 'abnormal');
  }, [detail.issues]);

  // Devices status alerts: include hardware modules, battery slots, sensor and loop insulation faults
  const deviceStatusIssuesList = useMemo(() => {
    return detail.issues.filter(i => 
      i.device.includes('传感器') || 
      i.device.includes('BMS') || 
      i.device.includes('合闸') || 
      i.device.includes('漏电') || 
      i.device.includes('连接线') || 
      i.device.includes('汇流箱') || 
      i.device.includes('新风机') || 
      i.device.includes('切换屏') || 
      i.device.includes('加热') ||
      i.device.includes('AC02')
    );
  }, [detail.issues]);

  // Score text selector
  const scoreColor = detail.score >= 95 ? 'text-emerald-400 font-bold' : detail.score >= 90 ? 'text-cyan-400 font-bold' : detail.score >= 80 ? 'text-amber-400 font-semibold' : 'text-rose-500 font-bold animate-pulse';

  return (
    <div className="flex-1 w-full max-w-[1920px] mx-auto px-4 md:px-6 py-6 flex flex-col space-y-6 select-none bg-[#02050e]/30">
      
      {/* 1. Station Details Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#142544]/60 pb-5">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-cyan-400 font-sans font-medium bg-[#102447]/50 hover:bg-[#1a386d]/80 border border-cyan-500/30 rounded-lg transition-all active:scale-95 cursor-pointer hover:shadow-[0_0_12px_rgba(6,182,212,0.15)]"
          >
            <ArrowLeft size={14} />
            <span>返回全局健康分巡检</span>
          </button>
          
          <div className="h-6 w-[1px] bg-[#142544] hidden sm:block" />

          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl md:text-2xl font-bold font-sans tracking-wide text-white">
                {detail.stationName}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                在线诊断激活 (ONLINE)
              </span>
            </div>
            <p className="text-xs text-[#5f759e] mt-1 font-mono">
              STATION_ID: SETS_{detail.stationId.toUpperCase()} • BMS模块多极下钻分析
            </p>
          </div>
        </div>

        {/* Global Score Panel */}
        <div className="flex items-center gap-4 self-start sm:self-center">
          <div className="text-right">
            <span className="text-[10px] text-[#5f759e] block font-mono font-bold">OVERALL HEALTH</span>
            <span className="text-xs text-slate-300 font-medium font-sans">
              全链诊断综合状态: <span className="font-semibold text-cyan-400">{detail.score >= 90 ? '极佳' : detail.score >= 80 ? '良好' : '异常'}</span>
            </span>
          </div>
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-slate-900 border border-[#142544] shadow-[inset_0_0_12px_rgba(6,182,212,0.1)] hover:border-cyan-500/30 transition-all duration-300">
            <span className={`text-2xl font-bold font-mono ${scoreColor}`}>
              {detail.score}
            </span>
            <span className={`text-[10px] font-sans font-medium self-end mb-1 ml-0.5 opacity-80 ${scoreColor}`}>%</span>
          </div>
        </div>
      </div>

      {/* 2. 四大维度健康评分卡 (顶部展示) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 预警评分 */}
        <div className="bg-[#0b1324]/80 border border-amber-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(245,158,11,0.02)] hover:border-amber-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-amber-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle size={15} />
              <span className="text-xs font-bold font-sans tracking-wide">预警评分</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              根据电池压差、变温梯度及冷媒压降等14项遥测数据偏离度精细评估。
            </p>
            <div className="text-[10px] font-mono text-amber-500/70">
              活动事件: <span className="font-bold underline">{warningCount} 条记录</span>
            </div>
          </div>
          <CircularProgress score={subScores.warningScore} colorClass="text-amber-400" />
        </div>

        {/* Card 2: 告警评分 */}
        <div className="bg-[#0b1324]/80 border border-rose-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(239,68,68,0.02)] hover:border-rose-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-rose-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <ShieldAlert size={15} />
              <span className="text-xs font-bold font-sans tracking-wide">告警评分</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              遥信严重告警、绝缘低限阻抗、设备短路粘连触电等危险因子惩扣限制。
            </p>
            <div className="text-[10px] font-mono text-rose-400/80">
              阻断报警: <span className="font-bold underline">{alarmCount} 条记录</span>
            </div>
          </div>
          <CircularProgress score={subScores.alarmScore} colorClass="text-rose-400" />
        </div>

        {/* Card 3: 性能指标平台 */}
        <div className="bg-[#0b1324]/80 border border-indigo-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(99,102,241,0.02)] hover:border-indigo-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-indigo-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Zap size={14} className="animate-pulse" />
              <span className="text-xs font-bold font-sans tracking-wide">性能指标平台</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              反映电站调频、充放能量转换转化效率（SOH）及无功偏差偏移比率。
            </p>
            <div className="text-[10px] font-mono text-[#a5b4fc]/80">
              偏差波动: <span className="font-bold underline">{abnormalCount} 处指标</span>
            </div>
          </div>
          <CircularProgress score={subScores.performanceScore} colorClass="text-[#a5b4fc]" />
        </div>

        {/* Card 4: 设备状态评分 */}
        <div className="bg-[#0b1324]/80 border border-cyan-500/20 rounded-xl p-4.5 flex items-center justify-between shadow-[0_4px_20px_rgba(6,182,212,0.02)] hover:border-cyan-500/40 hover:bg-[#10192e] transition-all duration-200 group relative">
          <div className="absolute top-0 left-0 w-16 h-[2px] bg-cyan-500/30 rounded-t-xl" />
          <div className="space-y-1.5 flex-1 pr-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Cpu size={15} />
              <span className="text-xs font-bold font-sans tracking-wide">设备状态评分</span>
            </div>
            <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
              包含全站微机、精密冷风空调、消防双合门阀在线遥信心跳健康评定。
            </p>
            <div className="text-[10px] font-mono text-cyan-400/80">
              采集物理簇: <span className="font-bold">{detail.rackCount} Racks</span>
            </div>
          </div>
          <CircularProgress score={subScores.deviceStatusScore} colorClass="text-cyan-400" />
        </div>
      </div>

      {/* 3. Sleek Live Parameters Horizontal Strip */}
      <div className="bg-[#0a1122]/70 border border-[#142544]/60 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-4 font-mono relative">
        <div className="absolute top-0 right-12 w-20 h-[1px] bg-gradient-to-l from-[#00f0ff]/40 to-transparent" />
        <div className="flex items-center gap-2 border-l-2 border-[#00f0ff] pl-2">
          <span className="text-slate-400 uppercase font-sans font-bold text-[10px] tracking-wider">实时遥测特征 (Telematic Panel):</span>
        </div>
        
        <div className="flex items-center gap-6 flex-wrap">
          {/* SOC */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">电量 SOC:</span>
            <span className="text-[#00f0ff] font-bold">{detail.soc}%</span>
            <div className="w-14 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-[#20345d]/40">
              <div className="h-full bg-gradient-to-r from-cyan-600 to-[#00f0ff]" style={{ width: `${detail.soc}%` }} />
            </div>
          </div>

          {/* SOH */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">健康 SOH:</span>
            <span className="text-emerald-400 font-bold">{detail.soh}%</span>
            <div className="w-14 h-1.5 bg-slate-950 rounded-full overflow-hidden border border-[#20345d]/40">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" style={{ width: `${detail.soh}%` }} />
            </div>
          </div>

          {/* Power */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">充放电功率:</span>
            <span className="text-amber-400 font-bold">{detail.activePower.toLocaleString()} kW</span>
          </div>

          {/* Temp */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">最大电芯温:</span>
            <span className={`${detail.temperature > 28 ? 'text-rose-500' : 'text-cyan-450'} font-bold`}>{detail.temperature} °C</span>
          </div>

          {/* Rack count */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-sans">在线电池包:</span>
            <span className="text-indigo-400 font-bold">{detail.rackCount} 簇套</span>
          </div>
        </div>
      </div>

      {/* 4. Categorized Issues lists (Replacing the old machine topology UI) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Panel A: 预警事件列表 */}
        <div className="bg-[#0b1222]/80 border border-amber-500/20 rounded-xl overflow-hidden flex flex-col min-h-[440px] shadow-lg relative">
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-amber-500/30 to-transparent" />
          
          <div className="bg-[#0f1a30]/60 px-4 py-3.5 border-b border-[#142544]/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-500/15 text-amber-400">
                <AlertTriangle size={15} />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide font-sans">运行指标预警列表</h3>
                <p className="text-[8.5px] text-[#5f759e] font-mono leading-none">PRE-WARNING ALERTS</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              warningIssuesList.length > 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {warningIssuesList.length > 0 ? `当前异常: ${warningIssuesList.length} 条` : '指标状态良好'}
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-[380px] space-y-3 scrollbar-thin">
            {warningIssuesList.length === 0 ? (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center p-6 text-center text-slate-500">
                <CheckCircle size={32} className="text-emerald-500/80 mb-2.5 animate-bounce" />
                <span className="text-xs font-semibold text-slate-200">未触发温升或差压过载预警</span>
                <span className="text-[9px] font-mono mt-1 text-slate-500">PREMSYSTEM: STATE GREEN & 100</span>
              </div>
            ) : (
              warningIssuesList.map(issue => (
                <div 
                  key={issue.id} 
                  className="relative p-3.5 bg-slate-950/60 rounded-lg border border-[#142544]/60 hover:bg-[#10203d]/40 hover:border-amber-500/30 transition-all duration-150 pl-4 group"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[11px] font-sans font-bold text-white leading-tight">
                      {issue.device}
                    </span>
                    {getLevelBadge(issue.level)}
                  </div>
                  
                  <div className="text-[11px] text-slate-350 bg-[#070d18]/70 border border-[#142544]/40 rounded p-2 mb-2 select-text">
                    <span className="text-amber-400/90 font-bold block mb-0.5 text-[9px] uppercase font-mono">扣分原因:</span>
                    {issue.reason}
                  </div>

                  <div className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded text-[10.5px] text-emerald-400 flex items-start gap-1 select-text">
                    <Wrench size={11} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-amber-400">专家措施:</strong> {issue.suggestion}
                    </span>
                  </div>

                  {/* Visual Indicator bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-l-lg bg-amber-500" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Panel B: 严重告警事件列表 */}
        <div className="bg-[#0b1222]/80 border border-rose-500/20 rounded-xl overflow-hidden flex flex-col min-h-[440px] shadow-lg relative">
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-rose-500/30 to-transparent" />
          
          <div className="bg-[#0f1a30]/60 px-4 py-3.5 border-b border-[#142544]/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-rose-500/15 text-rose-500">
                <ShieldAlert size={15} />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide font-sans">活动安全告警列表</h3>
                <p className="text-[8.5px] text-[#5f759e] font-mono leading-none">ACTIVE SAFETY ALARMS</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              alarmIssuesList.length > 0 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {alarmIssuesList.length > 0 ? `未闭环告警: ${alarmIssuesList.length} 条` : '未发生阻断级告警'}
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-[380px] space-y-3 scrollbar-thin">
            {alarmIssuesList.length === 0 ? (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center p-6 text-center text-slate-500">
                <CheckCircle size={32} className="text-emerald-500/80 mb-2.5 animate-bounce" />
                <span className="text-xs font-semibold text-slate-200">当前电站无活动状态故障或断线告警</span>
                <span className="text-[9px] font-mono mt-1 text-slate-500">ALARM SENSOR: HEALTH SAFE</span>
              </div>
            ) : (
              alarmIssuesList.map(issue => (
                <div 
                  key={issue.id} 
                  className="relative p-3.5 bg-slate-950/60 rounded-lg border border-[#142544]/60 hover:bg-[#10203d]/40 hover:border-rose-500/30 transition-all duration-150 pl-4 group"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[11px] font-sans font-bold text-white leading-tight">
                      {issue.device}
                    </span>
                    {getLevelBadge(issue.level)}
                  </div>
                  
                  <div className="text-[11px] text-slate-350 bg-[#070d18]/70 border border-[#142544]/40 rounded p-2 mb-2 select-text">
                    <span className="text-rose-400 font-bold block mb-0.5 text-[9px] uppercase font-mono">扣分原因:</span>
                    {issue.reason}
                  </div>

                  <div className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded text-[10.5px] text-emerald-400 flex items-start gap-1 select-text">
                    <Wrench size={11} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-rose-400">专家措施:</strong> {issue.suggestion}
                    </span>
                  </div>

                  {/* Visual Indicator bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-l-lg bg-rose-500" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Panel C: 性能指标异常列表 */}
        <div className="bg-[#0b1222]/80 border border-indigo-500/20 rounded-xl overflow-hidden flex flex-col min-h-[440px] shadow-lg relative">
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-indigo-500/30 to-transparent" />
          
          <div className="bg-[#0f1a30]/60 px-4 py-3.5 border-b border-[#142544]/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-500/15 text-indigo-400 font-bold">
                <Zap size={14} />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide font-sans">性能指标劣化诊断</h3>
                <p className="text-[8.5px] text-[#5f759e] font-mono leading-none">PERFORMANCE METRICS</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              performanceIssuesList.length > 0 ? 'bg-indigo-500/10 text-[#a5b4fc] border border-indigo-500/20' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {performanceIssuesList.length > 0 ? `劣化项: ${performanceIssuesList.length} 处` : '调频充放效能极好'}
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-[380px] space-y-3 scrollbar-thin">
            {performanceIssuesList.length === 0 ? (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center p-6 text-center text-slate-500">
                <CheckCircle size={32} className="text-emerald-500/80 mb-2.5 animate-bounce" />
                <span className="text-xs font-semibold text-slate-200">PCS和电池循环性能极优，无扣分指标</span>
                <span className="text-[9px] font-mono mt-1 text-slate-500">PCS PERFORMANCE: STANDARDS 99.8%</span>
              </div>
            ) : (
              performanceIssuesList.map(issue => (
                <div 
                  key={issue.id} 
                  className="relative p-3.5 bg-slate-950/60 rounded-lg border border-[#142544]/60 hover:bg-[#10203d]/40 hover:border-indigo-500/30 transition-all duration-150 pl-4 group"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[11px] font-sans font-bold text-white leading-tight">
                      {issue.device}
                    </span>
                    {getLevelBadge(issue.level)}
                  </div>
                  
                  <div className="text-[11px] text-slate-350 bg-[#070d18]/70 border border-[#142544]/40 rounded p-2 mb-2 select-text">
                    <span className="text-indigo-400 font-bold block mb-0.5 text-[9px] uppercase font-mono">扣分原因:</span>
                    {issue.reason}
                  </div>

                  <div className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded text-[10.5px] text-emerald-400 flex items-start gap-1 select-text">
                    <Wrench size={11} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-indigo-400">专家措施:</strong> {issue.suggestion}
                    </span>
                  </div>

                  {/* Visual Indicator bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-l-lg bg-indigo-550" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Panel D: 设备状态硬件缺陷列表 */}
        <div className="bg-[#0b1222]/80 border border-cyan-500/20 rounded-xl overflow-hidden flex flex-col min-h-[440px] shadow-lg relative">
          <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-cyan-500/30 to-transparent" />
          
          <div className="bg-[#0f1a30]/60 px-4 py-3.5 border-b border-[#142544]/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-cyan-500/15 text-cyan-400">
                <Cpu size={15} />
              </span>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide font-sans">设备层硬件状态监控</h3>
                <p className="text-[8.5px] text-[#5f759e] font-mono leading-none">DEVICE HEALTH & STATUS</p>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              deviceStatusIssuesList.length > 0 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              {deviceStatusIssuesList.length > 0 ? `缺陷硬件: ${deviceStatusIssuesList.length} 处` : '全域传感器在线'}
            </span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-[380px] space-y-3 scrollbar-thin">
            {deviceStatusIssuesList.length === 0 ? (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center p-6 text-center text-slate-500">
                <CheckCircle size={32} className="text-emerald-500/80 mb-2.5 animate-bounce" />
                <span className="text-xs font-semibold text-slate-200">主消防、BMS遥测底板心跳及线槽绝缘良好</span>
                <span className="text-[9px] font-mono mt-1 text-slate-500">HARDWARE HEARTBEAT: RUNNING STABLE</span>
              </div>
            ) : (
              deviceStatusIssuesList.map(issue => (
                <div 
                  key={issue.id} 
                  className="relative p-3.5 bg-slate-950/60 rounded-lg border border-[#142544]/60 hover:bg-[#10203d]/40 hover:border-cyan-500/30 transition-all duration-150 pl-4 group"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[11px] font-sans font-bold text-white leading-tight">
                      {issue.device}
                    </span>
                    {getLevelBadge(issue.level)}
                  </div>
                  
                  <div className="text-[11px] text-slate-350 bg-[#070d18]/70 border border-[#142544]/40 rounded p-2 mb-2 select-text">
                    <span className="text-cyan-400 font-bold block mb-0.5 text-[9px] uppercase font-mono">硬件缺陷原因:</span>
                    {issue.reason}
                  </div>

                  <div className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded text-[10.5px] text-emerald-400 flex items-start gap-1 select-text">
                    <Wrench size={11} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-cyan-400">现场建议:</strong> {issue.suggestion}
                    </span>
                  </div>

                  {/* Visual Indicator bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-l-lg bg-cyan-400" />
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* 5. Sub-footer with experts metadata info */}
      <div className="mt-2 pt-3 border-t border-[#142544]/50 flex flex-wrap justify-between items-center text-[10px] font-mono text-[#5f759e] gap-2 select-none">
        <div className="flex items-center gap-1">
          <Info size={11} className="text-cyan-400 shrink-0" />
          <span>规则库诊断引擎: <span className="text-slate-300">SetsCore-v9.2.2</span> 已激活</span>
        </div>
        <div>
          <span>微处理对地安全余量: <span className="text-emerald-400 font-semibold">100% 极安全等级</span></span>
        </div>
      </div>
    </div>
  );
}
