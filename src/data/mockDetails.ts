import { StationDetail } from '../types';

export const mockStationDetails: Record<string, StationDetail> = {
  h1: {
    stationId: 'h1',
    stationName: '龙岩东山储能电站',
    score: 98,
    soc: 78.4,
    soh: 96.8,
    temperature: 24.1,
    activePower: 1250,
    rackCount: 16,
    issues: [
      {
        id: 'iss1_1',
        type: 'warning',
        level: 'L4',
        device: '3号电池舱集控空调冷水机组-P01',
        reason: '循环泵运转时间累计超警限',
        suggestion: '例行检查泵体轴承振动与润滑程度，伺机进行保养或更换备件。'
      },
      {
        id: 'iss1_2',
        type: 'abnormal',
        level: 'L4',
        device: '2号储能变流器(PCS)',
        reason: '机组无功功率偏离设定指令曲线约1.5%',
        suggestion: '后台微调无功补偿控制系数，校准电网侧电流互感器采样漂移。'
      }
    ]
  },
  h2: {
    stationId: 'h2',
    stationName: '中山公园储能电站',
    score: 96,
    soc: 84.1,
    soh: 95.4,
    temperature: 23.5,
    activePower: 920,
    rackCount: 12,
    issues: [
      {
        id: 'iss2_1',
        type: 'warning',
        level: 'L3',
        device: '1A号蓄电池电池簇-第04簇',
        reason: '第16节电芯内阻同比异常升高8.5%',
        suggestion: '持续监控该电芯充放电时的温升幅度，在下个检修窗口执行标定测试及阻抗校零。'
      },
      {
        id: 'iss2_2',
        type: 'abnormal',
        level: 'L4',
        device: '一楼大厅环境烟雾感知传感器',
        reason: '光敏传感器镜头表面落尘，引起基准零点微幅漂移',
        suggestion: '运维人员携无尘布清洁光学透镜，并在系统管理侧手动执行零点标定。'
      }
    ]
  },
  h3: {
    stationId: 'h3',
    stationName: '上海静安储能电站',
    score: 91,
    soc: 55.6,
    soh: 94.2,
    temperature: 24.8,
    activePower: 2200,
    rackCount: 24,
    issues: [
      {
        id: 'iss3_1',
        type: 'alarm',
        level: 'L2',
        device: 'BMS电池管理系统 #7采集板',
        reason: '控制器CAN通讯校验误码率高，触发重发缓存机制',
        suggestion: '检查采集板末端匹配电阻阻值，排查BMS低压线槽与高压母排之间的电磁屏蔽。'
      },
      {
        id: 'iss3_2',
        type: 'warning',
        level: 'L3',
        device: '集装箱机房高精密空调-AC02',
        reason: '制冷回路低压侧冷媒压力偏低，影响系统换热效能',
        suggestion: '使用卤素检漏仪排查接口微动磨损，检漏修复后补加R410A冷媒。'
      }
    ]
  },
  h4: {
    stationId: 'h4',
    stationName: '北京西单储能电站',
    score: 85,
    soc: 42.0,
    soh: 93.1,
    temperature: 26.2,
    activePower: 1800,
    rackCount: 20,
    issues: [
      {
        id: 'iss4_1',
        type: 'alarm',
        level: 'L2',
        device: '储能电池舱2排 #12电池簇',
        reason: '2号单体电芯放电温升偏高，最大簇内温差达4.8℃',
        suggestion: '调节液冷分配阀开度，增大气流循环；检测液冷管接头流量，清洗水阻较大的毛细管。'
      },
      {
        id: 'iss4_2',
        type: 'abnormal',
        level: 'L3',
        device: 'PCS并网控制柜-主合闸开关 K01',
        reason: '合闸辅助弹簧储能电机工作电流偏大，有卡阻迹象',
        suggestion: '使用专用水剂清洗连杆传动机构，加注二硫化钼润滑脂进行防卡阻养护。'
      },
      {
        id: 'iss4_3',
        type: 'warning',
        level: 'L4',
        device: '集装箱防爆机械新风机-03号',
        reason: '进出风压差传感器反馈差压值逼近预警临界值',
        suggestion: '拆卸并更换一次风道初效纸质滤网，恢复风机标准换气压差。'
      }
    ]
  },
  h5: {
    stationId: 'h5',
    stationName: '成都春熙路储能站',
    score: 78,
    soc: 28.5,
    soh: 91.0,
    temperature: 28.3,
    activePower: 1450,
    rackCount: 16,
    issues: [
      {
        id: 'iss5_1',
        type: 'alarm',
        level: 'L1',
        device: '直流防雷汇流箱-03号机',
        reason: '主回路断路器触头反馈电平不匹配，疑似静触点疲劳粘连',
        suggestion: '【重要】立即将该充放电支路降额切出；实施离线停电，更换合闸真空接触器。'
      },
      {
        id: 'iss5_2',
        type: 'alarm',
        level: 'L2',
        device: '直流侧高压母排漏电保护器',
        reason: 'BMS正极对地绝缘电阻降至150kΩ（系统安全标准>500kΩ）',
        suggestion: '检查箱体凝露及高压接线座污物，启动充电机舱抽湿加热模块，用万用表逐段排查故障点。'
      },
      {
        id: 'iss5_3',
        type: 'abnormal',
        level: 'L3',
        device: '储能控制室环境加湿变送器',
        reason: '底部角落测点空气湿度突破92%RH，容易诱发电气爬电',
        suggestion: '手动开启机组紧急抽湿，排查集装箱箱板连接防水密封胶条老化破裂渗水情况。'
      }
    ]
  },
  h6: {
    stationId: 'h6',
    stationName: '广州天河路储能站',
    score: 64,
    soc: 15.2,
    soh: 88.5,
    temperature: 31.8,
    activePower: 1950,
    rackCount: 22,
    issues: [
      {
        id: 'iss6_1',
        type: 'alarm',
        level: 'L1',
        device: 'A侧1号集装箱BMS能量均衡仪',
        reason: '电池包单体电芯压差最大升至380mV，偏离放电截止设定值',
        suggestion: '即刻降载50%运行，降速充放；在线运行强力单平衡策略，对该重度不均极组进行人工保养。'
      },
      {
        id: 'iss6_2',
        type: 'alarm',
        level: 'L1',
        device: '变流PCS机柜1B变逆组件',
        reason: 'IGBT散热基板工作温度达到102.5℃，触发超高温度紧急告警',
        suggestion: '下调变流器工作负荷，检查IGBT导热硅脂涂抹厚度，排查电子冷却泵电机绕组是否有短路现象。'
      },
      {
        id: 'iss6_3',
        type: 'alarm',
        level: 'L2',
        device: '消防备份电源智能切换屏',
        reason: '系统进行主备电源切换演练时，触头接触阻抗明显增大，导致辅助控制触板微落电',
        suggestion: '清扫接触器表面弧尘痕迹，使用触点清洁喷剂去氧化层，若仍有电弧灼伤痕迹则整体拆换。'
      },
      {
        id: 'iss6_4',
        type: 'warning',
        level: 'L3',
        device: '储能液冷冷风冷膨胀副水箱LS01',
        reason: '液位标定浮子指示低液位告警（剩余量低下限8%）',
        suggestion: '检查液冷回路冷却管是否存在细微沙眼或接头渗露，添加同型号环保防凝乙二醇水冷液。'
      }
    ]
  }
};
