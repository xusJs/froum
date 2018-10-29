<template>
  <div class="view">
    <headers></headers>
    <div class="box">
      <navs></navs>
      <div class="Index_box container">
        <div class="Index_box_classify">
          <div class="title">
            <div>{{$t("messages.classification")}}</div>
            <div class="center"></div>
            <div>{{$t("messages.theme")}}</div>
          </div>
          <div class="content">
            <ul class="content_list">
              <li class="content_item colorOne1">
                <div class="center">
                  <a href="javascript:void (0)"><h4 @click="indexChange('3279d98af38e4c5da55ffafdd64189e2')">
                    {{$t('messages.ChainUp')}}</h4></a>
                  <a href="javascript:void (0)">
                    <p> {{$t('messages.ChainUpMsg')}}</p>
                  </a>
                </div>
                <!--   <div class="other">
                     <p>27/周</p>
                     <p>2/近期</p>
                   </div>-->
              </li>
              <li class="content_item colorOne2">
                <div class="center">
                  <a href="javascript:void (0)"><h4 @click="indexChange('b8cdff1046e947939a0c185c7fa5c908')">
                    {{$t('messages.ChainDown')}}</h4></a>
                  <a href="javascript:void (0)">
                    <p> {{$t('messages.ChainDownMsg')}}</p>
                  </a>
                </div>
                <!--   <div class="other">
                     <p>27/周</p>
                     <p>2/近期</p>
                   </div>-->
              </li>
              <li class="content_item colorOne3">
                <div class="center">
                  <a href="javascript:void (0)"><h4 @click="indexChange('607af189625c4b8e8ea24aacf3631921')">
                    {{$t('messages.General')}}</h4></a>
                  <a href="javascript:void (0)">
                    <p> {{$t('messages.GeneralMsg')}}</p>
                  </a>
                </div>
                <!--   <div class="other">
                     <p>27/周</p>
                     <p>2/近期</p>
                   </div>-->
              </li>
              <li class="content_item colorOne4">
                <div class="center">
                  <a href="javascript:void (0)"><h4 @click="indexChange('45ff40bb26bd43b09827e9d5b0867160')">
                    {{$t('messages.Suggestions')}}</h4>
                  </a>
                  <a href="javascript:void (0)">
                    <p> {{$t('messages.SuggestionsMsg')}}</p>
                  </a>
                </div>
                <!--   <div class="other">
                     <p>27/周</p>
                     <p>2/近期</p>
                   </div>-->
              </li>
              <li class="content_item colorOne5">
                <div class="center">
                  <a href="javascript:void (0)"><h4 @click="indexChange('8a411855750c40fda68655dfcf22c127')">
                    {{$t('messages.Economics')}}</h4>
                  </a>
                  <a href="javascript:void (0)">
                    <p> {{$t('messages.EconomicsMsg')}}</p>
                  </a>
                </div>
                <!--   <div class="other">
                     <p>27/周</p>
                     <p>2/近期</p>
                   </div>-->
              </li>
              <li class="content_item colorOne6">
                <div class="center">
                  <a href="javascript:void (0)"><h4 @click="indexChange('d20d2892428d401bbfe5c4f515e5f7c5')">
                    {{$t('messages.Wallet')}}</h4>
                  </a>
                  <a href="javascript:void (0)">
                    <p> {{$t('messages.WalletMsg')}}</p>
                  </a>
                </div>
                <!--   <div class="other">
                     <p>27/周</p>
                     <p>2/近期</p>
                   </div>-->
              </li>
            </ul>
          </div>
        </div>
        <div class="Index_box_content">
          <div class="title">
            <div class="center">{{ $t("messages.news") }}</div>
          </div>
          <div class="content">
            <ul class="content_list" v-if="BBSList.length">
              <li class="content_item" v-for="item in BBSList">
                <div class="content_item_box">
                  <div class="portrait">
                    <a href="javascript:void (0)">
                      <img :src="item.headPortrait" alt="" :title="item.username">
                    </a>
                  </div>
                  <div class="center">
                    <a href="javascript:void (0)">
                      <div class="item_title" @click="$router.push({name:'forumDetails',params:{detailId:item.id}})">
                        {{item.title}} <!--<span class="icon_spot" title="最新"></span>-->
                      </div>
                    </a>
                    <div class="item_classify">
                      <div class="icon_color"></div>
                      <div class="icon_title">{{item.categoryName}}</div>
                    </div>
                    <!--  <div class="item_label">
                        <div class="icon_color"></div>
                        <div class="icon_title">{{item.labelName}}</div>
                      </div>-->
                  </div>
                  <div class="other">
                    <p>{{item.commentCount}}</p>
                    <p>{{item.createTime | fomatTime}}</p>
                  </div>
                </div>
              </li>
            </ul>
            <div style="text-align: center; margin: 40px 0" v-else>
              {{$t('messages.NoMore')+'....'}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import headers from "../components/publicHeader"
  import navs from "../components/publicNav"
  import config from "../config/index"
  import {bbsList, BBScategoryList} from "../api";

  export default {
    name: "index",
    components: {
      headers,
      navs
    },
    data() {
      return {
        BBSubject: {
          page: '1',
          pageSize: "18",
          labelId: "",
          categoryId: ""
        },
        BBSList: [],
      }
    },
    created() {
      this.bbsListFun()

      this.$store.commit("SET_labelId", "")
      this.$store.commit("SET_categoryId", "")

    },
    methods: {
      bbsListFun() {
        let $self = this

        /*将 分类和标签赋值 */
        /*     $self.BBSubject.categoryId = $self.$store.state.index.categoryId
             $self.BBSubject.labelId = $self.$store.state.index.labelId
     */
        bbsList($self.BBSubject).then(response => {
          if (response.code === config.code) {
            $self.BBSList = response.result.subjectList
          } else {
            $self.$message({
              message: response.msg,
              type: "error"
            })
          }
        })
      },
      indexChange(id) {
        // console.log(id)
        this.$store.commit("SET_categoryId", id)
        this.$router.push({name: 'forumClassify'})
      }
    }
  }
</script>

<style scoped lang="scss">
  .view {
    display: flex;
    flex-direction: column;
    .box {
      overflow: auto;
      flex: 1;
      /*background-image: url("../assets/bj.jpg");*/
      background-position: bottom 0;
      background-size: cover;
    }
  }

  .Index_box {
    display: flex;
    margin-bottom: 30px;
    .Index_box_classify {
      flex: 1;
      margin-right: 18px;
      .title {
        display: flex;
        line-height: 28px;
        margin: 8px 0;
        div {
          font-size: 16px;
          color: #777;
        }
        .center {
          flex: 1;
        }
      }
      .content {
        border-top: 3px solid #bbb;
        .content_list {
          .content_item {
            display: flex;
            padding: 4px 0 4px 12px;
            align-items: center;
            border-bottom: 1px solid #bbb;
            height: 100px;
            .center {
              flex: 1;
              h4 {
                font-size: 18px;
                color: #000;
                margin-bottom: 6px;
              }
              p {
                font-size: 14px;
                color: #bbb;
              }
            }
            .other {
              p {
                color: #aaa;
                font-size: 14px;
              }
              :first-child {
                margin-bottom: 6px;
              }
            }
          }
        }
        .colorOne1 {
          border-left: 5px solid #f4d9be;
        }
        .colorOne2 {
          border-left: 5px solid #ef464d;
        }
        .colorOne3 {
          border-left: 5px solid #4251eb;
        }
        .colorOne4 {
          border-left: 5px solid #25d712;
        }
        .colorOne5 {
          border-left: 5px solid #dbd22e;
        }
        .colorOne6 {
          border-left: 5px solid #1fefea;
        }
      }
    }
    .Index_box_content {
      margin-left: 18px;
      flex: 1;
      .title {
        display: flex;
        line-height: 28px;
        margin: 8px 0;
        .center {
          font-size: 16px;
          color: #777;
        }
      }
      .content {
        border-top: 3px solid #bbb;
        .content_list {
          .content_item {
            padding: 18px 0 18px 12px;
            align-items: center;
            border-bottom: 1px solid #ccc;
            .content_item_box {
              flex: 1;
              display: flex;
              align-items: center;
              .portrait {
                img {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                }
              }
              .center {
                flex: 1;
                padding: 0 12px;
                .item_title {
                  font-size: 18px;
                  color: #333;
                  font-weight: 100;
                  .icon_spot {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background: green;
                    border-radius: 50%;
                  }
                }
                .item_classify {
                  font-size: 13px;
                  color: #000;
                  line-height: 28px;
                  display: flex;
                  align-items: center;
                  .icon_color {
                    width: 10px;
                    height: 10px;
                    background: red;
                    margin-right: 8px;
                  }
                }
                .item_label {
                  font-size: 13px;
                  color: #aaa;
                  display: flex;
                  align-items: center;
                  .icon_color {
                    width: 10px;
                    height: 10px;
                    background: rebeccapurple;
                    margin-right: 8px;
                  }
                }
              }
              .other {

              }
            }
            .other {
              p {
                color: #aaa;
                font-size: 14px;
              }
              :first-child {
                margin-bottom: 6px;
              }
            }
          }
        }
      }
    }
  }

</style>
