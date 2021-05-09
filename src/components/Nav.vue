<template>
  <el-menu
    class="el_menu_main"
    mode="horizontal"
    background-color="#3c3c3c"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" style="width: 100px">
      <div class="logoImg">
        <el-image fit="contain" :src="logoUrl"></el-image></div
    ></el-menu-item>
    <el-menu-item index="2"><a href="/#/myway">首页</a></el-menu-item>
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
        ><a style="color: #fff" :href="'/#/home?userId=' + loginUerId"
          >我的麦味小屋</a
        ></el-menu-item
      >
      <el-menu-item index="8-2"
        ><a style="color: #fff" href="/#/createNotes">写游记</a></el-menu-item
      >
      <el-menu-item index="8-3"
        ><a style="color: #fff" href="/#/setting">设置</a></el-menu-item
      >
      <el-menu-item index="8-4"
        ><a style="color: #fff" href="/#/login">退出</a></el-menu-item
      >
    </el-submenu>
    <el-submenu index="9" style="float: right; margin-right: -10px">
      <template slot="title">消息</template>
      <!-- <el-menu-item index="9-1"><a href="/#/privateMsg">私信</a></el-menu-item> -->
      <el-menu-item index="9-1"
        ><el-badge :value="isNewOfPriMsg" v-if="isNewOfPriMsg > 0" class="item">
          <a href="/#/privateMsg" style="color: #fff">私信</a>
        </el-badge>
        <a v-else href="/#/privateMsg" style="color: #fff"
          >私信</a
        ></el-menu-item
      >
      <el-menu-item index="9-2"
        ><el-badge
          :value="isNewOfReplyMsg"
          v-if="isNewOfReplyMsg > 0"
          class="item"
        >
          <a href="/#/replyMsg" style="color: #fff">问答消息</a>
        </el-badge>
        <a v-else href="/#/replyMsg" style="color: #fff"
          >问答消息</a
        ></el-menu-item
      >
      <el-menu-item index="9-3"
        ><a href="/#/setting" style="color: #fff">回复消息</a></el-menu-item
      >
      <el-menu-item index="9-4"
        ><a href="/#/setting" style="color: #fff">喜欢与收藏</a></el-menu-item
      >
      <el-menu-item index="9-5"
        ><a href="/#/setting" style="color: #fff">好友动态</a></el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "mw_nav",
  data() {
    return {
      activeIndex: "1",
      // 登录用户信息
      loginForm: {
        userId: "",
        username: "",
        avatar: "",
      },
      loginUerId: window.sessionStorage.getItem("userId"),
      logoUrl: require("../public/image/logoinner.png"),
      isNewOfPriMsg: 0,
      isNewOfReplyMsg: 0,
    };
  },
  created() {
    // var userId = window.sessionStorage.getItem("userId");
    this.getLoginUserInfo();
    this.getNewPrivateMsg();
    this.getNewReplyMsg();
  },
  methods: {
    async getLoginUserInfo() {
      var userId = window.sessionStorage.getItem("userId");
      console.log(userId, "setting");
      const res = await this.$http.get("/api/setting", {
        params: {
          userId,
        },
      });
      this.loginForm.userId = userId;
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
    async getNewPrivateMsg() {
      var userId = window.sessionStorage.getItem("userId");
      const res = await this.$http.get("/api/getNewInfoOfUser", {
        params: {
          userId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          if (res.data.result.length !== 0) {
            this.isNewOfPriMsg = 0;
            res.data.result.forEach((element) => {
              this.isNewOfPriMsg = element.count + this.isNewOfPriMsg;
            });
          }
        }
      }
    },
    async getNewReplyMsg() {
      var userId = window.sessionStorage.getItem("userId");
      const res = await this.$http.get("/api/getReplyMsgOfUser", {
        params: {
          userId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          if (res.data.result.length !== 0) {
            this.isNewOfReplyMsg = 0;
            res.data.result.forEach((item) => {
              this.isNewOfReplyMsg = item.count + this.isNewOfReplyMsg;
            });
          }
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.el_menu_main {
  // height: 46px;
  min-width: 1100px;
  width: 100%;
  margin: 0;
  padding: 0 10%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  font-family: "Microsoft Yahei";
  border: none;
}
.logoImg {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>