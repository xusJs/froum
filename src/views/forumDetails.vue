<template>
  <div class="view">
    <headers></headers>
    <div class="box">
      <div class="container">
        <div class="detail_title">
          <h2>{{subjectMsg.title}}</h2>
          <ul>
            <li>
              <div class="icon_B_color"></div>
              <div class="icon_title">{{subjectMsg.categoryName}}</div>
            </li>
           <!-- <li>
              <div class="icon_color"></div>
              <div class="icon_title">{{subjectMsg.labelName}}</div>
            </li>-->
          </ul>
        </div>
        <div class="detail_content">
          <div class="theme_user">
            <div class="user_portrait">
              <img :src="commentList.subject.headPortrait" alt="">
            </div>
            <div class="user_name">
              {{commentList.subject.username}}
            </div>
            <div class="user_timer">
              {{commentList.subject.updateTime | fomatTime}}
            </div>
          </div>
          <div class="theme_content">
            <div class="lang_box">
              <mavon-editor v-model="commentList.subject.comment" :subfield="false" :defaultOpen="defaultData"
                            :toolbarsFlag="false"
                            :boxShadow="false">
              </mavon-editor>
            </div>
          </div>
          <div class="theme_nav">
            <ul class="nav_list">
              <li class="nav_item first_item">
                <p>{{$t("messages.Creation")}}</p>
                <p>
                  <a href="javascript:void (0)"> <!--<img src="../assets/19143_1.png" alt="">--></a>
                  &nbsp;&nbsp;{{subjectMsg.createTime | fomatTime}}
                </p>
              </li>
              <li class="nav_item send_item">
                <p>{{$t("messages.lastTime")}}</p>
                <p><a href="javascript:void(0)"><!--<img src="../assets/19143_1.png" alt="">--></a> &nbsp;&nbsp;{{subjectMsg.updateTime
                  | fomatTime}}</p>
              </li>
              <li class="nav_item">
                <h5>{{subjectMsg.commentCount}}</h5>
                <p>{{$t("messages.Reply")}}</p>
              </li>
              <li class="nav_item">
                <h5>{{subjectMsg.visitCount}}</h5>
                <p>{{$t("messages.browse")}}</p>
              </li>
              <li class="nav_item">
                <h5>{{subjectMsg.userCount}}</h5>
                <p>{{$t("messages.user")}}</p>
              </li>
              <li class="nav_item">
                <h5>{{subjectMsg.praiseCount}}</h5>
                <p>{{$t("messages.Fabulous")}}</p>
              </li>
              <!--    <li class="nav_item">
                    <h5>1</h5>
                    <p>链接</p>
                  </li>-->
              <!--  <li class="nav_item user_list">
                  <a href="javascript:void (0)">
                    <img src="../assets/19143_1.png" alt="">
                  </a>
                  <a href="javascript:void (0)">
                    <img src="../assets/19143_1.png" alt="">
                  </a>
                  <a href="javascript:void (0)">
                    <img src="../assets/19143_1.png" alt="">
                  </a>
                </li>-->
            </ul>
          </div>
          <div class="theme_reply">
            <ul class="reply_list" v-if="commentList.commentList.length">
              <li class="reply_item" v-for="item in commentList.commentList">
                <div class="reply_box">
                  <div class="reply_names">
                    <div class="user_portrait">
                      <a href="javascript:void (0)">
                        <img :src="item.headPortrait" alt="" :title="item.username">
                      </a>
                    </div>
                    <div class="user_name">{{item.username}}</div>
                    <div class="user_timer">{{item.updateTime | fomatTime}}</div>
                  </div>
                  <div class="reply_content">
                    <mavon-editor v-model="item.comment" :subfield="false" :defaultOpen="defaultData"
                                  :toolbarsFlag="false"
                                  :boxShadow="false">
                    </mavon-editor>
                  </div>
                  <div class="reply_others">
                    <ul class="others_list">
                      <li class="center"></li>
                      <li>
                        <a href="javascript:void (0)" @click="commentPraiseFun(item.id,item.delFlag)">{{$t("messages.Fabulous")}}
                          ({{item.praiseCount}})</a>
                      </li>
                      <!--  <li>
                          <a href="javascript:void (0)">分享</a>
                        </li>-->
                      <!--    <li>
                            <a href="javascript:void (0)">收藏</a>
                          </li>-->
                      <!--  <li>
                          <a href="javascript:void (0)" @click="replyVisible=!replyVisible">回复</a>
                        </li>-->
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
            <!--<div style="margin: 30px;text-align: center;" v-if="commentList.countPage >commentListDate.page ">
              <a href="javascript:void (0)" style="color: #3a8ee6" @click="moreAdd">加载更多</a>
            </div>-->
            <div v-else style="margin: 30px 0 ;text-align: center;">
              {{$t("messages.NoMore")}}
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="commentListDate.pageSize"
              :total="commentList.count "
              @current-change="changeSorts"
            >
            </el-pagination>
          </div>
          <div class="theme_other">
            <ul>
              <!--  <li>
                  <el-button type="primary" plain>收藏</el-button>
                </li>-->
              <li>
                <!--<el-button type="primary" plain @click="commentShareFun">分享</el-button>-->

                <el-popover
                  placement="bottom"
                  title="url"
                  width="200"
                  trigger="click"
                >
                  <el-input v-model="address"></el-input>

                  <el-button type="primary" plain @click="commentShareFun" slot="reference">{{$t("messages.share")}}
                  </el-button>
                </el-popover>


              </li>
              <li>
                <el-button type="primary" plain @click="commentVisible=!commentVisible">{{$t("messages.Reply")}}
                </el-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--创建评论-->
    <el-dialog
      title="回复"
      :visible.sync="commentVisible"
      width="80%"
    >
      <!--<div class="DialogTitle">回复</div>-->
      <mavon-editor :ishljs="true" v-model="commentData.comment"></mavon-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentVisible = false">取 消</el-button>
        <el-button type="primary" @click="createCommentFun">确 定</el-button>
      </span>
    </el-dialog>

    <!--回复评论-->
    <el-dialog
      title="回复"
      :visible.sync="replyVisible"
      width="80%"
    >
      <div class="DialogTitle">回复 - 王二狗</div>
      <mavon-editor :ishljs="true" v-model="replyValue"></mavon-editor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyVisible = false">取 消</el-button>
        <el-button type="primary" @click="replyVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import headers from "../components/publicHeader"
  import config from "../config/index"
  import {subjectInfo, replyList, createComment, commentPraise, commentShare, commentReply, commentList} from "../api";

  export default {
    name: "forumDetails",
    components: {
      headers,
    },
    data() {
      return {
        editorOption: {
          lineNumbers: true,
          readOnly: true,
          theme: "dracula",
          extraKeys: {'Ctrl-Space': 'autocomplete'},
        },

        replyVisible: false,                 // 评论回复 控制器
        replyValue: "```let a = true```\n \naaa",  // 评论回复
        defaultData: "preview",
        commentVisible: false,   // 创建评论 控制器

        //  主题信息
        subjectMsg: {},

        //  评论列表
        commentList: {
          commentList: [
            {
              comment: "",
              createBy: "",
              createTime: 0,
              delFlag: "0",
              headPortrait: "",
              id: "",
              isTop: "0",
              praiseCount: 0,
              remarks: "",
              replyCount: 0,
              shareCount: 0,
              subjectId: "",
              updateBy: "",
              updateTime: 0,
              userId: "",
              username: ""
            }
          ],
          subject: {
            comment: "",
            createBy: "",
            createTime: 0,
            delFlag: "0",
            headPortrait: "",
            id: "",
            isTop: "0",
            praiseCount: 0,
            remarks: "",
            replyCount: 0,
            shareCount: 0,
            subjectId: "",
            updateBy: "",
            updateTime: 0,
            userId: "",
            username: ""
          }
        },
        // 评论列表查询参数
        commentListDate: {
          subjectId: this.$route.params.detailId,
          page: 1,
          pageSize: 10
        },

        //  回复主题参数
        commentData: {
          userId: "",
          subjectId: this.$route.params.detailId,
          comment: ""
        },

        /*分享相关参数*/
        ShareData: {
          userId: this.$store.state.index.userId,
          commentId: this.$route.params.detailId
        },

        address: window.location.href

      }
    },
    methods: {
      // 查询帖子 信息
      subjectInfoFun() {
        let $self = this
        subjectInfo({
          subjectId: this.$route.params.detailId,
          userId: this.$store.state.index.userId
        })
          .then(response => {
            if (response.code === config.code) {
              $self.subjectMsg = response.result

              // $self.commentList()
            } else {
              $self.$message({
                message: response.msg,
                type: "error"
              })
            }
          })
      },

      //  创建评论
      createCommentFun() {
        let $self = this
        $self.commentData.userId = $self.$store.state.index.userId;

        if ($self.commentData.userId !== "") {
          createComment($self.commentData)
            .then(response => {
              // console.log(response)
              if (response.code === config.code) {
                $self.commentVisible = false
                $self.commentData.comment = ""
                $self.commentListFun()
              } else {
                $self.$message({
                  message: response.msg,
                  type: "error"
                })
              }
            })
        } else {
          $self.$message({
            message: "尚未登录，请登录后再回复吧",
            type: "error"
          })
        }
      },

      // 评论列表
      commentListFun() {

        let $self = this


        commentList($self.commentListDate).then(response => {
          if (response.code === config.code) {
            $self.commentList = response.result
          } else {
            $self.$message({
              message: response.msg,
              type: "error"
            })
          }
        })
      },

      changeSorts(index) {
        this.commentListDate.page = index
        this.commentListFun()
      },

      //  查询回复列表
      replyListFun() {
        let $self = this
        replyList()
      },
      //  评论回复
      commentReplyFun() {

        // this.replyVisible = true

        commentReply()
      },

      //  评论点赞
      commentPraiseFun(id, is) {

        let $self = this
        let data = {
          userId: $self.$store.state.index.userId,
          commentId: id,
          action: is
        }

        if (data.userId !== "") {
          commentPraise(data).then(response => {
            if (response.code === config.code) {

              $self.commentListFun()
            } else {
              $self.$message({
                message: response.msg,
                type: "error"
              })
            }
          })
        } else {
          $self.$message({
            message: "尚未登录，请登录后再点赞吧",
            type: "error"
          })
        }
      },
      //  评论分享

      commentShareFun() {
        let $self = this
        commentShare($self.ShareData)
          .then(response => {
            // console.log(response)
            if (response.code === config.code) {

            } else {
              /*$self.$message({
                message: response.msg,
                type: "error"
              })*/
            }
          })
      },


      /*  moreAdd() {
          let $self = this
          $self.commentListDate.page++
          $self.commentListFun()
        }*/
    },
    created() {
      this.subjectInfoFun()
      this.commentListFun()
    },
    mounted() {
      // console.log(this.$route.params.detailId)
    }
  }
</script>

<style scoped lang="scss">
  .view {
    display: flex;
    flex-direction: column;
    height: 100%;
    .box {
      flex: 1;
      overflow: auto;
    }
    .DialogTitle {
      margin-bottom: 20px;
    }
  }

  .container {
    margin-top: 40px;
    .detail_title {
      h2 {
        font-size: 36px;
      }
      ul {
        display: flex;
        li {
          display: flex;
          align-items: center;
          margin-right: 10px;
          .icon_color {
            width: 10px;
            height: 10px;
            background: rebeccapurple;
            margin-right: 8px;
          }
          .icon_B_color {
            width: 10px;
            height: 10px;
            background: red;
            margin-right: 8px;
          }
          .icon_title {
            font-size: 13px;
            color: #000;
            line-height: 28px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .detail_content {
      .theme_user {
        display: flex;
        align-items: center;
        .user_portrait {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .user_name {
          flex: 1;
          padding: 0 20px;
          font-size: 16px;
          color: #aaa;
          font-weight: 700;
        }
        .user_timer {
          font-size: 14px;
          color: #aaa;
        }
      }
      .theme_content {
        margin-top: 20px;
      }
      .theme_nav {
        margin: 10px 0;
        .nav_list {
          padding: 8px;
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          background: #eee;
          .nav_item {
            margin-right: 20px;
            font-size: 14px;
            color: #333;
            text-align: center;
            p {
              margin-top: 4px;
            }
            h5 {
              font-size: 16px;
            }
          }
          .first_item, .send_item {
            img {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              vertical-align: middle
            }
          }
          .user_list {
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: 6px;
            }
          }
        }
      }
      .theme_reply {
        .reply_list {
          border: 1px solid #777;
          border-radius: 5px;
          .reply_item {
            border-bottom: 1px solid #ddd;
            padding: 20px;
            font-size: 14px;
            .reply_box {
              .reply_names {
                display: flex;
                align-items: center;
                .user_portrait {
                  img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                  }
                }
                .user_name {
                  flex: 1;
                  margin: 0 20px;
                  font-size: 14px;
                  color: #333;
                }
                .user_timer {
                }
              }
              .reply_content {
                padding: 8px 4px;
              }
              .reply_others {
                padding-top: 10px;
                .others_list {
                  display: flex;
                  .center {
                    flex: 1;
                  }
                  li {
                    margin-left: 8px;
                  }
                }
              }
            }
          }
        }
      }
      .theme_other {
        margin: 20px 0;
        ul {
          display: flex;
          li {
            margin-right: 10px;
          }
        }
      }
    }
  }

</style>
