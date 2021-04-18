    // // 定义一些公共的属性和方法
    // const httpUrl = 'http://39.105.17.99:8080/'
    function formatDateToY_M_D(originVal) {
      const date = new Date(originVal)
      var y = date.getFullYear()
      var m = ((date.getMonth() + 1) + "").padStart(2, '0')
      var d = (date.getDate() + "").padStart(2, '0')
      // var hh = (date.getHours() + "").padStart(2, '0')
      // var mm = (date.getMinutes() + "").padStart(2, '0')
      // var ss = (date.getSeconds() + "").padStart(2, '0')

      // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
      return `${y}-${m}-${d}`
    }

    function formatDateToY_M_D_H_M_S(originVal) {
      const date = new Date(originVal)
      var y = date.getFullYear()
      var m = (date.getMonth() + "").padStart(2, '0')
      var d = (date.getDate() + "").padStart(2, '0')
      var hh = (date.getHours() + "").padStart(2, '0')
      var mm = (date.getMinutes() + "").padStart(2, '0')
      var ss = (date.getSeconds() + "").padStart(2, '0')

      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
    function getUrluserAndUser() {
      var queryInfo = window.location.href.split("?")[1];
      var url_userId = queryInfo.split("=")[1];
      var userId = window.sessionStorage.getItem("userId");
      return [url_userId, userId];
    }

    // 暴露出这些属性和方法
    export default {
      // httpUrl,
      formatDateToY_M_D,
      formatDateToY_M_D_H_M_S,
      getUrluserAndUser,
    }
