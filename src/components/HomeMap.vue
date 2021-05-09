<template>
  <!-- 初始化echarts需要个有宽高的盒子 -->
  <div>
    <div id="myChartChina" style="width: 100%; height: 650px"></div>
    <div class="searchCity">
      <el-cascader
        v-model="targetCity"
        :options="options"
        :show-all-levels="false"
        :props="{ checkStrictly: true, expandTrigger: 'hover' }"
        filterable
        @change="handleChange"
      >
        <template slot-scope="{ node, data }">
          <span>{{ data.label }}</span>
          <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
      <el-button type="warning" plain @click="addUserCity">添加城市</el-button>
    </div>
  </div>
</template>
<script>
// 1、导入echarts
import * as echarts from "echarts/lib/echarts";
//百度地图
import "echarts/extension/bmap/bmap";
import mapData from "../../server/chinaMap";
export default {
  name: "mw_homeMap",
  data() {
    return {
      chartOption: {},
      options: this.publicMethod.cityInfo,
      targetCity: "",
      selectedData: [],
    };
  },

  created() {
    this.getTravelMap();
  },
  // 此时页面上的元素已经被渲染完毕了
  mounted() {
    setTimeout(() => {
      this.getMapAndShow();
    }, 1000);
  },
  methods: {
    getMapAndShow() {
      this.chartOption = {
        title: {
          text: "全国主要城市",
          sublink: "http://www.baidu.com",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        bmap: {
          center: [124.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#f3f3f3",
                },
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "highway",
                elementType: "all",
                stylers: {
                  color: "#fdfdfd",
                },
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off",
                },
              },
              {
                featureType: "boundary",
                elementType: "all",
                stylers: {
                  color: "#fefefe",
                },
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#d1d1d1",
                },
              },
              {
                featureType: "label",
                elementType: "labels.text.fill",
                stylers: {
                  color: "#999999",
                },
              },
            ],
          },
        },
        series: [
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "bmap",
            data: mapData.convertData(this.selectedData),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#ffb646",
              },
            },
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: mapData.convertData(
              this.selectedData
                .sort(function (a, b) {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#ffb646",
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            zlevel: 1,
          },
        ],
      };
      this.drawLine();
    },
    handleChange(name) {
      console.log(name);

      if (Array.isArray(name)) {
        if (name.length >= 2) {
          this.targetCity = name[1];
        } else {
          this.targetCity = name[0];
        }
      }
    },
    async addUserCity() {
      var userResult = this.publicMethod.getUrluserAndUser();
      var sendId;
      sendId = userResult[0];
      this.selectedData.push({
        name: this.targetCity,
        value: 200,
      });
      console.log(this.selectedData);
      var sendForm = {
        userId: sendId,
        travelMap: this.selectedData,
      };
      console.log(sendForm);
      const res = await this.$http.post("/api/userTravelMap", sendForm);
      console.log("res", res);
      if (res.status !== 200) {
        return this.$message.error("修改失败");
      } else {
        if (!res.data.state) {
          this.$message.success("修改成功");
        }
      }
      // this.selectedData = JSON.parse(res.data.result);
      console.log(this.selectedData);
      this.getMapAndShow();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      var myChartContainer = document.getElementById("myChartChina");
      var myChartChina = echarts.init(myChartContainer);
      myChartChina.setOption(this.chartOption);
      window.onresize = function () {
        // resizeMyChartContainer();
        myChartChina.resize();
      };
    },
    // 获取旅游地图
    async getTravelMap() {
      var userResult = this.publicMethod.getUrluserAndUser();
      var sendId;
      sendId = userResult[0];
      const res = await this.$http.get("/api/userTravelMap", {
        params: {
          userId: sendId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.selectedData = JSON.parse(res.data.result);
        }
      }
    },
  },
};
</script>
<style lang='less' scoped>
.searchCity {
  position: absolute;
  top: 100px;
  right: 0;
}
</style>