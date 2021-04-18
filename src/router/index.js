import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyWay from '@/components/pages/MyWay'
import Login from '../components/Login'
import Home from '../components/pages/Home'
import Setting from '../components/pages/Setting'
import Follow from '../components/pages/Follow'
import CreateNotes from '../components/pages/CreateNotes'
import Article from '../components/pages/Article'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
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
    }
    ,
    {
      path: '/article', // http://localhost:8080/#/article
      name: 'Article',
      component: Article
    }
  ]
})
