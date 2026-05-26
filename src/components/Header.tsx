import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Wifi, 
  CloudRain, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  MapPin, 
  Globe, 
  Building2, 
  User, 
  ChevronDown,
  Star 
} from 'lucide-react';
import { getFollowedIds, toggleFollow as toggleFollowUtil } from '../data/followedStations';

interface HeaderProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  title: string;
  selectedStationId: string | null;
  onSelectStation: (id: string | null) => void;
}

const STATIONS = [
  { id: 'h1', name: '龙岩东山储能电站', rep: '福建代表处', cust: '华润电力' },
  { id: 'h2', name: '中山公园储能电站', rep: '广东代表处', cust: '南方电网' },
  { id: 'h3', name: '上海静安储能电站', rep: '上海代表处', cust: '申能股份' },
  { id: 'h4', name: '北京西单储能电站', rep: '北京代表处', cust: '国家电网' },
  { id: 'h5', name: '成都春熙路储能站', rep: '四川代表处', cust: '成都城投储能' },
  { id: 'h6', name: '广州天河路储能站', rep: '广东代表处', cust: '南方电网' },
];

export default function Header({ 
  isSimulating, 
  onToggleSimulation, 
  title, 
  selectedStationId,
  onSelectStation 
}: HeaderProps) {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<'rep' | 'customer' | 'site' | null>(null);
  const [followedIds, setFollowedIds] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('zh-CN', { hour12: false }));
      setDate(now.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize followed IDs from localStorage
  useEffect(() => {
    setFollowedIds(getFollowedIds());
  }, []);

  const handleToggleFollow = (stationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowFollowed = toggleFollowUtil(stationId);
    setFollowedIds(prev =>
      isNowFollowed ? [...prev, stationId] : prev.filter(id => id !== stationId)
    );
  };

  const currentStation = STATIONS.find(s => s.id === selectedStationId);

  const toggleDropdown = (type: 'rep' | 'customer' | 'site') => {
    setActiveDropdown(prev => prev === type ? null : type);
  };

  const handleSelectRep = (repName: string | null) => {
    if (!repName) {
      onSelectStation(null);
    } else {
      const match = STATIONS.find(s => s.rep === repName);
      if (match) onSelectStation(match.id);
    }
    setActiveDropdown(null);
  };

  const handleSelectCustomer = (custName: string | null) => {
    if (!custName) {
      onSelectStation(null);
    } else {
      const match = STATIONS.find(s => s.cust === custName);
      if (match) onSelectStation(match.id);
    }
    setActiveDropdown(null);
  };

  // Unique options
  const uniqueReps = Array.from(new Set(STATIONS.map(s => s.rep)));
  const uniqueCustomers = Array.from(new Set(STATIONS.map(s => s.cust)));

  return (
    <header className="relative w-full h-16 flex items-center justify-between px-6 bg-gradient-to-b from-[#091530] to-[#040a1b] border-b border-[#142544] select-none z-50">
      {/* Decorative cyber grid background lines */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent" />

      {/* Left section: Breadcrumb Navigation */}
      <div ref={containerRef} className="flex items-center gap-2 text-xs font-sans text-slate-300">
        
        {/* Level 1: 中国地区部 / Home Icon */}
        <div 
          onClick={() => { onSelectStation(null); setActiveDropdown(null); }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:bg-[#102447]/60 hover:text-[#00f0ff] border border-transparent hover:border-[#1e40a6]/30 cursor-pointer transition-all"
          title="返回中国地区部主面板"
        >
          <Globe size={14} className="text-cyan-400 animate-pulse shrink-0" />
          <span className="font-semibold text-[11px] tracking-wide">中国地区部</span>
        </div>

        <ChevronRight size={11} className="text-[#3b4c6e] shrink-0" />

        {/* Level 2: 代表处 Dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => toggleDropdown('rep')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-[11px] font-medium transition-all cursor-pointer ${
              activeDropdown === 'rep' 
                ? 'bg-[#1e40a6]/50 text-[#00f0ff] border-cyan-500/40' 
                : currentStation 
                  ? 'bg-[#102447]/40 text-cyan-300 border-[#1e40a6]/30 hover:border-cyan-500/30 hover:text-[#00f0ff]' 
                  : 'bg-[#102447]/20 text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <Building2 size={12} className="text-cyan-400/80 shrink-0" />
            <span>{currentStation ? currentStation.rep : '全部代表处'}</span>
            {followedIds.length > 0 && (
              <span className="ml-1 px-1 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[8px] font-bold">{followedIds.length}</span>
            )}
            <ChevronDown size={10} className="text-[#5f759e] shrink-0" />
          </button>

          {activeDropdown === 'rep' && (
            <div className="absolute left-0 mt-1 w-44 bg-[#0a1120]/95 backdrop-blur-md border border-[#1e40a6]/60 rounded-lg shadow-[0_10px_30px_rgba(0,240,255,0.15)] overflow-hidden z-[100] font-mono text-[10px]">
              <div 
                onClick={() => handleSelectRep(null)}
                className="px-3 py-2 text-slate-400 hover:bg-[#1e40a6]/40 hover:text-white transition-colors cursor-pointer border-b border-[#142544]/60"
              >
                全部代表处 (主面板)
              </div>
              {uniqueReps.map(rep => (
                <div 
                  key={rep}
                  onClick={() => handleSelectRep(rep)}
                  className={`px-3 py-2 transition-colors cursor-pointer hover:bg-[#1e40a6] hover:text-[#00f0ff] flex items-center justify-between ${
                    currentStation?.rep === rep ? 'bg-[#102447] text-[#00f0ff]' : 'text-slate-300'
                  }`}
                >
                  <span>{rep}</span>
                  <span className="text-[8px] opacity-65 text-cyan-400">SELECT</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <ChevronRight size={11} className="text-[#3b4c6e] shrink-0" />

        {/* Level 3: 客户 Dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => toggleDropdown('customer')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-[11px] font-medium transition-all cursor-pointer ${
              activeDropdown === 'customer' 
                ? 'bg-[#1e40a6]/50 text-[#00f0ff] border-cyan-500/40' 
                : currentStation 
                  ? 'bg-[#102447]/40 text-cyan-300 border-[#1e40a6]/30 hover:border-cyan-500/30 hover:text-[#00f0ff]' 
                  : 'bg-[#102447]/20 text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <User size={12} className="text-cyan-400/80 shrink-0" />
            <span>{currentStation ? currentStation.cust : '全部客户'}</span>
            {(() => {
              const followedOfCurrentCust = currentStation
                ? followedIds.filter(id => STATIONS.find(s => s.id === id)?.cust === currentStation.cust).length
                : followedIds.length;
              return followedOfCurrentCust > 0 ? (
                <span className="ml-1 px-1 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[8px] font-bold">{followedOfCurrentCust}</span>
              ) : null;
            })()}
            <ChevronDown size={10} className="text-[#5f759e] shrink-0" />
          </button>

          {activeDropdown === 'customer' && (
            <div className="absolute left-0 mt-1 w-44 bg-[#0a1120]/95 backdrop-blur-md border border-[#1e40a6]/60 rounded-lg shadow-[0_10px_30px_rgba(0,240,255,0.15)] overflow-hidden z-[100] font-mono text-[10px]">
              <div 
                onClick={() => handleSelectCustomer(null)}
                className="px-3 py-2 text-slate-400 hover:bg-[#1e40a6]/40 hover:text-white transition-colors cursor-pointer border-b border-[#142544]/60"
              >
                全部客户 (主面板)
              </div>
              {uniqueCustomers.map(cust => {
                const custStations = STATIONS.filter(s => s.cust === cust);
                const custStationIds = custStations.map(s => s.id);
                const allFollowed = custStationIds.every(id => followedIds.includes(id));
                return (
                  <div
                    key={cust}
                    onClick={() => handleSelectCustomer(cust)}
                    className={`px-3 py-2 transition-colors cursor-pointer hover:bg-[#1e40a6] hover:text-[#00f0ff] flex items-center justify-between ${
                      currentStation?.cust === cust ? 'bg-[#102447] text-[#00f0ff]' : 'text-slate-300'
                    }`}
                  >
                    <span>{cust}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          custStationIds.forEach(id => {
                            if (!followedIds.includes(id)) toggleFollowUtil(id);
                          });
                          if (allFollowed) {
                            custStationIds.forEach(id => toggleFollowUtil(id));
                          }
                          setFollowedIds(getFollowedIds());
                        }}
                        className="p-0.5 rounded hover:bg-[#1e40a6]/60 transition-all cursor-pointer"
                        title={allFollowed ? '取消关注' : '关注'}
                      >
                        <Star
                          size={12}
                          className={allFollowed ? 'fill-yellow-400 text-yellow-400' : 'text-slate-500 hover:text-yellow-400'}
                        />
                      </button>
                      <span className="text-[8px] opacity-65 text-cyan-400">SELECT</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <ChevronRight size={11} className="text-[#3b4c6e] shrink-0" />

        {/* Level 4: 站点 Dropdown */}
        <div className="relative">
          <button 
            type="button"
            onClick={() => toggleDropdown('site')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-[11px] font-medium transition-all cursor-pointer ${
              activeDropdown === 'site' 
                ? 'bg-[#1e40a6]/50 text-[#00f0ff] border-cyan-500/40' 
                : currentStation 
                  ? 'bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]' 
                  : 'bg-[#102447]/20 text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            <MapPin size={12} className="text-cyan-400/80 shrink-0" />
            <span className="font-semibold">{currentStation ? currentStation.name : '全部站点'}</span>
            {followedIds.length > 0 && (
              <span className="ml-1 px-1 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 text-[8px] font-bold">{followedIds.length}</span>
            )}
            <ChevronDown size={10} className="text-[#5f759e] shrink-0" />
          </button>

          {activeDropdown === 'site' && (
            <div className="absolute left-0 mt-1 w-52 bg-[#0a1120]/95 backdrop-blur-md border border-[#1e40a6]/60 rounded-lg shadow-[0_10px_30px_rgba(0,240,255,0.15)] overflow-hidden z-[100] font-sans text-[10px]">
              <div 
                onClick={() => { onSelectStation(null); setActiveDropdown(null); }}
                className="px-3 py-2 text-slate-400 hover:bg-[#1e40a6]/40 hover:text-white transition-colors cursor-pointer border-b border-[#142544]/60 font-mono"
              >
                全部站点 (主面板)
              </div>
              {STATIONS.map(st => (
                <div 
                  key={st.id}
                  onClick={() => { onSelectStation(st.id); setActiveDropdown(null); }}
                  className={`px-3 py-1.5 transition-colors cursor-pointer hover:bg-[#1e40a6] hover:text-[#00f0ff] flex items-center justify-between leading-normal ${
                    selectedStationId === st.id ? 'bg-[#102447] text-[#00f0ff] border-l-2 border-[#00f0ff]' : 'text-slate-300'
                  }`}
                >
                  <div className="flex flex-col justify-center leading-normal min-w-0">
                    <span className="text-[11px] font-medium">{st.name}</span>
                    <span className="text-[8.5px] font-mono text-[#5f759e] -mt-0.5">{st.rep} • {st.cust}</span>
                  </div>
                  <button
                    onClick={(e) => handleToggleFollow(st.id, e)}
                    className="shrink-0 p-1 rounded hover:bg-[#1e40a6]/60 transition-all cursor-pointer"
                    title={followedIds.includes(st.id) ? '取消关注' : '关注'}
                  >
                    <Star
                      size={13}
                      className={followedIds.includes(st.id) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-500 hover:text-yellow-400'}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Center Section: Main Title & Glowing Trapezius Header Design */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-14 flex flex-col justify-center items-center pointer-events-none md:pointer-events-auto">
        <div className="relative px-12 py-1 bg-gradient-to-b from-[#102553] to-[#040a1b]/45 border-b-2 border-b-[#00f0ff] rounded-b-2xl shadow-[0_4px_25px_rgba(6,182,212,0.15)] flex justify-center items-center">
          <h1 className="text-sm md:text-base lg:text-lg font-bold tracking-widest text-[#00f0ff] font-sans glow-cyan text-center">
            {title}
          </h1>
          {/* Subtle details */}
          <div className="absolute -left-2 top-0 text-[7px] font-mono text-cyan-500/30 hidden lg:block">[{'<'}{'<'} AUTO SYSTEM]</div>
          <div className="absolute -right-2 top-0 text-[7px] font-mono text-cyan-500/30 hidden lg:block">[SYS v4.12]{'>'}{'>'}</div>
        </div>
      </div>

      {/* Right Section: Time & Controls */}
      <div className="flex items-center gap-3.5 text-xs font-mono text-[#5f759e]">
        <button
          onClick={onToggleSimulation}
          className={`flex items-center gap-1 px-2.5 py-1 rounded bg-[#102447]/60 hover:bg-[#1a386d]/80 text-[#00f0ff] border border-cyan-500/30 text-[10px] font-medium transition-all active:scale-95 cursor-pointer`}
          title={isSimulating ? '暂停数据模拟' : '开启数据模拟'}
        >
          {isSimulating ? <EyeOff size={12} /> : <Eye size={12} />}
          <span>{isSimulating ? '暂停模拟' : '开始模拟'}</span>
        </button>

        <div className="h-8 w-[1px] bg-[#142544] hidden sm:block" />

        <div className="flex flex-col items-end leading-tight text-right select-none">
          <span className="text-cyan-400 font-semibold tracking-wider font-mono text-xs">{time}</span>
          <span className="text-[9px] text-[#4d5f80]">{date}</span>
        </div>
      </div>
    </header>
  );
}
