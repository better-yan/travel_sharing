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
              text-color="#666"
              active-text-color="#ffa800"
            >
              <el-menu-item index="1">
                <i class="el-icon-star-off"></i>
                <span slot="title">关注</span>
              </el-menu-item>
              <el-menu-item index="2">
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
                  <div v-for="(item, index) in currentFollowList" :key="index">
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
                              <el-row>{{ item.articleNotesNum }}</el-row>
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
                          <el-button type="warning">{{ item.foucsText }}</el-button>
                          <el-button type="warning" plain>私信</el-button>
                        </div>
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-row>
              <el-row>
                <!-- <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="100"
                    layout="total, prev, pager, next"
                    :total="1000"
                  >
                  </el-pagination>
                </div> -->
              </el-row>
            </div>
            <div></div>
          </el-card>
          <el-card
            shadow="never"
            class="box-card"
            v-else-if="currentShowIndex === '2'"
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
  name: "follow",
  components: {
    mw_footer,
    mw_nav,
  },
  data() {
    return {
      currentShowIndex: "1",
      // 关注
      allFollowList: [],
      allFocusInfoList: [],
      currentFollowList: [],
      // 查询符合条件的关注（分页）
      queryInfo: {
        query: "",
        pagenum: 1,
      },
      foucusTotal: 0,
      fansTotal: 0,
      foucsText: "关注",
    };
  },
  created() {
    this.getFollowInfo();
  },
  methods: {
    // 获取关注的信息
    async getFollowInfo() {
      var userResult = this.publicMethod.getUrluserAndUser();
      const res = await this.$http.get("/api/getFocusDetailInfo", {
        params: {
          userId: userResult[0],
        },
      });
      console.log(res);
      var avatar;
      const {
        foucusInfo,
        foucusArticleInfo,
        foucus_fansInfo,
      } = res.data.result;
      // 计算游记数
      var userObj_articleNum = foucusArticleInfo.reduce(function (
        userObj,
        currentItem
      ) {
        userObj[currentItem.userId] = userObj[currentItem.userId] + 1 || 1;
        return userObj;
      },
      {});
      // 计算粉丝数
      var userObj_fansNum = foucus_fansInfo.reduce(function (
        userObj,
        currentItem
      ) {
        userObj[currentItem.userId] = userObj[currentItem.userId] + 1 || 1;
        return userObj;
      },
      {});

      // 获取当前登录用户的关注id
      // 关注按钮显示文本
      const { data: loginUser_res } = await this.$http.get(
        "/api/getFocusInfo",
        {
          params: {
            userId: userResult[1],
          },
        }
      );
      const loginUserInfo = loginUser_res.result;
      var loginUser = {};
      for (var i = 0; i < loginUserInfo.length; i++) {
        loginUser[loginUserInfo[i].userId] = true;
      }

      // 格式化显示内容
      for (var i = 0; i < foucusInfo.length; i++) {
        avatar = foucusInfo[i].avatar.split("\\")[2];
        this.allFollowList[i] = {
          avatar: require("../../../uploads/" + avatar),
          userId: foucusInfo[i].userId,
          username: foucusInfo[i].username,
          sex: foucusInfo[i].sex,
          articleNotesNum: userObj_articleNum[foucusInfo[i].userId] || 0,
          fansNum: userObj_fansNum[foucusInfo[i].userId] || 0,
          footprint: 0,
          foucsText: loginUser[foucusInfo[i].userId] ? "已关注" : "关注",
        };
      }
      this.foucusTotal = this.allFollowList.length;

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
