<template>
  <div class="P_nav">
    <div class="container">
      <ul class="Nav_Ul">
        <li>
          <el-select v-model="$store.state.index.categoryId" :placeholder="$t('messages.please')"
                     @change="changeFun"
                     class="Nav_Select">
            <el-option :label="$t('messages.ChainUp')" value="3279d98af38e4c5da55ffafdd64189e2"></el-option>
            <el-option :label="$t('messages.ChainDown')" value="b8cdff1046e947939a0c185c7fa5c908"></el-option>
            <el-option :label="$t('messages.General')" value="607af189625c4b8e8ea24aacf3631921"></el-option>
            <el-option :label="$t('messages.Suggestions')" value="45ff40bb26bd43b09827e9d5b0867160"></el-option>
            <el-option :label="$t('messages.Economics')" value="8a411855750c40fda68655dfcf22c127"></el-option>
            <el-option :label="$t('messages.Wallet')" value="d20d2892428d401bbfe5c4f515e5f7c5"></el-option>
          </el-select>
        </li>
        <!--    <li>
              <el-select v-model="$store.state.index.labelId" :placeholder="$t('messages.label')" @change="changeFun"
                         class="Nav_Select">
                <el-option
                  v-for="item in $store.state.index.labelList"
                  :key="item.id"
                  :label="item.labelName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </li>-->
        <!--  <li v-for="(item,index) in sortList">
            <el-button
              :type="index === $store.state.index.sortIndex ? 'primary' : ''"
              @click="changeSort(index)">
              {{item.name}}
            </el-button>
          </li>-->
        <li class="center"></li>
        <li>
          <el-button type="primary" class="el-icon-circle-plus
" @click="$router.push({name:'Release'})"> &nbsp; {{$t("messages.issue")}}
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {bbsList} from "../api";
  import config from "../config/index"

  export default {
    name: "publicNav",
    data() {
      return {
        sortList: [
          {name: '最新', type: false},
          {name: '最近', type: false},
          {name: "热门", type: true}
        ],
        categoryList: [
          {
            id: "3279d98af38e4c5da55ffafdd64189e2",
            categoryName: "Layer 1" + this.$t("messages.ChainUp")
          },
          {
            id: "b8cdff1046e947939a0c185c7fa5c908",
            categoryName: "Layer 2 " + this.$t("messages.ChainDown")
          },
          {id: "607af189625c4b8e8ea24aacf3631921", categoryName: this.$t("messages.General")},
          {
            id: "45ff40bb26bd43b09827e9d5b0867160",
            categoryName: this.$t("messages.Suggestions")
          },
          {id: "8a411855750c40fda68655dfcf22c127", categoryName: this.$t("messages.Economics")},
          {
            id: "d20d2892428d401bbfe5c4f515e5f7c5",
            categoryName: this.$t("messages.Wallet")
          }
        ],
      }
    },
    methods: {
      changeSort(index) {
        this.$store.commit("SET_sortIndex", index)
      },
      changeFun() {
        this.$router.push({name: "forumClassify"})

        let $self = this

        /*将 分类和标签赋值 */
        let data = {
          page: $self.$store.state.index.page,
          pageSize: $self.$store.state.index.pageSize,
          categoryId: $self.$store.state.index.categoryId,
          labelId: $self.$store.state.index.labelId
        }
        bbsList(data).then(response => {
          if (response.code === config.code) {
            $self.$store.commit("SET_SubjectLists", response.result.subjectList)
          } else {
            $self.$message({
              message: response.msg,
              type: "error"
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .P_nav {
    margin: 10px 0;
    .container {
      .Nav_Ul {
        display: flex;
        li {
          margin: 0 5px;
          .Nav_Select {
            width: 100px;
          }
        }
        .center {
          flex: 1;
        }
      }
    }
  }
</style>
