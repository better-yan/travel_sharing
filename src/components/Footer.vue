<template>
  <el-footer style="display: inline-table">
    <div class="mw_footer_class">
      <el-row :gutter="20" class="footer_main">
        <el-col :span="5"
          ><div>
            <p>麦味旅游网</p>
            <p>中国年轻一代用得更多的旅游网站</p>
            <p>上亿旅行者共同打造的"旅行神器"</p>
            <p>60,000 多个全球旅游目的地</p>
            <p>600,000 个细分目的地新玩法</p>
          </div></el-col
        >
        <el-col :span="5">
          <div>
            <p>关于我们</p>
            <p>关于麦味</p>
            <p>联系我们</p>
            <p>麦味旅游网服务监督员</p>
            <p>网站地图</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <p>旅行服务</p>
            <p>旅游攻略</p>
            <p>旅游问答</p>
            <p>旅游指南</p>
            <p>旅游资讯</p>
          </div>
        </el-col>
        <el-col :span="3">
          <el-image class="mw_footer_image" :src="qrcodeTel"></el-image
        ></el-col>
        <el-col :span="3">
          <el-image class="mw_footer_image" :src="qrcodeChat"></el-image
        ></el-col>
        <el-col :span="3">
          <el-image class="mw_footer_image" :src="qrcodeLoc"></el-image>
        </el-col>
      </el-row>
      <el-row style="text-align: center; font-size: 15px">
        <p>旅游之前先上麦味</p>
        <p>
          <i
            class="fa fa-weibo fa-lg mw_footer_icon_class"
            aria-hidden="true"
          ></i>
          <i
            class="fa fa-weixin fa-lg mw_footer_icon_class"
            aria-hidden="true"
          ></i>
          <i
            class="fa fa-whatsapp fa-lg mw_footer_icon_class"
            aria-hidden="true"
          ></i>
          <i class="fa fa-qq fa-lg mw_footer_icon_class" aria-hidden="true"></i>
        </p>
      </el-row>
      <el-divider></el-divider>
      <el-row style="text-align: center; font-size: 13px">
        <p>
          2020-2021 © 麦味网™ qyer.com All rights reserved. Version v
          京ICP备12003524号 京公网安备11010502023470 京ICP证140673号
        </p>
        <p>
          麦味网为旅行者提供原创实用的出境游旅行指南和旅游攻略、旅行社区和问答交流平台。
        </p>
      </el-row>
    </div>
  </el-footer>
</template>
<script>
export default {
  name: "mw_footer",
  data() {
    return {
      qrcodeTel: require("../public/image/qrcodeTel.png"),
      qrcodeChat: require("../public/image/qrcodeChat.png"),
      qrcodeLoc: require("../public/image/qrcodeLoc.png"),
    };
  },
};
</script>
<style lang="less" scoped>
/* 
尾部区域
*/
.mw_footer_class {
  padding: 0 50px;
}
.mw_footer_image {
  height: 120px;
  width: 120px;
  line-height: 150px;
  margin: auto;
  transform: translate(-50%, 10%);
}
.mw_footer_icon_class {
  padding: 0 5px;
}
.footer_main {
  margin: 10px 150px;
}
.el-footer {
  clear: both;
  background-color: #3c3c3c;
  color: #c2c2c2;
  padding: 20px;
  font-size: 12px;
  bottom: 0;
  // position: absolute;
  // width: 100%;
}
</style>