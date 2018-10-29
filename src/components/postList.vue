<template>
  <div>
    <el-table
      :data="$store.state.index.SubjectLists"
      style="width: 100%"
    >
      <el-table-column

        :label="$t('messages.theme')"
      >
        <template slot-scope="scope">
          <a href="javascript:void(0)"
             @click="$router.push({name:'forumDetails',params:{detailId:scope.row.id}})">
            {{scope.row.title}}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('messages.user')"
        width="300"
      >
        <template slot-scope="scope">
          <a href='javascript:void(0)' class="userList">
            <img :src="scope.row.headPortrait" alt="">
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="commentCount"
        :label="$t('messages.Reply')"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="visitCount"
        :label="$t('messages.browse')"
        width="80"
      >
      </el-table-column>
      <el-table-column
        :label="$t('messages.lastTime')"
        width="80"
      >
        <template slot-scope="scope">
          <a href='javascript:void(0)' class="userList">
            {{scope.row.updateTime | fomatTime}}
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import img1 from "../assets/16160_1.png"
  import img2 from "../assets/18258_1.png"
  import img3 from "../assets/19117_1.png"
  import img4 from "../assets/19143_1.png"
  import img5 from "../assets/45(1).png"


  export default {
    name: "postList",
    props: ['postList'],
    data() {
      return {
        tableData: [{
          title: '标题标题标题标题标题标题标题标题标题标题',
          name: [img1, img2, img3, img4, img5],
          reply: '3',
          browse: "234",
          timer: "22小时前"
        },
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .userList {
    img {
      width: 25px;
      height: 25px;
      margin: 0 4px;
      border-radius: 50%;
    }
  }
</style>
