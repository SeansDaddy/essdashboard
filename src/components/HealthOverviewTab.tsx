import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Sliders,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
  Eye,
  EyeOff,
  AlertOctagon,
  AlertTriangle,
  Flame,
  Wrench,
  CheckCircle,
  Clock,
  ExternalLink,
  Info
} from 'lucide-react';
import {
  mockRegionData,
  mockRepOfficeData,
  mockCustomerData,
  mockSiteData,
  mockDeepLinkDetails,
  HealthMetricsRegion,
  HealthMetricsRepOffice,
  HealthMetricsCustomer,
  HealthMetricsSite,
  DeepLinkItem
} from '../data/healthMetricsData';

type DimensionType = 'region' | 'repOffice' | 'customer' | 'site';

interface HealthOverviewTabProps {
  initialDimension?: DimensionType;
  selectedStationId?: string | null;
  onSelectStation?: (id: string | null) => void;
}

export default function HealthOverviewTab({ 
  initialDimension = 'region',
  selectedStationId,
  onSelectStation
}: HealthOverviewTabProps) {
  const [activeTab, setActiveTab] = useState<DimensionType>(initialDimension);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sorting state
  const [sortField, setSortField] = useState<string>('overallScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Show hidden columns state
  const [showHiddenColumns, setShowHiddenColumns] = useState(false);

  // Score breakdown modal state
  const [selectedScoreRow, setSelectedScoreRow] = useState<any | null>(null);
  const [scoreModalType, setScoreModalType] = useState<'overall' | 'alarm' | 'warning' | 'perf' | 'device' | null>(null);

  // Active Deep Link pre-filter state for Alarm/Warning list
  const [deepLinkFilter, setDeepLinkFilter] = useState<{
    rep?: string;
    siteName?: string;
    type?: 'alarm' | 'warning' | 'performance';
  } | null>(null);

  // Handle setting sort field
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Switch dimension tab helper
  const handleTabChange = (tab: DimensionType) => {
    setActiveTab(tab);
    setSearchQuery('');
    setSortField('overallScore');
    setSortDirection('desc');
  };

  // Helper score color
  const getScoreColorClass = (score: number) => {
    if (score >= 95) return 'text-emerald-400 font-bold';
    if (score >= 90) return 'text-cyan-400 font-bold';
    if (score >= 80) return 'text-amber-400 font-semibold';
    return 'text-rose-500 font-bold animate-pulse';
  };

  // Render Level badge helper
  const getLevelBadge = (level: string) => {
    switch (level) {
      case '优秀':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">优秀</span>;
      case '良好':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-450 border border-cyan-500/20">良好</span>;
      case '中等':
        return <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">中等</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-450 border border-rose-500/20 animate-pulse">非健康</span>;
    }
  };

  // Quick helper to filter based on search query
  const filteredData = useMemo(() => {
    if (activeTab === 'region') {
      let data = [...mockRegionData];
      if (searchQuery) {
        data = data.filter(d => d.rep.includes(searchQuery) || d.country.includes(searchQuery));
      }
      return data.sort((a: any, b: any) => {
        const aVal = a[sortField] ?? 0;
        const bVal = b[sortField] ?? 0;
        return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });
    } else if (activeTab === 'repOffice') {
      let data = [...mockRepOfficeData];
      if (searchQuery) {
        data = data.filter(d => 
          d.rep.includes(searchQuery) || 
          d.customerName.includes(searchQuery) ||
          d.country.includes(searchQuery)
        );
      }
      return data.sort((a: any, b: any) => {
        const aVal = a[sortField] ?? 0;
        const bVal = b[sortField] ?? 0;
        return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });
    } else if (activeTab === 'customer') {
      let data = [...mockCustomerData];
      if (searchQuery) {
        data = data.filter(d => 
          d.rep.includes(searchQuery) || 
          d.siteName.includes(searchQuery) ||
          d.customerName.includes(searchQuery)
        );
      }
      return data.sort((a: any, b: any) => {
        const aVal = a[sortField] ?? 0;
        const bVal = b[sortField] ?? 0;
        return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });
    } else {
      let data = [...mockSiteData];
      if (searchQuery) {
        data = data.filter(d => 
          d.rep.includes(searchQuery) || 
          d.siteName.includes(searchQuery) ||
          d.deviceName.includes(searchQuery) ||
          d.deviceType.includes(searchQuery) ||
          d.deviceSn.includes(searchQuery)
        );
      }
      return data.sort((a: any, b: any) => {
        const aVal = a[sortField] ?? 0;
        const bVal = b[sortField] ?? 0;
        return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
      });
    }
  }, [activeTab, searchQuery, sortField, sortDirection]);

  // Handle Score cell Click to open dialog
  const handleScoreCellClick = (row: any, type: 'overall' | 'alarm' | 'warning' | 'perf' | 'device') => {
    setSelectedScoreRow(row);
    setScoreModalType(type);
  };

  // Direct trigger link pre-filtered issue viewer
  const triggerDeepLink = (rep: string, siteName: string | undefined, type: 'alarm' | 'warning' | 'performance') => {
    setDeepLinkFilter({ rep, siteName, type });
    setSelectedScoreRow(null);
    setScoreModalType(null);
    
    // Smoothly scroll down to the bottom link details section
    setTimeout(() => {
      const el = document.getElementById('deep-link-issues-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Compute the deep linked list items
  const activeDeepLinkList = useMemo(() => {
    if (!deepLinkFilter) return [];
    return mockDeepLinkDetails.filter(issue => {
      // Filter matching Representative Office
      const matchRep = !deepLinkFilter.rep || issue.rep === deepLinkFilter.rep;
      // Filter matching Site Name
      const matchSite = !deepLinkFilter.siteName || issue.siteName === deepLinkFilter.siteName;
      // Filter matching issue category
      const matchType = !deepLinkFilter.type || issue.type === deepLinkFilter.type;
      return matchRep && matchSite && matchType;
    });
  }, [deepLinkFilter]);

  // Quick stats about deep links overall
  const overallDeepIssuesCount = mockDeepLinkDetails.length;

  return (
    <div className="flex-1 w-full max-w-[1920px] mx-auto px-4 md:px-6 py-6 flex flex-col space-y-6">
      
      {/* Dynamic Sub-header Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#142544]/60 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold font-sans text-cyan-400 tracking-wider">
              诊断中心 • 全域维度健康度巡检
            </h2>
            <Sparkles size={14} className="text-[#00f0ff] animate-pulse" />
          </div>
          <p className="text-xs text-[#5f759e] mt-1">
            针对中国地区部所辖的代表处、定制级大客户、以及下属储能电网物理站点，提供指标穿透与排障建议。
          </p>
        </div>

        {/* Dynamic Column Toggles for hidden columns */}
        <div className="flex items-center gap-3">
          {(activeTab === 'customer' || activeTab === 'site') && (
            <button
              onClick={() => setShowHiddenColumns(prev => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-sans font-medium rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 bg-[#102447]/40 hover:bg-[#1a386d]/50 transition-all cursor-pointer"
            >
              {showHiddenColumns ? <EyeOff size={13} /> : <Eye size={13} />}
              <span>{showHiddenColumns ? '隐藏补充机载参数' : '展开合同、IPMT、SPDT等隐藏字段'}</span>
            </button>
          )}

          {deepLinkFilter && (
            <button
              onClick={() => setDeepLinkFilter(null)}
              className="px-2.5 py-1.5 text-[10px] font-mono rounded-lg border border-emerald-500/30 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/50 transition-all cursor-pointer"
            >
              重置穿透滤镜 [已开启]
            </button>
          )}
        </div>
      </div>

      {/* 4-Dimension Pivot smooth tabs */}
      <div className="flex bg-[#060c18] border border-[#142544]/60 p-1 rounded-xl self-start w-full sm:w-auto overflow-x-auto min-w-[280px]">
        {[
          { id: 'region', label: '地区部维度 (地区部级)' },
          { id: 'repOffice', label: '代表处维度 (代表处级)' },
          { id: 'customer', label: '客户维度 (客户主体级)' },
          { id: 'site', label: '站点维度 (设备传感器级)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as DimensionType)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-[#1e40a6] text-[#00f0ff] shadow-[0_0_12px_rgba(30,64,166,0.5)] font-bold' 
                : 'text-slate-400 hover:text-slate-205'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center bg-[#0d1527]/40 border border-[#142544]/50 p-3 rounded-lg">
        <div className="relative flex-1 w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 pointer-events-none">
            <Search size={14} />
          </span>
          <input
            type="text"
            className="w-full bg-slate-950 border border-[#142544] rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-[#4d5f80] focus:outline-none focus:border-cyan-500/50 transition-all font-sans"
            placeholder={`搜索当前维度 (${activeTab === 'region' ? '地区/代表处' : activeTab === 'repOffice' ? '代表处/客户' : activeTab === 'customer' ? '站点' : '设备/SN'})`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-[#5f759e] font-mono uppercase bg-[#102447]/50 border border-[#142544]/50 px-2 py-1.5 rounded-md">
            指标条目: <span className="text-cyan-400 font-bold">{filteredData.length} 行</span>
          </span>
        </div>
      </div>

      {/* Interactive Grid Table view */}
      <div className="bg-[#0c1324]/80 border border-[#142544]/80 rounded-xl overflow-hidden shadow-lg backdrop-blur-md relative">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-xs text-left text-slate-300 font-sans">
            <thead className="bg-[#050b16] text-[#5f759e] uppercase tracking-wider font-semibold border-b border-[#142544]">
              <tr>
                {/* 1. REGION TAB HEADERS */}
                {activeTab === 'region' && (
                  <>
                    <th onClick={() => handleSort('rep')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none w-[18%]">
                      <div className="flex items-center gap-1.5">代表处 {sortField === 'rep' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('country')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none w-[12%]">
                      <div className="flex items-center gap-1.5">国家 {sortField === 'country' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('overallScore')} className="p-3.5 cursor-pointer hover:text-[#00f0ff] select-none text-center w-[12%] bg-[#102447]/20 border-x border-[#142544]/60">
                      <div className="flex items-center justify-center gap-1.5 text-[#00f0ff] font-bold">总体健康度 {sortField === 'overallScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('level')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center w-[10%]">
                      <div className="flex items-center justify-center gap-1.5">健康度等级 {sortField === 'level' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('activeAlarmScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center w-[12%]">
                      <div className="flex items-center justify-center gap-1.5">活动告警-评分 {sortField === 'activeAlarmScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('warningScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center w-[12%]">
                      <div className="flex items-center justify-center gap-1.5">预警-评分 {sortField === 'warningScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('performanceScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center w-[12%]">
                      <div className="flex items-center justify-center gap-1.5">性能指标-评分 {sortField === 'performanceScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('deviceStatusScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center w-[12%]">
                      <div className="flex items-center justify-center gap-1.5">设备状态-评分 {sortField === 'deviceStatusScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                  </>
                )}

                {/* 2. REPOFFICE TAB HEADERS */}
                {activeTab === 'repOffice' && (
                  <>
                    <th onClick={() => handleSort('rep')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none w-[15%]">
                      <div className="flex items-center gap-1.5">代表处 {sortField === 'rep' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('country')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none w-[10%]">
                      <div className="flex items-center gap-1.5">国家 {sortField === 'country' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('customerName')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none w-[18%]">
                      <div className="flex items-center gap-1.5">最终客户名称 {sortField === 'customerName' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('customerLevel')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center w-[10%]">
                      <div className="flex items-center justify-center gap-1.5">客户级别 {sortField === 'customerLevel' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('overallScore')} className="p-3.5 cursor-pointer hover:text-[#00f0ff] select-none text-center bg-[#102447]/20 border-x border-[#142544]/60">
                      <div className="flex items-center justify-center gap-1 text-[#00f0ff] font-bold">总体健康度 {sortField === 'overallScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('level')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">
                      <div className="flex items-center justify-center gap-1">健康等级 {sortField === 'level' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('activeAlarmScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">
                      <div className="flex items-center justify-center gap-1">活动告警-评分 {sortField === 'activeAlarmScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('warningScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">
                      <div className="flex items-center justify-center gap-1">预警-评分 {sortField === 'warningScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('performanceScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">
                      <div className="flex items-center justify-center gap-1">性能指标-评分 {sortField === 'performanceScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('deviceStatusScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">
                      <div className="flex items-center justify-center gap-1">设备状态-评分 {sortField === 'deviceStatusScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                  </>
                )}

                {/* 3. CUSTOMER TAB HEADERS */}
                {activeTab === 'customer' && (
                  <>
                    <th onClick={() => handleSort('rep')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none">
                      <div className="flex items-center gap-1">代表处 {sortField === 'rep' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('country')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none">
                      <div className="flex items-center gap-1">国家 {sortField === 'country' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('siteName')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none w-[16%]">
                      <div className="flex items-center gap-1">站点名称 {sortField === 'siteName' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>

                    {/* Default Hidden Columns */}
                    {showHiddenColumns && (
                      <>
                        <th onClick={() => handleSort('customerName')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-[#5f759e]">最终客户</th>
                        <th onClick={() => handleSort('customerLevel')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-[#5f759e] text-center">客户级别</th>
                        <th onClick={() => handleSort('contractNo')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-[#5f759e]">合同号</th>
                        <th onClick={() => handleSort('contractName')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-[#5f759e]">合同名称</th>
                      </>
                    )}

                    <th onClick={() => handleSort('overallScore')} className="p-3.5 cursor-pointer hover:text-[#00f0ff] select-none text-center bg-[#102447]/20 border-x border-[#142544]/60">
                      <div className="flex items-center justify-center gap-1 text-[#00f0ff] font-bold">总体健康度 {sortField === 'overallScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th onClick={() => handleSort('level')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">健康度等级</th>
                    <th onClick={() => handleSort('activeAlarmScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">活动告警-评分</th>
                    <th onClick={() => handleSort('warningScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">预警-评分</th>
                    <th onClick={() => handleSort('performanceScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">性能指标-评分</th>
                    <th onClick={() => handleSort('deviceStatusScore')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">设备状态-评分</th>
                  </>
                )}

                {/* 4. SITE TAB HEADERS */}
                {activeTab === 'site' && (
                  <>
                    <th onClick={() => handleSort('rep')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none">代表处</th>
                    <th onClick={() => handleSort('country')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none">国家</th>
                    <th onClick={() => handleSort('deviceName')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none w-[14%]">设备名称</th>
                    <th onClick={() => handleSort('deviceType')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none">设备类型</th>
                    <th onClick={() => handleSort('hardwareVersion')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">硬件版本</th>
                    <th onClick={() => handleSort('deviceSn')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none font-mono">设备SN</th>
                    <th onClick={() => handleSort('status')} className="p-3.5 cursor-pointer hover:text-slate-200 select-none text-center">状态</th>

                    {/* Default Hidden Columns */}
                    {showHiddenColumns && (
                      <>
                        <th className="p-3.5 text-[#5f759e]">最终客户</th>
                        <th className="p-3.5 text-[#5f759e] text-center">级别</th>
                        <th className="p-3.5 text-[#5f759e]">合同号</th>
                        <th className="p-3.5 text-[#5f759e]">合同名称</th>
                        <th className="p-3.5 text-[#5f759e]">站点名称</th>
                        <th className="p-3.5 text-[#5f759e]">IPMT</th>
                        <th className="p-3.5 text-[#5f759e]">SPDT</th>
                        <th className="p-3.5 text-[#5f759e]">PE</th>
                      </>
                    )}

                    <th onClick={() => handleSort('overallScore')} className="p-3.5 cursor-pointer hover:text-[#00f0ff] select-none text-center bg-[#102447]/20 border-x border-[#142544]/60">
                      <div className="flex items-center justify-center gap-1 text-[#00f0ff] font-bold">总体健康度 {sortField === 'overallScore' && (sortDirection === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />)}</div>
                    </th>
                    <th className="p-3.5 text-center">健康等级</th>
                    <th className="p-3.5 text-center">活动告警</th>
                    <th className="p-3.5 text-center">预警评分</th>
                    <th className="p-3.5 text-center">性能评分</th>
                    <th className="p-3.5 text-center">状态评分</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#142544]/40 font-mono text-[11px]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={24} className="p-12 text-center text-[#5f759e] font-sans">
                    <AlertTriangle size={24} className="mx-auto text-amber-500 mb-2" />
                    <span>无符合当前筛选/搜索关键字的数据记录</span>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idindex) => (
                  <tr 
                    key={idindex} 
                    className="hover:bg-[#102447]/40 transition-colors group cursor-default"
                  >
                    
                    {/* 1. REGION TAB CELLS */}
                    {activeTab === 'region' && (
                      <>
                        <td className="p-3.5 text-white font-sans font-medium">{item.rep}</td>
                        <td className="p-3.5 text-[#5f759e]">{item.country}</td>
                        
                        {/* Overall health - Clickable */}
                        <td 
                          onClick={() => handleScoreCellClick(item, 'overall')}
                          className="p-3.5 text-center bg-[#102447]/10 hover:bg-[#1e40a6]/30 border-x border-[#142544]/60 cursor-pointer font-bold transition-all relative"
                        >
                          <span className={getScoreColorClass((item as HealthMetricsRegion).overallScore)}>
                            {(item as HealthMetricsRegion).overallScore}%
                          </span>
                          <span className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-40 text-[7px] text-cyan-400">INFO</span>
                        </td>
                        
                        <td className="p-3.5 text-center">{getLevelBadge((item as HealthMetricsRegion).level)}</td>
                        
                        {/* Alarm score */}
                        <td 
                          onClick={() => handleScoreCellClick(item, 'alarm')}
                          className="p-3.5 text-center hover:bg-[#ef4444]/10 cursor-pointer text-slate-300 font-bold hover:text-red-400 transition-colors"
                        >
                          {(item as HealthMetricsRegion).activeAlarmScore}
                        </td>

                        {/* Warning score */}
                        <td 
                          onClick={() => handleScoreCellClick(item, 'warning')}
                          className="p-3.5 text-center hover:bg-amber-500/10 cursor-pointer text-slate-300 font-bold hover:text-amber-400 transition-colors"
                        >
                          {(item as HealthMetricsRegion).warningScore}
                        </td>

                        {/* Performance score */}
                        <td 
                          onClick={() => handleScoreCellClick(item, 'perf')}
                          className="p-3.5 text-center hover:bg-indigo-500/10 cursor-pointer text-slate-300 font-bold hover:text-indigo-400 transition-colors"
                        >
                          {(item as HealthMetricsRegion).performanceScore}
                        </td>

                        {/* Device status score */}
                        <td 
                          onClick={() => handleScoreCellClick(item, 'device')}
                          className="p-3.5 text-center hover:bg-cyan-500/10 cursor-pointer text-slate-300 font-bold hover:text-cyan-400 transition-colors"
                        >
                          {(item as HealthMetricsRegion).deviceStatusScore}
                        </td>
                      </>
                    )}

                    {/* 2. REPOFFICE TAB CELLS */}
                    {activeTab === 'repOffice' && (
                      <>
                        <td className="p-3.5 text-white font-sans">{item.rep}</td>
                        <td className="p-3.5 text-[#5f759e]">{item.country}</td>
                        <td className="p-3.5 text-cyan-300 font-sans font-medium">{(item as HealthMetricsRepOffice).customerName}</td>
                        <td className="p-3.5 text-center">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-bold border border-slate-700">
                            {(item as HealthMetricsRepOffice).customerLevel}
                          </span>
                        </td>

                        {/* Score clickable */}
                        <td 
                          onClick={() => handleScoreCellClick(item, 'overall')}
                          className="p-3.5 text-center bg-[#102447]/10 hover:bg-[#1e40a6]/30 border-x border-[#142544]/60 cursor-pointer font-bold duration-150"
                        >
                          <span className={getScoreColorClass((item as HealthMetricsRepOffice).overallScore)}>
                            {(item as HealthMetricsRepOffice).overallScore}%
                          </span>
                        </td>

                        <td className="p-3.5 text-center">{getLevelBadge((item as HealthMetricsRepOffice).level)}</td>

                        <td onClick={() => handleScoreCellClick(item, 'alarm')} className="p-3.5 text-center hover:bg-red-500/10 cursor-pointer font-bold hover:text-red-400 transition-colors">{(item as HealthMetricsRepOffice).activeAlarmScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'warning')} className="p-3.5 text-center hover:bg-amber-500/10 cursor-pointer font-bold hover:text-amber-400 transition-colors">{(item as HealthMetricsRepOffice).warningScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'perf')} className="p-3.5 text-center hover:bg-indigo-505/10 cursor-pointer font-bold hover:text-indigo-405 transition-colors">{(item as HealthMetricsRepOffice).performanceScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'device')} className="p-3.5 text-center hover:bg-cyan-505/10 cursor-pointer font-bold hover:text-cyan-405 transition-colors">{(item as HealthMetricsRepOffice).deviceStatusScore}</td>
                      </>
                    )}

                    {/* 3. CUSTOMER TAB CELLS */}
                    {activeTab === 'customer' && (
                      <>
                        <td className="p-3.5 text-[#5f759e] font-sans">{item.rep}</td>
                        <td className="p-3.5 text-[#5f759e]">{item.country}</td>
                        
                        <td className="p-3.5 text-white font-sans font-semibold group-hover:text-cyan-400 transition-colors">
                          <div className="flex items-center gap-1.5">
                            <span>{(item as HealthMetricsCustomer).siteName}</span>
                            <span 
                              onClick={() => {
                                // Find match in stations h1-h6
                                const mockKey = Object.keys(mockRegionData).find(key => {
                                  if (item.siteName.includes('龙岩')) return 'h1';
                                  if (item.siteName.includes('中山')) return 'h2';
                                  if (item.siteName.includes('静安')) return 'h3';
                                  if (item.siteName.includes('西单')) return 'h4';
                                  if (item.siteName.includes('春熙')) return 'h5';
                                  return 'h6';
                                });
                                // trigger top back detail set
                                if (onSelectStation) {
                                  const sid = item.siteName.includes('龙岩') ? 'h1' : item.siteName.includes('中山') ? 'h2' : item.siteName.includes('静安') ? 'h3' : item.siteName.includes('西单') ? 'h4' : item.siteName.includes('春熙') ? 'h5' : 'h6';
                                  onSelectStation(sid);
                                }
                              }}
                              className="opacity-0 group-hover:opacity-100 p-0.5 rounded bg-cyan-950/40 text-cyan-400 hover:bg-[#1e40a6] hover:text-white transition-all cursor-pointer"
                              title="穿透至电站BMS专家诊断视图"
                            >
                              <ExternalLink size={10} />
                            </span>
                          </div>
                        </td>

                        {/* Hidden dynamic columns */}
                        {showHiddenColumns && (
                          <>
                            <td className="p-3.5 text-[#5f759e] font-sans">{(item as HealthMetricsCustomer).customerName}</td>
                            <td className="p-3.5 text-[#5f759e] text-center">{(item as HealthMetricsCustomer).customerLevel}</td>
                            <td className="p-3.5 text-[#4d5f80]">{(item as HealthMetricsCustomer).contractNo}</td>
                            <td className="p-3.5 text-[#4d5f80] font-sans truncate max-w-[120px]" title={(item as HealthMetricsCustomer).contractName}>{(item as HealthMetricsCustomer).contractName}</td>
                          </>
                        )}

                        <td onClick={() => handleScoreCellClick(item, 'overall')} className="p-3.5 text-center bg-[#102447]/10 hover:bg-[#1e40a6]/30 border-x border-[#142544]/60 cursor-pointer font-bold">
                          <span className={getScoreColorClass((item as HealthMetricsCustomer).overallScore)}>
                            {(item as HealthMetricsCustomer).overallScore}%
                          </span>
                        </td>
                        <td className="p-3.5 text-center">{getLevelBadge((item as HealthMetricsCustomer).level)}</td>
                        <td onClick={() => handleScoreCellClick(item, 'alarm')} className="p-3.5 text-center hover:bg-red-500/10 cursor-pointer font-bold hover:text-red-400 transition-colors">{(item as HealthMetricsCustomer).activeAlarmScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'warning')} className="p-3.5 text-center hover:bg-amber-500/10 cursor-pointer font-bold hover:text-amber-400 transition-colors">{(item as HealthMetricsCustomer).warningScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'perf')} className="p-3.5 text-center hover:bg-indigo-500/10 cursor-pointer font-bold hover:text-indigo-400 transition-colors">{(item as HealthMetricsCustomer).performanceScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'device')} className="p-3.5 text-center hover:bg-cyan-500/10 cursor-pointer font-bold hover:text-cyan-400 transition-colors">{(item as HealthMetricsCustomer).deviceStatusScore}</td>
                      </>
                    )}

                    {/* 4. SITE TAB CELLS */}
                    {activeTab === 'site' && (
                      <>
                        <td className="p-3.5 text-[#4d5f80] font-sans">{item.rep}</td>
                        <td className="p-3.5 text-[#4d5f80]">{item.country}</td>
                        <td className="p-3.5 text-white font-sans font-medium">{(item as HealthMetricsSite).deviceName}</td>
                        <td className="p-3.5 text-slate-400">{(item as HealthMetricsSite).deviceType}</td>
                        <td className="p-3.5 text-center text-slate-500">{(item as HealthMetricsSite).hardwareVersion}</td>
                        <td className="p-3.5 font-mono text-cyan-400/80">{(item as HealthMetricsSite).deviceSn}</td>
                        <td className="p-3.5 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-sans ${
                            (item as HealthMetricsSite).status === '正常' ? 'bg-emerald-500/10 text-emerald-400' :
                            (item as HealthMetricsSite).status === '异常' ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 'bg-red-500/15 text-red-500'
                          }`}>
                            {(item as HealthMetricsSite).status}
                          </span>
                        </td>

                        {/* Hidden Site fields */}
                        {showHiddenColumns && (
                          <>
                            <td className="p-3.5 text-[#5f759e]">{(item as HealthMetricsSite).customerName}</td>
                            <td className="p-3.5 text-[#5f759e] text-center">{(item as HealthMetricsSite).customerLevel}</td>
                            <td className="p-3.5 text-[#4d5f80]">{(item as HealthMetricsSite).contractNo}</td>
                            <td className="p-3.5 text-[#4d5f80] truncate max-w-[100px]" title={(item as HealthMetricsSite).contractName}>{(item as HealthMetricsSite).contractName}</td>
                            <td className="p-3.5 text-[#5f759e] truncate max-w-[100px]" title={(item as HealthMetricsSite).siteName}>{(item as HealthMetricsSite).siteName}</td>
                            <td className="p-3.5 text-slate-400 font-sans">{(item as HealthMetricsSite).ipmt}</td>
                            <td className="p-3.5 text-slate-400 font-sans">{(item as HealthMetricsSite).spdt}</td>
                            <td className="p-3.5 text-slate-400 font-sans">{(item as HealthMetricsSite).pe}</td>
                          </>
                        )}

                        <td onClick={() => handleScoreCellClick(item, 'overall')} className="p-3.5 text-center bg-[#102447]/10 hover:bg-[#1e40a6]/30 border-x border-[#142544]/60 cursor-pointer font-bold">
                          <span className={getScoreColorClass((item as HealthMetricsSite).overallScore)}>
                            {(item as HealthMetricsSite).overallScore}%
                          </span>
                        </td>
                        <td className="p-3.5 text-center">{getLevelBadge((item as HealthMetricsSite).level)}</td>
                        <td onClick={() => handleScoreCellClick(item, 'alarm')} className="p-3.5 text-center hover:bg-red-500/10 cursor-pointer font-bold hover:text-red-400 transition-colors">{(item as HealthMetricsSite).activeAlarmScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'warning')} className="p-3.5 text-center hover:bg-amber-500/10 cursor-pointer font-bold hover:text-amber-400 transition-colors">{(item as HealthMetricsSite).warningScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'perf')} className="p-3.5 text-center hover:bg-indigo-500/10 cursor-pointer font-bold hover:text-indigo-400 transition-colors">{(item as HealthMetricsSite).performanceScore}</td>
                        <td onClick={() => handleScoreCellClick(item, 'device')} className="p-3.5 text-center hover:bg-cyan-500/10 cursor-pointer font-bold hover:text-cyan-400 transition-colors">{(item as HealthMetricsSite).deviceStatusScore}</td>
                      </>
                    )}

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Score Drilldown Detail Popover Modal */}
      <AnimatePresence>
        {selectedScoreRow && scoreModalType && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedScoreRow(null); setScoreModalType(null); }}
              className="absolute inset-0 bg-[#02050c]/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl bg-[#091122] border border-cyan-500/40 rounded-xl shadow-[0_20px_50px_rgba(0,240,255,0.25)] overflow-hidden text-slate-100 z-10"
            >
              {/* Header */}
              <div className="bg-[#050b16] border-b border-[#142544] px-5 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-sans tracking-wider text-cyan-400 flex items-center gap-2">
                    <Sliders size={15} />
                    <span>健康评分多级分解诊断 </span>
                  </h3>
                  <p className="text-[10px] bg-[#142544]/60 px-2 py-0.5 rounded text-slate-350 border border-[#1e40a6]/30 inline-block mt-1 font-mono">
                    TARGET: {selectedScoreRow.rep} {selectedScoreRow.siteName || selectedScoreRow.customerName || ''}
                  </p>
                </div>
                
                <button 
                  onClick={() => { setSelectedScoreRow(null); setScoreModalType(null); }}
                  className="text-slate-400 hover:text-white bg-[#102447]/50 hover:bg-[#1a386d] p-1.5 rounded transition-all cursor-pointer font-mono text-[10px]"
                >
                  [关闭 ESC]
                </button>
              </div>

              {/* Detail body */}
              <div className="p-6 space-y-5">
                
                {/* Score Grid row resembling prompt's mock structure:
                    代表处     总体健康度   活动告警评分   预警评分  性能指标评分   设备状态评分
                    代表处1    20          20            20       20             20
                */}
                <div className="bg-[#050b16] rounded-xl border border-[#142544] overflow-hidden">
                  <div className="bg-[#102447]/40 px-4 py-2 border-b border-[#142544] text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                    多维度健康评分对比矩阵 (Health Decomposition Matrix)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10.5px] text-center font-mono divide-y divide-[#142544]/60">
                      <thead className="text-[#5f759e] font-semibold bg-slate-950/40">
                        <tr>
                          <th className="p-3 text-left">监测对象</th>
                          <th className="p-3 text-cyan-400">总体健康度</th>
                          <th className="p-3">活动告警评分</th>
                          <th className="p-3">预警评分</th>
                          <th className="p-3">性能指标评分</th>
                          <th className="p-3">设备状态评分</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#142544]/40">
                        <tr className="bg-[#10243d]/20 text-white font-medium">
                          <td className="p-3.5 text-left font-sans text-[#00f0ff]">{selectedScoreRow.rep}</td>
                          <td className="p-3.5 text-cyan-400 font-bold font-mono text-xs">{selectedScoreRow.overallScore}%</td>
                          <td className="p-3.5 font-mono">{selectedScoreRow.activeAlarmScore}</td>
                          <td className="p-3.5 font-mono">{selectedScoreRow.warningScore}</td>
                          <td className="p-3.5 font-mono">{selectedScoreRow.performanceScore}</td>
                          <td className="p-3.5 font-mono">{selectedScoreRow.deviceStatusScore}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* System analysis text on current score selection */}
                <div className="space-y-3 bg-slate-950/80 p-4 border border-[#142544]/70 rounded-lg">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold font-sans">
                    <Sparkles size={13} className="animate-spin text-amber-400" />
                    <span>自动扣分诊断报告及联动穿透:</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    本监测单元总体得分设为 <span className="font-semibold text-cyan-450">{selectedScoreRow.overallScore}</span> 分。
                    主要扣分因子涵盖 
                    {selectedScoreRow.activeAlarmScore < 95 && <span className="text-rose-400 font-bold"> 活动告警限制 ({100 - selectedScoreRow.activeAlarmScore}分) </span>}
                    {selectedScoreRow.warningScore < 95 && <span className="text-amber-400 font-bold"> 空调/BMS温湿变送预警 ({100 - selectedScoreRow.warningScore}分) </span>}
                    {selectedScoreRow.performanceScore < 95 && <span className="text-[#a5b4fc] font-bold"> 蓄能充放电转化系统效率离群 ({100 - selectedScoreRow.performanceScore}分)</span>}。
                  </p>

                  <div className="h-[1px] bg-[#142544] my-2" />

                  {/* 3 Click buttons that directly trigger deeplink links */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      onClick={() => triggerDeepLink(selectedScoreRow.rep, selectedScoreRow.siteName, 'alarm')}
                      className="flex-1 flex items-center justify-between px-3 py-2 bg-red-950/35 hover:bg-red-900/40 border border-red-900/40 text-red-400 rounded-lg text-xs tracking-wide transition-all duration-150 cursor-pointer"
                    >
                      <span>穿透定位 [活动告警明细]</span>
                      <ArrowRight size={12} />
                    </button>

                    <button
                      onClick={() => triggerDeepLink(selectedScoreRow.rep, selectedScoreRow.siteName, 'warning')}
                      className="flex-1 flex items-center justify-between px-3 py-2 bg-amber-950/35 hover:bg-amber-900/40 border border-amber-900/40 text-amber-400 rounded-lg text-xs tracking-wide transition-all duration-150 cursor-pointer"
                    >
                      <span>穿透定位 [温湿度预警明细]</span>
                      <ArrowRight size={12} />
                    </button>

                    <button
                      onClick={() => triggerDeepLink(selectedScoreRow.rep, selectedScoreRow.siteName, 'performance')}
                      className="flex-1 flex items-center justify-between px-3 py-2 bg-indigo-950/35 hover:bg-indigo-900/40 border border-indigo-900/40 text-[#a5b4fc] rounded-lg text-xs tracking-wide transition-all duration-150 cursor-pointer"
                    >
                      <span>穿透定位 [电能质量指标]</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-sans flex items-start gap-1">
                  <Info size={12} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>点击上述红色、橙色、紫色卡片可以直接跳转至下方的诊断穿透报表，并会自动按此地区及电站维度进行动态滤波筛分。</span>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Linked Pre-fitted Action Details Section (穿透展现页面) */}
      <section 
        id="deep-link-issues-section" 
        className="bg-[#0c1324]/80 border border-cyan-500/20 rounded-xl p-5 shadow-inner transition-all duration-300 relative glow-panel"
      >
        <div className="absolute top-0 right-0 w-32 h-[1px] bg-gradient-to-l from-[#00f0ff]/50 to-transparent" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#142544]/60 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-1 px-2 rounded-md bg-cyan-950 text-cyan-400 text-[10px] font-mono border border-cyan-800/40">DEEP_LINK_VIEW</span>
            <div>
              <h3 className="text-xs font-bold font-sans tracking-wide text-white uppercase">
                {deepLinkFilter ? '穿透联动过滤 • 故障与预警联结明细' : '全域实时警告、预警与性能扣分项数据库'}
              </h3>
              {deepLinkFilter ? (
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5 animate-pulse">
                  当前诊断滤镜: [代表处: {deepLinkFilter.rep || '全部'}] • [站点: {deepLinkFilter.siteName || '全部'}] • [类型: {deepLinkFilter.type || '全部'}]
                </p>
              ) : (
                <p className="text-[10px] text-[#5f759e] font-sans mt-0.5">
                  点击上方列表中任何 [评分数值] 即可自动将相关高优先级告警/指标预警一键锁定呈现。
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {deepLinkFilter && (
              <button
                onClick={() => setDeepLinkFilter(null)}
                className="px-3 py-1 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-md text-[10px] cursor-pointer"
              >
                清除当前穿透
              </button>
            )}
            <span className="text-[10px] font-mono text-slate-400">
              可用故障池条目: <strong className="text-[#00f0ff]">{deepLinkFilter ? activeDeepLinkList.length : overallDeepIssuesCount} 项</strong>
            </span>
          </div>
        </div>

        {/* Dynamic linked lists content card group */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(deepLinkFilter ? activeDeepLinkList : mockDeepLinkDetails).map((issue) => {
            return (
              <div 
                key={issue.id} 
                className={`p-4 rounded-xl border relative overflow-hidden transition-all flex flex-col justify-between min-h-[190px] ${
                  issue.type === 'alarm' ? 'bg-[#180a0c]/85 border-rose-950/60 hover:border-red-500/30' : 
                  issue.type === 'warning' ? 'bg-[#18110b]/85 border-amber-950/60 hover:border-amber-500/30' : 
                  'bg-[#0b0c1b]/85 border-indigo-950/60 hover:border-indigo-500/30'
                }`}
              >
                
                {/* ID marker + Category flag */}
                <div className="flex justify-between items-center mb-2 text-[10px]">
                  <span className="font-mono text-slate-500">REF: {issue.id}</span>
                  <div className="flex items-center gap-1">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      issue.type === 'alarm' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                      issue.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}>
                      {issue.type === 'alarm' ? '活动告警' : issue.type === 'warning' ? '指标预警' : '性能异常'}
                    </span>
                    <span className="px-1 py-0.2 rounded bg-slate-950 text-slate-400 font-mono scale-90">{issue.level}</span>
                  </div>
                </div>

                {/* Scope Metadata */}
                <div className="text-[10.5px] font-mono text-slate-400 bg-slate-950/70 py-1 px-2 rounded border border-[#142544]/60 mb-2.5">
                  <span className="text-cyan-400">{issue.rep}</span> • <span className="text-white">{issue.siteName}</span>
                </div>

                {/* Title */}
                <h4 className="text-xs font-semibold text-slate-100 mb-1 font-sans flex items-center gap-1.5 leading-snug">
                  {issue.type === 'alarm' ? <Flame size={12} className="text-rose-500 shrink-0" /> : <AlertOctagon size={12} className="text-amber-500 shrink-0" />}
                  <span>{issue.title}</span>
                </h4>

                {/* Reason */}
                <p className="text-[11px] text-[#8ea4cc] leading-relaxed mb-3 pr-1">
                  <strong>扣分原委:</strong> {issue.reason}
                </p>

                {/* Advisory suggestion box */}
                <div className="mt-auto p-2 rounded bg-[#0a1120] border border-cyan-900/40 text-[10.5px] text-emerald-450 leading-relaxed font-sans">
                  <div className="flex items-start gap-1">
                    <Wrench size={11} className="text-emerald-400 shrink-0 mt-0.5 animate-bounce" />
                    <span>
                      <strong className="text-amber-400">消除建议: </strong>
                      {issue.suggestion}
                    </span>
                  </div>
                </div>

                {/* Score impact float ribbon */}
                <span className={`absolute right-0 top-6 text-[9px] font-bold px-2 py-0.5 rounded-l-md font-mono ${
                  issue.type === 'alarm' ? 'bg-rose-500/20 text-rose-400' : 
                  issue.type === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-indigo-500/20 text-indigo-400'
                }`}>
                  扣 {issue.scoreImpact}
                </span>
                
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
