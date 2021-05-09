<template>
  <el-container>
    <el-header style="height: 10px"></el-header>
    <el-container>
      <el-main>
        <!-- <div v-if="pageshow === 'edit'"> -->
        <el-page-header @back="goBack" content="编辑游记"> </el-page-header>
        <el-divider><i class="el-icon-edit"></i></el-divider>
        <div class="mw_div_editor">
          <el-form
            label-position="top"
            ref="articleFormRef"
            :rules="articleFormRules"
            :model="articleForm"
            label-width="80px"
            @submit.native.prevent
          >
            <el-form-item prop="title" label="标题">
              <el-input v-model="articleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="封面图" prop="file">
              <div>
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8080/api/single"
                  :show-file-list="false"
                  :on-success="handlePicSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-progress="andlePicProgress"
                >
                  <img
                    v-if="articleForm.file"
                    :src="articleForm.imageUrl"
                    class="fileSize"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
            <quill-editor style="height: 700px" v-model="articleForm.text" />
            <el-form-item style="margin-top: 70px">
              <el-checkbox v-model="checked"></el-checkbox>
              我已阅读并同意<a href="#">《麦味游记协议》</a>
            </el-form-item>
            <el-form-item class="mw_form_btn">
              <el-button
                :disabled="!checked"
                type="warning"
                @click.stop="onSubmit"
                >发布</el-button
              >
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 阻止提交跳转页面 -->
        <iframe name="stop" style="display: none"></iframe>
      </el-main>
    </el-container>
    <mw_footer>
      <slot name="header"></slot>
    </mw_footer>
  </el-container>
</template>
<script>
import mw_footer from "@/components/Footer.vue";
import mw_nav from "@/components/Nav.vue";
export default {
  name: "createNotes",
  components: {
    mw_footer,
    mw_nav,
  },
  data() {
    return {
      pageshow: "edit",
      articleForm: {
        title: "",
        text: "",
        imageUrl: "",
        file: "",
      },
      //   这是游记表单的验证对象
      articleFormRules: {
        title: [
          { required: true, message: "请输入游记标题", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30个字符", trigger: "blur" },
        ],
        file: [
          { required: true, message: "请上传游记封面图", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  created() {},
  methods: {
    // 游记提交
    onSubmit() {
      var userId = window.sessionStorage.getItem("userId");
      var sendForm = {
        title: this.articleForm.title,
        text: this.articleForm.text,
        file: this.articleForm.file,
        typeId: "article",
        userId: userId,
      };
      this.$refs.articleFormRef.validate(async (valid) => {
        console.log(this.sendForm);
        if (!valid) {
          return;
        }
        const res = await this.$http.post("/api/addArticle", sendForm);
        console.log("res", res);
        if (res.status !== 200) {
          return this.$message.error("发表失败");
        } else {
          if (!res.data.state) {
            this.$message.success("发表成功");
            this.$router.push("/home?userId=" + userId);
          }
        }
      });
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
    //  封面图上传成功保存数据库
    handlePicSuccess(uploadRes, file, e) {
      console.log(uploadRes.path);
      console.log(file);
      this.articleForm.imageUrl = URL.createObjectURL(file.raw);
      if (uploadRes.state === 0) {
        this.articleForm.file = uploadRes.path;
      }
    },
    andlePicProgress(event, file, fileList) {
      console.log(fileList);
      console.log(file);
      console.log(event);
      event.stopPropagation();
      event.preventDefault()
    },
    goBack() {
      this.$router.push("/setting");
    },
  },
};
</script>
<style lang="less" scoped>
.mw_div_editor {
  display: block;
  margin: 30px 150px;
}
.mw_form_btn {
  margin-top: 30px;
}
// 页面抬头名
.mw_div_title {
  margin: 100px 150px 80px 150px;
}
.fileSize {
  width: 70%;
  height: 70%;
  display: block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #e6a23c;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: 1px dashed #e6a23c;
}
</style>