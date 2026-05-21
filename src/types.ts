export interface SiteHealth {
  id: string;
  name: string;
  score: number; // Health score (0-100)
  status: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface AlarmSummary {
  fatal: number;
  urgent: number;
  important: number;
  warning: number;
}

export interface EnergyStation {
  name: string;
  value: number; // Energy consumption in kWh
}

export interface DeviceStatus {
  online: number;
  offline: number;
  list: Array<{
    name: string;
    region: string;
    value: number;
  }>;
}

export interface MapNode {
  id: string;
  name: string;
  score: number;
  x: number; // SVG horizontal percentage (0-100)
  y: number; // SVG vertical percentage (0-100)
  rank: number;
}

export interface AlarmStat {
  name: string;
  value: number;
  color: string;
}

export interface HighFreqAlarm {
  name: string;
  value: number;
}

export interface TrendData {
  date: string;
  alarmCount: number;
  successRate: number;
}
