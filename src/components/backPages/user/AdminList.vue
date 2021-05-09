<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/backHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索与添加 -->
      <el-row :gutter="20" style="margin-bottom:15px">
        <el-col :span="8">
          <el-input
            clearable
            @clear="getUserList"
            placeholder="请输入内容"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加管理员</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="adName"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <!-- <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialg(scope.row)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.adId)"
            ></el-button>

            <el-tooltip
              :enterable="false"
              effect="dark"
              content="分配角色"
              placement="top-start"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setDialogClosed"
    >
      <!-- 内容主题区域 -->
      <div>
        <p>当前的用户:{{ userinfo.adName }}</p>

        <p>
          当前的角色:
          <span v-if="userinfo.adType == 2">超级管理员</span>
          <span v-else>系统管理员</span>
        </p>
        <p>
          分配角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加管理员"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="adName">
          <el-input v-model="addForm.adName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adPassword">
          <el-input v-model="addForm.adPassword"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主题区域 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="账号" :disabled="true" prop="adName">
          <el-input :disabled="true" v-model="editForm.adName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
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
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示数据数
        pagesize: 5,
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      addForm: {
        adName: "",
        adPassword: "",
        email: "",
        mobile: "",
      },
      addFormRules: {
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
        adPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            trigger: "blur",
            message: "密码的长度在3~10个字符之间",
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
      editForm: {},
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
        adPassword: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            trigger: "blur",
            message: "密码的长度在3~10个字符之间",
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
      setRoleDialogVisible: false,
      userinfo: {},
      rolesList: [],
      selectedRoleId: "",
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const res = await this.$http.get("/api/adminList", {
        params: this.queryInfo,
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("获取用户失败");
      } else {
        // console.log("登陆成功");
        if (!res.data.state) {
          this.userlist = res.data.result;
          this.total = res.data.total;
        } else {
          return this.$message.error("获取失败");
        }
      }
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 监听switch状态改变
    async userStateChanged(userinfo) {
      console.log(userinfo);
      const res = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
      if (res.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error("更新用户状态失败！");
      }
      this.$message.success("更新用户状态成功");
    },
    // 对话框关闭重置内容
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addAdmin() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;

        const res = await this.$http.post("/api/addAdmin", this.addForm);
        console.log(res);
        if (res.status != 200) {
          this.$message.error("添加用户失败");
        } else {
          // console.log("登陆成功");
          if (!res.data.state) {
            this.$message.success("添加用户成功");
          } else {
            return this.$message.error("添加用户失败");
          }
        }
        // 关闭弹框
        this.addDialogVisible = false;
        // 重新获取用户列表
        this.getUserList();
      });
    },
    // 修改对话框
    async showEditDialg(rowInfo) {
      this.editForm = rowInfo;
      this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        const res = await this.$http.put("/api/admin/" + this.editForm.adId, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        });

        if (res.status !== 200) {
          return this.$message.error("更新用户失败");
        }
        // 关闭对话框
        this.editDialogVisible = false;
        // 刷新列表
        this.getUserList();
        // 修改成功
        this.$message.success("更新用户成功");
      });
    },
    // 删除管理员
    async removeUserById(id) {
      // 弹框询问管理员是否删除数据
      const confirmRes = await this.$confirm(
        "此操作将永久删除该管理员, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => {
        return err;
      });
      if (confirmRes !== "confirm") {
        return this.$message.info("删除管理员操作取消");
      }
      const res = await this.$http.delete("/api/admin/" + id);

      if (res.status !== 200) {
        return this.$message.error("删除管理员失败");
      }
      // 删除成功
      this.$message.success("删除管理员成功");
      this.getUserList();
    },
    async setRole(userinfo) {
      this.userinfo = userinfo;
      // 展示对话框前获取角色列表
      const res = await this.$http.get("/api/roles");
      if (res.status !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      console.log(res);
      // this.$message.success('修改用户成功')
      this.rolesList = res.data.result;
      this.setRoleDialogVisible = true;
    },
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色");
      }
      console.log(this.userinfo);
      const res = await this.$http.put(
        `/api/admin/${this.userinfo.adId}/role`,
        {
          adType: this.selectedRoleId,
        }
      );
      if (res.status !== 200) {
        return this.$message.error("更新角色失败");
      }
      this.$message.success("更新角色成功");
      this.getUserList();
      // this.rolesList = res.data
      this.setRoleDialogVisible = false;
    },
    setDialogClosed() {
      this.selectedRoleId = "";
      this.userinfo = {};
    },
  },
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 15px;
}
</style>