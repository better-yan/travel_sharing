<template>
  <el-menu
    class="el_menu_main"
    mode="horizontal"
    background-color="#3c3c3c"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1"><a href="/#/setting">设置</a></el-menu-item>
      <el-menu-item index="2-2"><a href="/#/createNotes">游记</a></el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"
      ><a id="home" @click="onHome">我的麦味小屋</a></el-menu-item
    >
  </el-menu>
</template>
<script>
export default {
  name: "mw_nav",
  data() {
    return {
      activeIndex: "1",
      userId: "",
    };
  },
  created() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      this.userId = window.sessionStorage.getItem("userId");
    },
    onHome() {
      var home = document.getElementById("home");
      home.setAttribute("href", `/#/home?userId=${this.userId}`);
    },
  },
};
</script>
<style lang="less" scoped>
.el_menu_main {
  // height: 46px;
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
</style>