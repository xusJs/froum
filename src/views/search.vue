<template>
  <div class="view">
    <headers></headers>
    <div class="box">
      <div class="container">
        <div class="search_box">
          <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="search_content">
          <list class="list"></list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import headers from "../components/publicHeader"
  import list from "../components/postList"

  export default {
    name: "search",
    components: {
      headers,
      list
    },
    data() {
      return {
        searchValue: ""
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
    }
  }

  .container {
    margin-top: 40px;
    .search_box {
      padding: 0 180px;
    }
    .search_content {
      margin-top: 40px;
    }
  }


</style>
