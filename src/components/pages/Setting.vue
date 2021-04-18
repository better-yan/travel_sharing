<template>
  <div>
    <el-container>
      <el-header>
        <mw_nav>
          <slot name="nav"></slot>
        </mw_nav>
      </el-header>
      <el-container class="mw_setting_body">
        <el-aside width="220px">
          <el-row class="tac">
            <el-menu
              :default-active="currentShowIndex"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @select="asideHandleSelect"
              @close="handleClose"
              text-color="#666"
              active-text-color="#ffa800"
            >
              <el-menu-item index="1">
                <i class="el-icon-user"></i>
                <span slot="title">我的信息 </span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-picture-outline-round"></i>
                <span slot="title">我的头像 </span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-lock"></i>
                <span slot="title">修改密码</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-attract"></i>
                <span slot="title">账号安全</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-star-off"></i>
                <span slot="title">关注</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="el-icon-s-custom"></i>
                <span slot="title">粉丝</span>
              </el-menu-item>
            </el-menu>
          </el-row></el-aside
        >
        <el-main>
          <el-card
            shadow="never"
            class="box-card"
            v-if="currentShowIndex === '1'"
          >
            <div slot="header" class="clearfix">
              <span>我的信息</span>
            </div>
            <el-form
              ref="baseFormRef"
              :rules="baseFormRules"
              :model="baseForm"
              label-width="120px"
            >
              <el-form-item prop="username" label="用户名：">
                <el-input v-model="baseForm.username"></el-input>
              </el-form-item>
              <el-form-item label="性别：">
                <el-radio-group v-model="baseForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                  <el-radio label="保密"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="居住城市：">
                <el-input v-model="baseForm.city"></el-input>
              </el-form-item>
              <el-form-item label="出生日期：">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="baseForm.date"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="个人简介：">
                <el-input type="textarea" v-model="baseForm.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="onSubmit">保存</el-button>
                <el-button type="warning" plain>取消</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card
            shadow="never"
            class="box-card"
            v-else-if="currentShowIndex === '2'"
          >
            <div slot="header" class="clearfix">
              <span>我的头像</span>
            </div>
            <div>
              <el-upload
                class="avatar-uploader"
                action="http://localhost:8080/api/single"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <el-button size="small" type="warning">点击上传</el-button>
              </el-upload>
            </div>
          </el-card>
          <el-card
            shadow="never"
            class="box-card"
            v-else-if="currentShowIndex === '3'"
          >
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
                  <el-button type="warning" @click="onPwdSubmit"
                    >保存设置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>
          <el-card
            shadow="never"
            class="box-card"
            v-else-if="currentShowIndex === '4'"
          >
            <div slot="header" class="clearfix">
              <span>账号安全</span>
            </div>
            <div></div>
          </el-card>
          <el-card
            shadow="never"
            class="box-card"
            v-else-if="currentShowIndex === '5'"
          >
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="14"><span>关注</span></el-col>
                <el-col :span="10">
                  <el-input
                    style="float: right; padding: 3px 0"
                    placeholder="请输入内容"
                    clearable
                    @clear="getFollowList"
                    v-model="queryInfo.query"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getFollowList"
                    ></el-button> </el-input
                ></el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <div>
                  <div v-for="(item, index) in allFollowList" :key="index">
                    <el-card class="mw_setting_card">
                      <div class="Follow_info">
                        <div>
                          <el-avatar
                            class="author_avatar"
                            :size="120"
                            :src="item.avatar"
                          ></el-avatar>
                        </div>
                        <div class="mw_div_userInfo">
                          {{ item.username }}
                          <i
                            class="el-icon-female mw_i_female_icon"
                            v-if="item.sex === '女'"
                          ></i>
                          <i
                            class="el-icon-male mw_i_male_icon"
                            v-else-if="item.sex === '男'"
                          ></i>
                          <i class="el-icon-lock" v-else></i>
                        </div>
                        <div class="mw_person_active">
                          <el-row>
                            <el-col :span="8" style="border: 1px solid #e2e2e2">
                              <el-row>{{ item.travelNotes }}</el-row>
                              <el-row>游记</el-row>
                            </el-col>
                            <el-col :span="8" style="border: 1px solid #e2e2e2">
                              <el-row>{{ item.fansNum }}</el-row>
                              <el-row>粉丝</el-row></el-col
                            >
                            <el-col :span="8" style="border: 1px solid #e2e2e2">
                              <el-row>{{ item.footprint }}</el-row>
                              <el-row>足迹</el-row></el-col
                            >
                          </el-row>
                        </div>
                        <div class="mw_div_option">
                          <el-button type="warning">关注</el-button>
                          <el-button type="warning" plain>私信</el-button>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-row>
              <el-row>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="1000"
                  >
                  </el-pagination>
                </div>
              </el-row>
            </div>
            <div></div>
          </el-card>
          <el-card
            shadow="never"
            class="box-card"
            v-else-if="currentShowIndex === '6'"
          >
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="14"><span>粉丝</span></el-col>
                <el-col :span="10">
                  <el-input
                    style="float: right; padding: 3px 0"
                    placeholder="请输入内容"
                    clearable
                    @clear="getFollowList"
                    v-model="queryInfo.query"
                  >
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      @click="getFollowList"
                    ></el-button> </el-input
                ></el-col>
              </el-row>
              <el-row> </el-row>
            </div>
            <div></div>
          </el-card>
        </el-main>
      </el-container>
      <mw_footer>
        <slot name="footer"></slot>
      </mw_footer>
    </el-container>
  </div>
</template>

<script>
import mw_footer from "@/components/Footer.vue";
import mw_nav from "@/components/Nav.vue";
export default {
  name: "setting",
  components: {
    mw_footer,
    mw_nav,
  },
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
      // 基础信息表单
      baseForm: {
        username: "",
        sex: "",
        city: "",
        date: "",
        desc: "",
      },
      // 修改密码表单
      pwdForm: {
        oldPwd: "",
        newPwd: "",
        checkPwd: "",
      },
      //   这是基础信息表单的验证对象
      baseFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
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
      // activeIndex: "1",
      currentShowIndex: "1",
      // 头像上传
      imageUrl: "",
      // 关注
      allFollowList: [
        {
          username: "12",
          travelNotes: "12",
          fansNum: "12",
          footprint: "12",
        },
        {
          username: "12",
          travelNotes: "12",
          fansNum: "12",
          footprint: "12",
        },
        {
          username: "12",
          travelNotes: "12",
          fansNum: "12",
          footprint: "12",
        },
        {
          username: "12",
          travelNotes: "12",
          fansNum: "12",
          footprint: "12",
        },
        {
          username: "12",
          travelNotes: "12",
          fansNum: "12",
          footprint: "12",
        },
      ],
      // 查询某一关注
      queryInfo: {
        query: "1",
      },
    };
  },
  created() {
    this.getSettingInfo();
  },
  methods: {
    // 获取设置里的个人有关信息
    async getSettingInfo() {
      var userId = window.sessionStorage.getItem("userId");
      const res = await this.$http.get("/api/setting", {
        params: {
          userId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        // return console.log("登陆失败");
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          console.log(this.baseForm);

          for (var item in this.baseForm) {
            this.baseForm[item] = res.data[item];
          }
          var avatar = res.data.avatar.split("\\")[2];
          this.imageUrl = require("../../../uploads/" + avatar);
        }
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 个人基本信息保存
    onSubmit() {
      var date = this.publicMethod.formatDateToY_M_D(this.baseForm.date);
      var userId = window.sessionStorage.getItem("userId");
      var sendForm = {
        username: this.baseForm.username,
        sex: this.baseForm.sex,
        city: this.baseForm.city,
        date: date,
        desc: this.baseForm.desc,
        userId: userId,
      };
      this.$refs.baseFormRef.validate(async (valid) => {
        console.log(this.sendForm);
        if (!valid) {
          return;
        }
        const res = await this.$http.post("/api/setBaseInfo", sendForm);
        console.log("res", res);
        if (res.status !== 200) {
          return this.$message.error("修改失败");
        } else {
          if (!res.data.state) {
            this.$message.success("修改成功");
          }
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    asideHandleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.currentShowIndex = key;
    },
    // 头像上传成功保存数据库
    async handleAvatarSuccess(uploadRes, file) {
      console.log(uploadRes.path);
      console.log(file);

      this.imageUrl = URL.createObjectURL(file.raw);
      if (uploadRes.state === 0) {
        var userId = window.sessionStorage.getItem("userId");
        const res = await this.$http.post("/api/setAvatar", {
          avatarPath: uploadRes.path,
          userId,
        });
        console.log("res", res);
        if (res.status !== 200) {
          return this.$message.error("服务器端报错");
        } else {
          if (!res.data.state) {
            this.$message.success("修改成功");
          } else {
            return this.$message.error("修改失败");
          }
        }
      }
    },
    // 头像上传前限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 修改密码
    onPwdSubmit() {
      var userId = window.sessionStorage.getItem("userId");
      var sendForm = {
        oldPwd: this.pwdForm.oldPwd,
        password: this.pwdForm.newPwd,
        userId: userId,
      };
      this.$refs.pwdFormRef.validate(async (valid) => {
        console.log(this.sendForm);
        if (!valid) {
          return;
        }
        const res = await this.$http.post("/api/setPassword", sendForm);
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
    // 查询关注
    getFollowList() {},
  },
};
</script>

<style lang="less" scoped>
/**主体部分 */
.el-main {
  padding: 0;
}


.mw_setting_body {
  margin: 0 auto;
  padding: 25px 0;
}
.box-card {
  padding-left: 40px;
  width: 900px;
}
/**头像上传部分 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/**关注 */
.Follow_info {
  text-align: center;
}
.mw_setting_card {
  width: 31%;
  float: left;
  margin-left: 20px;
  margin-top: 20px;
}
// 个人设置
.author_avatar {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.mw_div_option {
  margin-top: 20px;
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
.mw_i_female_icon {
  color: white;
  background: #f56c6c;
  border-radius: 50px;
  padding: 2px;
}
.mw_i_male_icon {
  color: white;
  background: #4e9ee2;
  border-radius: 50px;
  padding: 2px;
}
// 分页
.block {
  margin-top: 30px;
  float: right;
}
</style>>