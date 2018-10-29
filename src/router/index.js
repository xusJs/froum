import Vue from 'vue'
import Router from 'vue-router'

//首页
import index from "../views/index"
// 分类查询及列表页
import forumClassify from "../views/forumClassify"
//详情页
import forumDetails from "../views/forumDetails"
// 发布页
import Release from "../views/Release"
//搜索页
import search from "../views/search"


import error from "../views/404"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: "index",
      component: index
    },
    {
      path: "/forumClassify",
      name: "forumClassify",
      component: forumClassify
    },
    {
      path: "/forumDetails/:detailId",
      name: "forumDetails",
      component: forumDetails
    },
    {
      path: "/Release",
      name: "Release",
      component: Release
    },
    {
      path: '/search',
      name: "search",
      component: search
    },

    {
      path: "*",
      name: "error",
      component: error
    }
  ]
})
