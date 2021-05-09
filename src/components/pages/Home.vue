<template>
  <el-container style="background-color: #efefef">
    <el-header>
      <mw_nav>
        <slot name="nav"></slot>
      </mw_nav>
      <mw_homeMap>
        <slot name="mw_homeMap"></slot>
      </mw_homeMap>
      <div style="margin-top: -50px;">
        <el-row class="tags_bar">
          <div class="center">
            <ul class="flt2" id="list">
              <li class="on">
                <a
                  class="tags_link"
                  :href="'/#/home?userId=' + personal.userId + '&pageId=0'"
                  title="TA的窝"
                  >TA的窝</a
                >
              </li>
              <li>
                <a
                  class="tags_link"
                  :href="'/#/home?userId=' + personal.userId + '&pageId=1'"
                  title="TA的游记"
                  >TA的游记</a
                >
              </li>
              <li>
                <a
                  class="tags_link"
                  :href="'/#/home?userId=' + personal.userId + '&pageId=2'"
                  title="TA的问答"
                  >TA的问答</a
                >
              </li>
              <li>
                <a
                  class="tags_link"
                  :href="'/#/home?userId=' + personal.userId + '&pageId=3'"
                  title="TA的足迹"
                  >TA的足迹</a
                >
              </li>
              <li>
                <a
                  class="tags_link"
                  :href="'/#/home?userId=' + personal.userId + '&pageId=4'"
                  title="TA的结伴"
                  >TA的结伴</a
                >
              </li>
            </ul>
          </div>
        </el-row>
      </div>
    </el-header>
    <el-container class="child_container">
      <el-aside width="30%">
        <div>
          <el-card shadow="hover">
            <div class="base_info">
              <div style="height: 40px">
                <el-avatar
                  cover
                  class="author_avatar"
                  :size="120"
                  :src="personal.avatar"
                ></el-avatar>
              </div>
              <div class="mw_div_userInfo">
                {{ personal.username }}
                <i
                  v-if="personal.sex === '男'"
                  class="el-icon-male mw_i_icon"
                ></i>
                <i
                  v-else-if="personal.sex === '女'"
                  class="el-icon-female mw_i_icon"
                ></i>
              </div>
              <div class="mw_div_userInfo">
                {{ personal.city }}
              </div>
              <div class="mw_div_option" v-if="componentVisible === 'other'">
                <el-button id="focus" type="warning" @click="onFocus">{{
                  focusText
                }}</el-button>
                <el-button type="warning" @click="dialogVisible = true" plain
                  >私信</el-button
                >
              </div>
              <div class="mw_div_userDecrib">
                {{ personal.description }}
              </div>
            </div>
            <div class="mw_person_active">
              <el-row>
                <el-col :span="12" style="border: 1px solid #e2e2e2">
                  <el-row
                    ><a :href="'/#/follow?userId=' + personal.userId">{{
                      user_fans.foucsNum
                    }}</a></el-row
                  >
                  <el-row>关注</el-row>
                </el-col>
                <el-col :span="12" style="border: 1px solid #e2e2e2">
                  <el-row
                    ><a
                      :href="
                        '/#/follow?userId=' +
                        personal.userId +
                        '&currentShowIndex=2'
                      "
                      >{{ user_fans.fansNum }}</a
                    ></el-row
                  >
                  <el-row>粉丝</el-row></el-col
                >
              </el-row>
            </div>
            <div class="mw_person_follow">
              <div
                class="mw_person_follow_title"
                v-if="componentVisible === 'other'"
              >
                TA的关注
              </div>
              <div class="mw_person_follow_title" v-else>我的关注</div>
              <div
                class="mw_person_follow_info"
                v-for="(item, index) in currentFollowList"
                :key="index"
              >
                <a :href="'/#/home?userId=' + item.userId">
                  <el-avatar :size="60" :src="item.avatar"></el-avatar
                ></a>
                <a
                  :href="'/#/home?userId=' + item.userId"
                  class="follow_info_username"
                  >{{ item.username }}</a
                >
              </div>
              <el-pagination
                class="mw_person_follow_pagination"
                @current-change="followHandleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-size="8"
                layout="prev,pager, next"
                :total="total"
              >
              </el-pagination>
            </div>
            <div class="mw_div_messageboard">
              <el-row>留言板</el-row>
              <el-row
                ><el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容"
                  v-model="leave_content"
                ></el-input
              ></el-row>
              <el-row>
                <el-button
                  @click="onLeaveMsg"
                  class="mw_btn_msgboard"
                  size="medium"
                  type="warning"
                  >留言</el-button
                >
              </el-row>
              <el-divider content-position="right" style="font-size: 12px"
                >留言消息</el-divider
              >
              <el-row>
                <div v-for="(item, index) in leaveMsgList" :key="index">
                  <div class="mw_leavecontent_class">
                    <el-row class="msg_title">
                      <el-col :span="4" style="margin-left: 5px">
                        <a :href="'/#/home?userId=' + item.sender_id">
                          <el-avatar
                            :size="40"
                            :src="item.avatar | filterAvatar"
                          ></el-avatar>
                        </a>
                      </el-col>
                      <el-col :span="18">
                        <el-row>
                          <span style="color: #ff9d00">{{
                            item.username
                          }}</span>
                        </el-row>
                        <el-row>
                          <span style="color: #666">{{
                            item.create_time | dateFormat
                          }}</span>
                        </el-row>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top: 5px">
                      {{ item.leave_content }}
                    </el-row>
                  </div>
                  <el-divider></el-divider>
                </div>
              </el-row>
            </div>
          </el-card>
          <!-- <el-card></el-card> -->
        </div>
      </el-aside>
      <el-main>
        <!-- 我的窝 -->
        <div class="my_mwWayhome" v-if="currentPart == 0">
          <div v-for="(item, index) in currentShowArticleContent" :key="index">
            <el-card shadow="never">
              <el-row :gutter="12">
                <el-image
                  :src="item.img | filterAvatar"
                  style="height: 400px; width: 100%"
                  fit="cover"
                ></el-image>
                <div style="margin: 0 20px">
                  <div style="height: 40px; text-align: left; margin-top: 5px">
                    <!-- <h3> -->
                    <el-link
                      :href="'/#/article?articleId=' + item.articleId"
                      type="warning"
                      style="font-size: 20px"
                      >{{ item.title }}</el-link
                    >
                    <!-- </h3>   -->
                  </div>
                  <div>
                    <a class="mw_a_articleContent">{{ item.text }}</a>
                  </div>
                </div>
              </el-row>
              <el-divider></el-divider>
              <el-row style="height: 30px; color: #999; font-size: 16px">
                <el-col :span="8">
                  <i class="el-icon-time"></i>
                  <span> {{ item.create_time | dateFormat }}</span>
                </el-col>
                <el-col :span="6" style="text-align: left">
                  <i class="el-icon-view"></i><span>{{ item.a_click }}</span>
                </el-col>
                <div>
                  <el-col :span="8" style="text-align: right">
                    <span>{{ item.a_like }}</span>
                    <el-link
                      :underline="false"
                      v-if="item.isLiked"
                      @click="
                        delOneArticleLike(
                          loginUserId,
                          item.articleId,
                          item.formatA_likeUser
                        )
                      "
                      class="have_a_like"
                    ></el-link>
                    <el-link
                      :underline="false"
                      v-else
                      @click="
                        setOneArticleLike(
                          loginUserId,
                          item.articleId,
                          item.formatA_likeUser
                        )
                      "
                      class="give_a_like"
                    ></el-link>
                  </el-col>
                </div>
              </el-row>
            </el-card>
          </div>
          <div class="mw_div_more_notes">
            <el-link
              :href="'/#/home?userId=' + personal.userId + '&pageId=1'"
              style="font-size: 20px"
              >共<strong>{{ articalTotal }}</strong
              >篇游记</el-link
            >
          </div>
          <!-- 问答部分 -->
          <div class="setMarginTop">
            <div v-for="(item, index) in currentShowAnswerList" :key="index">
              <el-card shadow="never" class="box-card">
                <a :href="'/#/wenda/question?qid=' + item.topic_id">
                  <div class="msg_content">
                    <el-row class="msg_title">
                      <el-col :span="2">
                        <el-tag type="warning">{{ index + 1 }}</el-tag>
                      </el-col>
                      <el-col
                        :span="20"
                        style="text-align: left; margin-top: 8px"
                      >
                        <span>
                          回答了<span>{{ item.to_uid }}</span
                          >关于 “<span style="color: #ff9d00">{{
                            item.topic_title
                          }}</span
                          >” 的问题</span
                        >
                      </el-col>
                    </el-row>
                    <el-row
                      style="
                        margin-top: 15px;
                        margin-left: 15px;
                        text-align: left;
                      "
                    >
                      <el-col :span="20">
                        {{ item.content }}
                      </el-col>
                    </el-row>
                    <el-row
                      style="
                        margin-top: 15px;
                        margin-bottom: 10px;
                        color: #999;
                        font-size: 13px;
                      "
                    >
                      <el-col :span="11">
                        <i class="el-icon-time"></i>
                        <span>{{ item.create_time | dateFormat }}</span>
                      </el-col>
                    </el-row>
                  </div>
                </a>
              </el-card>
            </div>
          </div>
          <div class="mw_div_more_notes">
            <el-link
              :href="'/#/home?userId=' + personal.userId + '&pageId=2'"
              style="font-size: 20px"
              >共<strong>{{ answerTotal }}</strong
              >个回答<strong>{{ questionTotal }}</strong
              >个提问</el-link
            >
          </div>
        </div>
        <!-- 游记部分 -->
        <div class="my_mwWayArticle" v-else-if="currentPart == 1">
          <!-- 抬头 -->
          <div class="mw_article_title">
            <div>
              <el-row>
                <el-col class="title_each_class title_border_class" :span="8">
                  <el-row
                    ><strong>{{ articalTotal }}</strong></el-row
                  >
                  <el-row style="color: #999">游记</el-row>
                </el-col>
                <el-col class="title_each_class title_border_class" :span="8">
                  <el-row
                    ><strong>{{ articleClickSum }}</strong></el-row
                  >
                  <el-row style="color: #999">阅读</el-row>
                </el-col>
                <el-col class="title_each_class" :span="8">
                  <el-row
                    ><strong>{{ articleLikeSum }}</strong></el-row
                  >
                  <el-row style="color: #999">点赞</el-row>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 游记内容 -->
          <div v-for="(item, index) in currentShowContent" :key="index">
            <el-card shadow="never">
              <el-row :gutter="12">
                <el-image
                  :src="item.img"
                  style="height: 400px; width: 100%"
                  fit="cover"
                ></el-image>
                <div style="margin: 0 20px">
                  <div style="height: 40px; text-align: left; margin-top: 5px">
                    <!-- <h3> -->
                    <el-link type="warning" style="font-size: 20px">{{
                      item.title
                    }}</el-link>
                    <!-- </h3>   -->
                  </div>
                  <div>
                    <a class="mw_a_articleContent">{{ item.text }}</a>
                  </div>
                </div>
              </el-row>
              <el-divider></el-divider>
              <el-row style="height: 30px; color: #999; font-size: 16px">
                <el-col :span="8">
                  <i class="el-icon-time"></i>
                  <span> {{ item.create_time | dateFormat }}</span>
                </el-col>
                <div>
                  <el-col :span="6" style="text-align: left">
                    <i class="el-icon-view"></i><span>{{ item.a_click }}</span>
                  </el-col>
                  <el-col :span="8" style="text-align: right">
                    <span>{{ item.a_like }}</span>
                    <el-link
                      :underline="false"
                      v-if="item.isLiked"
                      @click="
                        delOneArticleLike(
                          loginUserId,
                          item.articleId,
                          item.formatA_likeUser
                        )
                      "
                      class="have_a_like"
                    ></el-link>
                    <el-link
                      :underline="false"
                      v-else
                      @click="
                        setOneArticleLike(
                          loginUserId,
                          item.articleId,
                          item.formatA_likeUser
                        )
                      "
                      class="give_a_like"
                    ></el-link>
                  </el-col>
                </div>
              </el-row>
            </el-card>
          </div>
          <div class="mw_div_more_notes">
            <!-- 分页 -->
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="articleQueryInfo.pagenum"
              :page-size="5"
              layout="total, prev, pager, next"
              :total="articalTotal"
            >
            </el-pagination>
          </div>
        </div>
        <!-- 问答部分 -->
        <div class="my_mwWayWenda" v-else-if="currentPart == 2">
          <!-- 抬头 -->
          <div class="mw_wenda_title">
            <div>
              <el-row>
                <el-col class="title_each_class title_border_class" :span="12">
                  <el-row
                    ><strong>{{ questionTotal }}</strong></el-row
                  >
                  <el-row style="color: #999">问题数</el-row>
                </el-col>
                <el-col class="title_each_class" :span="12">
                  <el-row
                    ><strong>{{ answerTotal }}</strong></el-row
                  >
                  <el-row style="color: #999">回答数</el-row>
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 问答部分 -->
          <div class="setMarginTop">
            <el-tabs
              style="background-color: #fff"
              v-model="wendaActiveName"
              type="card"
            >
              <el-tab-pane label="TA的问题" name="first">
                <div v-for="(item, index) in questionList" :key="index">
                  <el-card shadow="never">
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
                        margin-top: 10px;
                        line-height: 40px;
                        height: 40px;
                        color: #999;
                        font-size: 13px;
                      "
                    >
                      <el-col
                        :span="14"
                        style="text-align: left; margin-left: 5px"
                      >
                        <i class="el-icon-time"></i>
                        <span> {{ item.create_time | dateFormat }}</span>
                      </el-col>
                      <el-col :span="3">
                        <i class="el-icon-view"></i
                        ><span>{{ item.q_click }}</span>
                      </el-col>
                      <el-col :span="3">
                        <i class="el-icon-s-comment"></i
                        ><span>{{ item.cmt }}</span></el-col
                      >
                      <el-col :span="3"
                        ><i class="el-icon-star-off"></i
                        ><span>{{ item.typeId }}</span></el-col
                      >
                    </el-row>
                  </el-card>
                </div>
                <!-- 加载更多数据 -->
                <el-row style="margin-top: 20px; margin-bottom: 20px">
                  <el-button
                    v-if="questionIsLoading === true"
                    style="width: 100%"
                    type="warning"
                    plain
                    icon="el-icon-arrow-down"
                    @click="AddMoreInfo('question')"
                    >加载更多</el-button
                  >
                  <div v-else style="text-align: center; color: #666">
                    暂无更多数据
                  </div>
                </el-row></el-tab-pane
              >
              <el-tab-pane label="TA的回答" name="second">
                <div v-for="(item, index) in answerList" :key="index">
                  <el-card shadow="never" class="box-card">
                    <a :href="'/#/wenda/question?qid=' + item.topic_id">
                      <div class="msg_content">
                        <el-row class="msg_title">
                          <el-col :span="2">
                            <el-tag type="warning">{{ index + 1 }}</el-tag>
                          </el-col>
                          <el-col
                            :span="20"
                            style="text-align: left; margin-top: 8px"
                          >
                            <span>
                              回答了<span>{{ item.to_uid }}</span
                              >关于 “<span style="color: #ff9d00">{{
                                item.topic_title
                              }}</span
                              >” 的问题</span
                            >
                          </el-col>
                        </el-row>
                        <el-row
                          style="
                            margin-top: 15px;
                            margin-left: 15px;
                            text-align: left;
                          "
                        >
                          <el-col :span="20">
                            {{ item.content }}
                          </el-col>
                        </el-row>
                        <el-row
                          style="
                            margin-top: 15px;
                            margin-bottom: 10px;
                            color: #999;
                            font-size: 13px;
                          "
                        >
                          <el-col :span="11">
                            <i class="el-icon-time"></i>
                            <span>{{ item.create_time | dateFormat }}</span>
                          </el-col>
                        </el-row>
                      </div>
                    </a>
                  </el-card>
                </div>
                <!-- 加载更多数据 -->
                <el-row style="margin-top: 20px; margin-bottom: 20px">
                  <el-button
                    v-if="ansIsLoading === true"
                    style="width: 100%"
                    type="warning"
                    plain
                    icon="el-icon-arrow-down"
                    @click="AddMoreInfo('answer')"
                    >加载更多</el-button
                  >
                  <div v-else style="text-align: center; color: #666">
                    暂无更多数据
                  </div>
                </el-row></el-tab-pane
              >
            </el-tabs>
          </div>
        </div>
      </el-main>

      <!-- 私信对话框部分 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="msg_content"
        >
        </el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onPrivateMsg">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
    <mw_footer>
      <slot name="header"></slot>
    </mw_footer>
  </el-container>
</template>
<script>
import mw_footer from "@/components/Footer.vue";
import mw_nav from "@/components/Nav.vue";
import mw_homeMap from "@/components/HomeMap.vue";
export default {
  name: "home",
  components: {
    mw_footer,
    mw_nav,
    mw_homeMap,
  },
  data() {
    return {
      type: false,
      loginUserId: "",
      dialogVisible: false,
      msg_content: "",
      // 留言板
      leave_content: "",
      leaveMsgList: [],
      // 当前显示的页面部分
      currentPart: 0,
      // 导航栏初始定位
      componentVisible: "mine",
      //   a: "/assets/image/1.jpg",
      // 主轮播图初始化数组
      imgList: [],
      // main部分初始化数据
      getMainContent: [],
      mainContent: [],
      currentShowContent: [],
      // 我的窝部分
      // ----------------
      currentShowArticleContent: [],
      currentShowAnswerList: [],
      // ----------------
      currentFollowList: [],
      //所有关注对象相关的数据
      allFocusInfoList: [],
      //所有ta的关注的数据
      allFollowList: [],
      // 导入侧边栏图片
      url: require("../../public/image/1.jpg"),
      // 关注分页查询条件
      queryInfo: {
        query: "",
        pagenum: 1,
      },
      // 文章分页查询条件
      articleQueryInfo: {
        query: "",
        pagenum: 1,
      },
      personal: {
        userId: "",
        avatar: "",
        username: "",
        sex: "",
        city: "",
        description: "",
      },
      user_fans: {
        foucsNum: 0,
        fansNum: 0,
      },
      total: 0,
      articalTotal: 0,
      // 多行文本域
      textarea: "",
      focusText: "关注",
      //   src: require("../../public/image/1.jpg"),
      // 游记部分
      articleClickSum: 0,
      articleLikeSum: 0,
      // 问答部分
      wendaActiveName: "first",
      questionTotal: 0,
      answerTotal: 0,
      questionList: [],
      allQuestionList: [],
      answerList: [],
      allAnswerList: [],
      currentQuesPage: 1,
      currentAnsPage: 1,
      questionIsLoading: true,
      ansIsLoading: true,
    };
  },
  created() {
    // 设置界面显示组件
    this.loginUserId = window.sessionStorage.getItem("userId");

    this.getInitHomeContent();
  },
  mounted() {
    this.setUrlChangeInfo();
  },
  watch: {
    $route(to, from) {
      if (to.path === "/home") {
        this.setUrlChangeInfo();
        this.getInitHomeContent();
      }
    },
    // "$route.path": function (newVal, oldVal) {
    //   //console.log(newVal+"---"+oldVal);
    //   console.log("欢迎进入注册页面", newVal, oldVal);
    // },
  },
  methods: {
    getInitHomeContent() {
      this.setShowContent();
      this.getPersonInfo();
      this.getUser_fans();
      this.getArticleList();
      this.getAllFollowList();
      this.getLeaveMsg();
      this.getQuestionInfo();
      this.getAnswerInfo();
    },
    setUrlChangeInfo() {
      var urlParams = this.publicMethod.getUrlParamsObj();
      var index = urlParams["pageId"];
      var oUl = document.getElementById("list");
      var Lis = oUl.getElementsByTagName("li");
      for (var i = 0; i < Lis.length; i++) {
        if (index == i) {
          Lis[i].classList.add("on");
          this.currentPart = i;
        } else {
          Lis[i].classList.remove("on");
        }
      }
    },
    // 用户界面组件是否可见
    setShowContent() {
      var userResult = this.publicMethod.getUrluserAndUser();
      if (userResult[0] === userResult[1]) {
        console.log("mine");
        this.componentVisible = "mine";
      } else {
        this.componentVisible = "other";
      }
    },
    // 获取个人后台信息
    async getPersonInfo() {
      var userResult = this.publicMethod.getUrluserAndUser();
      var sendId;
      sendId = userResult[0];
      const res = await this.$http.get("/api/setting", {
        params: {
          userId: sendId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          console.log(this.personal);
          for (var item in this.personal) {
            if (item == "avatar") {
              var avatar = res.data.avatar.split("\\")[2];
              this.personal[item] = require("../../../uploads/" + avatar);
            } else if (item == "userId") {
              this.personal[item] = sendId;
            } else {
              this.personal[item] = res.data[item];
            }
          }
        }
      }
    },
    async getUser_fans() {
      var userResult = this.publicMethod.getUrluserAndUser();
      var sendId;

      sendId = userResult[0];
      const res = await this.$http.get("/api/getUser_Follow_fans", {
        params: {
          userId: sendId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          for (var item in this.user_fans) {
            this.user_fans[item] = res.data[item];
          }
        }
      }
      var fansId = res.data.fansIdList.some((item) => {
        if (item.fansId === userResult[1]) {
          return true;
        }
      });
      if (fansId) {
        this.focusText = "已关注";
      } else {
        this.focusText = "关注";
      }
    },
    async getArticleList() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getAllArticle", {
        params: {
          userId: userResult[0],
        },
      });
      const articleRes = await this.$http.get("/api/getArticleCountOfUser", {
        params: {
          userId: userResult[0],
        },
      });
      this.articleClickSum = articleRes.data.result[0].articleClickSum;
      this.articleLikeSum = articleRes.data.result[0].articleLikeSum;
      console.log(articleRes);
      this.getMainContent = res.data.result;
      if (this.getMainContent.length == 0) {
        this.articalTotal = 0;
        this.mainContent = [];
      } else {
        for (var i = 0; i < this.getMainContent.length; i++) {
          var url = this.getMainContent[i].a_file + "";
          let reg = /<\/?.+?\/?>/g;
          if (this.getMainContent[i].a_likeList == undefined) {
            var formatA_likeUser = [];
          } else {
            var formatA_likeUser = JSON.parse(
              this.getMainContent[i].a_likeList
            );
          }
          if (formatA_likeUser.includes(this.loginUserId)) {
            var isLiked = true;
          } else {
            var isLiked = false;
          }
          this.mainContent[i] = {
            img: this.getMainContent[i].file,
            // text: i,
            title: this.getMainContent[i].title,
            text: this.getMainContent[i].text.replace(reg, ""),
            articleId: this.getMainContent[i].articleId,
            create_time: this.getMainContent[i].create_time,
            a_click: this.getMainContent[i].a_click,
            a_like: this.getMainContent[i].a_like,
            isLiked: isLiked,
            formatA_likeUser: formatA_likeUser,
            file: this.getMainContent[i].file,
            state: this.getMainContent[i].state,
          };
          // console.log(this.mainContent);
        }
        this.articalTotal = this.mainContent.length;
        this.currentShowArticleContent = this.mainContent.slice(0, 5);
      }
      this.handleCurrentChange(this.articleQueryInfo.pagenum);
    },
    // 游记分页---当前页
    handleCurrentChange(newPage) {
      this.articleQueryInfo.pagenum = newPage;
      this.currentShowContent = this.mainContent.slice(
        (newPage - 1) * 5,
        newPage * 5
      );
    },
    getImageList() {
      for (var i = 1; i <= 4; i++) {
        this.imgList.push(require("../../public/image/" + i + ".jpg"));
      }
      console.log(this.imgList);
    },
    async getAllFollowList() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getFocusInfo", {
        params: {
          userId: userResult[0],
        },
      });
      console.log(res);
      var avatar;
      this.allFocusInfoList = res.data.result;
      for (var i = 0; i < this.allFocusInfoList.length; i++) {
        avatar = this.allFocusInfoList[i].avatar.split("\\")[2];
        this.allFollowList[i] = {
          avatar: require("../../../uploads/" + avatar),
          userId: this.allFocusInfoList[i].userId,
          username: this.allFocusInfoList[i].username,
        };
      }
      console.log(this.allFollowList);
      this.total = this.allFollowList.length;
      this.followHandleCurrentChange(this.queryInfo.pagenum);
    },
    // 分页---当前页
    followHandleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.currentFollowList = this.allFollowList.slice(
        (newPage - 1) * 8,
        newPage * 8
      );
    },
    handleSelect() {},
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 关注与已关注
    async onFocus() {
      if (this.focusText === "关注") {
        var userResult = this.publicMethod.getUrluserAndUser();
        const res = await this.$http.post("/api/setUser_follow", {
          userId: userResult[0],
          fansId: userResult[1],
        });
        console.log(res, "reasas");
        this.focusText = "已关注";
      } else {
        var userResult = this.publicMethod.getUrluserAndUser();
        const res = await this.$http.post("/api/deleteUser_follow", {
          userId: userResult[0],
          fansId: userResult[1],
        });
        console.log(res, "reasas");
        this.focusText = "关注";
      }
    },
    async onPrivateMsg() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.post("/api/addOnePrivateMsg", {
        receiver_id: userResult[0],
        sender_id: userResult[1],
        msg_type: 0,
        msg_content: this.msg_content,
        status: 0,
      });
      if (res.status !== 200) {
        return this.$message.error("发送失败");
      } else {
        if (!res.data.state) {
          this.dialogVisible = false;
          this.$message.success("发送消息成功");
          this.msg_content = "";
        }
      }
      console.log(res);
    },
    async onLeaveMsg() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.post("/api/addOneLeaveMsg", {
        receiver_id: userResult[0],
        sender_id: userResult[1],
        leave_content: this.leave_content,
      });
      if (res.status !== 200) {
        return this.$message.error("发送失败");
      } else {
        if (!res.data.state) {
          this.leave_content = "";
          this.getLeaveMsg();
        }
      }
      console.log(res);
    },
    async getLeaveMsg() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getLeaveMsgOfUser", {
        params: { receiver_id: userResult[0] },
      });
      if (res.status !== 200) {
        return this.$message.error("发送失败");
      } else {
        if (!res.data.state) {
          this.leaveMsgList = res.data.result;
        }
      }
      console.log(res);
    },
    // 点赞数加一
    async setOneArticleLike(loginUserId, articleId, formatA_likeUser) {
      formatA_likeUser.push(loginUserId);
      const res = await this.$http.post("/api/addOneArticleLike", {
        articleId: articleId,
        a_likeList: JSON.stringify(formatA_likeUser),
      });
      if (res.status !== 200) {
        return this.$message.error("发送失败");
      } else {
        if (!res.data.state) {
          this.getArticleList();
        } else {
          return this.$message.error("点赞失败");
        }
      }
    },
    // 点赞数减一
    async delOneArticleLike(loginUserId, articleId, formatA_likeUser) {
      var a_likeUser = formatA_likeUser.filter(function (item) {
        return item != loginUserId;
      });
      const res = await this.$http.post("/api/delOneArticleLike", {
        articleId: articleId,
        a_likeList: JSON.stringify(a_likeUser),
      });
      if (res.status !== 200) {
        return this.$message.error("点赞取消失败");
      } else {
        if (!res.data.state) {
          this.getArticleList();
        } else {
          return this.$message.error("点赞取消失败");
        }
      }
    },
    // 获取问题信息
    async getQuestionInfo() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getQuesOrAnsInfo", {
        params: {
          userId: userResult[0],
          page: "question",
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.allQuestionList = res.data.result;
          this.questionTotal = this.allQuestionList.length;
          this.questionList = this.currentPageShow(
            this.currentQuesPage,
            this.allQuestionList
          );
          if (this.questionList.length >= this.allQuestionList.length) {
            this.questionIsLoading = false;
          }
        }
      }
    },
    // 获取回答信息
    async getAnswerInfo() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getQuesOrAnsInfo", {
        params: {
          userId: userResult[0],
          page: "answer",
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.allAnswerList = res.data.result;
          this.currentShowAnswerList = this.allAnswerList.slice(0, 5);
          this.answerTotal = this.allAnswerList.length;
          this.answerList = this.currentPageShow(
            this.currentQuesPage,
            this.allAnswerList
          );
          if (this.answerList.length >= this.allAnswerList.length) {
            this.ansIsLoading = false;
          }
        }
      }
    },
    AddMoreInfo(pageName) {
      if (pageName === "question") {
        this.currentQuesPage++;
        this.questionList = this.currentPageShow(
          this.currentQuesPage,
          this.allQuestionList
        );
        if (this.questionList.length >= this.allQuestionList.length) {
          this.questionIsLoading = false;
        }
        console.log(pageName);
      } else if (pageName === "answer") {
        this.currentAnsPage++;
        this.answerList = this.currentPageShow(
          this.currentAnsPage,
          this.allAnswerList
        );
        if (this.answerList.length >= this.allAnswerList.length) {
          this.ansIsLoading = false;
        }
      }
    },
    currentPageShow(currentPage, allList) {
      return allList.slice(0, 8 * currentPage);
    },
  },
  computed: {},
};
</script>
<style Lang="less" scoped>
/** 
侧边栏
*/
.other_activity {
  height: 60px;
  line-height: 60px;
}
.other_activity_left {
  color: #333;
  float: left;
  font-size: 18px;
  display: block;
}
/* 个人设置 */
.author_avatar {
  margin-left: 100px;
  display: block;
  margin-top: -70px;
  z-index: 20;
  position: absolute;
}
.mw_div_option {
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
.mw_i_icon {
  color: white;
  background: #f56c6c;
  border-radius: 50px;
  padding: 2px;
}
/* Ta 的关注 */
.mw_person_follow_title {
  font-size: 18px;
  text-align: center;
  margin: 20px 0px;
}
.mw_person_follow_info {
  display: block;
  margin: 5px 10px;
  text-align: center;
  float: left;
}
.follow_info_username {
  line-height: 16px;
  height: 16px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 10px;
  color: #ff7200;
  font-size: 12px;
}
.mw_person_follow_pagination {
  clear: both;
  text-align: center;
}
/* 留言板 */
.mw_leavecontent_class {
  text-align: left;
}
.mw_btn_msgboard {
  font-size: 20px;
  margin-top: 10px;
  width: 100%;
}
.example_travel_activity {
  color: #ff9d00;
}
.activity_text {
  margin: 0px;
}
.example_travel_line:hover,
.example_travel_activity:hover {
  text-decoration: underline;
}
.travel_line h3 {
  margin: 10px 0 5px;
  width: 170px;
  height: 20px;
  line-height: 20px;
  font-size: 17px;
  text-decoration: none;
  font-weight: normal;
}
.travel_title,
.travel_strategy,
.travel_activity {
  height: 35px;
  line-height: 35px;
}
.travel_column,
.strategy_column,
.new_activity {
  color: #333;
  float: left;
  font-size: 18px;
  display: block;
}
.column_main,
.more {
  float: right;
  color: #999;
}
.give_a_like {
  background: url("../../assets/img/点赞.png") no-repeat;
  height: 30px;
  width: 30px;
  margin: -5px 0 0;
  position: absolute;
  background-size: 100% 100%;
}
.have_a_like {
  background: url("../../assets/img/爱心.png") no-repeat;
  height: 30px;
  width: 30px;
  margin: -5px 0 0;
  position: absolute;
  background-size: 100% 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  display: contents;
}
.el-col-9 {
  width: auto;
}
/* 
主页内容
*/
.el-main {
  color: #333;
  text-align: center;
}
.mw_a_articleContent {
  text-align: left;
  display: block;
  width: 100%;
  height: 100%;
  max-height: 85px;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  color: #666;
}

body > .el-container {
  margin-bottom: 40px;
}
.child_container {
  margin: 0 170px;
}
.mw_div_more_notes {
  /* background-color: #fff; */
  padding-top: 20px;
}
.mw_div_more_notes strong {
  color: #ffb640;
  font-weight: normal;
  font-family: Arial;
  margin: 0 5px;
  font-size: 32px;
  position: relative;
  top: 2px;
}
/* 
头部区域
*/
.aside_carousel_img {
  width: 100%;
  height: 100%;
}
.personal_header {
  height: 570px;
}
.tags_bar {
  height: 58px;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.95);
  border-bottom: #d6d6d6 1px solid;
  box-shadow: 0 2px 5px rgb(0 0 0 / 12%);
}
.mw_headerBottom_col {
  float: right;
}
.center {
  width: 980px;
  margin: 0 auto;
  position: relative;
}
.flt2 {
  float: right;
  margin: 0px !important;
}
.tags_bar li {
  float: left;
  position: relative;
  z-index: 10;
}
li,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.tags_bar li .tags_link {
  display: block;
  margin-left: 12px;
  margin-top: 10px;
  padding: 0 15px;
  position: relative;
  font-size: 18px;
  height: 48px;
  line-height: 38px;
  color: #444;
  border-radius: 5px 5px 0 0;
  z-index: 1;
}
.tags_bar li .tags_link:after {
  content: "";
  width: 100%;
  height: 3px;
  background-color: #ff8a00;
  position: absolute;
  left: 0;
  bottom: 0;
  display: none;
}
.tags_bar li.on .tags_link:after {
  display: block;
}

/* 游记/问答部分 */
.mw_article_title,
.mw_wenda_title {
  background-color: #fff;
  font-size: 16px;
}
.title_each_class {
  margin: 15px 0;
}
.title_border_class {
  border-right: 1px solid rgb(209, 209, 209);
}
.setMarginTop {
  margin-top: 10px;
}
.msg_content {
  width: 570px;
  padding-left: 20px;
  float: left;
  font-size: 14px;
}
</style>