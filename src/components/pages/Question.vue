<template>
  <div>
    <el-container>
      <el-header>
        <mw_nav>
          <slot name="nav"></slot>
        </mw_nav>
      </el-header>
      <el-container class="child_container">
        <el-main>
          <div>
            <el-row>
              <el-breadcrumb separator="|">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >问答首页</el-breadcrumb-item
                >
                <el-breadcrumb-item
                  ><a href="/">我的问答</a></el-breadcrumb-item
                >
                <el-breadcrumb-item>{{ question.title }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-row>
            <el-row style="margin-top: 20px; margin-bottom: 20px">
              <el-col :span="20">
                <el-autocomplete
                  style="width: 97%"
                  v-model="searchInfo"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSearch"
                  :trigger-on-focus="false"
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.label }}</div>
                  </template>
                </el-autocomplete>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="warning"
                  plain
                  icon="el-icon-search"
                  @click="handleSearch"
                ></el-button>
              </el-col>
            </el-row>
            <el-divider content-position="right">问题详情</el-divider>
            <el-row>
              <el-card shadow="never" style="margin-bottom: 20px">
                <el-row>
                  <el-link :underline="false">
                    <h3>
                      {{ question.title }}
                    </h3>
                  </el-link>
                </el-row>
                <el-row style="height: 80px"
                  ><a>{{ question.description }}</a>
                </el-row>
                <el-row
                  style="
                    margin-top: 20px;
                    margin-bottom: 20px;
                    line-height: 45px;
                    height: 45px;
                  "
                >
                  <el-col :span="8">
                    <div v-for="(item, index) in question.tags" :key="index">
                      <el-tag
                        type="warning"
                        style="float: left; margin-left: 5px"
                        >{{ item }}</el-tag
                      >
                    </div>
                  </el-col>
                  <el-col style="float: right" :span="6">
                    {{ question.create_time | dateFormat }}
                  </el-col>
                  <el-col :span="4" style="float: right">
                    {{ question.username }}
                  </el-col>
                  <el-col style="float: right" :span="2">
                    <el-avatar
                      :size="40"
                      :src="question.avatar | filterAvatar"
                    ></el-avatar
                  ></el-col>
                </el-row>
              </el-card>
            </el-row>
            <el-row style="color: #666; line-height: 40px">
              <el-col :span="16">
                <div>
                  <span
                    ><i class="el-icon-view"></i
                    >{{ question.q_click }}次浏览</span
                  >
                  <el-divider direction="vertical"></el-divider>
                  <span
                    ><i class="el-icon-connection"></i
                    >{{ countAnswer }}个回答</span
                  >
                  <el-divider direction="vertical"></el-divider>
                  <span
                    ><i class="el-icon-document-add"></i
                    >{{ question.q_focus || 0 }}人关注</span
                  >
                </div></el-col
              >
              <el-col :span="4" style="float: right">
                <el-button
                  size="middle"
                  type="warning"
                  @click="goToAnwerQuestion('answerQuestion')"
                  >回答问题</el-button
                >
              </el-col>
              <!-- <el-col :span="4" style="float: right">
                <el-button size="middle" type="warning" plain @click="addFoucsUser"
                  >关注问题</el-button
                ></el-col
              > -->
            </el-row>
            <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
            <el-row>
              <div v-for="(item, index) in answerList" :key="index">
                <el-row>
                  <el-col :span="2">
                    <el-avatar
                      :size="30"
                      :src="item.avatar | filterAvatar"
                    ></el-avatar
                  ></el-col>
                  <el-col :span="4"> {{ item.username }}</el-col>
                </el-row>
                <el-row style="margin-top: 15px; font-size: 16px">{{
                  item.content
                }}</el-row>
                <el-row style="margin-top: 15px; color: #666; font-size: 13px">
                  <el-col :span="12">
                    <span>{{ item.create_time | dateFormat }}</span>
                  </el-col>
                  <el-col
                    :span="11"
                    style="text-align: right; margin-right: 5px"
                  >
                    <span><i class="el-icon-share"></i>分享</span>
                    <el-divider direction="vertical"></el-divider>
                    <span><i class="el-icon-caret-bottom"></i>没有帮助</span>
                    <el-divider direction="vertical"></el-divider>
                    <span><i class="el-icon-wind-power"></i>举报</span>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
              </div>
              <el-row style="margin-top: 20px; margin-bottom: 20px">
                <el-button
                  v-if="isLoading === true"
                  style="width: 100%"
                  type="warning"
                  plain
                  icon="el-icon-arrow-down"
                  @click="AddMoreInfo"
                  >加载更多</el-button
                >
                <div v-else style="text-align: center; color: #666">
                  暂无更多数据
                </div>
              </el-row>
            </el-row>
            <el-row>
              <el-card>
                <el-row>
                  <el-col :span="2">
                    <el-avatar
                      shape="square"
                      :size="40"
                      :src="submitForm.avatar | filterAvatar"
                    ></el-avatar
                  ></el-col>
                  <el-col :span="20"> {{ submitForm.username }}</el-col>
                </el-row>
                <el-row>
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="submitForm.content"
                  ></el-input
                ></el-row>
                <el-row>
                  <el-button
                    id="answerQuestion"
                    style="float: right; margin-top: 20px"
                    type="warning"
                    @click="submitAnswer"
                    >提交回答</el-button
                  >
                </el-row>
              </el-card>
            </el-row>
          </div>
        </el-main>
        <el-aside width="27%">
          <div>
            <el-row>
              <el-button
                class="mw_btn_question"
                type="warning"
                icon="el-icon-plus"
                >我要提问</el-button
              >
            </el-row>
            <el-row class="mw_row_aside">排行榜</el-row>
            <el-row>
              <el-tabs v-model="activeName" type="card" :stretch="true">
                <el-tab-pane label="回答问题" name="first"
                  >回答问题</el-tab-pane
                >
                <el-tab-pane label="消灭零回答" name="second"
                  >消灭零回答</el-tab-pane
                >
                <el-tab-pane label="优质回答" name="third"
                  >优质回答</el-tab-pane
                >
              </el-tabs>
            </el-row>
            <el-card> </el-card>
            <el-card> </el-card>
          </div>
        </el-aside>
      </el-container>
      <mw_backtop>
        <slot></slot>
      </mw_backtop>
      <mw_footer>
        <slot name="header"></slot>
      </mw_footer>
    </el-container>
  </div>
</template>


<script>
import mw_footer from "@/components/Footer.vue";
import mw_nav from "@/components/Nav.vue";
import mw_backtop from "@/components/Backtop.vue";
export default {
  name: "articlePage",
  components: {
    mw_footer,
    mw_nav,
    mw_backtop,
  },
  data() {
    return {
      activeName: "first",
      wendaFilter: "",
      // 页面加载
      allAnswerTitle: [],
      searchInfo: "",
      question: {
        title: "",
        description: "",
        avatar: "",
        username: "",
        create_time: "",
        tags: [],
        click: 0,
        foucs: 0,
      },
      submitForm: {
        avatar: "",
        username: "",
        topic_id: "",
        topic_type: "",
        content: "",
        from_id: "",
        to_id: "",
      },
      answerList: [],
      allAnswerList: [],
      countAnswer: 0,
      currentPage: 1,
      isLoading: true,
    };
  },
  created() {
    this.getInitInfo();
    this.loadAll();
    this.getQuestionDelInfo();
    this.getReplyInfo();
  },
  methods: {
    goToAnwerQuestion(type) {
      /*找到锚点*/
      let anchorElement = document.getElementById(type);
      /*如果对应id的锚点存在，就跳转到锚点*/
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
    },
    // 初始化信息
    async getInitInfo() {
      var urlParams = this.publicMethod.getUrlParamsObj();
      this.submitForm.topic_id = urlParams["qid"];
      var userId = window.sessionStorage.getItem("userId");
      // 点击人数加一
      await this.$http.post("/api/addQuestionClick", {
        qid: this.submitForm.topic_id,
      });
      // 初始化我的回答的状态信息
      await this.$http.post("/api/setQuestionStatus", {
        qid: this.submitForm.topic_id,
        to_uid: userId,
      });
      // 初始化提交回答的信息
      const res = await this.$http.get("/api/setting", {
        params: {
          userId,
        },
      });

      this.submitForm.from_id = userId;
      console.log(res);
      if (res.status !== 200) {
        // return console.log("登陆失败");
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.submitForm.avatar = res.data.avatar;
          this.submitForm.username = res.data.username;
        }
      }
    },
    // 获取问题详细相关信息
    async getQuestionDelInfo() {
      var urlParams = this.publicMethod.getUrlParamsObj();
      console.log(urlParams);
      var qid = urlParams["qid"];
      const res = await this.$http.get("/api/getQuesDelInfo", {
        params: {
          qid: qid,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.question = res.data.result[0];
          this.question.tags = JSON.parse(this.question.tags);
          this.question.q_focus = this.question.q_focus
            ? JSON.parse(this.question.q_focus).length
            : 0;
        }
        console.log(this.question);
        this.submitForm.topic_title = this.question.title;
        this.submitForm.to_id = this.question.userId;
      }
    },
    // 获取问题回答相关信息
    async getReplyInfo() {
      var urlParams = this.publicMethod.getUrlParamsObj();
      var qid = urlParams["qid"];
      const res = await this.$http.get("/api/getReplyInfo", {
        params: {
          qid: qid,
        },
      });

      console.log(qid);
      const userRes = await this.$http.get("/api/getUserInfoOfReply", {
        params: {
          topic_id: qid,
        },
      });
      console.log(res);
      console.log(userRes);
      if (res.status !== 200 || userRes.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state && !userRes.data.state) {
          this.allAnswerList = [];
          var userList = userRes.data.result;
          var answerList = res.data.result;
          for (let index = 0; index < userList.length; index++) {
            for (let j = 0; j < answerList.length; j++) {
              if (userList[index].userId === answerList[j].from_uid) {
                var answerItem = {
                  avatar: userList[index].avatar,
                  username: userList[index].username,
                  content: answerList[j].content,
                  create_time: answerList[j].create_time,
                };
                this.allAnswerList.push(answerItem);
              }
            }
          }
          this.countAnswer = this.allAnswerList.length;
          this.answerList = this.currentPageShow(
            this.currentPage,
            this.allAnswerList
          );
          if (this.answerList.length >= this.allAnswerList.length) {
            this.isLoading = false;
          }
        }
      }
    },
    currentPageShow(currentPage, answerAllList) {
      return answerAllList.slice(0, 8 * currentPage);
    },
    AddMoreInfo() {
      this.currentPage++;
      this.answerList = this.currentPageShow(
        this.currentPage,
        this.allAnswerList
      );
      if (this.answerList.length >= this.allAnswerList.length) {
        this.isLoading = false;
      }
    },
    // ------------------------搜索框对应功能--------------------
    querySearch(queryString, cb) {
      var allAnswerTitle = this.allAnswerTitle;
      var results = queryString
        ? allAnswerTitle.filter(this.createFilter(queryString))
        : allAnswerTitle;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (allAnswerTitle) => {
        return (
          allAnswerTitle.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    async loadAll() {
      const res = await this.$http.get("/api/getAllanswerInfo");
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          res.data.result.forEach((item) => {
            this.allAnswerTitle.push({
              value: item.title,
              label: item.title,
            });
          });
        }
      }
    },
    async handleSearch() {
      this.$router.push("/#/wenda?searchInfo=" + this.searchInfo);
    },
    // ---------------------------------------------------------
    // 提交回答
    async submitAnswer() {
      if (!this.submitForm.content) {
        return;
      }
      const res = await this.$http.post("/api/addAnswer", this.submitForm);
      console.log("res", res);
      if (res.status !== 200) {
        return this.$message.error("发布失败");
      } else {
        if (!res.data.state) {
          this.$message.success("发布成功");
          this.submitForm.content = "";
          this.getReplyInfo();
        }
      }
    },
    // 添加关注问题人数
    // async addFoucsUser() {
    //   const res = await this.$http.post("/api/addFoucsUser", this.submitForm);
    //   console.log("res", res);
    //   if (res.status !== 200) {
    //     return this.$message.error("关注失败");
    //   } else {
    //     if (!res.data.state) {
    //       this.$message.success("关注成功");
    //       this.focuscontent = "";
    //     }
    //   }
    // },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.child_container {
  margin: 20px 170px;
}
.mw_btn_question {
  margin-top: 55px;
  width: 100%;
}
.mw_row_aside {
  margin-top: 50px;
  font-size: 18px;
  margin-bottom: 10px;
  color: #6d6d6d;
}
</style>

