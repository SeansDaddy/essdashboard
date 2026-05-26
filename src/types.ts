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

export interface HealthDetailIssue {
  id: string;
  type: 'warning' | 'alarm' | 'abnormal'; // 预警, 告警, 异常指标
  level: 'L1' | 'L2' | 'L3' | 'L4';       // L1危急, L2紧急, L3重要, L4提示
  device: string;                         // 设备
  reason: string;                         // 发生原因
  suggestion: string;                     // 处理建议
}

export interface StationDetail {
  stationId: string;
  stationName: string;
  score: number;
  soc: number;                            // State of Charge
  soh: number;                            // State of Health
  temperature: number;                    // Cabin temperature
  activePower: number;                    // Active power output in kW
  rackCount: number;                      // Number of battery racks
  issues: HealthDetailIssue[];
}

export interface TrendData {
  date: string;
  alarmCount: number;
  successRate: number;
}
