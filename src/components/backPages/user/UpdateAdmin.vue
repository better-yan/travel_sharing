<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/backHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员中心</el-breadcrumb-item>
      <el-breadcrumb-item>修改基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <span>修改基本信息</span>
      </div>
      <div>
        <el-form
          status-icon
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="120px"
        >
          <el-form-item label="用户名" disabled prop="adName">
            <el-input disabled v-model="editForm.adName"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="editAdminInfo"
              >保存设置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入一个合法的邮箱"));
    };
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入一个合法的手机号"));
    };
    return {
      editForm: {
        adId: "",
        adName: "",
        email: "",
        mobile: "",
      },
      editFormRules: {
        adName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            trigger: "blur",
            message: "用户名的长度在3~10个字符之间",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur",
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.showAdminInfo();
  },
  mounted() {},
  methods: {
    //   获取管理员信息
    async showAdminInfo() {
      var adName = window.sessionStorage.getItem("adName");
      const res = await this.$http.get("/api/getAdminInfo", {
        params: {
          adName,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("修改用户失败");
      }
      // this.$message.success('修改用户成功')
      this.editForm = res.data.result;
      console.log(this.editForm);
    },
    // 修改管理员信息并提交
    editAdminInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        const res = await this.$http.put("/api/admin/" + this.editForm.adId, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        });

        if (res.status !== 200) {
          return this.$message.error("更新用户失败");
        }
        // 修改成功
        this.$message.success("更新用户成功");
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