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
                <el-breadcrumb-item v-if="searchInfo !== ''">{{
                  searchInfo
                }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-row>
            <el-row style="margin-top: 20px; margin-bottom: 20px">
              <el-col :span="20">
                <el-autocomplete
                  style="width: 97%"
                  v-model="searchInfo"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect"
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
            <el-row>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="精选问答" name="first">
                  <div v-for="item in hotAnswerList" :key="item.qid">
                    <el-card style="margin-top: 20px; margin-bottom: 20px">
                      <el-row>
                        <el-link :underline="false">
                          <h3>
                            {{ item.title }}
                          </h3>
                        </el-link>
                      </el-row>
                      <el-row style="height: 80px"
                        ><a>{{ item.description }}</a>
                      </el-row>
                      <el-row
                        style="
                          margin-top: 20px;
                          margin-bottom: 20px;
                          line-height: 45px;
                          height: 45px;
                        "
                      >
                        <el-col :span="2">
                          <el-avatar
                            :size="40"
                            :src="item.avatar | filterAvatar"
                          ></el-avatar>
                        </el-col>
                        <el-col :span="4">
                          {{ item.username }}
                        </el-col>
                        <el-col :span="14">{{
                          item.create_time | dateFormat
                        }}</el-col>
                        <el-col :span="4">0个回答</el-col>
                      </el-row>
                    </el-card>
                  </div>
                  <el-row style="margin-top: 20px; margin-bottom: 20px">
                    <el-button
                      v-if="hotIsLoading === true"
                      style="width: 100%"
                      type="warning"
                      plain
                      icon="el-icon-arrow-down"
                      @click="AddMoreInfo('first')"
                      >加载更多</el-button
                    >
                    <div v-else style="text-align: center; color: #666">
                      暂无更多数据
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="最新问题" name="second">
                  <div v-for="item in newAnswerList" :key="item.qid">
                    <el-card style="margin-top: 20px; margin-bottom: 20px">
                      <el-row>
                        <el-link :underline="false">
                          <h3>
                            {{ item.title }}
                          </h3>
                        </el-link>
                      </el-row>
                      <el-row style="height: 80px"
                        ><a>{{ item.description }}</a>
                      </el-row>
                      <el-row
                        style="
                          margin-top: 20px;
                          margin-bottom: 20px;
                          line-height: 45px;
                          height: 45px;
                        "
                      >
                        <el-col :span="4">
                          <el-avatar
                            :size="40"
                            :src="item.avatar | filterAvatar"
                          ></el-avatar>
                        </el-col>
                        <el-col :span="4">
                          {{ item.username }}
                        </el-col>
                        <el-col :span="12">{{
                          item.create_time | dateFormat
                        }}</el-col>
                        <el-col :span="4">0个回答</el-col>
                      </el-row>
                    </el-card>
                  </div>
                  <el-row style="margin-top: 20px; margin-bottom: 20px">
                    <el-button
                      v-if="hasIsLoading === true"
                      style="width: 100%"
                      type="warning"
                      plain
                      icon="el-icon-arrow-down"
                      @click="AddMoreInfo('second')"
                      >加载更多</el-button
                    >
                    <div v-else style="text-align: center; color: #666">
                      暂无更多数据
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="待回答问题" name="third">
                  <div v-for="item in unAnswerList" :key="item.qid">
                    <el-card style="margin-top: 20px; margin-bottom: 20px">
                      <el-row>
                        <el-link
                          :underline="false"
                          :href="'/#/wenda/question?qid=' + item.qid"
                        >
                          <h3>
                            {{ item.title }}
                          </h3>
                        </el-link>
                      </el-row>
                      <el-row style="height: 80px"
                        ><a>{{ item.description }}</a>
                      </el-row>
                      <el-row
                        style="
                          margin-top: 20px;
                          margin-bottom: 20px;
                          line-height: 45px;
                          height: 45px;
                        "
                      >
                        <el-col :span="4">
                          <el-avatar
                            :size="40"
                            :src="item.avatar | filterAvatar"
                          ></el-avatar>
                        </el-col>
                        <el-col :span="4">
                          {{ item.username }}
                        </el-col>
                        <el-col :span="12">{{
                          item.create_time | dateFormat
                        }}</el-col>
                        <el-col :span="4">0个回答</el-col>
                      </el-row>
                    </el-card>
                  </div>
                  <!-- 加载更多数据 -->
                  <el-row style="margin-top: 20px; margin-bottom: 20px">
                    <el-button
                      v-if="unIsLoading === true"
                      style="width: 100%"
                      type="warning"
                      plain
                      icon="el-icon-arrow-down"
                      @click="AddMoreInfo('third')"
                      >加载更多</el-button
                    >
                    <div v-else style="text-align: center; color: #666">
                      暂无更多数据
                    </div>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
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
                @click="addQuestion"
                >我要提问</el-button
              >
            </el-row>
            <el-row class="mw_row_aside">排行榜</el-row>
            <el-row>
              <el-tabs
                v-model="activeName"
                type="card"
                stretch="true"
                @tab-click="handleClick"
              >
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
      activeName: "third",
      wendaFilter: "",
      hotAnswerList: [],
      allHotAnswerList: [],
      newAnswerList: [],
      allNewAnswerList: [],
      unAnswerList: [],
      unAnswerAllList: [],
      currentHotPage: 1,
      currentNewPage: 1,
      currentUnPage: 1,
      // 页面加载
      unIsLoading: true,
      hasIsLoading: true,
      hotIsLoading: true,
      allAnswerTitle: [],
      searchInfo: "",
    };
  },
  created() {
    this.loadAll();
    this.getHotanswerInfo();
    this.getNewanswerInfo();
    this.getUnanswerInfo();
  },
  methods: {
    addQuestion() {
      this.$router.push("/addQuestion");
    },
    // 获取热门信息
    async getHotanswerInfo() {
      const res = await this.$http.get("/api/getHotanswerInfo", {
        params: {
          searchInfo: this.searchInfo,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.allHotAnswerList = res.data.result;
          this.hotAnswerList = this.currentPageShow(
            this.currentHotPage,
            this.allHotAnswerList
          );
          if (this.hotAnswerList.length >= this.allHotAnswerList.length) {
            this.hotIsLoading = false;
          }
        }
      }
    },
    // 获取最新信息
    async getNewanswerInfo() {
      const res = await this.$http.get("/api/getNewanswerInfo", {
        params: {
          searchInfo: this.searchInfo,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.allNewAnswerList = res.data.result;
          this.newAnswerList = this.currentPageShow(
            this.currentNewPage,
            this.allNewAnswerList
          );
          if (this.newAnswerList.length >= this.allNewAnswerList.length) {
            this.hasIsLoading = false;
          }
        }
      }
    },
    // 获取无回答信息
    async getUnanswerInfo() {
      const res = await this.$http.get("/api/getUnanswerInfo", {
        params: {
          searchInfo: this.searchInfo,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          // console.log()
          this.unAnswerAllList = res.data.result;
          this.unAnswerList = this.currentPageShow(
            this.currentUnPage,
            this.unAnswerAllList
          );
          if (this.unAnswerList.length >= this.unAnswerAllList.length) {
            this.unIsLoading = false;
          }
        }
      }
    },
    currentPageShow(currentPage, answerAllList) {
      return answerAllList.slice(0, 8 * currentPage);
    },
    AddMoreInfo(pageName) {
      if (pageName === "first") {
        this.currentHotPage++;
        this.hotAnswerList = this.currentPageShow(
          this.currentHotPage,
          this.allHotAnswerList
        );
        if (this.hotAnswerList.length >= this.allHotAnswerList.length) {
          this.hotIsLoading = false;
        }
        console.log(pageName);
      } else if (pageName === "second") {
        this.currentNewPage++;
        this.newAnswerList = this.currentPageShow(
          this.currentNewPage,
          this.allNewAnswerList
        );
        if (this.newAnswerList.length >= this.allNewAnswerList.length) {
          this.hasIsLoading = false;
        }
      } else {
        this.currentUnPage++;
        this.unAnswerList = this.currentPageShow(
          this.currentUnPage,
          this.unAnswerAllList
        );
        console.log(this.currentUnPage);
        if (this.unAnswerList.length >= this.unAnswerAllList.length) {
          this.unIsLoading = false;
        }
        console.log(this.unAnswerList);
      }
    },
    handleClick() {},
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
      this.getHotanswerInfo();
      this.getNewanswerInfo();
      this.getUnanswerInfo();
    },
    handleIconClick(ev) {
      console.log(ev);
    },
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

