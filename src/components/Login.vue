<template>
  <div class="login_container">
    <!-- 头像区域 -->
    <!-- <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div> -->
    <el-card shadow="always">
      <el-tabs
        stretch
        class="tab_login"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="用户登录" name="first">
          <!-- 表单区域 -->
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="0px"
            class="login_form"
          >
            <!-- 用户名 -->
            <el-form-item prop="userId">
              <el-input
                placeholder="账号"
                v-model="loginForm.userId"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                v-model="loginForm.password"
                type="password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button
                size="medium"
                class="btn-login"
                type="primary"
                @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane tab-click="goToSign" label="用户注册" name="second">
          <el-form
            ref="signFormRef"
            :model="signForm"
            :rules="signFormRules"
            label-width="0px"
            class="sign_form"
          >
            <!-- 账号 -->
            <el-form-item prop="userId">
              <el-input
                placeholder="邮箱"
                v-model="signForm.userId"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input
                placeholder="用户名"
                v-model="signForm.username"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                v-model="signForm.password"
                type="password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button
                size="medium"
                class="btn-login"
                type="primary"
                @click="signIn"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //标签页切换
      activeName: "first",
      // 这是登录数据绑定对象
      loginForm: {
        userId: "123456",
        password: "1234",
      },
      signForm: {
        userId: "",
        username: "",
        password: "",
      },
      //   这是表单的验证对象
      loginFormRules: {
        userId: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        // 验证用户名是否合法
        // username: [
        //   { required: true, message: "请输入用户名", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      //   这是表单的验证对象
      signFormRules: {
        userId: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //标签页切换
    handleClick(tab, event) {
      if (tab.name === "first") {
        this.$refs.loginFormRef.resetFields();
      } else if (tab.name === "second") {
        this.$refs.signFormRef.resetFields();
      }
      // console.log(tab, event);
    },
    goToSign() {
      // this.$refs.signFormRef.resetFields();
      this.$refs.loginFormRef.resetFields();
    },
    goToLogin() {
      this.$refs.signFormRef.resetFields();
      // this.$refs.loginFormRef.resetFields();
    },
    resetLoginForm() {
      //   console.log(this)
      // this.$refs.signFormRef.resetFields();
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) {
          return;
        }
        const res = await this.$http.get("/api/login", {
          params: {
            userId: this.loginForm.userId,
            password: this.loginForm.password,
          },
        });
        console.log("res", res);
        if (res.status !== 200) {
          // return console.log("登陆失败");
          return this.$message.error("登陆失败");
        } else {
          // console.log("登陆成功");
          if (!res.data.state) {
            this.$message.success("登陆成功");
          }
        }
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("userId", res.data.userId);
        console.log(window.sessionStorage.getItem("token"));
        console.log(window.sessionStorage.getItem("userId"));
        this.$router.push("/myway");
      });
    },
    // 注册用户
    signIn() {
      this.$refs.signFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) {
          return;
        }
        const res = await this.$http.post("/api/sign", this.signForm);
        console.log("res", res);
        if (res.status !== 200) {
          // return console.log("登陆失败");
          return this.$message.error("注册失败");
        } else {
          if (!res.data.state) {
            this.$message.success("注册成功");
          }
        }
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("userId", res.data.userId);
        console.log(window.sessionStorage.getItem("token"));
        console.log(window.sessionStorage.getItem("userId"));
        this.$router.push("/myway");
      });
    },
  },
};
</script>

<style Lang="less" scoped>
.login_container {
  /* background-image: url("../public/image/login.jpg"); */
  background-image: url("../public/image/1.jpg");
  background-repeat: repeat-x;
  height: 100%;
}

.el-card {
  width: 30%;
  height: 50%;
  background-color: #fff0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
/* .el-tabs__item {
  font-size: 18px !important;
} */
.el-tab-pane {
  margin-top: 7%;
}
.btn-login {
  width: 100%;
}
.login_form {
  position: relative;
  bottom: 0;
  width: 100%;
  padding: 0 -5px;
}
</style>
