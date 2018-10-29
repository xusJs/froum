<template>
  <div class="view">
    <headers></headers>
    <div class="box">
      <div class="container">
        <div class="release_content">
          <div class="release_header">
            <el-select v-model="formData.categoryId" :placeholder="$t('messages.classify')" class="Nav_Select">
              <el-option :label="$t('messages.ChainUp')" value="3279d98af38e4c5da55ffafdd64189e2"></el-option>
              <el-option :label="$t('messages.ChainDown')" value="b8cdff1046e947939a0c185c7fa5c908"></el-option>
              <el-option :label="$t('messages.General')" value="607af189625c4b8e8ea24aacf3631921"></el-option>
              <el-option :label="$t('messages.Suggestions')" value="45ff40bb26bd43b09827e9d5b0867160"></el-option>
              <el-option :label="$t('messages.Economics')" value="8a411855750c40fda68655dfcf22c127"></el-option>
              <el-option :label="$t('messages.Wallet')" value="d20d2892428d401bbfe5c4f515e5f7c5"></el-option>
            </el-select>
            <!--    <el-select v-model="formData.labelIds[0]" placeholder="请选择标签" class="Nav_Select">
                  <el-option
                    v-for="item in $store.state.index.labelList"
                    :key="item.id"
                    :label="item.labelName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>-->
            <el-input v-model="formData.title" :placeholder="$t('messages.titles')" style="margin-top: 20px"></el-input>
          </div>
          <mavon-editor :ishljs="true" v-model="formData.content"></mavon-editor>
          <div class="release_footer">
            <el-button type="primary" @click="subjectRelease">发布</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import headers from "../components/publicHeader"
  import {subjectCreate} from "../api"
  import config from "../config/index"

  export default {
    name: "Release",
    components: {
      headers
    },
    data() {
      return {
        replyValue: "",
        value: "",
        value2: "",
        formData: {
          title: "",
          categoryId: "",
          labelIds: [],
          content: "",
          userId: ""
        }
      }
    },
    methods: {
      subjectRelease() {
        // console.log(this.$store.state.index.categoryId)
        let $self = this
        $self.formData.userId = $self.$store.state.index.userId
        if (!$self.formData.userId) {
          $self.$message({
            message: "登录过期，请重新登录",
            type: "error"
          })
        } else if (!$self.formData.content) {
          $self.$message({
            message: "内容不能为空",
            type: "error"
          })
        } else if (!$self.formData.categoryId) {
          $self.$message({
            message: "分类不能为空",
            type: "error"
          })
        } /*else if (!$self.formData.labelIds.length) {
          $self.$message({
            message: "标签不能为空",
            type: "error"
          })
        }*/ else if (!$self.formData.title) {
          $self.$message({
            message: "标题不能为空",
            type: "error"
          })
        } else {
          subjectCreate($self.formData).then(response => {
            // console.log(response)
            if (response.code === config.code) {
              $self.$message({
                message: "发帖成功",
                type: "success"
              })
            } else {
              $self.$message({
                message: $self.msg,
                type: "error"
              })
            }


          })
        }
      }
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
      .container {
        .release_content {
          margin-top: 30px;

          .release_header {
            margin-bottom: 30px;
          }
          .release_footer {
            margin: 30px 0;
            text-align: center;
          }
        }
      }
    }
  }
</style>
