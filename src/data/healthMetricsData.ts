export interface HealthMetricsRegion {
  rep: string;
  country: string;
  overallScore: number;
  level: string;
  activeAlarmScore: number;
  warningScore: number;
  performanceScore: number;
  deviceStatusScore: number;
}

export interface HealthMetricsRepOffice {
  rep: string;
  country: string;
  customerName: string;
  customerLevel: 'A' | 'B' | 'C';
  overallScore: number;
  level: string;
  activeAlarmScore: number;
  warningScore: number;
  performanceScore: number;
  deviceStatusScore: number;
}

export interface HealthMetricsCustomer {
  rep: string;
  country: string;
  siteName: string;
  overallScore: number;
  level: string;
  activeAlarmScore: number;
  warningScore: number;
  performanceScore: number;
  deviceStatusScore: number;
  // Default hidden fields
  customerName: string;
  customerLevel: 'A' | 'B' | 'C';
  contractNo: string;
  contractName: string;
}

export interface HealthMetricsSite {
  rep: string;
  country: string;
  deviceName: string;
  deviceType: string;
  hardwareVersion: string;
  deviceSn: string;
  status: '正常' | '异常' | '离线';
  overallScore: number;
  level: string;
  activeAlarmScore: number;
  warningScore: number;
  performanceScore: number;
  deviceStatusScore: number;
  // Default hidden fields
  customerName: string;
  customerLevel: 'A' | 'B' | 'C';
  contractNo: string;
  contractName: string;
  siteName: string;
  ipmt: string;
  spdt: string;
  pe: string;
}

// Customer-level detail view data
export interface CustomerDetail {
  customerName: string;
  customerLevel: 'A' | 'B' | 'C';
  contractNo: string;
  contractName: string;
  overallScore: number;
  level: string;
  activeAlarmScore: number;
  warningScore: number;
  performanceScore: number;
  deviceStatusScore: number;
  sites: {
    stationId: string;
    siteName: string;
    overallScore: number;
    level: string;
    activeAlarmScore: number;
    warningScore: number;
    performanceScore: number;
    deviceStatusScore: number;
    issues: Array<{
      id: string;
      type: 'alarm' | 'warning' | 'abnormal';
      level: 'L1' | 'L2' | 'L3' | 'L4';
      device: string;
      reason: string;
      suggestion: string;
    }>;
  }[];
}

// RepOffice-level detail view data
export interface RepOfficeDetail {
  rep: string;
  country: string;
  overallScore: number;
  level: string;
  activeAlarmScore: number;
  warningScore: number;
  performanceScore: number;
  deviceStatusScore: number;
  customers: {
    customerName: string;
    customerLevel: 'A' | 'B' | 'C';
    overallScore: number;
    level: string;
    activeAlarmScore: number;
    warningScore: number;
    performanceScore: number;
    deviceStatusScore: number;
    sites: {
      stationId: string;
      siteName: string;
      overallScore: number;
      level: string;
      activeAlarmScore: number;
      warningScore: number;
      performanceScore: number;
      deviceStatusScore: number;
      issues: Array<{
        id: string;
        type: 'alarm' | 'warning' | 'abnormal';
        level: 'L1' | 'L2' | 'L3' | 'L4';
        device: string;
        reason: string;
        suggestion: string;
      }>;
    }[];
  }[];
}

export const mockCustomerDetails: Record<string, CustomerDetail> = {
  '华润电力': {
    customerName: '华润电力',
    customerLevel: 'A',
    contractNo: 'CON-2026-0081',
    contractName: '华润福建东山储能EPC一期',
    overallScore: 98,
    level: '优秀',
    activeAlarmScore: 99,
    warningScore: 97,
    performanceScore: 98,
    deviceStatusScore: 98,
    sites: [
      {
        stationId: 'h1',
        siteName: '龙岩东山储能电站',
        overallScore: 98,
        level: '优秀',
        activeAlarmScore: 99,
        warningScore: 97,
        performanceScore: 98,
        deviceStatusScore: 98,
        issues: [
          {
            id: 'iss_c1_1',
            type: 'warning',
            level: 'L4',
            device: '3号电池舱集控空调冷水机组-P01',
            reason: '循环泵运转时间累计超警限',
            suggestion: '例行检查泵体轴承振动与润滑程度，伺机进行保养或更换备件。'
          },
          {
            id: 'iss_c1_2',
            type: 'abnormal',
            level: 'L4',
            device: '2号储能变流器(PCS)',
            reason: '机组无功功率偏离设定指令曲线约1.5%',
            suggestion: '后台微调无功补偿控制系数，校准电网侧电流互感器采样漂移。'
          }
        ]
      }
    ]
  },
  '南方电网': {
    customerName: '南方电网',
    customerLevel: 'A',
    contractNo: 'CON-2026-0043',
    contractName: '粤港澳大湾区储能战略合作',
    overallScore: 78,
    level: '中等',
    activeAlarmScore: 74,
    warningScore: 80,
    performanceScore: 82,
    deviceStatusScore: 76,
    sites: [
      {
        stationId: 'h2',
        siteName: '中山公园储能电站',
        overallScore: 96,
        level: '优秀',
        activeAlarmScore: 98,
        warningScore: 94,
        performanceScore: 96,
        deviceStatusScore: 96,
        issues: [
          {
            id: 'iss_c2_1',
            type: 'warning',
            level: 'L3',
            device: '1A号蓄电池电池簇-第04簇',
            reason: '第16节电芯内阻同比异常升高8.5%',
            suggestion: '持续监控该电芯充放电时的温升幅度，在下个检修窗口执行标定测试及阻抗校零。'
          },
          {
            id: 'iss_c2_2',
            type: 'abnormal',
            level: 'L4',
            device: '一楼大厅环境烟雾感知传感器',
            reason: '光敏传感器镜头表面落尘，引起基准零点微幅漂移',
            suggestion: '运维人员携无尘布清洁光学透镜，并在系统管理侧手动执行零点标定。'
          }
        ]
      },
      {
        stationId: 'h6',
        siteName: '广州天河路储能站',
        overallScore: 64,
        level: '及格',
        activeAlarmScore: 58,
        warningScore: 68,
        performanceScore: 70,
        deviceStatusScore: 60,
        issues: [
          {
            id: 'iss_c6_1',
            type: 'alarm',
            level: 'L1',
            device: 'A侧1号集装箱BMS能量均衡仪',
            reason: '电池包单体电芯压差最大升至380mV，偏离放电截止设定值',
            suggestion: '即刻降载50%运行，降速充放；在线运行强力单平衡策略，对该重度不均极组进行人工保养。'
          },
          {
            id: 'iss_c6_2',
            type: 'alarm',
            level: 'L1',
            device: '变流PCS机柜1B变逆组件',
            reason: 'IGBT散热基板工作温度达到102.5℃，触发超高温度紧急告警',
            suggestion: '下调变流器工作负荷，检查IGBT导热硅脂涂抹厚度，排查电子冷却泵电机绕组是否有短路现象。'
          },
          {
            id: 'iss_c6_3',
            type: 'alarm',
            level: 'L2',
            device: '消防备份电源智能切换屏',
            reason: '主备电源切换演练时，触头接触阻抗明显增大',
            suggestion: '清扫接触器表面弧尘痕迹，使用触点清洁喷剂去氧化层，若仍有电弧灼伤痕迹则整体拆换。'
          },
          {
            id: 'iss_c6_4',
            type: 'warning',
            level: 'L3',
            device: '储能液冷冷风冷膨胀副水箱LS01',
            reason: '液位标定浮子指示低液位告警（剩余量低下限8%）',
            suggestion: '检查液冷回路冷却管是否存在细微沙眼或接头渗露，添加同型号环保防凝乙二醇水冷液。'
          }
        ]
      }
    ]
  },
  '申能股份': {
    customerName: '申能股份',
    customerLevel: 'B',
    contractNo: 'CON-2025-0199',
    contractName: '申能静安卓网储能示范段',
    overallScore: 91,
    level: '优秀',
    activeAlarmScore: 92,
    warningScore: 89,
    performanceScore: 93,
    deviceStatusScore: 90,
    sites: [
      {
        stationId: 'h3',
        siteName: '上海静安储能电站',
        overallScore: 91,
        level: '优秀',
        activeAlarmScore: 92,
        warningScore: 89,
        performanceScore: 93,
        deviceStatusScore: 90,
        issues: [
          {
            id: 'iss_c3_1',
            type: 'alarm',
            level: 'L2',
            device: 'BMS电池管理系统 #7采集板',
            reason: '控制器CAN通讯校验误码率高，触发重发缓存机制',
            suggestion: '检查采集板末端匹配电阻阻值，排查BMS低压线槽与高压母排之间的电磁屏蔽。'
          },
          {
            id: 'iss_c3_2',
            type: 'warning',
            level: 'L3',
            device: '集装箱机房高精密空调-AC02',
            reason: '制冷回路低压侧冷媒压力偏低，影响系统换热效能',
            suggestion: '使用卤素检漏仪排查接口微动磨损，检漏修复后补加R410A冷媒。'
          }
        ]
      }
    ]
  },
  '国家电网': {
    customerName: '国家电网',
    customerLevel: 'A',
    contractNo: 'CON-2026-0105',
    contractName: '国网北京核心商圈低碳试点',
    overallScore: 85,
    level: '良好',
    activeAlarmScore: 82,
    warningScore: 88,
    performanceScore: 84,
    deviceStatusScore: 86,
    sites: [
      {
        stationId: 'h4',
        siteName: '北京西单储能电站',
        overallScore: 85,
        level: '良好',
        activeAlarmScore: 82,
        warningScore: 88,
        performanceScore: 84,
        deviceStatusScore: 86,
        issues: [
          {
            id: 'iss_c4_1',
            type: 'alarm',
            level: 'L2',
            device: '储能电池舱2排 #12电池簇',
            reason: '2号单体电芯放电温升偏高，最大簇内温差达4.8℃',
            suggestion: '调节液冷分配阀开度，增大气流循环；检测液冷管接头流量，清洗水阻较大的毛细管。'
          },
          {
            id: 'iss_c4_2',
            type: 'abnormal',
            level: 'L3',
            device: 'PCS并网控制柜-主合闸开关 K01',
            reason: '合闸辅助弹簧储能电机工作电流偏大，有卡阻迹象',
            suggestion: '使用专用水剂清洗连杆传动机构，加注二硫化钼润滑脂进行防卡阻养护。'
          },
          {
            id: 'iss_c4_3',
            type: 'warning',
            level: 'L4',
            device: '集装箱防爆机械新风机-03号',
            reason: '进出风压差传感器反馈差压值逼近预警临界值',
            suggestion: '拆卸并更换一次风道初效纸质滤网，恢复风机标准换气压差。'
          }
        ]
      }
    ]
  },
  '成都城投储能': {
    customerName: '成都城投储能',
    customerLevel: 'C',
    contractNo: 'CON-2026-0244',
    contractName: '成都春熙路超级虚拟电厂建设',
    overallScore: 78,
    level: '中等',
    activeAlarmScore: 75,
    warningScore: 80,
    performanceScore: 77,
    deviceStatusScore: 80,
    sites: [
      {
        stationId: 'h5',
        siteName: '成都春熙路储能站',
        overallScore: 78,
        level: '中等',
        activeAlarmScore: 75,
        warningScore: 80,
        performanceScore: 77,
        deviceStatusScore: 80,
        issues: [
          {
            id: 'iss_c5_1',
            type: 'alarm',
            level: 'L1',
            device: '直流防雷汇流箱-03号机',
            reason: '主回路断路器触头反馈电平不匹配，疑似静触点疲劳粘连',
            suggestion: '【重要】立即将该充放电支路降额切出；实施离线停电，更换合闸真空接触器。'
          },
          {
            id: 'iss_c5_2',
            type: 'alarm',
            level: 'L2',
            device: '直流侧高压母排漏电保护器',
            reason: 'BMS正极对地绝缘电阻降至150kΩ（系统安全标准>500kΩ）',
            suggestion: '检查箱体凝露及高压接线座污物，启动充电机舱抽湿加热模块，用万用表逐段排查故障点。'
          },
          {
            id: 'iss_c5_3',
            type: 'abnormal',
            level: 'L3',
            device: '储能控制室环境加湿变送器',
            reason: '底部角落测点空气湿度突破92%RH，容易诱发电气爬电',
            suggestion: '手动开启机组紧急抽湿，排查集装箱箱板连接防水密封胶条老化破裂渗水情况。'
          }
        ]
      }
    ]
  }
};

export const mockRepOfficeDetails: Record<string, RepOfficeDetail> = {
  '福建代表处': {
    rep: '福建代表处',
    country: '中国',
    overallScore: 98,
    level: '优秀',
    activeAlarmScore: 99,
    warningScore: 97,
    performanceScore: 98,
    deviceStatusScore: 98,
    customers: [
      {
        customerName: '华润电力',
        customerLevel: 'A',
        overallScore: 98,
        level: '优秀',
        activeAlarmScore: 99,
        warningScore: 97,
        performanceScore: 98,
        deviceStatusScore: 98,
        sites: [
          {
            stationId: 'h1',
            siteName: '龙岩东山储能电站',
            overallScore: 98,
            level: '优秀',
            activeAlarmScore: 99,
            warningScore: 97,
            performanceScore: 98,
            deviceStatusScore: 98,
            issues: [
              {
                id: 'iss_r1_1',
                type: 'warning',
                level: 'L4',
                device: '3号电池舱集控空调冷水机组-P01',
                reason: '循环泵运转时间累计超警限',
                suggestion: '例行检查泵体轴承振动与润滑程度，伺机进行保养或更换备件。'
              },
              {
                id: 'iss_r1_2',
                type: 'abnormal',
                level: 'L4',
                device: '2号储能变流器(PCS)',
                reason: '机组无功功率偏离设定指令曲线约1.5%',
                suggestion: '后台微调无功补偿控制系数，校准电网侧电流互感器采样漂移。'
              }
            ]
          }
        ]
      }
    ]
  },
  '广东代表处': {
    rep: '广东代表处',
    country: '中国',
    overallScore: 78,
    level: '中等',
    activeAlarmScore: 74,
    warningScore: 80,
    performanceScore: 82,
    deviceStatusScore: 76,
    customers: [
      {
        customerName: '南方电网',
        customerLevel: 'A',
        overallScore: 78,
        level: '中等',
        activeAlarmScore: 74,
        warningScore: 80,
        performanceScore: 82,
        deviceStatusScore: 76,
        sites: [
          {
            stationId: 'h2',
            siteName: '中山公园储能电站',
            overallScore: 96,
            level: '优秀',
            activeAlarmScore: 98,
            warningScore: 94,
            performanceScore: 96,
            deviceStatusScore: 96,
            issues: [
              {
                id: 'iss_r2_1',
                type: 'warning',
                level: 'L3',
                device: '1A号蓄电池电池簇-第04簇',
                reason: '第16节电芯内阻同比异常升高8.5%',
                suggestion: '持续监控该电芯充放电时的温升幅度，在下个检修窗口执行标定测试及阻抗校零。'
              }
            ]
          },
          {
            stationId: 'h6',
            siteName: '广州天河路储能站',
            overallScore: 64,
            level: '及格',
            activeAlarmScore: 58,
            warningScore: 68,
            performanceScore: 70,
            deviceStatusScore: 60,
            issues: [
              {
                id: 'iss_r6_1',
                type: 'alarm',
                level: 'L1',
                device: 'A侧1号集装箱BMS能量均衡仪',
                reason: '电池包单体电芯压差最大升至380mV',
                suggestion: '即刻降载50%运行，降速充放。'
              },
              {
                id: 'iss_r6_2',
                type: 'alarm',
                level: 'L1',
                device: '变流PCS机柜1B变逆组件',
                reason: 'IGBT散热基板工作温度达到102.5℃',
                suggestion: '下调变流器工作负荷，检查散热系统。'
              }
            ]
          }
        ]
      }
    ]
  },
  '上海代表处': {
    rep: '上海代表处',
    country: '中国',
    overallScore: 91,
    level: '优秀',
    activeAlarmScore: 92,
    warningScore: 89,
    performanceScore: 93,
    deviceStatusScore: 90,
    customers: [
      {
        customerName: '申能股份',
        customerLevel: 'B',
        overallScore: 91,
        level: '优秀',
        activeAlarmScore: 92,
        warningScore: 89,
        performanceScore: 93,
        deviceStatusScore: 90,
        sites: [
          {
            stationId: 'h3',
            siteName: '上海静安储能电站',
            overallScore: 91,
            level: '优秀',
            activeAlarmScore: 92,
            warningScore: 89,
            performanceScore: 93,
            deviceStatusScore: 90,
            issues: [
              {
                id: 'iss_r3_1',
                type: 'alarm',
                level: 'L2',
                device: 'BMS电池管理系统 #7采集板',
                reason: '控制器CAN通讯校验误码率高，触发重发缓存机制',
                suggestion: '检查采集板末端匹配电阻阻值，排查BMS低压线槽与高压母排之间的电磁屏蔽。'
              },
              {
                id: 'iss_r3_2',
                type: 'warning',
                level: 'L3',
                device: '集装箱机房高精密空调-AC02',
                reason: '制冷回路低压侧冷媒压力偏低，影响系统换热效能',
                suggestion: '使用卤素检漏仪排查接口微动磨损，检漏修复后补加R410A冷媒。'
              }
            ]
          }
        ]
      }
    ]
  },
  '北京代表处': {
    rep: '北京代表处',
    country: '中国',
    overallScore: 85,
    level: '良好',
    activeAlarmScore: 82,
    warningScore: 88,
    performanceScore: 84,
    deviceStatusScore: 86,
    customers: [
      {
        customerName: '国家电网',
        customerLevel: 'A',
        overallScore: 85,
        level: '良好',
        activeAlarmScore: 82,
        warningScore: 88,
        performanceScore: 84,
        deviceStatusScore: 86,
        sites: [
          {
            stationId: 'h4',
            siteName: '北京西单储能电站',
            overallScore: 85,
            level: '良好',
            activeAlarmScore: 82,
            warningScore: 88,
            performanceScore: 84,
            deviceStatusScore: 86,
            issues: [
              {
                id: 'iss_r4_1',
                type: 'alarm',
                level: 'L2',
                device: '储能电池舱2排 #12电池簇',
                reason: '2号单体电芯放电温升偏高，最大簇内温差达4.8℃',
                suggestion: '调节液冷分配阀开度，增大气流循环。'
              },
              {
                id: 'iss_r4_2',
                type: 'abnormal',
                level: 'L3',
                device: 'PCS并网控制柜-主合闸开关 K01',
                reason: '合闸辅助弹簧储能电机工作电流偏大，有卡阻迹象',
                suggestion: '使用专用水剂清洗连杆传动机构，加注二硫化钼润滑脂。'
              }
            ]
          }
        ]
      }
    ]
  },
  '四川代表处': {
    rep: '四川代表处',
    country: '中国',
    overallScore: 78,
    level: '中等',
    activeAlarmScore: 75,
    warningScore: 80,
    performanceScore: 77,
    deviceStatusScore: 80,
    customers: [
      {
        customerName: '成都城投储能',
        customerLevel: 'C',
        overallScore: 78,
        level: '中等',
        activeAlarmScore: 75,
        warningScore: 80,
        performanceScore: 77,
        deviceStatusScore: 80,
        sites: [
          {
            stationId: 'h5',
            siteName: '成都春熙路储能站',
            overallScore: 78,
            level: '中等',
            activeAlarmScore: 75,
            warningScore: 80,
            performanceScore: 77,
            deviceStatusScore: 80,
            issues: [
              {
                id: 'iss_r5_1',
                type: 'alarm',
                level: 'L1',
                device: '直流防雷汇流箱-03号机',
                reason: '主回路断路器触头反馈电平不匹配，疑似静触点疲劳粘连',
                suggestion: '【重要】立即将该充放电支路降额切出；实施离线停电，更换合闸真空接触器。'
              },
              {
                id: 'iss_r5_2',
                type: 'alarm',
                level: 'L2',
                device: '直流侧高压母排漏电保护器',
                reason: 'BMS正极对地绝缘电阻降至150kΩ',
                suggestion: '检查箱体凝露及高压接线座污物，启动充电机舱抽湿加热模块。'
              }
            ]
          }
        ]
      }
    ]
  }
};

// Alarm & Warning Link Targets
export interface DeepLinkItem {
  id: string;
  rep: string;
  customerName: string;
  siteName: string;
  device: string;
  type: 'alarm' | 'warning' | 'performance';
  level: 'L1' | 'L2' | 'L3' | 'L4';
  title: string;
  reason: string;
  suggestion: string;
  time: string;
  scoreImpact: number;
}

export const mockRegionData: HealthMetricsRegion[] = [
  { rep: '福建代表处', country: '中国', overallScore: 98, level: '优秀', activeAlarmScore: 99, warningScore: 97, performanceScore: 98, deviceStatusScore: 98 },
  { rep: '广东代表处', country: '中国', overallScore: 80, level: '良好', activeAlarmScore: 78, warningScore: 82, performanceScore: 84, deviceStatusScore: 76 },
  { rep: '上海代表处', country: '中国', overallScore: 91, level: '优秀', activeAlarmScore: 92, warningScore: 89, performanceScore: 93, deviceStatusScore: 90 },
  { rep: '北京代表处', country: '中国', overallScore: 85, level: '良好', activeAlarmScore: 82, warningScore: 88, performanceScore: 84, deviceStatusScore: 86 },
  { rep: '四川代表处', country: '中国', overallScore: 78, level: '中等', activeAlarmScore: 75, warningScore: 80, performanceScore: 77, deviceStatusScore: 80 },
];

export const mockRepOfficeData: HealthMetricsRepOffice[] = [
  { rep: '福建代表处', country: '中国', customerName: '华润电力', customerLevel: 'A', overallScore: 98, level: '优秀', activeAlarmScore: 99, warningScore: 97, performanceScore: 98, deviceStatusScore: 98 },
  { rep: '广东代表处', country: '中国', customerName: '南方电网', customerLevel: 'A', overallScore: 80, level: '良好', activeAlarmScore: 78, warningScore: 82, performanceScore: 84, deviceStatusScore: 76 },
  { rep: '上海代表处', country: '中国', customerName: '申能股份', customerLevel: 'B', overallScore: 91, level: '优秀', activeAlarmScore: 92, warningScore: 89, performanceScore: 93, deviceStatusScore: 90 },
  { rep: '北京代表处', country: '中国', customerName: '国家电网', customerLevel: 'A', overallScore: 85, level: '良好', activeAlarmScore: 82, warningScore: 88, performanceScore: 84, deviceStatusScore: 86 },
  { rep: '四川代表处', country: '中国', customerName: '成都城投储能', customerLevel: 'C', overallScore: 78, level: '中等', activeAlarmScore: 75, warningScore: 80, performanceScore: 77, deviceStatusScore: 80 },
];

export const mockCustomerData: HealthMetricsCustomer[] = [
  { rep: '福建代表处', country: '中国', siteName: '龙岩东山储能电站', overallScore: 98, level: '优秀', activeAlarmScore: 99, warningScore: 97, performanceScore: 98, deviceStatusScore: 98, customerName: '华润电力', customerLevel: 'A', contractNo: 'CON-2026-0081', contractName: '华润福建东山储能EPC一期' },
  { rep: '广东代表处', country: '中国', siteName: '中山公园储能电站', overallScore: 96, level: '优秀', activeAlarmScore: 98, warningScore: 94, performanceScore: 96, deviceStatusScore: 96, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0043', contractName: '粤港澳大湾区中山充储二期' },
  { rep: '上海代表处', country: '中国', siteName: '上海静安储能电站', overallScore: 91, level: '优秀', activeAlarmScore: 92, warningScore: 89, performanceScore: 93, deviceStatusScore: 90, customerName: '申能股份', customerLevel: 'B', contractNo: 'CON-2025-0199', contractName: '申能静安卓网储能示范段' },
  { rep: '北京代表处', country: '中国', siteName: '北京西单储能电站', overallScore: 85, level: '良好', activeAlarmScore: 82, warningScore: 88, performanceScore: 84, deviceStatusScore: 86, customerName: '国家电网', customerLevel: 'A', contractNo: 'CON-2026-0105', contractName: '国网北京核心商圈低碳试点' },
  { rep: '四川代表处', country: '中国', siteName: '成都春熙路储能站', overallScore: 78, level: '中等', activeAlarmScore: 75, warningScore: 80, performanceScore: 77, deviceStatusScore: 80, customerName: '成都城投储能', customerLevel: 'C', contractNo: 'CON-2026-0244', contractName: '成都春熙路超级虚拟电厂建设' },
  { rep: '广东代表处', country: '中国', siteName: '广州天河路储能站', overallScore: 64, level: '及格', activeAlarmScore: 58, warningScore: 68, performanceScore: 70, deviceStatusScore: 60, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0044', contractName: '广州天河路储荷换电站' },
];

export const mockSiteData: HealthMetricsSite[] = [
  // 龙岩东山储能电站 devices
  { rep: '福建代表处', country: '中国', deviceName: '1号储能变流PCS柜', deviceType: 'PCS-500KTL', hardwareVersion: 'Hv2.1', deviceSn: 'PCS20260511019', status: '正常', overallScore: 99, level: '优秀', activeAlarmScore: 100, warningScore: 98, performanceScore: 99, deviceStatusScore: 99, customerName: '华润电力', customerLevel: 'A', contractNo: 'CON-2026-0081', contractName: '华润福建东山储能EPC一期', siteName: '龙岩东山储能电站', ipmt: '张建军', spdt: '李科', pe: '王旭明' },
  { rep: '福建代表处', country: '中国', deviceName: '3号集控空调冷水机', deviceType: 'AC-CHILLER-30', hardwareVersion: 'Hv1.4', deviceSn: 'ACC20260401088', status: '正常', overallScore: 97, level: '优秀', activeAlarmScore: 98, warningScore: 96, performanceScore: 97, deviceStatusScore: 97, customerName: '华润电力', customerLevel: 'A', contractNo: 'CON-2026-0081', contractName: '华润福建东山储能EPC一期', siteName: '龙岩东山储能电站', ipmt: '张建军', spdt: '李科', pe: '王旭明' },

  // 中山公园储能电站 devices
  { rep: '广东代表处', country: '中国', deviceName: '1A号蓄电池电池簇-04簇', deviceType: 'BATT-CLUSTER-3.2V', hardwareVersion: 'Bv3.0', deviceSn: 'BAT20260212044', status: '正常', overallScore: 94, level: '优秀', activeAlarmScore: 96, warningScore: 93, performanceScore: 95, deviceStatusScore: 92, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0043', contractName: '粤港澳大湾区中山充储二期', siteName: '中山公园储能电站', ipmt: '梁启华', spdt: '马超', pe: '陈俊杰' },
  { rep: '广东代表处', country: '中国', deviceName: '一楼大厅烟雾感知器', deviceType: 'SMOKE-SENS-01', hardwareVersion: 'Sv1.0', deviceSn: 'SMS20260117102', status: '正常', overallScore: 98, level: '优秀', activeAlarmScore: 100, warningScore: 95, performanceScore: 97, deviceStatusScore: 100, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0043', contractName: '粤港澳大湾区中山充储二期', siteName: '中山公园储能电站', ipmt: '梁启华', spdt: '马超', pe: '陈俊杰' },

  // 上海静安储能电站 devices
  { rep: '上海代表处', country: '中国', deviceName: 'BMS电池管理 #7采集板', deviceType: 'BMS-BOARD-V4', hardwareVersion: 'Bv4.8', deviceSn: 'BMS20251103982', status: '异常', overallScore: 89, level: '良好', activeAlarmScore: 84, warningScore: 92, performanceScore: 90, deviceStatusScore: 90, customerName: '申能股份', customerLevel: 'B', contractNo: 'CON-2025-0199', contractName: '申能静安卓网储能示范段', siteName: '上海静安储能电站', ipmt: '周卫国', spdt: '赵雷', pe: '孙晓萌' },
  { rep: '上海代表处', country: '中国', deviceName: '集装箱精密空调-AC02', deviceType: 'AC-PRECISION-50', hardwareVersion: 'Hv2.2', deviceSn: 'ACP20251012903', status: '正常', overallScore: 93, level: '优秀', activeAlarmScore: 100, warningScore: 86, performanceScore: 96, deviceStatusScore: 90, customerName: '申能股份', customerLevel: 'B', contractNo: 'CON-2025-0199', contractName: '申能静安卓网储能示范段', siteName: '上海静安储能电站', ipmt: '周卫国', spdt: '赵雷', pe: '孙晓萌' },

  // 北京西单储能电站 devices
  { rep: '北京代表处', country: '中国', deviceName: '电池舱2排 #12电池簇', deviceType: 'BATT-CLUSTER-3.2V', hardwareVersion: 'Bv3.0', deviceSn: 'BAT20260309112', status: '异常', overallScore: 80, level: '良好', activeAlarmScore: 74, warningScore: 84, performanceScore: 82, deviceStatusScore: 80, customerName: '国家电网', customerLevel: 'A', contractNo: 'CON-2026-0105', contractName: '国网北京核心商圈低碳试点', siteName: '北京西单储能电站', ipmt: '刘光耀', spdt: '郭涛', pe: '曾一鸣' },
  { rep: '北京代表处', country: '中国', deviceName: 'PCS并网控制柜-合闸 K01', deviceType: 'PCS-BREAKER-M1', hardwareVersion: 'Kv1.0', deviceSn: 'BRK20260408542', status: '正常', overallScore: 86, level: '良好', activeAlarmScore: 88, warningScore: 90, performanceScore: 80, deviceStatusScore: 86, customerName: '国家电网', customerLevel: 'A', contractNo: 'CON-2026-0105', contractName: '国网北京核心商圈低碳试点', siteName: '北京西单储能电站', ipmt: '刘光耀', spdt: '郭涛', pe: '曾一鸣' },
  { rep: '北京代表处', country: '中国', deviceName: '集装箱新风机-03号', deviceType: 'VENT-FAN-12', hardwareVersion: 'Vv1.2', deviceSn: 'VTF20260301043', status: '正常', overallScore: 89, level: '良好', activeAlarmScore: 84, warningScore: 90, performanceScore: 90, deviceStatusScore: 92, customerName: '国家电网', customerLevel: 'A', contractNo: 'CON-2026-0105', contractName: '国网北京核心商圈低碳试点', siteName: '北京西单储能电站', ipmt: '刘光耀', spdt: '郭涛', pe: '曾一鸣' },

  // 成都春熙路储能站 devices
  { rep: '四川代表处', country: '中国', deviceName: '直流防雷汇流箱-03号机', deviceType: 'DC-COMBINER-16', hardwareVersion: 'Hv1.0', deviceSn: 'DCC20260112443', status: '离线', overallScore: 72, level: '中等', activeAlarmScore: 68, warningScore: 78, performanceScore: 70, deviceStatusScore: 72, customerName: '成都城投储能', customerLevel: 'C', contractNo: 'CON-2026-0244', contractName: '成都春熙路超级虚拟电厂建设', siteName: '成都春熙路储能站', ipmt: '魏志远', spdt: '廖凯', pe: '周杨' },
  { rep: '四川代表处', country: '中国', deviceName: '高压母排漏电保护器', deviceType: 'LEAK-PRO-X1', hardwareVersion: 'Lv2.0', deviceSn: 'LKP20260124036', status: '异常', overallScore: 76, level: '中等', activeAlarmScore: 72, warningScore: 82, performanceScore: 74, deviceStatusScore: 76, customerName: '成都城投储能', customerLevel: 'C', contractNo: 'CON-2026-0244', contractName: '成都春熙路超级虚拟电厂建设', siteName: '成都春熙路储能站', ipmt: '魏志远', spdt: '廖凯', pe: '周杨' },
  { rep: '四川代表处', country: '中国', deviceName: '控制室加湿变送器', deviceType: 'HUMID-TRAN-5', hardwareVersion: 'Hv1.1', deviceSn: 'HUM20260205881', status: '正常', overallScore: 86, level: '良好', activeAlarmScore: 85, warningScore: 80, performanceScore: 87, deviceStatusScore: 92, customerName: '成都城投储能', customerLevel: 'C', contractNo: 'CON-2026-0244', contractName: '成都春熙路超级虚拟电厂建设', siteName: '成都春熙路储能站', ipmt: '魏志远', spdt: '廖凯', pe: '周杨' },

  // 广州天河路储能站 devices
  { rep: '广东代表处', country: '中国', deviceName: 'BMS能量均衡仪-A1', deviceType: 'BMS-EQ-96', hardwareVersion: 'EQv5.2', deviceSn: 'EQP20260312011', status: '异常', overallScore: 56, level: '不及格', activeAlarmScore: 45, warningScore: 64, performanceScore: 60, deviceStatusScore: 55, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0044', contractName: '广州天河路储荷换电站', siteName: '广州天河路储能站', ipmt: '梁启华', spdt: '覃俊', pe: '唐建华' },
  { rep: '广东代表处', country: '中国', deviceName: 'PCS变流柜B1变逆组件', deviceType: 'PCS-INV-100', hardwareVersion: 'Hv1.2', deviceSn: 'INV20260401099', status: '异常', overallScore: 60, level: '及格', activeAlarmScore: 50, warningScore: 70, performanceScore: 65, deviceStatusScore: 55, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0044', contractName: '广州天河路储荷换电站', siteName: '广州天河路储能站', ipmt: '梁启华', spdt: '覃俊', pe: '唐建华' },
  { rep: '广东代表处', country: '中国', deviceName: '消防电源切换屏-F1', deviceType: 'FIRE-PWR-SW', hardwareVersion: 'Fv1.0', deviceSn: 'FPS20260502123', status: '正常', overallScore: 68, level: '及格', activeAlarmScore: 62, warningScore: 72, performanceScore: 70, deviceStatusScore: 70, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0044', contractName: '广州天河路储荷换电站', siteName: '广州天河路储能站', ipmt: '梁启华', spdt: '覃俊', pe: '唐建华' },
  { rep: '广东代表处', country: '中国', deviceName: '冷风膨胀副水箱-LS01', deviceType: 'COL-TANK-15', hardwareVersion: 'Tv1.0', deviceSn: 'TNK20260218705', status: '正常', overallScore: 72, level: '中等', activeAlarmScore: 75, warningScore: 66, performanceScore: 75, deviceStatusScore: 72, customerName: '南方电网', customerLevel: 'A', contractNo: 'CON-2026-0044', contractName: '广州天河路储荷换电站', siteName: '广州天河路储能站', ipmt: '梁启华', spdt: '覃俊', pe: '唐建华' },
];

// Rich deep linking alarm entries
export const mockDeepLinkDetails: DeepLinkItem[] = [
  // Alarms
  {
    id: 'link_1',
    rep: '广东代表处',
    customerName: '南方电网',
    siteName: '广州天河路储能站',
    device: 'BMS能量均衡仪-A1',
    type: 'alarm',
    level: 'L1',
    title: '三元/铁锂电芯单体欠压 (严重)',
    reason: '电池包单体电芯压差最大升至 380mV，已极大偏离主回路放电截止设定安全边界。',
    suggestion: '即刻下发指令限制功率运行（50%出力），在线启动高强度均衡校准。如果压差持续扩张，建议运维停机拆包人工测量。',
    time: '2026-05-22 01:22:15',
    scoreImpact: -25
  },
  {
    id: 'link_2',
    rep: '广东代表处',
    customerName: '南方电网',
    siteName: '广州天河路储能站',
    device: 'PCS变流柜B1变逆组件',
    type: 'alarm',
    level: 'L1',
    title: '变流PCS机柜1B变逆热堆积 (严重)',
    reason: 'IGBT功率管半导体散热铜基板表面阻抗变送温达到 102.5℃，触发模组过热紧急跳闸防线。',
    suggestion: '下调变流充放负荷，检查强制风冷/水冷泵风阀，补加硅脂介质，测量散热端是否有散热孔堵塞。',
    time: '2026-05-22 02:11:30',
    scoreImpact: -18
  },
  {
    id: 'link_3',
    rep: '上海代表处',
    customerName: '申能股份',
    siteName: '上海静安储能电站',
    device: 'BMS电池管理 #7采集板',
    type: 'alarm',
    level: 'L2',
    title: '控制器CAN总线通信高误码率 (紧急)',
    reason: 'BMS主控与从机采集卡之间电磁干扰强烈，产生短时间数据严重丢包和CRC校验误码。',
    suggestion: '检查串接线路阻抗、高压母排防噪防护阻隔。用万用表排查屏蔽线两端接地电阻。',
    time: '2026-05-21 21:05:40',
    scoreImpact: -10
  },
  {
    id: 'link_4',
    rep: '北京代表处',
    customerName: '国家电网',
    siteName: '北京西单储能电站',
    device: '电池舱2排 #12电池簇',
    type: 'alarm',
    level: 'L2',
    title: '第12电池簇放电温升异常 (紧急)',
    reason: '2号单体电芯高倍率充放时温差快速拉升 4.8℃，高过全寿命阈值偏差。',
    suggestion: '调大液冷调压阀门，疏通小通径支路，防止由于热对流死角引起的局域热失控。',
    time: '2026-05-21 15:44:12',
    scoreImpact: -12
  },
  {
    id: 'link_5',
    rep: '四川代表处',
    customerName: '成都城投储能',
    siteName: '成都春熙路储能站',
    device: '直流防雷汇流箱-03号机',
    type: 'alarm',
    level: 'L1',
    title: '断路器辅助触点严重卡阻故障 (危急)',
    reason: '系统自动切换动作时，真空继电器吸合阻抗骤升，极板反馈触头疑似偏置疲劳或铜粘。',
    suggestion: '迅速锁定异常槽机并对充放变流支路降额切离；在非热载窗口开展线下断电设备更换与除锈维护。',
    time: '2026-05-22 00:08:42',
    scoreImpact: -20
  },

  // Warnings
  {
    id: 'warn_1',
    rep: '福建代表处',
    customerName: '华润电力',
    siteName: '龙岩东山储能电站',
    device: '3号集控空调冷水机',
    type: 'warning',
    level: 'L4',
    title: '冷水循环机泵长期无休运载警告',
    reason: '循环泵不间断运行总时长突破 5000 周期指标临界点。',
    suggestion: '加入日常例行保养巡视，用超声探伤仪确认无异常空泡声响，排查振动状态。',
    time: '2026-05-22 01:00:00',
    scoreImpact: -4
  },
  {
    id: 'warn_2',
    rep: '广东代表处',
    customerName: '南方电网',
    siteName: '中山公园储能电站',
    device: '1A号蓄电池电池簇-04簇',
    type: 'warning',
    level: 'L3',
    title: '第16节电芯内阻阶段性上浮',
    reason: '最新充放自检算术拟合电芯内阻同比异常提高 8.5%，热容量响应微调。',
    suggestion: '无即时爆炸与熔断断电危险，在定期重度维护期将本电池组隔离重校。',
    time: '2026-05-21 18:30:11',
    scoreImpact: -6
  },
  {
    id: 'warn_3',
    rep: '上海代表处',
    customerName: '申能股份',
    siteName: '上海静安储能电站',
    device: '集装箱精密空调-AC02',
    type: 'warning',
    level: 'L3',
    title: '冷凝器冷媒压力慢降警告',
    reason: '空调主蒸发器及冷却压缩机回油、冷媒接口松动导致冷气供给量微降。',
    suggestion: '安排氟里昂补充，用漏油痕迹肉眼巡检焊接接头是否松弛。',
    time: '2026-05-21 22:15:00',
    scoreImpact: -5
  },

  // Performance Indicators
  {
    id: 'perf_1',
    rep: '上海代表处',
    customerName: '申能股份',
    siteName: '上海静安储能电站',
    device: '3号电热储能舱变流并网器',
    type: 'performance',
    level: 'L4',
    title: '并网母排电压谐波幅值劣化',
    reason: '并网无功功率偏差 1.5%，输出相移超出额定设定曲线。',
    suggestion: '在控制系统修改自适应陷波滤波系数，抑制因外部线路老化引起的电能质量抖动。',
    time: '2026-05-21 08:30:00',
    scoreImpact: -3
  },
  {
    id: 'perf_2',
    rep: '广东代表处',
    customerName: '南方电网',
    siteName: '中山公园储能电站',
    device: '一楼大厅环境烟雾传感器',
    type: 'performance',
    level: 'L4',
    title: '传感器基零信号常数向光漂移',
    reason: '空气浮沉多、探头粘附雾气落灰，光学探测效率产生微幅负增。',
    suggestion: '派遣巡检小队进行传感器吹风、布拭子擦亮光学孔并进行自研固件的静态度核准。',
    time: '2026-05-22 00:44:00',
    scoreImpact: -2
  },
  {
    id: 'perf_3',
    rep: '广东代表处',
    customerName: '南方电网',
    siteName: '广州天河路储能站',
    device: '冷风膨胀副水箱-LS01',
    type: 'performance',
    level: 'L3',
    title: '液位传感器测点量反馈越界',
    reason: '膨胀水冷液体消耗超额限，水表反馈值距干涸下限仅剩 8%。',
    suggestion: '检测冷量流道是否由于长期高温热循环产生焊点渗溢，加注指定级冰点防护乙二醇液体。',
    time: '2026-05-21 16:35:00',
    scoreImpact: -8
  }
];
