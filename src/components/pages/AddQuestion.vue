<template>
  <div>
    <el-container>
      <el-header>
        <mw_nav> <slot name="nav"></slot> </mw_nav
      ></el-header>
      <el-main class="mw_el_main">
        <el-row>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>编辑问题</el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
        <el-row class="main_form_row">
          <el-col :span="14">
            <el-form
              label-position="top"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="一句话描述你的问题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="详细内容补充" prop="description">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="ruleForm.description"
                ></el-input>
              </el-form-item>
              <el-form-item label="添加问题标签" prop="tags">
                <el-checkbox-group v-model="ruleForm.tags" size="mini">
                  <el-checkbox-button
                    v-for="type in quesType"
                    :label="type"
                    :key="type"
                    >{{ type }}</el-checkbox-button
                  >
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="为问题选择一个目的地" prop="targetCity">
                <el-cascader
                  v-model="ruleForm.targetCity"
                  :options="options"
                  :show-all-levels="false"
                  :props="{ checkStrictly: true, expandTrigger: 'hover' }"
                  filterable
                  @change="handleChange"
                >
                  <template slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf">
                      ({{ data.children.length }})
                    </span>
                  </template>
                </el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >发布问题</el-button
                >
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10" class="main_alert_col">
            <el-alert title="提问的正确姿势" type="warning" show-icon>
              <template slot="title">
                <div class="iconSize">提问的正确姿势:</div>
                <div class="iconSize">
                  1.问题要【具体】【真实】【诚恳】，问题较多，需全面阐述时，可以添加问题补充。结伴/交易/与旅行无关的提问将被删除。
                </div>
                <div class="iconSize">
                  2.给问题添加目的地，并打上正确的标签将有助于更快地获得回答。
                </div>
              </template>
            </el-alert>
          </el-col>
        </el-row>
      </el-main>
      <mw_footer> <slot name="footer"></slot> </mw_footer>
    </el-container>
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
      options: this.publicMethod.cityInfo,
      ruleForm: {
        title: "",
        description: "",
        tags: [],
        targetCity: [],
      },
      rules: {
        title: [
          { required: true, message: "请输入问题名称", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      quesType: [
        "自驾",
        "亲子",
        "美食",
        "摄影",
        "购物",
        "骑行",
        "徒步",
        "滑雪",
        "潜水",
      ],
      state: "",
      timeout: null,
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      var userId = window.sessionStorage.getItem("userId");
      var sendForm = {
        typeId: 0,
        userId: userId,
        title: this.ruleForm.title,
        description: this.ruleForm.description,
        tags: this.ruleForm.tags,
        targetCity: this.ruleForm.targetCity,
      };
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          return;
        }
        const res = await this.$http.post("/api/addQuestion", sendForm);
        console.log("res", res);
        if (res.status !== 200) {
          return this.$message.error("发布失败");
        } else {
          if (!res.data.state) {
            this.$message.success("发布成功");
            this.$router.push("/wenda");
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(name) {
      console.log(name);
    },
  },
};
</script>

<style lang="less" scoped>
.mw_el_main {
  margin-left: 10%;
}
.main_alert_col {
  top: 50px;
  padding-top: 120px;
  display: block;
  width: 400px;
  height: 500px;
  padding-left: 30px;
  font-size: 20px;
}
</style>