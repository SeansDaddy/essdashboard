import React, { useState } from 'react';
import { MapNode } from '../types';
import { Network, Server, HardDrive, Compass, Play, Zap } from 'lucide-react';

interface MapPanelProps {
  nodes: MapNode[];
}

export default function MapPanel({ nodes }: MapPanelProps) {
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);

  // SVG dimensions / coordinate helper
  const mapWidth = 600;
  const mapHeight = 350;

  return (
    <div className="relative flex flex-col h-full bg-[#0d1527]/50 border border-[#142544] rounded-xl p-4 overflow-hidden glow-panel">
      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00f0ff]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00f0ff]" />

      {/* Map Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2 py-0.5 bg-red-950/40 border border-red-500/30 text-rose-400 rounded font-mono">
            TOP 5 运维恶化指数
          </span>
          <span className="text-[10px] text-slate-400 font-sans">从低至高分布</span>
        </div>
        
        <div className="flex gap-4 text-[10px] text-[#5f759e] font-mono">
          <span>IP: 10.154.2.98</span>
          <span className="text-emerald-400">● SECURE GATEWAY</span>
        </div>
      </div>

      {/* SVG Canvas Map Area */}
      <div className="relative flex-1 min-h-[300px] mt-2 bg-[#020617]/50 border border-[#142544]/40 rounded-lg overflow-hidden flex items-center justify-center">
        {/* Futuristic Grid Overlay */}
        <div 
          className="absolute inset-0 bg-repeat opacity-[0.07] pointer-events-none"
          style={{ 
            backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
            backgroundSize: '24px 24px' 
          }} 
        />

        {/* Ambient Ring Wave */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-cyan-500/5 animate-[ping_4s_infinite_ease-out] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-cyan-400/5 pointer-events-none" />

        {/* Vector Schematic Map Background */}
        <svg 
          viewBox={`0 0 ${mapWidth} ${mapHeight}`} 
          className="absolute inset-0 w-full h-full p-2 select-none"
        >
          {/* Abstract network topology lines connecting stations */}
          <g stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="3,3">
            <line x1={`${nodes[0]?.x}%`} y1={`${nodes[0]?.y}%`} x2={`${nodes[1]?.x}%`} y2={`${nodes[1]?.y}%`} />
            <line x1={`${nodes[1]?.x}%`} y1={`${nodes[1]?.y}%`} x2={`${nodes[2]?.x}%`} y2={`${nodes[2]?.y}%`} />
            <line x1={`${nodes[2]?.x}%`} y1={`${nodes[2]?.y}%`} x2={`${nodes[3]?.x}%`} y2={`${nodes[3]?.y}%`} />
            <line x1={`${nodes[3]?.x}%`} y1={`${nodes[3]?.y}%`} x2={`${nodes[4]?.x}%`} y2={`${nodes[4]?.y}%`} />
            <line x1={`${nodes[4]?.x}%`} y1={`${nodes[4]?.y}%`} x2={`${nodes[0]?.x}%`} y2={`${nodes[0]?.y}%`} />
          </g>

          {/* Central grid hub indicator */}
          <circle cx="300" cy="175" r="40" stroke="rgba(6, 182, 212, 0.05)" fill="none" />
          <circle cx="300" cy="175" r="70" stroke="rgba(6, 182, 212, 0.03)" fill="none" strokeDasharray="5,5" />

          {/* Render glowing paths */}
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const nodeColor = node.rank === 1 ? '#ef4444' : node.rank === 2 ? '#f97316' : node.rank === 3 ? '#fbbf24' : '#06b6d4';
            
            return (
              <g 
                key={node.id} 
                className="cursor-pointer group"
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setSelectedNode(node)}
              >
                {/* Outer pulsing ring */}
                <circle 
                  cx={`${node.x}%`} 
                  cy={`${node.y}%`} 
                  r="14" 
                  fill="none" 
                  stroke={nodeColor} 
                  strokeWidth="1" 
                  className="animate-pulse opacity-45"
                />
                
                {/* Core point */}
                <circle 
                  cx={`${node.x}%`} 
                  cy={`${node.y}%`} 
                  r="5" 
                  fill={nodeColor}
                  className="shadow-lg"
                />
                
                <circle 
                  cx={`${node.x}%`} 
                  cy={`${node.y}%`} 
                  r="2" 
                  fill="#ffffff" 
                />

                {/* Info Pointer label card */}
                <foreignObject
                  x={`calc(${node.x}% - 55px)`}
                  y={`calc(${node.y}% - 34px)`}
                  width="110"
                  height="26"
                  className="overflow-visible"
                >
                  <div 
                    className={`flex items-center justify-between px-1.5 py-0.5 rounded text-[9px] font-mono border bg-slate-950/90 leading-none transition-all ${
                      isSelected 
                        ? 'border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)] translate-y-[-2px]' 
                        : 'border-[#142544] opacity-90'
                    }`}
                  >
                    <span className="text-slate-400 font-sans truncate pr-1">TOP {node.rank}</span>
                    <span 
                      className="font-bold font-mono"
                      style={{ color: nodeColor }}
                    >
                      {node.score}%
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Floating live details overlay on bottom left */}
        <div className="absolute bottom-2 left-2 p-2 bg-[#020617]/90 border border-[#142544] rounded text-[9px] font-mono text-[#5f759e] leading-snug space-y-1 select-none max-w-[200px]">
          <div className="flex items-center gap-1.5 text-[#00f0ff]">
            <Server size={10} />
            <span>SYS_GRID_PING: 14ms</span>
          </div>
          <div>SYS_NODES_ONLINE: 1,748 / 1,748</div>
          <div>SYS_SECURE_AUTH: STANDBY</div>
        </div>

        {/* Floating statistics summary on bottom right */}
        <div className="absolute bottom-2 right-2 p-2 bg-[#020617]/90 border border-[#142544] rounded text-[9px] font-mono text-[#5f759e] leading-snug space-y-1 select-none text-right">
          <div className="text-emerald-400">GLOBAL_SECURE_MODE: ON</div>
          <div>LAT_UPDATE: JUST NOW</div>
          <div>ENCODE: PROTECTED</div>
        </div>

        {/* Selected station modal pointer */}
        {selectedNode && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#091022]/95 border border-cyan-500/50 rounded-lg p-2.5 shadow-[0_0_15px_rgba(6,182,212,0.2)] max-w-xs z-20 text-[10px] select-none">
            <div className="flex justify-between items-center gap-4 mb-1">
              <span className="font-semibold text-slate-200">{selectedNode.name}</span>
              <span className="font-bold text-red-400 font-mono">Rank #{selectedNode.rank}</span>
            </div>
            <div className="h-[1px] bg-cyan-900/40 my-1" />
            <div className="grid grid-cols-2 gap-x-3 text-slate-400 font-mono">
              <span>恶化指数: <span className="text-[#00f0ff] font-bold">{selectedNode.score}%</span></span>
              <span>健康值: <span className="text-emerald-400 font-bold">{(100 - selectedNode.score * 0.4).toFixed(1)}%</span></span>
              <span>经度: 116.39</span>
              <span>纬度: 39.90</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
