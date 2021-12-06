<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" style="margin-top: 20px">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 408px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16"></el-col>
    <div class="num">
      <el-card
        shadow="hover"
        v-for="item in countData"
        :key="item.name"
        :body-style="{
          display: 'flex',
          padding: 0,
          'justify-content': 'space-between',
          'align-content': 'center',
          width: '240px',
        }"
      >
        <i
          class="icon"
          :class="`el-icon-${item.icon}`"
          :style="{ background: item.color }"
        ></i>
        <div class="detail">
          <p class="num">￥{{ item.value }}</p>
          <p class="txt">{{ item.name }}</p>
        </div>
      </el-card>
    </div>
    <el-card
      shadow="hover"
      style="height: 280px; padding-top: 20px; padding-left: 60px"
      body-style="padding: 0px;"
    >
      <echart
        :chartsData="echartData.order"
        style="height: 280px; margin: 10px auto"
      ></echart>
    </el-card>
    <div class="graph">
      <el-card
        shadow="hover"
        style="margin-top: 10px; padding-top: 20px"
        body-style="padding:0px"
      >
        <echart
          :chartsData="echartData.user"
          style="height: 220px; width: 400px"
        ></echart>
      </el-card>
      <el-card
        shadow="hover"
        style="padding-top: 20px; margin-top: 10px"
        body-style="padding: 0px;"
      >
        <echart
          :chartsData="echartData.video"
          :isAxisChart="false"
          style="height: 220px; width: 340px"
        ></echart>
      </el-card>
    </div>
  </el-row>
</template>

<script>
import { getHome } from '../../api/data'
import Echart from '@/components/ECharts.vue'
export default {
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [
        /*  {
          name: 'oppo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 80022222
        },
        {
          name: 'vivo',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '三星',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        },
        {
          name: '魅族',
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800
        } */
      ],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#409EFF',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#409EFF',
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          xData: [],
          series: [],
        },
      },
    }
  },
  methods: {
    getTableData() {
      getHome().then((res) => {
        this.tableData = res.data.tableData

        /* 折线图 */
        const order = res.data.orderData
        this.echartData.order.xData = order.date
        const keyArray = Object.keys(order.data[0])
        keyArray.forEach((key) => {
          this.echartData.order.series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: 'line',
          })
        })

        /* 用户柱状图 */
        this.echartData.user.xData = res.data.userData.map((item) => item.date)
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.data.userData.map((item) => item.new),
          type: 'bar',
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map((item) => item.active),
          type: 'bar',
        })

        /* 饼状图 */
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: 'pie',
        })
      })
    },
  },
  mounted() {
    this.getTableData()
  },
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/home';
</style>
