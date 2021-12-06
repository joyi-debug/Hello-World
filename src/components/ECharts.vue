<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props:  {
    chartsData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    chartsData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    }
  },
  methods: {
    initChart() {
      this.initChartData()
      if (this.echart){
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartsData.xData
        this.axisOption.series = this.chartsData.series
      } else {
        this.normalOption.series = this.chartsData.series
      }
    }
  },
  data() {
    return {
      axisOption: {
          /* 图例文字颜色 */
            legend: {
              textStyle: {
                color: '#333'
              }
            },
            grid: {
              left: '%20'
            },
            // 提示框
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category', // 类目轴
              data: [],
              axisLine: {
                LineStyle: {
                  color: '#17b3a3'
                }
              },
              axisLabel: {
                interval: 0,
                color: '#333'
              }
            },
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  LineStyle: {
                    color: '#17b3a3'
                  }
                }
              }
            ],
            color: ['#2ec749', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
            series: []
      },
      normalOption: {
        tooltip: {
            trigger: 'item'
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9462e5',
            '#a6a6a6',
            '#e1bb22',
            '#39c362',
            '#3ed1cf'
          ],
          series: []
      },
      echart: null
    }
  }
}
</script>
