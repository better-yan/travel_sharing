<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el_menu_main"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1"><a href="/#/setting">设置</a></el-menu-item>
          <el-menu-item index="2-2"
            ><a href="/#/createNotes">游记</a></el-menu-item
          >
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4">消息中心</el-menu-item>
        <el-menu-item index="5">消息中心</el-menu-item>
        <el-menu-item index="6"></el-menu-item>
        <el-menu-item index="7"></el-menu-item>
        <el-menu-item index="7"></el-menu-item>
        <el-menu-item index="7"></el-menu-item>
        <el-menu-item index="7">消息中心</el-menu-item>
        <el-menu-item index="7">消息中心</el-menu-item>
        <el-menu-item index="7">消息中心</el-menu-item>
      </el-menu>
      <el-carousel height="500px">
        <el-carousel-item v-for="item in imgList" :key="item">
          <img class="header_carousel_img" :src="item" alt="图片" />
        </el-carousel-item> </el-carousel
    ></el-header>
    <el-container class="child_container">
      <el-aside width="30%">
        <div>
          <el-card shadow="hover">
            <div class="travel_title">
              <a href="#" class="travel_column">旅行家专栏</a>
              <a href="#" class="column_main">专栏首页</a>
            </div>
            <div>
              <!-- <el-carousel height="150px">
                <el-carousel-item
                  v-for="(item, index) in mainContent"
                  :key="index"
                >
                  <img class="aside_carousel_img" :src="item.img" alt="图片" />
                </el-carousel-item>
              </el-carousel> -->
              <el-carousel :interval="4000" type="card" height="150px">
                <el-carousel-item
                  v-for="(item, index) in mainContent"
                  :key="index"
                >
                  <img class="aside_carousel_img" :src="item.img" alt="图片" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-card>
          <el-card>
            <div class="travel_strategy">
              <a href="#" class="strategy_column">旅游攻略推荐</a>
              <a href="#" class="more">更多</a>
            </div>
            <div class="travel_line">
              <a href="#">
                <el-image :src="url" fit="cover"></el-image>
              </a>

              <h3>
                <a href="#" class="example_travel_line">成都旅游线路推荐 </a>
              </h3>
            </div>
          </el-card>
          <el-card>
            <div class="travel_activity">
              <a href="#" class="new_activity">最新活动</a>
              <a href="#" class="more">查看全部</a>
            </div>
            <div class="travel_line">
              <a href="#">
                <el-image :src="url" fit="cover"></el-image>
              </a>
              <h3>
                <a href="#" class="example_travel_activity">马蜂窝拍卖行 </a>
              </h3>
              <p class="activity_text">每周二：拍精美实物奖品！</p>
            </div>
          </el-card>
          <el-card>
            <div class="other_activity">
              <a href="#" class="other_activity_left">未知旅行实验室</a>
              <a href="#" class="more">查看全部</a>
            </div>
            <a href="#">
              <el-image :src="url" fit="cover"></el-image>
            </a>
          </el-card>
          <el-card>
            <div class="other_activity">
              <a href="#" class="other_activity_left">未知旅行实验室</a>
              <a href="#" class="more">查看全部</a>
            </div>
            <a href="#">
              <el-image :src="url" fit="cover"></el-image>
            </a>
          </el-card>
        </div>
      </el-aside>
      <el-main>
        <div v-for="(item, index) in currentShowContent" :key="index">
          <el-row>
            <el-col
              ><el-card shadow="hover">
                <el-row :gutter="12">
                  <el-col :span="9">
                    <!-- <img :src="item.img" alt="图片" /> -->
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="item.img"
                      fit="cover"
                    ></el-image>
                  </el-col>
                  <el-col :span="15">
                    <div style="height: 40px">
                      <a
                        href="#"
                        id="articleTitle"
                        v-on:click="
                          onDetailArticle(item.articleId, 'articleTitle')
                        "
                        >{{ item.title }}</a
                      >
                    </div>
                    <div style="height: 80px">
                      <a
                        class="mw_a_articleContent"
                        id="articleContent"
                        v-on:click="
                          onDetailArticle(item.articleId, 'articleContent')
                        "
                        href="#"
                        v-text="item.text"
                        >{{ item.text }}</a
                      >
                    </div>
                    <el-row :gutter="0">
                      <el-col :span="4"
                        ><i class="el-icon-location"></i
                        ><a>{{ item.city }}</a></el-col
                      >
                      <el-col :span="6">
                        <div>
                          <a :href="'/#/home?userId=' + item.userId"
                            ><el-avatar
                              class="author_avatar"
                              size="small"
                              :src="item.img"
                            ></el-avatar
                          ></a>
                          <a
                            :href="'/#/home?userId=' + item.userId"
                            class="mw_a_setOverflow"
                            >{{ item.username }}</a
                          >
                        </div>
                      </el-col>
                      <el-col :span="10"
                        ><i class="el-icon-view"></i><span>张三</span></el-col
                      >
                      <el-col :span="4"
                        ><span>张三</span><a href="#" class="give_a_like"></a
                      ></el-col> </el-row
                  ></el-col>
                </el-row> </el-card
            ></el-col>
          </el-row>
        </div>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-size="queryInfo.pagesize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </el-main>
    </el-container>
    <mw_footer>
      <slot name="header"></slot>
    </mw_footer>
  </el-container>
</template>
<script>
import mw_footer from "@/components/Footer.vue";
export default {
  name: "myway",
  components: {
    mw_footer,
  },
  data() {
    return {
      // 导航栏初始定位
      activeIndex: "1",
      //   a: "/assets/image/1.jpg",
      // 主轮播图初始化数组
      imgList: [],
      // main部分初始化数据
      getMainContent: [],
      mainContent: [],
      currentShowContent: [],
      // 导入侧边栏图片
      url: require("../../public/image/1.jpg"),
      // 分页查询条件
      queryInfo: {
        query: "",
        pagenum: 1,
      },
      total: 20,
      //   src: require("../../public/image/1.jpg"),
    };
  },
  created() {
    this.getImageList();
    this.getMainImgList();
  },
  mounted() {},
  updated() {},
  methods: {
    // 分页---当前页
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.currentShowContent = this.mainContent.slice(
        (newPage - 1) * 10,
        newPage * 10
      );
    },
    getImageList() {
      for (var i = 1; i <= 4; i++) {
        this.imgList.push(require("../../public/image/" + i + ".jpg"));
      }
      // console.log(this.imgList);
    },
    async getMainImgList() {
      const res = await this.$http.get("/api/myway");
      console.log(res);
      this.getMainContent = res.data.result;
      for (var i = 0; i < this.getMainContent.length; i++) {
        var url = this.getMainContent[i].a_file + "";
        let reg = /<\/?.+?\/?>/g;
        this.mainContent[i] = {
          // img: require(url),
          img: require("../../public/image/main" + i + ".jpg"),
          // text: i,
          title: this.getMainContent[i].title,
          text: this.getMainContent[i].text.replace(reg, ""),
          userId: this.getMainContent[i].userId,
          username: this.getMainContent[i].username,
          city: this.getMainContent[i].city,
          articleId: this.getMainContent[i].articleId,
        };
        // console.log(this.mainContent);
      }
      this.total = this.mainContent.length;
      this.handleCurrentChange(this.queryInfo.pagenum);
    },
    onDetailArticle(userId, labelId) {
      var articleContent = document.getElementById(labelId);
      articleContent.setAttribute("href", `/#/jome?userId=${userId}`);
    },
    handleSelect() {},
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>
<style Lang="less" scoped>
/** 
侧边栏
*/
.other_activity {
  height: 60px;
  line-height: 60px;
}
.other_activity_left {
  color: #333;
  float: left;
  font-size: 18px;
  display: block;
}
.author_avatar {
  float: left;
  line-height: 20px;
  height: 20px;
  width: 20px;
}
.example_travel_activity {
  color: #ff9d00;
}
.activity_text {
  margin: 0px;
}
.example_travel_line:hover,
.example_travel_activity:hover {
  text-decoration: underline;
}
.travel_line h3 {
  margin: 10px 0 5px;
  width: 170px;
  height: 20px;
  line-height: 20px;
  font-size: 17px;
  text-decoration: none;
  font-weight: normal;
}
.travel_title,
.travel_strategy,
.travel_activity {
  height: 35px;
  line-height: 35px;
}
.travel_column,
.strategy_column,
.new_activity {
  color: #333;
  float: left;
  font-size: 18px;
  display: block;
}
.column_main,
.more {
  float: right;
  color: #999;
}
.give_a_like {
  background: url("../../assets/img/点赞.png") no-repeat;
  height: 30px;
  width: 30px;
  margin: -5px 0 0;
  position: absolute;
  background-size: 100% 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  display: contents;
}
.el-col-9 {
  width: auto;
}
/* 
主页内容
*/
.el-main {
  color: #333;
  text-align: center;
}
.mw_a_articleContent {
  text-align: left;
  height: 80%;
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
}
.mw_a_setOverflow {
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  display: block;
  height: 20px;
}
body > .el-container {
  margin-bottom: 40px;
}
.child_container {
  margin: 20px 170px;
}
/* 
头部区域
*/
.el_menu_main {
  margin-left: 10%;
}
.header_carousel_img,
.aside_carousel_img {
  width: 100%;
  height: 100%;
}
</style>