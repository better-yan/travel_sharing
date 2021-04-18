<template>
  <div>
    <mw_nav>
      <slot name="nav"></slot>
    </mw_nav>
    <div v-if="pageshow === 'edit'">
      <div class="mw_div_title">
        <h3>编辑游记</h3>
        <el-divider><i class="el-icon-edit"></i></el-divider>
      </div>
      <div class="mw_div_editor">
        <el-form
          ref="articleFormRef"
          :rules="articleFormRules"
          :model="articleForm"
          label-width="80px"
        >
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <quill-editor style="height: 700px" v-model="articleForm.text" />
          <el-form-item style="margin-top: 70px">
            <el-checkbox v-model="checked"></el-checkbox>
            我已阅读并同意<a href="#">《麦味游记协议》</a>
          </el-form-item>
          <el-form-item class="mw_form_btn">
            <el-button :disabled="!checked" type="warning" @click="onSubmit"
              >发布</el-button
            >
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-else>
      <h3>发布成功</h3>
      <div>
        <a href="/#/Home">查看原文</a>
        <a href="/#/MyWay">返回首页</a>
      </div>
    </div>
    <mw_footer>
      <slot name="footer"></slot>
    </mw_footer>
  </div>
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
      },
      //   这是游记表单的验证对象
      articleFormRules: {
        title: [
          { required: true, message: "请输入游记标题", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20个字符", trigger: "blur" },
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
            this.pageshow = "success";
            this.$message.success("发表成功");
          }
        }
      });
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
</style>