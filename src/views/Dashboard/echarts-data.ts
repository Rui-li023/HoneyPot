import { EChartsOption } from 'echarts'
import { useI18n } from '@/hooks/web/useI18n'
import {
  getScanLogListApi,
  conpotApi,
  honeydApi,
  kippoApi,
  real_honeypotApi,
  webtrapApi
} from '@/api/scanlog/index'
import { ScanLogItem } from '@/api/scanlog/types'
import * as _ from 'radash'

const { t } = useI18n()

const theDayBeforeWeek = function () {
  const now = new Date()
  const d = now.getTime()
  const result = new Date()
  result.setTime(d - 7 * 24 * 60 * 60 * 1000)
  return result
}

const data = await getScanLogListApi({
  from_date: theDayBeforeWeek().toISOString().slice(0, -1)
})

export const lineOptions: EChartsOption = {
  title: {
    text: '攻击趋势',
    left: 'center'
  },
  xAxis: {
    data: [
      t('analysis.january'),
      t('analysis.february'),
      t('analysis.march'),
      t('analysis.april'),
      t('analysis.may'),
      t('analysis.june'),
      t('analysis.july'),
      t('analysis.august'),
      t('analysis.september'),
      t('analysis.october'),
      t('analysis.november'),
      t('analysis.december')
    ],
    boundaryGap: false,
    axisTick: {
      show: false
    }
  },
  grid: {
    left: 20,
    right: 20,
    bottom: 20,
    top: 80,
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    padding: [5, 10]
  },
  yAxis: {
    axisTick: {
      show: false
    }
  },
  legend: {
    data: ['TCP', 'UDP'],
    top: 50
  },
  series: [
    {
      name: 'TCP',
      smooth: true,
      type: 'line',
      data: [100, 120, 161, 134, 105, 160, 165, 114, 163, 185, 118, 123],
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: 'UDP',
      smooth: true,
      type: 'line',
      itemStyle: {},
      data: [120, 82, 91, 154, 162, 140, 145, 250, 134, 56, 99, 123],
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }
  ]
}

const conpot = await conpotApi({
  from_date: theDayBeforeWeek().toISOString().slice(0, -1)
})
const honeyd = await honeydApi({
  from_date: theDayBeforeWeek().toISOString().slice(0, -1)
})
const kippo = await kippoApi({
  from_date: theDayBeforeWeek().toISOString().slice(0, -1)
})
const real_honeypot = await real_honeypotApi({
  from_date: theDayBeforeWeek().toISOString().slice(0, -1)
})
const webtrap = await webtrapApi({
  from_date: theDayBeforeWeek().toISOString().slice(0, -1)
})

export const pieOptions: EChartsOption = {
  title: {
    text: '攻击来源组成',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['conpot', 'honeyd', 'kippo', '高交互蜜罐', 'webtrap']
  },
  series: [
    {
      name: '攻击来源组成',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: conpot.length, name: 'conpot' },
        { value: honeyd.length, name: 'honeyd' },
        { value: kippo.length, name: 'kippo' },
        { value: real_honeypot.length, name: '高交互蜜罐' },
        { value: webtrap.length, name: 'webtrap' }
      ]
    }
  ]
}

const top10 = function <T extends string | number>(attr: (item: ScanLogItem) => T) {
  return _.sort(
    _.listify(_.counting(data, attr), (k, v) => ({ name: k, value: v })),
    (i) => i.value,
    true
  ).slice(0, 10)
}

const top_10_ip = top10((a) => a.source_ip)

export const IPOptions: EChartsOption = {
  title: {
    text: '攻击IP Top10',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: top_10_ip.map((i) => i.name)
  },
  series: [
    {
      name: '攻击IP Top10',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: top_10_ip
    }
  ]
}

const top_10_port = top10((a) => a.dest_port)

export const portOptions: EChartsOption = {
  title: {
    text: '目的端口 Top10',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: top_10_port.map((p) => p.name.toString())
  },
  series: [
    {
      name: '目的端口 Top10',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: top_10_port
    }
  ]
}

const top_10_protocol = top10((a) => a.protocol)

export const protocolOptions: EChartsOption = {
  title: {
    text: '攻击协议 Top10',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: top_10_protocol.map((p) => p.name)
  },
  series: [
    {
      name: '攻击来源组成',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: top_10_protocol
    }
  ]
}
const weekly = _.sort(
  _.listify(
    _.counting(data, (a) => new Date(a.time).getDay()),
    (k, v) => ({ day: k, value: v })
  ),
  (d) => d.day
)

export const barOptions: EChartsOption = {
  title: {
    text: '本周受攻击数量',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 50,
    right: 20,
    bottom: 20
  },
  xAxis: {
    type: 'category',
    data: [
      t('analysis.monday'),
      t('analysis.tuesday'),
      t('analysis.wednesday'),
      t('analysis.thursday'),
      t('analysis.friday'),
      t('analysis.saturday'),
      t('analysis.sunday')
    ],
    axisTick: {
      alignWithLabel: true
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '数量',
      data: weekly.map((it) => it.value),
      type: 'bar'
    }
  ]
}

export const radarOption: EChartsOption = {
  legend: {
    data: [t('workplace.personal'), t('workplace.team')]
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: t('workplace.quote'), max: 65 },
      { name: t('workplace.contribution'), max: 160 },
      { name: t('workplace.hot'), max: 300 },
      { name: t('workplace.yield'), max: 130 },
      { name: t('workplace.follow'), max: 100 }
    ]
  },
  series: [
    {
      name: `xxx${t('workplace.index')}`,
      type: 'radar',
      data: [
        {
          value: [42, 30, 20, 35, 80],
          name: t('workplace.personal')
        },
        {
          value: [50, 140, 290, 100, 90],
          name: t('workplace.team')
        }
      ]
    }
  ]
}

export const wordOptions = {
  series: [
    {
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      rotationRange: [-90, 90],
      shape: 'pentagon',
      width: 600,
      height: 400,
      drawOutOfBound: true,
      textStyle: {
        color: function () {
          return (
            'rgb(' +
            [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') +
            ')'
          )
        }
      },
      emphasis: {
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [
        {
          name: 'Sam S Club',
          value: 10000,
          textStyle: {
            color: 'black'
          },
          emphasis: {
            textStyle: {
              color: 'red'
            }
          }
        },
        {
          name: 'Macys',
          value: 6181
        },
        {
          name: 'Amy Schumer',
          value: 4386
        },
        {
          name: 'Jurassic World',
          value: 4055
        },
        {
          name: 'Charter Communications',
          value: 2467
        },
        {
          name: 'Chick Fil A',
          value: 2244
        },
        {
          name: 'Planet Fitness',
          value: 1898
        },
        {
          name: 'Pitch Perfect',
          value: 1484
        },
        {
          name: 'Express',
          value: 1112
        },
        {
          name: 'Home',
          value: 965
        },
        {
          name: 'Johnny Depp',
          value: 847
        },
        {
          name: 'Lena Dunham',
          value: 582
        },
        {
          name: 'Lewis Hamilton',
          value: 555
        },
        {
          name: 'KXAN',
          value: 550
        },
        {
          name: 'Mary Ellen Mark',
          value: 462
        },
        {
          name: 'Farrah Abraham',
          value: 366
        },
        {
          name: 'Rita Ora',
          value: 360
        },
        {
          name: 'Serena Williams',
          value: 282
        },
        {
          name: 'NCAA baseball tournament',
          value: 273
        },
        {
          name: 'Point Break',
          value: 265
        }
      ]
    }
  ]
}
