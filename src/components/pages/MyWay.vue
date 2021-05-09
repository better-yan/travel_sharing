<template>
  <el-container>
    <el-header>
      <el-menu
        style="min-width: 1100px"
        :default-active="activeIndex"
        class="el_menu_main"
        mode="horizontal"
        @select="handleSelect"
        text-color="#333"
        active-text-color="#ff9d00"
      >
        <el-menu-item index="1"
          ><el-avatar :size="60" shape="square" :src="logoUrl"></el-avatar
        ></el-menu-item>
        <el-menu-item index="2"><a href="/#/mayWay">首页</a></el-menu-item>
        <el-menu-item index="3"
          ><a :href="'/#/search?' + 'part=all&q='">目的地</a></el-menu-item
        >
        <el-menu-item index="4">
          <a :href="'/#/search?' + 'part=all&q='">旅游攻略</a></el-menu-item
        >
        <el-menu-item index="5"><a href="/#/wenda">问答</a></el-menu-item>
        <el-menu-item index="6">去旅游</el-menu-item>
        <el-menu-item index="7">麦味首选</el-menu-item>
        <el-submenu index="8" style="float: right; margin-right: 220px">
          <template slot="title"
            ><el-avatar
              :size="50"
              :src="loginForm.avatar | filterAvatar"
            ></el-avatar
          ></template>
          <el-menu-item index="8-1"
            ><a :href="'/#/home?userId=' + loginForm.userId"
              >我的麦味小屋</a
            ></el-menu-item
          >
          <el-menu-item index="8-2"
            ><a href="/#/createNotes">写游记</a></el-menu-item
          >
          <el-menu-item index="8-3"
            ><a href="/#/setting">我的麦味小屋</a></el-menu-item
          >
        </el-submenu>
        <el-submenu index="9" style="float: right; margin-right: -10px">
          <template slot="title">消息</template>
          <el-menu-item index="9-1"
            ><a href="/#/privateMsg">私信</a></el-menu-item
          >
          <el-menu-item index="9-2"
            ><a href="/#/createNotes">问答消息</a></el-menu-item
          >
          <el-menu-item index="9-3"
            ><a href="/#/setting">回复消息</a></el-menu-item
          >
          <el-menu-item index="9-4"
            ><a href="/#/setting">喜欢与收藏</a></el-menu-item
          >
          <el-menu-item index="9-5"
            ><a href="/#/setting">好友动态</a></el-menu-item
          >
        </el-submenu>
      </el-menu>
      <el-carousel height="500px">
        <el-carousel-item v-for="(item, index) in imgList" :key="index">
          <img class="header_carousel_img" :src="item.img" alt="图片" />
          <a href="#" class="header_text">
            <span style="color: #fff">
              {{ item.date }}
            </span>
            <h3 style="color: #fff">{{ item.title }}</h3>
          </a>
        </el-carousel-item>
      </el-carousel>
      <el-card class="header_search_card" shadow="never">
        <div style="margin-bottom: 15px; width: 550px">
          <el-radio style="color: #fff" v-model="headerRadio" label="1"
            >全部</el-radio
          >
          <el-radio style="color: #fff" v-model="headerRadio" label="2"
            >目的地</el-radio
          >
          <el-radio style="color: #fff" v-model="headerRadio" label="3"
            >游记</el-radio
          >
          <el-radio style="color: #fff" v-model="headerRadio" label="4"
            >问答</el-radio
          >
        </div>
        <el-input
          placeholder="请输入内容"
          v-model="headerSearchInput"
          class="input-with-select"
        >
          <el-button
            slot="append"
            @click="onMyWaySearch"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-card>
    </el-header>
    <el-container class="child_container">
      <el-aside width="30%" style="min-width: 220px">
        <div>
          <el-card shadow="hover">
            <div class="travel_title">
              <a href="#" class="travel_column">旅行家专栏</a>
              <a href="#" class="column_main">专栏首页</a>
            </div>
            <div>
              <el-carousel :interval="4000" type="card" height="150px">
                <el-carousel-item
                  v-for="(item, index) in mainContent"
                  :key="index"
                >
                  <img
                    class="aside_carousel_img"
                    :src="item.file | filterAvatar"
                    alt="图片"
                  />
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
      <el-main style="min-width: 680px">
        <div v-for="(item, index) in currentShowContent" :key="index">
          <el-row>
            <el-col
              ><el-card shadow="hover">
                <el-row :gutter="12">
                  <el-col :span="9">
                    <!-- <img :src="item.img" alt="图片" /> -->
                    <el-image
                      style="width: 220px; height: 150px"
                      :src="item.file | filterAvatar"
                      fit="cover"
                    ></el-image>
                  </el-col>
                  <el-col :span="15">
                    <div style="height: 40px">
                      <el-link
                        :href="'/#/article?articleId=' + item.articleId"
                        >{{ item.title }}</el-link
                      >
                    </div>
                    <div style="height: 80px">
                      <a
                        class="mw_a_articleContent"
                        :href="'/#/article?articleId=' + item.articleId"
                        v-html="item.text"
                        >{{ item.text }}</a
                      >
                    </div>
                    <el-row :gutter="0">
                      <el-col :span="6"
                        ><i class="el-icon-location"></i
                        ><a>{{ item.city }}</a></el-col
                      >
                      <el-col :span="6">
                        <div>
                          <a :href="'/#/home?userId=' + item.userId"
                            ><el-avatar
                              class="author_avatar"
                              size="small"
                              :src="item.avatar | filterAvatar"
                            ></el-avatar
                          ></a>
                          <a
                            :href="'/#/home?userId=' + item.userId"
                            class="mw_a_setOverflow"
                            >{{ item.username }}</a
                          >
                        </div>
                      </el-col>
                      <el-col :span="6"
                        ><i class="el-icon-view"></i
                        ><span>{{ item.a_click }}</span></el-col
                      >
                      <el-col :span="4"
                        ><span>{{ item.a_like }}</span
                        ><a href="#" class="give_a_like"></a
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
      // 登录用户信息
      loginForm: {
        userId: "",
        username: "",
        avatar: "",
      },
      // 导航栏初始定位
      activeIndex: "1",
      // 头部的搜索框
      headerRadio: "1",
      headerSearchInput: "",
      //   a: "/assets/image/1.jpg",
      // 主轮播图初始化数组
      imgList: [],
      // main部分初始化数据
      getMainContent: [],
      mainContent: [],
      currentShowContent: [],
      // 导入侧边栏图片
      url: require("../../public/image/1.jpg"),
      logoUrl: require("../../public/image/LOGO.png"),
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
    this.getLoginUserInfo();
    this.getImageList();
    this.getMainImgList();
  },
  mounted() {},
  updated() {},
  methods: {
    async getLoginUserInfo() {
      var userId = window.sessionStorage.getItem("userId");
      const res = await this.$http.get("/api/setting", {
        params: {
          userId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          console.log(this.loginForm);

          for (var item in this.loginForm) {
            this.loginForm[item] = res.data[item];
          }
        }
      }
    },
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
        this.imgList.push({
          img: require("../../public/image/" + i + ".jpg"),
          date: 10 + i + "/Apr.2021",
          title: "撷一肩春色，览万种风光",
        });
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
          file: this.getMainContent[i].file,
          avatar: this.getMainContent[i].avatar,
          // text: i,
          title: this.getMainContent[i].title,
          text: this.getMainContent[i].text.replace(reg, ""),
          userId: this.getMainContent[i].userId,
          username: this.getMainContent[i].username,
          city: this.getMainContent[i].city,
          articleId: this.getMainContent[i].articleId,
          a_click: this.getMainContent[i].a_click,
          a_like: this.getMainContent[i].a_like,
        };
        // console.log(this.mainContent);
      }
      this.total = this.mainContent.length;
      this.handleCurrentChange(this.queryInfo.pagenum);
    },
    onDetailArticle(userId, labelId) {
      var articleContent = document.getElementById(labelId);
      articleContent.setAttribute("href", `/#/article?userId=${userId}`);
    },
    handleSelect() {},
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    onMyWaySearch() {
      console.log(this.headerRadio, this.headerSearchInput);
      switch (this.headerRadio) {
        case "1":
          this.$router.push("/search?part=all&q=" + this.headerSearchInput);
          break;
        case "2":
          this.$router.push(
            "/search?part=destination&q=" + this.headerSearchInput
          );
          break;
        case "3":
          this.$router.push("/search?part=note&q=" + this.headerSearchInput);
          break;
        case "4":
          this.$router.push("/search?part=qa&q=" + this.headerSearchInput);
          break;
      }
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

.header_search_card {
  position: absolute;
  transform: translateX(-50%) translateY(0%);
  top: 50%;
  left: 50%;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
}
.header_text {
  position: absolute;
  top: 15%;
  left: 15%;
  z-index: 200;
}
</style>