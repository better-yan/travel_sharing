<template>
  <el-footer height="200px">
    <el-row :gutter="20" class="footer_main">
      <el-col :span="5"
        ><div>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div></el-col
      >
      <el-col :span="5">
        <div>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
      </el-col>
      <el-col :span="9"></el-col>
    </el-row>
  </el-footer>
</template>
<script>
export default {
  name: "mw_footer",
};
</script>
<style lang="less" scoped>
/* 
尾部区域
*/
.footer_main {
  margin: 10px 150px;
}
.el-footer {
  clear: both;
  background-color: #3c3c3c;
  color: #c2c2c2;
  /* line-height: 60px; */
  padding: 20px;
  font-size: 12px;
}
</style>