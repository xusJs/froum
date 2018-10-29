<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import config from "./config/index"
  import {user_info, BBScategoryList, labelList} from "./api";

  export default {
    name: 'App',
    mounted() {
      // 用户状态处理
      this.userType()

      /*    // 分类列表的获取
          this.categoryList()

          //标签列表的获取
          this.labelList()*/

    },
    methods: {
      userType() {
        let $self = this
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        if (token && userId) {
          this.$store.commit("SET_token", token)
          this.$store.commit("SET_userId", userId)
          user_info({token: token, userId: userId})
            .then(response => {
              if (response.code === config.code) {
                $self.$store.commit("SET_userInfo", response.result)
              }
            })
        }
      },
      /* categoryList() {
         let $self = this
         BBScategoryList().then(response => {
           if (response.code === config.code) {
             $self.$store.commit("SET_categoryList", response.result)
           } else {
             $self.$message({
               message: response.msg,
               type: "error"
             })
           }
         })
       },
       labelList() {
         let $self = this
         labelList()
           .then(response => {
             if (response.code === config.code) {


               let list = []

               response.result.forEach((item) => {
                 item.subList.forEach((items) => {
                   list.push(items)
                 })
               })

               $self.$store.commit("SET_labelList", list)


             } else {
               $self.$message({
                 message: response.msg,
                 type: 'error'
               })
             }
           })
       }*/
    }
  }
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    display: flex;
    flex-direction: column;
    line-height: 1.4;
    /*border: 1px solid #900;*/
    height: 100%;
    min-width: 1140px;
  }

  /*css  公共样式*/
  .container {
    width: 1140px;
    margin: 0 auto;
  }

  .view {
    height: 100%;
  }

/*
  .el-button--primary {
    background: rgb(70, 70, 70) !important;
    border-color: rgb(70, 70, 70) !important;
    color: #fff !important;
  }
*/


  /*css 初始化*/
  html, body, div, span, object, iframe, h1, h2,
  h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn,
  em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd,
  ol, ul, li, fieldset, form, label, legend, table, caption, tbody,
  tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption,
  figure, footer, header, hgroup, menu, nav, section, summary, time, mark,
  audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    outline-style: none; /*FF*/
    box-sizing: border-box;
    list-style: none;
  }

  body, html {
    /*line-height: 1;*/
    height: 100%;
  }

  a {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    background: transparent;
    text-decoration: none;
    out-line: none;
    color: #333;
  }

  a:hover, a:focus {
    text-decoration: none;
    bblr: expression(this.onFocus=this.blur()); /*IE*/
    outline-style: none; /*FF*/
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input, select {
    vertical-align: middle;
  }


</style>
