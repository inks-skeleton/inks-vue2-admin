<template>
  <div ref="echarts" :style="sizeCss" />
</template>

<script>
import theme from './theme'
export default {
  props: {
    width: {
      type: [ Number, String ],
      default: '100%'
    },
    height: {
      type: [ Number, String ],
      default: 500
    },
    legend: {
      type: Object,
      default: null
    },
    xAxis: {
      type: Object,
      default: null
    },
    yAxis: {
      type: Object,
      default: null
    },
    series: {
      type: Object,
      default: null
    },
    seriesType: {
      type: String,
      default: 'line' // 参考echarts 的series的type项
    },
    tooltipAxisPointer: {
      type: String,
      default: 'shadow'
    }
  },
  data () {
    return {
      instance: null
    }
  },
  computed: {
    sizeCss () {
      const width = typeof this.width === 'string' ? this.width : this.width + 'px'
      const height = typeof this.height === 'string' ? this.height : this.height + 'px'
      return `width:${width};height:${height};`
    },
    option () {
      const xAxis = this.xAxis || {}
      xAxis.type = 'category'

      let yAxis = this.yAxis || {}
      if (typeof yAxis === 'string') yAxis = {name: yAxis}
      yAxis.type = 'value'
      yAxis.min = yAxis.min || 0
      yAxis.max = yAxis.max || 100
      yAxis.splitNumber = yAxis.splitNumber || 6

      const seriesType = this.seriesType || 'line'
      const series = (this.series || []).map(item => {
        item.type = seriesType
        return item
      })

      return {
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: 'horizontal',
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: 'right',
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: 'top',
          data: this.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: !0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: this.tooltipAxisPointer}
        },
        xAxis,
        yAxis,
        series
      }
    }
  },
  watch: {
    series: {
      handler (newval) {
        if (!this.instance) {
          this.$nextTick(() => this.initEcharts())
        } else {
          if (!this.option) return
          this.instance.setOption(this.option)
        }
      },
      immediate: true
    }
  },
  methods: {
    initEcharts () {
      const option = this.option
      if (!option) return
      echarts.registerTheme('walden', theme)
      const echartsDiv = this.$refs.echarts
      const echartInstance = echarts.init(echartsDiv, 'walden')
      echartInstance.setOption(option)
      this.instance = echartInstance
    }
  }
}
</script>
