import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import test from '@/components/test'
import Blog from '@/components/pages/Blog'
import MyWay from '@/components/pages/MyWay'
import Login from '../components/Login'
import Home from '../components/pages/Home'
import Setting from '../components/pages/Setting'
import Follow from '../components/pages/Follow'
import CreateNotes from '../components/pages/CreateNotes'
import Article from '../components/pages/Article'
import Wenda from '../components/pages/Wenda'
import AddQuestion from '../components/pages/AddQuestion'
import Question from '../components/pages/Question'
import PrivateMsg from '../components/pages/PrivateMsg'
import MsgDetail from '../components/pages/MsgDetail'
import ReplyMsg from '../components/pages/ReplyMsg'
import Search from '../components/pages/Search'
import BackLogin from '../components/backPages/BackLogin.vue'
import BackHome from '../components/backPages/BackHome.vue'
import Welcome from '../components/backPages/Welcome.vue'
import Users from '../components/backPages/user/Users.vue'
import AdminList from '../components/backPages/user/AdminList.vue'
import SetPwd from '../components/backPages/user/SetPwd.vue'
import UpdateAdmin from '../components/backPages/user/UpdateAdmin.vue'
import SearchNote from '../components/backPages/notes/SearchNote.vue'
import SearchQA from '../components/backPages/QA/SearchQA.vue'
import SearchAnswer from '../components/backPages/QA/searchAnswer.vue'


Vue.use(Router)

const routes = [
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: test
  // }, 
  {
    path: '/', // http://localhost:8080/#/
    redirect: '/login'
  },
  {
    path: '/login', // http://localhost:8080/#/blog
    name: 'Login',
    component: Login
  },
  {
    path: '/blog', // http://localhost:8080/#/blog
    name: 'Blog',
    component: Blog
  },
  {
    path: '/myway', // http://localhost:8080/#/myway
    name: 'MyWay',
    component: MyWay
  },
  {
    path: '/home', // http://localhost:8080/#/home
    name: 'Home',
    component: Home
  },
  {
    path: '/setting', // http://localhost:8080/#/setting
    name: 'Setting',
    component: Setting
  },
  {
    path: '/follow', // http://localhost:8080/#/follow
    name: 'Follow',
    component: Follow
  },
  {
    path: '/createNotes', // http://localhost:8080/#/createNotes
    name: 'CreateNotes',
    component: CreateNotes
  },
  {
    path: '/article', // http://localhost:8080/#/article
    name: 'Article',
    component: Article
  },
  {
    path: '/wenda', // http://localhost:8080/#/wenda
    name: 'Wenda',
    component: Wenda
  },
  {
    path: '/addQuestion', // http://localhost:8080/#/addQuestion
    name: 'AddQuestion',
    component: AddQuestion
  },
  {
    path: '/wenda/question', // http://localhost:8080/#/wenda/question
    name: 'Question',
    component: Question
  },
  {
    path: '/privateMsg', // http://localhost:8080/#/privateMsg
    name: 'PrivateMsg',
    component: PrivateMsg
  },
  {
    path: '/privateMsg/msgDetail', // http://localhost:8080/#/privateMsg/msgDetail
    name: 'MsgDetail',
    component: MsgDetail
  },
  {
    path: '/replyMsg', // http://localhost:8080/#/replyMsg
    name: 'ReplyMsg',
    component: ReplyMsg
  },
  {
    path: '/search', // http://localhost:8080/#/search
    name: 'Search',
    component: Search
  },
  {
    path: '/backLogin',
    name: 'BackLogin',
    component: BackLogin
  },
  {
    path: '/backHome',
    name: 'BackHome',
    component: BackHome,
    redirect: '/Welcome',
    children: [{
        path: '/Welcome',
        component: Welcome
      }, {
        path: '/adminList',
        component: AdminList
      }, {
        path: '/users',
        component: Users
      }, {
        path: '/setPwd',
        component: SetPwd
      },
      {
        path: '/updateAdmin',
        component: UpdateAdmin
      },
      {
        path: '/searchNote',
        component: SearchNote
      },
      {
        path: '/searchQA',
        component: SearchQA
      },
      {
        path: '/searchAnswer',
        component: SearchAnswer
      },

    ]
  }

]
const router = new Router({
  routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to访问的路径
  if (to.path === '/login' || to.path === '/backLogin')
    return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  // next('/login')强制跳转的页面
  if (!tokenStr) return next('/login');
  next();
})
export default router
