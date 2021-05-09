<template>
  <el-container>
    <el-header>
      <mw_nav ref="mw_nav">
        <slot name="nav"></slot>
      </mw_nav>
    </el-header>
    <el-container class="child_container">
      <div>
        <el-page-header @back="goBack" content="详情页面"> </el-page-header>
        <!-- <GeminiScrollbar class="my-scroll-bar"> content... </GeminiScrollbar> -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div>{{ talkUsername }}</div>
          </div>
           
          <div class="wxchatBorderRightMid">
            <div v-for="(item, index) in allFormatMsgList" :key="index">
              <div
                style="margin-left: 30px; margin-top: 15px"
                v-if="item.sender_id == loginUser"
              >
                <div align="center" style="padding: 15px 0">
                   
                  <el-tag type="info" size="mini">{{
                    item.send_time | dateFormat
                  }}</el-tag>
                </div>
                <el-row>
                  <el-col :span="21"
                    > 
                    <div class="chatPop2">
                      <span style="line-height: 23px">{{
                        item.msg_content
                      }}</span>
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <el-avatar
                      shape="square"
                      :src="item.avatar | filterAvatar"
                      style="width: 35px; height: 35px"
                    ></el-avatar>
                  </el-col> </el-row
                > 
              </div>
              <div
                style="margin-left: 30px; margin-top: 15px"
                v-if="item.sender_id != loginUser"
              >
                 
                <div align="center" style="padding: 15px 0">
                  <el-tag type="info" size="mini">{{
                    item.send_time | dateFormat
                  }}</el-tag>
                     
                </div>
                <el-row
                  > 
                  <el-col :span="2">
                     
                    <el-avatar
                      shape="square"
                      :src="item.avatar | filterAvatar"
                      style="width: 35px; height: 35px"
                    ></el-avatar>
                  </el-col>
                   
                  <el-col :span="12"
                    > 
                    <div class="chatPop1">
                       
                      <span style="line-height: 23px">{{
                        item.msg_content
                      }}</span>
                       
                    </div>
                     
                  </el-col>
                    </el-row
                > 
              </div>
            </div>
          </div>
          <!-- <el-divider></el-divider> -->
          <div>
             
            <div class="wxchatIcon1"><i class="el-icon-star-off"></i>    </div>
            <div class="wxchatIcon2">
              <i class="el-icon-folder-remove"></i>    
            </div>
            <div class="wxchatIcon3"><i class="el-icon-scissors"></i>    </div>
            <div class="wxchatIcon4">
              <i class="el-icon-chat-dot-round"></i>    
            </div>
             
          </div>
          <div style="margin: -2px 15px">
             
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
              placeholder=""
              v-model="msg_content"
              resize="none"
              autofocus
              maxlength="500"
            >
            </el-input>
          </div>
          <div class="sendButton">
            <el-button @click="onPrivateMsg" type="warning" size="middle">发送</el-button>    
          </div>
           
        </el-card>
      </div>
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
  name: "msgDetail",
  components: {
    mw_footer,
    mw_nav,
    mw_backtop,
  },
  data() {
    return {
      msg_content: "",
      loginUser: "",
      talkUsername: "",
      allFormatMsgList: [],
    };
  },
  created() {
    this.loginUser = window.sessionStorage.getItem("userId");
    this.getUserBaseInfo();
    this.getEachPriMsgOfUser();
  },
  methods: {
    async getUserBaseInfo() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/setting", {
        params: {
          userId: userResult[0],
        },
      });
      if (res.status !== 200) {
        // return console.log("登陆失败");
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          console.log(this.baseForm);
          this.talkUsername = res.data.username;
        }
      }
    },
    async getEachPriMsgOfUser() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getEachPriMsgOfUser", {
        params: {
          loginUserId: userResult[1],
          userId: userResult[0],
        },
      });
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("查询失败");
      } else {
        if (!res.data.state) {
          this.allFormatMsgList = res.data.result;
          console.log("test", this.allFormatMsgList);
        }
      }
    },
    goBack() {
      window.location.go(-1); //刷新上一页
      console.log("fobacj");
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
          this.msg_content = "";
          this.getEachPriMsgOfUser();
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
  width: 800px;
  height: 700px;
  margin: 10px auto;
}
.wxchatBorderRightMid {
  overflow: auto;
  height: 430px;
  background-color: #f5f5f5;
  //   border: 2px solid rgb(247, 247, 247);
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

// .my-scroll-bar {
//   height: 100%;
// }
// .gm-scrollbar.-vertical {
//   background-color: #f0f0f0;
// }

// .gm-scrollbar.-horizontal {
//   background-color: transparent;
// }

// .gm-scrollbar .thumb {
//   background-color: rebeccapurple;
// }
// .gm-scrollbar .thumb:hover {
//   background-color: fuchsia;
// }

.chatPop1 :hover {
  background-color: #fafafa;
}

.chatPop1 span {
  background-color: #fff;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 0px 0 10px 10px;
  position: relative;
  border: 1px solid #e3e3e3;
  max-width: 290px;
}

.chatPop1 span::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid #fff;
  position: absolute;
  top: 8px;
  left: -16px;
}

.chatPop2 :hover {
  background-color: #ff9d00;
}

.chatPop2 span {
  background-color: #ff9d00;
  padding: 5px 8px;
  display: inline-block;
  border-radius: 10px;
  margin: 0px 15px 10px 10px;
  position: relative;
  border: 1px solid #e3e3e3;
  max-width: 290px;
  float: right;
  color: #fff;
}

.chatPop2 span::after {
  content: "";
  border: 8px solid #ffffff00;
  border-right: 8px solid #ff9d00;
  position: absolute;
  top: 8px;
  right: -16px;
  transform: rotateY(180deg);
}

.wxchatIcon1 {
  display: inline-block;
  padding: 8px 10px 10px 30px;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.wxchatIcon2 {
  display: inline-block;
  padding: 8px 10px 10px 20px;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.wxchatIcon3 {
  display: inline-block;
  padding: 8px 10px 10px 10px;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.wxchatIcon4 {
  display: inline-block;
  padding: 8px 10px 10px 0px;
  width: 40px;
  height: 40px;
  font-size: 20px;
}
.sendButton {
  float: right;
  margin-top: 10px;
  margin-right: 28px;
  margin-bottom: 10px;
}
</style>