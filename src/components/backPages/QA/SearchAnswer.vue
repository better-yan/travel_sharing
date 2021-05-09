<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/backHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问答管理</el-breadcrumb-item>
      <el-breadcrumb-item>问题列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
      <!-- 搜索与添加 -->
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col>
          <el-input
            clearable
            @clear="getQuestionList"
            placeholder="请输入内容"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getQuestionList"
            ></el-button> </el-input
        ></el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="回答Id" prop="rid"></el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="问题标题"
          prop="topic_title"
          width="300px"
        ></el-table-column>
        <el-table-column label="评论内容" prop="content"></el-table-column>
        <el-table-column label="评论用户id" prop="from_uid"></el-table-column>
        <el-table-column label="评论目标用户id" prop="to_uid"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              :enterable="false"
              effect="dark"
              content="设置热门"
              placement="top-start"
            >
              <!-- 设置热门 -->
              <el-button
                type="danger"
                icon="el-icon-collection-tag"
                size="mini"
                @click="setHotById(scope.row.qid, 2)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 文章详情的对话框 -->
    <el-dialog title="修改用户" :visible.sync="detailDialogVisible" width="80%">
      <!-- 内容主题区域 -->
      <el-form :disabled="true" :model="articleForm" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="articleForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="articleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="游记内容" prop="text">
          <el-input
            type="textarea"
            :rows="3"
            v-model="articleForm.text"
            v-html="articleForm.text"
          ></el-input>
        </el-form-item>
        <el-form-item label="点击率" prop="a_click">
          <el-input v-model="articleForm.a_click"></el-input>
        </el-form-item>
        <el-form-item label="点赞数" prop="a_like">
          <el-input v-model="articleForm.a_like"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        //当前页数
        pagenum: 1,
        //当前每页显示数据数
        pagesize: 5,
      },
      userlist: [],
      total: 0,
      userinfo: {},
      rolesList: [],
      selectedRoleId: "",
      detailDialogVisible: false,
      articleForm: "",
    };
  },
  created() {
    this.getQuestionList();
  },
  methods: {
    async getQuestionList() {
      const res = await this.$http.get("/api/searchAnswer", {
        params: this.queryInfo,
      });
      if (res.status !== 200) {
        return this.$message.error("获取问题失败");
      }
      this.userlist = res.data.result;
      this.total = res.data.total;
      console.log(res);
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getQuestionList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getQuestionList();
    },
    // 设置热门
    async setHotById(id, state) {
      const res = await this.$http.put(`/api/searchAnswer/${id}/${state}`);
      console.log(res);
      if (res.status !== 200) {
        return this.$message.error("设置热门失败");
      } else {
        if (!res.data.state) {
          this.$message.success("设置热门成功");
          this.getQuestionList();
        } else {
          return this.$message.error("设置热门失败");
        }
      }
    },
    // 得到文章详细信息
    getArticle(rowInfo) {
      this.articleForm = rowInfo;
      this.detailDialogVisible = true;
    },
  },
};
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 15px;
}
</style>