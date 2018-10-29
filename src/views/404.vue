<template>
  <div class="view">
    <div class="container" style="text-align: center;">

      <a href="javascript:void (0)" class="goBack" @click="$router.go(-1)"></a>
      <a href="javascript:void (0)" class="goHome" @click="$router.push({name:'index'})"></a>
      <img src="../assets/404.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "error"
  }
</script>

<style scoped lang="scss">
  .view {
    .container {
      position: relative;
      img {
        width: 1140px;

      }
      .goBack {
        position: absolute;
        width: 140px;
        height: 34px;
        /*border: 1px solid red;*/
        top: 955px;
        right: 800px;
      }
      .goHome {
        position: absolute;
        width: 80px;
        height: 34px;
        /*border: 1px solid green;*/
        top: 955px;
        right: 692px;
      }
    }
  }
</style>
