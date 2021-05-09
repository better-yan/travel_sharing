<template>
  <div>
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
    <el-menu-item index="3"><a href="/#/setting">目的地</a></el-menu-item>
    <el-menu-item index="4">旅游攻略</el-menu-item>
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
        ><a style="color: #fff" :href="'/#/home?userId=' + loginForm.userId"
          >我的麦味小屋</a
        ></el-menu-item
      >
      <el-menu-item index="8-2"
        ><a style="color: #fff" href="/#/createNotes">写游记</a></el-menu-item
      >
      <el-menu-item index="8-3"><a style="color: #fff" href="/#/setting">设置</a></el-menu-item>
      <el-menu-item index="8-4"><a style="color: #fff" href="/#/login">退出</a></el-menu-item>
    </el-submenu>
    <el-submenu index="9" style="float: right; margin-right: -10px">
      <template slot="title">消息</template>
      <!-- <el-menu-item index="9-1"><a href="/#/privateMsg">私信</a></el-menu-item> -->
      <el-menu-item index="9-1"
        ><el-badge :value="isNewOfPriMsg" v-if="isNewOfPriMsg > 0" class="item">
          <a href="/#/privateMsg" style="color: #fff">私信</a>
        </el-badge>
        <a v-else href="/#/privateMsg" style="color: #fff">私信</a></el-menu-item
      >
      <el-menu-item index="9-2"
        ><el-badge
          :value="isNewOfReplyMsg"
          v-if="isNewOfReplyMsg > 0"
          class="item"
        >
          <a href="/#/replyMsg" style="color: #fff">问答消息</a>
        </el-badge>
        <a v-else href="/#/replyMsg" style="color: #fff">问答消息</a></el-menu-item
      >
      <el-menu-item index="9-3"><a href="/#/setting" style="color: #fff">回复消息</a></el-menu-item>
      <el-menu-item index="9-4"
        ><a href="/#/setting" style="color: #fff">喜欢与收藏</a></el-menu-item
      >
      <el-menu-item index="9-5"><a href="/#/setting" style="color: #fff">好友动态</a></el-menu-item>
    </el-submenu>
  </el-menu>
    <el-form
    style="margin-top:100px"
      ref="articleFormRef"
      :rules="articleFormRules"
      :model="articleForm"
      label-width="80px"
      @submit.native.prevent
    >
      <el-form-item prop="title" label="标题">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/api/single"
          :show-file-list="false"
          :on-success="handlePicSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="articleForm.file"
            :src="articleForm.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mw_nav from "@/components/Nav.vue";
export default {
  name: "blog",
  components: {
    mw_nav,
  },
  data() {
    return {
            activeIndex: "1",
      // 登录用户信息
      loginForm: {
        userId: "",
        username: "",
        avatar: "",
      },
      logoUrl: require("../../public/image/logoinner.png"),
      isNewOfPriMsg: 0,
      isNewOfReplyMsg: 0,
      inpContent: "",
      articleForm: {
        title: "",
        text: "",
        imageUrl: "",
        file: "",
      },
      articleFormRules: {
        title: [
          { required: true, message: "请输入游记标题", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20个字符", trigger: "blur" },
        ],
        file: [
          { required: true, message: "请上传游记封面图", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //  封面图上传成功保存数据库
    handlePicSuccess(uploadRes, file, e) {
      console.log(uploadRes.path);
      console.log(file);
      this.articleForm.imageUrl = URL.createObjectURL(file.raw);
      if (uploadRes.state === 0) {
        this.articleForm.file = uploadRes.path;
      }
    },
    // 封面图上传前限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      return isJPG;
    },
    getValue() {
      // axios.get('/', {params: ''})
      this.$http
        .get("/api/getValue", {
          params: { id: 2 },
        })
        .then((res) => {
          console.log("res", res);
          this.inpContent = res.data[0].name;
        });
    },
    setValue() {
      // axios.post('/', {})
      this.$http
        .post("/api/setValue", {
          id: 2,
          name: this.inpContent,
        })
        .then((res) => {
          console.log("res", res);
        });
    },
  },
};
</script>