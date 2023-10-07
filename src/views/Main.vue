<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <common-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <common-nav/>
        </el-header>
        <common-tag/>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue';
import CommonNav from '../components/CommonNav.vue';
import CommonTag from '../components/CommonTag.vue';
export default {
  name: "Main",
  components:{
    CommonAside,CommonNav,CommonTag
  }
};
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}
</style>

