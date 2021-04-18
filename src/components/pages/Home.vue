<template>
  <el-container>
    <el-header>
      <mw_nav>
        <slot name="nav"></slot>
      </mw_nav>
      <div>
        <el-image class="personal_header" :src="url" fit="cover"></el-image>
      </div>
    </el-header>
    <el-container class="child_container">
      <el-aside width="30%">
        <div>
          <el-card shadow="hover">
            <div class="base_info">
              <div>
                <el-avatar
                  cover
                  class="author_avatar"
                  :size="120"
                  :src="personal.avatar"
                ></el-avatar>
              </div>
              <div class="mw_div_userInfo">
                {{ personal.username }}
                <i
                  v-if="personal.sex === '男'"
                  class="el-icon-male mw_i_icon"
                ></i>
                <i
                  v-else-if="personal.sex === '女'"
                  class="el-icon-female mw_i_icon"
                ></i>
              </div>
              <div class="mw_div_userInfo">
                {{ personal.city }}
              </div>
              <div class="mw_div_option" v-if="componentVisible === 'other'">
                <el-button id="focus" type="warning" @click="onFocus">{{
                  focusText
                }}</el-button>
                <el-button type="warning" plain>私信</el-button>
              </div>
              <div class="mw_div_userDecrib">
                {{ personal.description }}
              </div>
            </div>
            <div class="mw_person_active">
              <el-row>
                <el-col :span="12" style="border: 1px solid #e2e2e2">
                  <el-row
                    ><a :href="'/#/follow?userId=' + personal.userId">{{
                      user_fans.foucsNum
                    }}</a></el-row
                  >
                  <el-row>关注</el-row>
                </el-col>
                <el-col :span="12" style="border: 1px solid #e2e2e2">
                  <el-row
                    ><a>{{ user_fans.fansNum }}</a></el-row
                  >
                  <el-row>粉丝</el-row></el-col
                >
              </el-row>
            </div>
            <div class="mw_person_follow">
              <div
                class="mw_person_follow_title"
                v-if="componentVisible === 'other'"
              >
                TA的关注
              </div>
              <div class="mw_person_follow_title" v-else>我的关注</div>
              <div
                class="mw_person_follow_info"
                v-for="(item, index) in currentFollowList"
                :key="index"
              >
                <a :href="'/#/home?userId=' + item.userId">
                  <el-avatar :size="60" :src="item.avatar"></el-avatar
                ></a>
                <a
                  :href="'/#/home?userId=' + item.userId"
                  class="follow_info_username"
                  >{{ item.username }}</a
                >
              </div>
              <el-pagination
                class="mw_person_follow_pagination"
                @current-change="followHandleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-size="8"
                layout="prev,pager, next"
                :total="total"
              >
              </el-pagination>
            </div>
            <div class="mw_div_messageboard">
              <el-row>留言板</el-row>
              <el-row
                ><el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="textarea"
                ></el-input
              ></el-row>
              <el-row>
                <el-button class="mw_btn_msgboard" size="medium" type="warning"
                  >留言</el-button
                >
              </el-row>
            </div>
          </el-card>
          <!-- <el-card></el-card> -->
        </div>
      </el-aside>
      <el-main>
        <div v-for="(item, index) in currentShowContent" :key="index">
          <el-card shadow="hover">
            <el-row :gutter="12">
              <el-image
                style="width: 100%; height: 100%"
                :src="item.img"
                fit="cover"
              ></el-image>
              <div style="height: 40px">
                <a>{{ item.title }}</a>
              </div>
              <div style="height: 80px">
                <a class="mw_a_articleContent">{{ item.text }}</a>
              </div>
              <div>
                <a href="/#/home">张三</a>
              </div>
              <i class="el-icon-view"></i><span>张三</span><span>张三</span
              ><a href="#" class="give_a_like"></a>
            </el-row>
          </el-card>
        </div>
        <div class="mw_div_more_notes">
          <a
            >共<strong>{{ articalTotal }}</strong
            >篇游记</a
          >
        </div>
      </el-main>
    </el-container>
    <mw_footer>
      <slot name="header"></slot>
    </mw_footer>
  </el-container>
</template>
<script>
import mw_footer from "@/components/Footer.vue";
import mw_nav from "@/components/Nav.vue";
export default {
  name: "home",
  components: {
    mw_footer,
    mw_nav,
  },
  data() {
    return {
      // 导航栏初始定位
      componentVisible: "mine",
      //   a: "/assets/image/1.jpg",
      // 主轮播图初始化数组
      imgList: [],
      // main部分初始化数据
      getMainContent: [],
      mainContent: [],
      currentShowContent: [],
      currentFollowList: [],
      //所有关注对象相关的数据
      allFocusInfoList: [],
      //所有ta的关注的数据
      allFollowList: [],
      // 导入侧边栏图片
      url: require("../../public/image/1.jpg"),
      // 关注分页查询条件
      queryInfo: {
        query: "",
        pagenum: 1,
      },
      // 文章分页查询条件
      articleQueryInfo: {
        query: "",
        pagenum: 1,
      },
      personal: {
        userId: "",
        avatar: require("../../public/image/1.jpg"),
        username: "",
        sex: "",
        city: "",
        description: "",
      },
      user_fans: {
        foucsNum: 0,
        fansNum: 0,
      },
      total: 0,
      articalTotal: 0,
      // 多行文本域
      textarea: "",
      focusText: "关注",
      //   src: require("../../public/image/1.jpg"),
    };
  },
  created() {
    // 设置界面显示组件
    this.getInitHomeContent();
  },
  mounted() {},
  watch: {
    $route(to, from) {
      if (to.path === "/home") {
        this.getInitHomeContent();
      }
    },
    // "$route.path": function (newVal, oldVal) {
    //   //console.log(newVal+"---"+oldVal);
    //   console.log("欢迎进入注册页面", newVal, oldVal);
    // },
  },
  methods: {
    getInitHomeContent() {
      this.setShowContent();
      this.getPersonInfo();
      this.getUser_fans();
      this.getArticleList();
      this.getAllFollowList();
    },
    // 用户界面组件是否可见
    setShowContent() {
      var userResult = this.publicMethod.getUrluserAndUser();
      if (userResult[0] === userResult[1]) {
        console.log("mine");
        this.componentVisible = "mine";
      } else {
        this.componentVisible = "other";
      }
    },
    // 获取个人后台信息
    async getPersonInfo() {
      var userResult = this.publicMethod.getUrluserAndUser();
      var sendId;
      sendId = userResult[0];
      const res = await this.$http.get("/api/setting", {
        params: {
          userId: sendId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          console.log(this.personal);
          for (var item in this.personal) {
            if (item == "avatar") {
              var avatar = res.data.avatar.split("\\")[2];
              this.personal[item] = require("../../../uploads/" + avatar);
            } else if (item == "userId") {
              this.personal[item] = sendId;
            } else {
              this.personal[item] = res.data[item];
            }
          }
        }
      }
    },
    async getUser_fans() {
      var userResult = this.publicMethod.getUrluserAndUser();
      var sendId;

      sendId = userResult[0];
      const res = await this.$http.get("/api/getUser_Follow_fans", {
        params: {
          userId: sendId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          for (var item in this.user_fans) {
            this.user_fans[item] = res.data[item];
          }
        }
      }
      var fansId = res.data.fansIdList.some((item) => {
        if (item.fansId === userResult[1]) {
          return true;
        }
      });
      if (fansId) {
        this.focusText = "已关注";
      } else {
        this.focusText = "关注";
      }
    },
    async getArticleList() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getAllArticle", {
        params: {
          userId: userResult[0],
        },
      });
      console.log(res);
      this.getMainContent = res.data.result;
      if (this.getMainContent.length == 0) {
        this.articalTotal = 0;
        this.mainContent = [];
      } else {
        for (var i = 0; i < this.getMainContent.length; i++) {
          var url = this.getMainContent[i].a_file + "";
          let reg = /<\/?.+?\/?>/g;
          this.mainContent[i] = {
            img: require("../../public/image/main" + i + ".jpg"),
            // text: i,
            title: this.getMainContent[i].title,
            text: this.getMainContent[i].text.replace(reg, ""),
            articleId: this.getMainContent[i].articleId,
          };
          // console.log(this.mainContent);
        }
        this.articalTotal = this.mainContent.length;
      }
      this.currentShowContent = this.handleCurrentChange(
        this.articleQueryInfo,
        this.articleQueryInfo.pagenum,
        this.mainContent
      );
      console.log(this.currentShowContent);
    },
    // 分页---当前页
    handleCurrentChange(queryInfo, newPage, mainContent) {
      queryInfo.pagenum = newPage;
      return mainContent.slice((newPage - 1) * 10, newPage * 10);
    },
    getImageList() {
      for (var i = 1; i <= 4; i++) {
        this.imgList.push(require("../../public/image/" + i + ".jpg"));
      }
      console.log(this.imgList);
    },
    async getAllFollowList() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getFocusInfo", {
        params: {
          userId: userResult[0],
        },
      });
      console.log(res);
      var avatar;
      this.allFocusInfoList = res.data.result;
      for (var i = 0; i < this.allFocusInfoList.length; i++) {
        avatar = this.allFocusInfoList[i].avatar.split("\\")[2];
        this.allFollowList[i] = {
          avatar: require("../../../uploads/" + avatar),
          userId: this.allFocusInfoList[i].userId,
          username: this.allFocusInfoList[i].username,
        };
      }
      console.log(this.allFollowList);
      this.total = this.allFollowList.length;
      this.followHandleCurrentChange(this.queryInfo.pagenum);
    },
    // 分页---当前页
    followHandleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.currentFollowList = this.allFollowList.slice(
        (newPage - 1) * 8,
        newPage * 8
      );
    },
    handleSelect() {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 关注与已关注
    async onFocus() {
      if (this.focusText === "关注") {
        var userResult = this.publicMethod.getUrluserAndUser();
        const res = await this.$http.post("/api/setUser_follow", {
          userId: userResult[0],
          fansId: userResult[1],
        });
        console.log(res, "reasas");
        this.focusText = "已关注";
      } else {
        this.focusText = "关注";
      }
    },
  },
  computed: {},
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
/* 个人设置 */
.author_avatar {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.mw_div_option {
  text-align: center;
}
.mw_div_userDecrib {
  text-align: center;
  margin-top: 10px;
}
.mw_person_active {
  text-align: center;
}
.mw_div_userInfo {
  text-align: center;
  font-size: 22px;
  margin: 20px;
}
.mw_div_messageboard {
  margin-top: 20px;
  text-align: center;
}
.mw_i_icon {
  color: white;
  background: #f56c6c;
  border-radius: 50px;
  padding: 2px;
}
/* Ta 的关注 */
.mw_person_follow_title {
  font-size: 18px;
  text-align: center;
  margin: 20px 0px;
}
.mw_person_follow_info {
  display: block;
  margin: 5px 10px;
  text-align: center;
  float: left;
}
.follow_info_username {
  line-height: 16px;
  height: 16px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 10px;
  color: #ff7200;
  font-size: 12px;
}
.mw_person_follow_pagination {
  clear: both;
  text-align: center;
}
/* 留言板 */
.mw_btn_msgboard {
  font-size: 20px;
  margin-top: 10px;
  width: 100%;
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
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
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
.header_carousel_img,
.aside_carousel_img {
  width: 100%;
  height: 100%;
}
.personal_header {
  height: 570px;
}
</style>