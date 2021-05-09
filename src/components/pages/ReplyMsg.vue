<template>
  <el-container>
    <el-header>
      <mw_nav ref="mw_nav">
        <slot name="nav"></slot>
      </mw_nav>
    </el-header>
    <el-container class="child_container">
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: 'myWay' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>回答</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div v-for="(item, index) in showReplyMsg" :key="index">
          <el-card shadow="hover" class="box-card">
            <div class="msg_avatar">
              <a :href="'/#/home?userId=' + item.userId">
                <el-avatar
                  :size="50"
                  shape="square"
                  :src="item.avatar | filterAvatar"
                ></el-avatar>
              </a>
            </div>
            <a :href="'/#/wenda/question?qid=' + item.topic_id">
              <div class="msg_content">
                <el-row class="msg_title">
                  <el-col :span="10">
                    <span>
                      <span style="color: #ff9d00;font-size:17px">{{ item.username }}</span>
                      回答了你关于 “<span style="color: #ff9d00">{{ item.topic_title }}</span>” 的问题</span
                    >
                  </el-col>
                  <el-col :span="11">
                    <span style="float: right">{{
                      item.send_time | dateFormat
                    }}</span>
                  </el-col>
                  <el-col :span="3">
                    <el-button
                      icon="el-icon-close"
                      style="float: right; padding: 3px 0"
                      type="text"
                      circle
                    ></el-button>
                  </el-col>
                </el-row>
                <el-row style="margin-top:15px">
                  <el-col :span="20">
                    {{ item.content }}
                  </el-col>
                  <el-col :span="4">
                    <el-badge
                      v-if="item.count > 0"
                      :value="item.count"
                      class="mark"
                    />
                  </el-col>
                </el-row>
              </div>
            </a>
          </el-card>
        </div>
      </el-main>
      <el-aside width="30%">
        <mw_backtop>
          <slot></slot>
        </mw_backtop>
      </el-aside>
    </el-container>
    <mw_footer>
      <slot name="header"></slot>
    </mw_footer>
  </el-container>
</template>

<script>
import mw_nav from "@/components/Nav.vue";
import mw_backtop from "@/components/Backtop.vue";
import mw_footer from "@/components/Footer.vue";
export default {
  name: "privateMsg",
  components: {
    mw_footer,
    mw_nav,
    mw_backtop,
  },
  data() {
    return {
      showReplyMsg: [],
      allFormatMsgList: [],
    };
  },
  created() {
    this.getReplyMsgOfUser();
    // 得到未读取的新消息数
    // this.getMewMsgCount();
  },
  mounted() {},
  methods: {
    async getReplyMsgOfUser() {
      var sessionUserId = window.sessionStorage.getItem("userId");
      const res = await this.$http.get("/api/getReplyMsgOfUser", {
        params: {
          userId: sessionUserId,
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.allFormatMsgList = res.data.result;
          console.log("test", this.allFormatMsgList);
          this.showReplyMsg = this.allFormatMsgList;
          //   this.hotAnswerList = this.currentPageShow(
          //     this.currentHotPage,
          //     this.allHotAnswerList
          //   );
          //   if (this.hotAnswerList.length >= this.allHotAnswerList.length) {
          //     this.hotIsLoading = false;
          //   }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.child_container {
  margin: 20px 170px;
}
.box-card {
  //   margin: 15px 0;
  width: 658px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: box-shadow 0.25s linear 0s;
}
.box-card:hover {
  border-color: #fc9c27;
  box-shadow: 0 0 5px #ffa200;
}
.text_item {
  margin: 15px 5px;
}
.msg_avatar {
  width: 48px;
  height: 48px;
  float: left;
  border-radius: 50%;
  float: lef;
}
.msg_content {
  width: 570px;
  padding-left: 20px;
  float: left;
  font-size: 14px;
}
.msg_title {
  line-height: 24px;
  margin: -5px 0 5px 0;
}
</style>