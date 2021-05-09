<template>
  <div>
    <el-container>
      <el-header style="padding: 0px; height: 600px">
        <el-menu
          class="el_menu_main"
          mode="horizontal"
          text-color="#333"
          active-text-color="#ff9d00"
        >
          <el-menu-item index="1"
            ><el-avatar :size="60" shape="square" :src="logoUrl"></el-avatar
          ></el-menu-item>
          <el-menu-item index="2"><a href="/#/setting">首页</a></el-menu-item>
          <el-menu-item index="3"
            ><a :href="'/#/search?' + 'part=all&q='">目的地</a></el-menu-item
          >
          <el-menu-item index="4">
            <a :href="'/#/search?' + 'part=all&q='">旅游攻略</a></el-menu-item
          >
          <el-menu-item index="5">问答</el-menu-item>
          <el-menu-item index="6">去旅游</el-menu-item>
          <el-menu-item index="7">麦味首选</el-menu-item>
          <el-submenu index="8" style="float: right; margin-right: 220px">
            <template slot="title"
              ><el-avatar :size="50" :src="logoUrl"></el-avatar
            ></template>
            <el-menu-item index="8-1"
              ><a :href="'/#/home?userId=' + loginUerId"
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
              ><a href="/#/setting">私信</a></el-menu-item
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
        <div>
          <el-image class="personal_header" :src="url" fit="cover"></el-image>
          <el-row class="view_title">
            <el-col :span="16">
              <el-link
                style="display: contents"
                :underline="false"
                :href="'/#/home?userId=' + personal.userId"
              >
                <el-avatar
                  class="user_avatar"
                  cover
                  :size="120"
                  :src="personal.avatar"
                ></el-avatar>
              </el-link>
              <div class="user_info">
                <strong style="color: #ff7200; font-size: 14px"
                  ><span>
                    <el-link
                      :underline="false"
                      :href="'/#/home?userId=' + personal.userId"
                      >{{ personal.username }}({{ personal.city }})
                    </el-link></span
                  ></strong
                >
                <span style="color: #acacac; font-size: 12px; padding: 0 15px">
                  {{ personal.create_time | dateFormat }}</span
                >
                <i class="el-icon-view"></i
                ><span style="color: #acacac; font-size: 12px">{{
                  personal.a_click
                }}</span>
                <el-button
                  size="mini"
                  id="focus"
                  type="warning"
                  @click="onFocus(personal.userId, sessionUserId)"
                  v-if="personal.userId != sessionUserId && focusText"
                  ><i class="el-icon-plus"></i>{{ focusText }}</el-button
                >
                <span></span>
              </div>
              <div>
                <h3 style="position: absolute; left: 25%; top: -95%">
                  {{ personal.title }}
                </h3>
              </div>
            </el-col>
            <el-col :span="4" class="mw_col_save">
              <el-link :underline="false">
                <span>
                  <i class="el-icon-star-off" style="font-size: 30px"></i>
                </span>
                <p>收藏</p>
              </el-link>
            </el-col>
            <el-col :span="4" class="mw_col_share">
              <el-link :underline="false">
                <span>
                  <i class="el-icon-star-off" style="font-size: 30px"></i>
                </span>
                <p>分享</p>
              </el-link></el-col
            >
          </el-row>
        </div>
      </el-header>

      <el-container class="child_container">
        <el-main>
          <div>
            <p v-html="personal.text"></p>
          </div>
        </el-main>
        <el-aside width="30%">
          <div>
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
          </div>
        </el-aside>
      </el-container>
      <mw_backtop>
        <slot></slot>
      </mw_backtop>
      <mw_footer>
        <slot name="header"></slot>
      </mw_footer>
    </el-container>
  </div>
</template>

<script>
import mw_footer from "@/components/Footer.vue";
import mw_backtop from "@/components/Backtop.vue";
export default {
  name: "articlePage",
  components: {
    mw_footer,
    mw_backtop,
  },
  data() {
    return {
      loginUerId: window.sessionStorage.getItem("userId"),
      // 导航栏初始定位
      activeIndex: "1",
      logoUrl: require("../../public/image/LOGO.png"),
      // 导入头部图片
      url: require("../../public/image/2.jpg"),
      personal: {
        title: "",
        text: "",
        articleId: "",
        userId: "",
        avatar: "",
        username: "",
        city: "",
        a_click: "",
        create_time: "",
      },
      focusText: "关注",
      // 登录用户的useriD
      sessionUserId: "",
    };
  },
  created() {
    this.getArticleInfo();
  },
  methods: {
    // 获取文章信息
    async getArticleInfo() {
      var urlParams = this.publicMethod.getUrlParamsObj();
      console.log(urlParams);
      var aId = urlParams["articleId"];

      // 给文章点击率加一
      await this.$http.post("/api/addArticleClick", { articleId: aId });
      const res = await this.$http.get("/api/getOneArticleInfo", {
        params: {
          articleId: aId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          for (var item in this.personal) {
            switch (item) {
              case "title":
              case "text":
              case "articleId":
              case "create_time":
              case "a_click":
              case "userId":
                this.personal[item] = res.data.result[0][item];
                break;
            }
          }
          // 获取个人后台信息
          var userId = res.data.result[0].userId;
          console.log("aaa", userId);
          const userInfoRes = await this.$http.get("/api/setting", {
            params: {
              userId: userId,
            },
          });
          for (var item in this.personal) {
            switch (item) {
              case "username":
              case "city":
                this.personal[item] = userInfoRes.data[item];
                break;
              case "avatar":
                var avatar = userInfoRes.data.avatar.split("\\")[2];
                this.personal[item] = require("../../../uploads/" + avatar);
                break;
            }
          }
          console.log("userinfo", this.personal);
          this.getUser_fans(userId);
        }
      }
    },
    // 获取用户的粉丝
    async getUser_fans(userId) {
      const res = await this.$http.get("/api/getUser_Follow_fans", {
        params: {
          userId: userId,
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
      this.sessionUserId = window.sessionStorage.getItem("userId");
      console.log("ssaa", userId, this.sessionUserId);
      var fansId = res.data.fansIdList.some((item) => {
        if (item.fansId === this.sessionUserId) {
          return true;
        }
      });
      if (fansId) {
        this.focusText = "";
      } else {
        this.focusText = "关注";
      }
    },
    // 关注与已关注
    async onFocus(userId, fansId) {
      if (this.focusText === "关注") {
        const res = await this.$http.post("/api/setUser_follow", {
          userId,
          fansId,
        });
        this.focusText = "";
      } else {
        const res = await this.$http.post("/api/deleteUser_follow", {
          userId,
          fansId,
        });
        this.focusText = "关注";
      }
    },
  },
};
</script>

<style Lang="less" scoped>
/* 
头部区域
*/
.el_menu_main {
  margin-left: 10%;
}
.user_avatar {
  margin-left: 20%;
  margin-top: -60px;
}
.user_info {
  position: absolute;
  top: 20px;
  left: 25%;
}
.view_title {
  height: 80px;
  border-bottom: 1px solid #d7d7d7;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  position: relative;
  z-index: 16;
}
.mw_col_save,
.mw_col_share {
  width: 120px;
  height: 80px;
  padding-top: 10px;
  text-align: center;
  border-left: 1px solid #e8e8e6;
}
.mw_col_share {
  border-right: 1px solid #e8e8e6;
}

/**主体大区 */
.child_container {
  margin: 50px 170px;
}
</style>