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
            <el-page-header @back="goBack" content="搜索页面"> </el-page-header>
            <el-row style="margin-top: 20px; margin-bottom: 20px">
              <el-col :span="20">
                <el-input
                  type="text"
                  v-model="searchInfo"
                  @keyup.enter.native="handleSearch()"
                ></el-input>
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
                <el-tab-pane label="全部" name="all">
                  <div v-for="item in allList" :key="item.qid">
                    <el-card style="margin-top: 20px; margin-bottom: 20px">
                      <el-row>
                        <el-link
                          v-if="item.typeId == 'article'"
                          :href="'/#/article?articleId=' + item.sId"
                          :underline="false"
                        >
                          <h3>
                            {{ item.title }}
                          </h3>
                        </el-link>
                        <el-link
                          :href="'/#/wenda/question?qid=' + item.sId"
                          v-else
                          :underline="false"
                        >
                          <h3>
                            {{ item.title }}
                          </h3>
                        </el-link>
                      </el-row>
                      <el-row style="height: 70px">
                        <a
                          v-if="item.typeId == 'article'"
                          class="mw_a_articleContent"
                          :href="'/#/article?articleId=' + item.sId"
                          v-html="item.text"
                          >{{ item.text }}</a
                        >
                        <a
                          v-else
                          class="mw_a_articleContent"
                          :href="'/#/wenda/question?qid=' + item.sId"
                          v-text="item.text"
                          >{{ item.text }}</a
                        >
                      </el-row>
                      <el-row
                        style="
                          margin-top: 20px;
                          margin-bottom: 20px;
                          line-height: 45px;
                          height: 45px;
                        "
                      >
                        <el-col :span="6">
                          <el-tag v-if="item.typeId == 'article'" type="warning"
                            >游记
                          </el-tag>
                          <el-tag v-else type="warning">问答</el-tag>
                        </el-col>
                        <el-col :span="6">{{
                          item.create_time | dateFormat
                        }}</el-col>
                        <el-col :span="6"
                          ><i class="el-icon-view"></i
                          ><span>{{ item.click }}</span></el-col
                        >
                      </el-row>
                    </el-card>
                  </div>
                  <el-row style="margin-top: 20px; margin-bottom: 20px">
                    <el-button
                      v-if="allIsLoading === true"
                      style="width: 100%"
                      type="warning"
                      plain
                      icon="el-icon-arrow-down"
                      @click="AddMoreInfo('all')"
                      >加载更多</el-button
                    >
                    <div v-else style="text-align: center; color: #666">
                      暂无更多数据
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="目的地" name="destination">
                  <div v-for="item in desList" :key="item.qid">
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
                        <el-col :span="12">{{
                          item.create_time | dateFormat
                        }}</el-col>
                        <el-col :span="6"
                          ><i class="el-icon-view"></i
                          ><span>{{ item.q_click }}</span></el-col
                        >
                      </el-row>
                    </el-card>
                  </div>
                  <el-row style="margin-top: 20px; margin-bottom: 20px">
                    <el-button
                      v-if="desIsLoading === true"
                      style="width: 100%"
                      type="warning"
                      plain
                      icon="el-icon-arrow-down"
                      @click="AddMoreInfo('destination')"
                      >加载更多</el-button
                    >
                    <div v-else style="text-align: center; color: #666">
                      暂无更多数据
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="游记" name="note">
                  <div v-for="(item, index) in noteList" :key="index">
                    <el-row>
                      <el-col
                        ><el-card shadow="hover">
                          <el-row :gutter="12">
                            <el-col :span="9">
                              <!-- <img :src="item.img" alt="图片" /> -->
                              <el-image
                                style="width: 220px; height: 150px"
                                :src="item.file | filterAvatar"
                                fit="cover"
                              ></el-image>
                            </el-col>
                            <el-col :span="15">
                              <div style="height: 40px">
                                <el-link
                                  :href="
                                    '/#/article?articleId=' + item.articleId
                                  "
                                  >{{ item.title }}</el-link
                                >
                              </div>
                              <div style="height: 80px">
                                <a
                                  class="mw_a_articleContent"
                                  :href="
                                    '/#/article?articleId=' + item.articleId
                                  "
                                  v-text="item.text"
                                  >{{ item.text }}</a
                                >
                              </div>
                              <el-row :gutter="0">
                                <el-col :span="12">{{
                                  item.create_time | dateFormat
                                }}</el-col>
                                <el-col :span="6"
                                  ><i class="el-icon-view"></i
                                  ><span>{{ item.a_click }}</span></el-col
                                >
                              </el-row></el-col
                            >
                          </el-row>
                        </el-card></el-col
                      >
                    </el-row>
                  </div>
                  <!-- 加载更多数据 -->
                  <el-row style="margin-top: 20px; margin-bottom: 20px">
                    <el-button
                      v-if="noteIsLoading === true"
                      style="width: 100%"
                      type="warning"
                      plain
                      icon="el-icon-arrow-down"
                      @click="AddMoreInfo('note')"
                      >加载更多</el-button
                    >
                    <div v-else style="text-align: center; color: #666">
                      暂无更多数据
                    </div>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="问答" name="qa">
                  <div v-for="item in qAList" :key="item.qid">
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
                        <el-col :span="6">{{
                          item.create_time | dateFormat
                        }}</el-col>
                        <el-col :span="6"
                          ><i class="el-icon-view"></i
                          ><span>{{ item.q_click }}</span></el-col
                        >
                      </el-row>
                    </el-card>
                  </div>
                  <!-- 加载更多数据 -->
                  <el-row style="margin-top: 20px; margin-bottom: 20px">
                    <el-button
                      v-if="qAIsLoading === true"
                      style="width: 100%"
                      type="warning"
                      plain
                      icon="el-icon-arrow-down"
                      @click="AddMoreInfo('qa')"
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
  name: "search",
  components: {
    mw_footer,
    mw_nav,
    mw_backtop,
  },

  data() {
    return {
      activeName: "",
      searchInfo: "",
      allPage: 1,
      allIsLoading: true,
      allList: [],
      resAllList: [],
      desPage: 1,
      desIsLoading: true,
      desList: [],
      resDesList: [],
      notePage: 1,
      noteIsLoading: true,
      noteList: [],
      resNoteList: [],
      qAPage: 1,
      qAIsLoading: true,
      qAList: [],
      resQAList: [],
    };
  },
  watch: {
    $route(to, from) {
      if (to.path === "/search") {
        var urlParams = this.publicMethod.getUrlParamsObj();
        var part = urlParams["part"];
        var question = urlParams["q"];
        this.getSearchContent(part, question);
      }
    },
  },
  created() {
    var urlParams = this.publicMethod.getUrlParamsObj();
    var part = urlParams["part"];
    var question = urlParams["q"];
    this.searchInfo = question;
    this.getSearchContent(part, question);
  },
  methods: {
    async getSearchContent(part, question) {
      const res = await this.$http.get("/api/getSearchContent", {
        params: {
          part,
          question,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          switch (part) {
            case "all":
              this.activeName = "all";
              this.resAllList = res.data.result;
              this.allList = this.currentPageShow(
                this.allPage,
                this.resAllList
              );
              if (this.allList.length >= this.resAllList.length) {
                this.allIsLoading = false;
              }
              break;
            case "destination":
              this.activeName = "destination";
              this.resDesList = res.data.result;
              this.desList = this.currentPageShow(
                this.desPage,
                this.resDesList
              );
              if (this.desList.length >= this.resDesList.length) {
                this.desIsLoading = false;
              }
              break;
            case "note":
              this.activeName = "note";
              this.resNoteList = res.data.result;
              this.noteList = this.currentPageShow(
                this.notePage,
                this.resNoteList
              );
              if (this.noteList.length >= this.resNoteList.length) {
                this.noteIsLoading = false;
              }
              break;
            case "qa":
              this.activeName = "qa";
              this.resQAList = res.data.result;
              this.qAList = this.currentPageShow(this.qAPage, this.resQAList);
              if (this.qAList.length >= this.resQAList.length) {
                this.qAIsLoading = false;
              }
              break;
          }
        }
      }
    },
    currentPageShow(currentPage, AllList) {
      return AllList.slice(0, 8 * currentPage);
    },
    AddMoreInfo(pageName) {
      switch (pageName) {
        case "all":
          this.allPage++;
          this.allList = this.currentPageShow(this.allPage, this.resAllList);
          if (this.allList.length >= this.resAllList.length) {
            this.allIsLoading = false;
          }
          break;
        case "destination":
          this.desPage++;
          this.desList = this.currentPageShow(this.desPage, this.resDesList);
          if (this.desList.length >= this.resDesList.length) {
            this.desIsLoading = false;
          }
          break;
        case "note":
          this.notePage++;
          this.noteList = this.currentPageShow(this.notePage, this.resNoteList);
          if (this.noteList.length >= this.resNoteList.length) {
            this.noteIsLoading = false;
          }
          break;
        case "qa":
          this.qAPage++;
          this.resQAList = res.data.result;
          this.qAList = this.currentPageShow(this.qAPage, this.resQAList);
          if (this.qAList.length >= this.resQAList.length) {
            this.qAIsLoading = false;
          }
          break;
      }
    },
    handleClick() {
      this.$router.push(
        "/search?part=" + this.activeName + "&q=" + this.searchInfo
      );
    },
    handleSearch() {
      this.$router.push(
        "/search?part=" + this.activeName + "&q=" + this.searchInfo
      );
    },
    goBack() {
      window.history.back();
    },
  },
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
.mw_a_articleContent {
  text-align: left;
  height: 60px;
  line-height: 60px;
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
}
</style>>
