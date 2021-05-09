<template>
  <div>
    <el-alert title="今日统计" type="info" effect="dark" :closable="false">
    </el-alert>
    <!--卡片视图区域-->
    <el-card>
      <!-- 2、为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 800px; height: 500px"></div>
    </el-card>
  </div>
</template>
<script>
// 1、导入echarts
// import echarts from 'echarts'
export default {
  data() {
    return {
      numList: [],
    };
  },

  created() {
    this.getMyWayNumInfo();
  },
  // 此时页面上的元素已经被渲染完毕了
  mounted() {
    setTimeout(() => {
      this.setEchart();
    }, 1000);
  },
  methods: {
    async getMyWayNumInfo() {
      const res = await this.$http.get("/api/myWayNumInfo");
      console.log(res);
      if (res.status !== 200) return this.$message.error("查询今日数据失败");
      this.numList = res.data.result;
      console.log(this.numList);
    },
    setEchart() {
      console.log(this.numList);
      // 3、基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 4、准备数据和配置项
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "麦味网数据一览",
        },
        tooltip: {},
        legend: {
          data: ["数量"],
        },
        xAxis: {
          data: ["用户注册", "文章", "问题", "回答", "私信", "关注"],
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            data: this.numList,
            // showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(220, 220, 220, 0.8)",
            // },
            color: "#ffd04b",
          },
        ],
      };
      // 5、展示数据
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>
<style lang='less' scoped>
</style>