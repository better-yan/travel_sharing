<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/backHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div>
        <el-form
          status-icon
          ref="pwdFormRef"
          :rules="pwdFormRules"
          :model="pwdForm"
          label-width="120px"
        >
          <el-form-item label="当前密码：">
            <el-input show-password v-model="pwdForm.oldPwd"></el-input>
          </el-form-item>
          <el-form-item prop="newPwd" label="新设密码：">
            <el-input show-password v-model="pwdForm.newPwd"></el-input>
          </el-form-item>
          <el-form-item prop="checkPwd" label="重复密码：">
            <el-input show-password v-model="pwdForm.checkPwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="onPwdSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 密码校验
    var that = this;
    var checkRightPwd = function (rule, value, callback) {
      console.log(that.pwdForm);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== that.pwdForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 修改密码表单
      pwdForm: {
        oldPwd: "",
        newPwd: "",
        checkPwd: "",
      },
      //   这是修改密码表单的验证对象
      pwdFormRules: {
        // 验证密码是否合法
        newPwd: [
          // { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        checkPwd: [{ validator: checkRightPwd, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    // 修改密码
    onPwdSubmit() {
      var adName = window.sessionStorage.getItem("adName");
      var sendForm = {
        oldPwd: this.pwdForm.oldPwd,
        adPassword: this.pwdForm.newPwd,
        adName: adName,
      };
      this.$refs.pwdFormRef.validate(async (valid) => {
        console.log(this.sendForm);
        if (!valid) {
          return;
        }
        const res = await this.$http.post("/api/setAdminPassword", sendForm);
        console.log("res", res);
        if (res.status !== 200) {
          return this.$message.error("服务器报错");
        } else {
          if (!res.data.state) {
            this.$message.success("修改成功");
          } else {
            return this.$message.error(res.data.message);
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 15px;
}
</style>