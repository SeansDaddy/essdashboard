import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SiteHealthPanel from './components/SiteHealthPanel';
import AlarmSummaryPanel from './components/AlarmSummaryPanel';
import EnergyRankingPanel from './components/EnergyRankingPanel';
import DeviceStatusPanel from './components/DeviceStatusPanel';
import MapPanel from './components/MapPanel';
import PerformanceTrendPanel from './components/PerformanceTrendPanel';
import MonitorAlarmPanel from './components/MonitorAlarmPanel';
import HighFreqAlarmPanel from './components/HighFreqAlarmPanel';
import RootCausePanel from './components/RootCausePanel';
import StationDetailView from './components/StationDetailView';
import HealthOverviewTab from './components/HealthOverviewTab';
import { mockStationDetails } from './data/mockDetails';
import { LayoutGrid, HeartPulse, HardDrive, ShieldAlert, Award, AlertTriangle, Bell, Gauge, MapPin, Database } from 'lucide-react';

import {
  SiteHealth,
  AlarmSummary,
  EnergyStation,
  DeviceStatus,
  MapNode,
  AlarmStat,
  HighFreqAlarm,
  TrendData
} from './types';

export default function App() {
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<'monitor' | 'health' | 'alarm' | 'warning' | 'device' | 'site' | 'data'>('monitor');

  // 1. Site Health Rankings (Left-Top - Replacing concentric rings)
  const [siteHealths, setSiteHealths] = useState<SiteHealth[]>([
    { id: 'h1', name: '龙岩东山储能电站', score: 98, status: 'excellent' },
    { id: 'h2', name: '中山公园储能电站', score: 96, status: 'excellent' },
    { id: 'h3', name: '上海静安储能电站', score: 91, status: 'good' },
    { id: 'h4', name: '北京西单储能电站', score: 85, status: 'good' },
    { id: 'h5', name: '成都春熙路储能站', score: 78, status: 'fair' },
    { id: 'h6', name: '广州天河路储能站', score: 64, status: 'poor' },
  ]);

  // 2. Alarm Level Counts (Middle-Top - Replacing host rate, success rate, etc.)
  const [alarmSummary, setAlarmSummary] = useState<AlarmSummary>({
    fatal: 28,      // 危急 (e.g. 28)
    urgent: 124,    // 紧急 (e.g. 124)
    important: 230, // 重要 (e.g. 230)
    warning: 408,   // 提示 (e.g. 408) (Total: 790, is simulating)
  });

  // 3. High Energy Consumption Sites (Left-Middle)
  const [energyStations, setEnergyStations] = useState<EnergyStation[]>([
    { name: '龙岩东山储能电站', value: 3880 },
    { name: '中山公园储能电站', value: 3450 },
    { name: '上海静安储能电站', value: 3120 },
    { name: '北京西单储能电站', value: 2980 },
    { name: '成都春熙路储能站', value: 2470 },
  ]);

  // 4. Real-time Device status counts (Left-Bottom)
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    online: 2568,
    offline: 132,
    list: [
      { name: '龙岩东山储能电站', region: '福建', value: 59 },
      { name: '中山公园储能电站', region: '广东', value: 65 },
      { name: '上海静安储能电站', region: '上海', value: 44 },
      { name: '北京西单储能电站', region: '北京', value: 38 },
      { name: '成都春熙路储能站', region: '四川', value: 41 },
    ],
  });

  // 5. Operations Deterioration Map Nodes (Middle-Center)
  const [mapNodes, setMapNodes] = useState<MapNode[]>([
    { id: 'mn1', name: '北京站节点', score: 95.2, x: 70, y: 48, rank: 1 },
    { id: 'mn2', name: '上海站节点', score: 92.1, x: 74, y: 64, rank: 2 },
    { id: 'mn3', name: '西安站节点', score: 84.2, x: 50, y: 55, rank: 3 },
    { id: 'mn4', name: '成都站节点', score: 78.3, x: 40, y: 72, rank: 4 },
    { id: 'mn5', name: '广州站节点', score: 65.5, x: 62, y: 84, rank: 5 },
  ]);

  // 6. Monitor Alarm Source Distribution (Right-Top)
  const [monitorAlarms, setMonitorAlarms] = useState<AlarmStat[]>([
    { name: 'PCS单元离线', value: 320, color: '#3b82f6' },
    { name: '热管理液冷异常', value: 278, color: '#10b981' },
    { name: 'BMS通信丢包', value: 244, color: '#f59e0b' },
    { name: '单体温差过高', value: 88, color: '#ef4444' },
  ]);

  // 7. High Frequency Warnings (Right-Middle)
  const [highFreqWarnings, setHighFreqWarnings] = useState<HighFreqAlarm[]>([
    { name: '三元/铁锂电芯单体欠压', value: 48 },
    { name: 'BMS主控板固件版本不一致', value: 32 },
    { name: '绝缘检测阻抗超限', value: 12 },
    { name: '电池簇辅助电源故障', value: 10 },
    { name: 'PCS控制器与主机连接失败', value: 6 },
  ]);

  // 8. Performance History & Trends (Middle-Bottom)
  const [trendData, setTrendData] = useState<TrendData[]>([
    { date: '05/10', alarmCount: 260, successRate: 94.1 },
    { date: '05/11', alarmCount: 310, successRate: 95.2 },
    { date: '05/12', alarmCount: 290, successRate: 92.2 },
    { date: '05/13', alarmCount: 350, successRate: 95.2 },
    { date: '05/14', alarmCount: 390, successRate: 96.2 },
    { date: '05/15', alarmCount: 370, successRate: 94.8 },
    { date: '05/16', alarmCount: 450, successRate: 97.2 },
  ]);

  // --- Live Data Simulation Engine ---
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // 1. Site Health random fluctuation
      setSiteHealths((prev) =>
        prev.map((site) => {
          const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
          const newScore = Math.max(50, Math.min(100, site.score + delta));
          return { ...site, score: newScore };
        })
      );

      // 2. Alarm Level counts variation
      setAlarmSummary((prev) => {
        const fatalDelta = Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const urgentDelta = Math.floor(Math.random() * 3) - 1; // -1 to 1
        const importantDelta = Math.floor(Math.random() * 5) - 2; // -2 to 2
        const warningDelta = Math.floor(Math.random() * 7) - 3; // -3 to 3

        return {
          fatal: Math.max(5, prev.fatal + fatalDelta),
          urgent: Math.max(30, prev.urgent + urgentDelta),
          important: Math.max(80, prev.important + importantDelta),
          warning: Math.max(150, prev.warning + warningDelta),
        };
      });

      // 3. Energy metrics ticks
      setEnergyStations((prev) =>
        prev.map((item) => ({
          ...item,
          value: item.value + Math.floor(Math.random() * 11) - 4, // slight up drift
        }))
      );

      // 4. Device status counts
      setDeviceStatus((prev) => {
        const isOnlineTick = Math.random() > 0.7;
        const change = Math.floor(Math.random() * 2) + 1;
        
        let online = prev.online;
        let offline = prev.offline;
        
        if (isOnlineTick) {
          if (Math.random() > 0.5) {
            online += change;
            offline = Math.max(30, offline - change);
          } else {
            online = Math.max(1000, online - change);
            offline += change;
          }
        }

        return {
          ...prev,
          online,
          offline,
          list: prev.list.map((item) => {
            const listDelta = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            return {
              ...item,
              value: Math.max(10, item.value + listDelta)
            };
          })
        };
      });

      // 5. Map node index fluctuations
      setMapNodes((prev) =>
        prev.map((node) => {
          const delta = (Math.random() * 2 - 1) * 0.4; // -0.4% to +0.4%
          const numeric = parseFloat((node.score + delta).toFixed(1));
          return {
            ...node,
            score: Math.max(20, Math.min(100, numeric)),
          };
        })
      );

      // 6. Monitor alarm counts representation
      setMonitorAlarms((prev) =>
        prev.map((item) => {
          const randDelta = Math.floor(Math.random() * 3) - 1;
          return {
            ...item,
            value: Math.max(10, item.value + randDelta),
          };
        })
      );

      // 7. High frequency warnings lists variation
      setHighFreqWarnings((prev) =>
        prev.map((item) => {
          const delta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          return {
            ...item,
            value: Math.max(1, item.value + delta),
          };
        })
      );

    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Resolve current active detail matching simulated score
  const getSelectedStationDetail = () => {
    if (!selectedStationId) return null;
    const baseDetail = mockStationDetails[selectedStationId];
    if (!baseDetail) return null;
    const currentSiteInList = siteHealths.find((s) => s.id === selectedStationId);
    return {
      ...baseDetail,
      score: currentSiteInList ? currentSiteInList.score : baseDetail.score
    };
  };

  const selectedStationDetail = getSelectedStationDetail();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden pb-6">
      {/* 1. Dashboard Sleek Header */}
      <Header 
        title="智能储能电站监控大屏" 
        isSimulating={isSimulating} 
        onToggleSimulation={() => setIsSimulating(!isSimulating)} 
        selectedStationId={selectedStationId}
        onSelectStation={(id) => setSelectedStationId(id)}
      />

      {/* Main Container wrapping left vertical menu and correct layout view */}
      <div className="flex-1 w-full flex overflow-hidden">
        
        {/* Left vertical navigation bar */}
        <aside className="w-16 md:w-[76px] bg-[#050b16]/95 border-r border-[#142544]/80 flex flex-col items-center py-6 gap-6 shrink-0 z-40 select-none relative">
          {/* Futuristic light ribbon effect */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#00f0ff]/35 via-transparent to-cyan-500/10" />

          {/* Core App branding logo / diagnostics icon */}
          <div className="flex flex-col items-center gap-1 mb-2">
            <Award className="text-cyan-400 animate-pulse" size={18} />
            <span className="text-[8px] font-mono text-[#4d5f80] text-center tracking-tighter">DIAG v4.12</span>
          </div>

          <div className="h-[1px] w-8 bg-[#142544]/60" />

          {/* Menu Option A: 主监控大屏 (Core Monitor Screen) */}
          <button
            onClick={() => setActiveMenu('monitor')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
              activeMenu === 'monitor'
                ? 'bg-[#1e40a6]/40 text-[#00f0ff] border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-[#102447]/30'
            }`}
            title="主监控大屏 (Core Monitor System)"
          >
            <LayoutGrid size={18} />
            <span className="text-[9px] font-sans scale-90 tracking-tight">监控大屏</span>
          </button>

          {/* Menu Option B: 健康度查看 (Detailed Multidimensional Health Viewer) */}
          <button
            onClick={() => setActiveMenu('health')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
              activeMenu === 'health'
                ? 'bg-[#1e40a6]/40 text-[#00f0ff] border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-[#102447]/30'
            }`}
            title="健康度多级分类巡检"
          >
            <HeartPulse size={18} />
            <span className="text-[9px] font-sans scale-90 tracking-tight">健康巡检</span>
          </button>

          <div className="h-[1px] w-8 bg-[#142544]/60" />

          {/* 告警 */}
          <button
            onClick={() => setActiveMenu('alarm')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
              activeMenu === 'alarm'
                ? 'bg-[#1e40a6]/40 text-[#00f0ff] border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-[#102447]/30'
            }`}
            title="告警"
          >
            <AlertTriangle size={18} />
            <span className="text-[9px] font-sans scale-90 tracking-tight">告警</span>
          </button>

          {/* 预警 */}
          <button
            onClick={() => setActiveMenu('warning')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
              activeMenu === 'warning'
                ? 'bg-[#1e40a6]/40 text-[#00f0ff] border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-[#102447]/30'
            }`}
            title="预警"
          >
            <Bell size={18} />
            <span className="text-[9px] font-sans scale-90 tracking-tight">预警</span>
          </button>

          {/* 设备 */}
          <button
            onClick={() => setActiveMenu('device')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
              activeMenu === 'device'
                ? 'bg-[#1e40a6]/40 text-[#00f0ff] border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-[#102447]/30'
            }`}
            title="设备"
          >
            <Gauge size={18} />
            <span className="text-[9px] font-sans scale-90 tracking-tight">设备</span>
          </button>

          {/* 站点 */}
          <button
            onClick={() => setActiveMenu('site')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
              activeMenu === 'site'
                ? 'bg-[#1e40a6]/40 text-[#00f0ff] border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-[#102447]/30'
            }`}
            title="站点"
          >
            <MapPin size={18} />
            <span className="text-[9px] font-sans scale-90 tracking-tight">站点</span>
          </button>

          {/* 数据 */}
          <button
            onClick={() => setActiveMenu('data')}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 cursor-pointer border ${
              activeMenu === 'data'
                ? 'bg-[#1e40a6]/40 text-[#00f0ff] border-cyan-500/40 shadow-[0_0_12px_rgba(0,240,255,0.15)] font-bold'
                : 'bg-transparent text-slate-400 border-transparent hover:text-slate-100 hover:bg-[#102447]/30'
            }`}
            title="数据"
          >
            <Database size={18} />
            <span className="text-[9px] font-sans scale-90 tracking-tight">数据</span>
          </button>

          {/* Lower status icons info */}
          <div className="mt-auto flex flex-col items-center gap-1 text-[8px] font-mono text-slate-500">
            <span className="cursor-help hover:text-cyan-400" title="自研诊断模块已激活-状态安全">🛡️ VERIFIED</span>
          </div>
        </aside>

        {/* Core content rendering area */}
        <div className="flex-1 overflow-y-auto">
          {activeMenu === 'health' ? (
            /* Multi-dimensional health viewing list */
            <HealthOverviewTab
              initialDimension={
                selectedStationId
                  ? 'site'
                  : 'region'
              }
              selectedStationId={selectedStationId}
              onSelectStation={(id) => {
                setSelectedStationId(id);
                if (id) {
                  setActiveMenu('monitor');
                }
              }}
            />
          ) : activeMenu === 'alarm' ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <AlertTriangle size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-mono">告警</p>
                <p className="text-xs text-slate-600 mt-2">告警管理页面开发中</p>
              </div>
            </div>
          ) : activeMenu === 'warning' ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <Bell size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-mono">预警</p>
                <p className="text-xs text-slate-600 mt-2">预警管理页面开发中</p>
              </div>
            </div>
          ) : activeMenu === 'device' ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <Gauge size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-mono">设备</p>
                <p className="text-xs text-slate-600 mt-2">设备管理页面开发中</p>
              </div>
            </div>
          ) : activeMenu === 'site' ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-mono">站点</p>
                <p className="text-xs text-slate-600 mt-2">站点管理页面开发中</p>
              </div>
            </div>
          ) : activeMenu === 'data' ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <Database size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-mono">数据</p>
                <p className="text-xs text-slate-600 mt-2">数据管理页面开发中</p>
              </div>
            </div>
          ) : selectedStationDetail ? (
            /* Selected single BMS station details */
            <StationDetailView 
              detail={selectedStationDetail} 
              onBack={() => setSelectedStationId(null)} 
            />
          ) : (
            /* 2. Responsive 3-Column Bento Grid Layout of core monitor dashboard */
            <main className="w-full max-w-[1920px] mx-auto px-4 md:px-6 mt-4 grid grid-cols-1 xl:grid-cols-4 gap-4">
              
              {/* ================= LEFT COLUMN (1/4 Width) ================= */}
              <section className="xl:col-span-1 flex flex-col space-y-4">
                
                {/* Section 1A: Site Health Ranking */}
                <div className="h-[290px]">
                  <SiteHealthPanel 
                    data={siteHealths} 
                    onSelectStation={(id) => setSelectedStationId(id)}
                  />
                </div>

                {/* Section 1B: High Energy Consumption Ranking */}
                <div className="h-[230px]">
                  <EnergyRankingPanel stations={energyStations} />
                </div>

                {/* Section 1C: Real-time Device Connection Status */}
                <div className="h-[260px]">
                  <DeviceStatusPanel status={deviceStatus} />
                </div>

              </section>

              {/* ================= MIDDLE COLUMN (2/4 Width - Major Focus) ================= */}
              <section className="xl:col-span-2 flex flex-col space-y-4">
                
                {/* Section 2A: Alarm severity level summaries */}
                <div className="h-auto">
                  <AlarmSummaryPanel summary={alarmSummary} />
                </div>

                {/* Section 2B: Interactive Schematic Vector Map */}
                <div className="flex-1 min-h-[340px] h-[360px]">
                  <MapPanel nodes={mapNodes} />
                </div>

                {/* Section 2C: Performance and Alarm Historic Trends */}
                <div className="h-[220px]">
                  <PerformanceTrendPanel trendData={trendData} />
                </div>

              </section>

              {/* ================= RIGHT COLUMN (1/4 Width) ================= */}
              <section className="xl:col-span-1 flex flex-col space-y-4">
                
                {/* Section 3A: Monitor Alarm Categorized donut */}
                <div className="h-[230px]">
                  <MonitorAlarmPanel stats={monitorAlarms} />
                </div>

                {/* Section 3B: High Frequency Warnings ranking listing */}
                <div className="h-[270px]">
                  <HighFreqAlarmPanel alarms={highFreqWarnings} />
                </div>

                {/* Section 3C: Root Cause Analysis gauge */}
                <div className="h-[260px]">
                  <RootCausePanel />
                </div>

              </section>

            </main>
          )}
        </div>

      </div>
    </div>
  );
}
