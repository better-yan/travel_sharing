<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img
          style="width: 100px; height: 50px"
          src="../../assets/img/logoinner.png"
        />
        <span>麦味后台管理系统</span>
      </div>
      <span style="position: absolute; right: 8%; font-size: 14px"
        >欢迎管理员<span style="color: #ffd04b"> {{ adName }} </span>登录</span
      >
      <el-button type="warning" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">My Way</div>
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
              ><template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main style="min-width: 900px"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //左侧菜单数据
      menuList: [],
      iconsObj: {
        1: "el-icon-menu",
        2: "el-icon-menu",
        3: "el-icon-menu",
        4: "el-icon-menu",
        5: "el-icon-menu",
      },
      //   默认不折叠
      isCollapse: false,
      activePath: "",
      adName: "",
    };
  },
  created() {
    this.adName = window.sessionStorage.getItem("adName");
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/backLogin");
    },
    // 获取所有的菜单
    async getMenuList() {
      var adType = window.sessionStorage.getItem("adType");
      const res = await this.$http.get("/api/backMemu", {
        params: {
          adType: adType,
        },
      });
      console.log(res);
      if (res.status !== 200) return this.$message.error("查询菜单失败");
      this.menuList = res.data.result;
      console.log(this.menuList);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存的链接值
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
    },
  },
};
</script>

<style Lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  /* > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  } */
}
.el-header > div {
  display: flex;
  align-items: center;
  /* span {
    margin-left: 15px;
  } */
}
.el-header > div > span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
  /* .el-menu {
    border-right: none;
  } */
}
.el-aside > .el-menu {
  border-right: none;
}

.el-main {
  background-color: rgb(239, 241, 243);
}
.iconfont {
  margin-right: 5px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>