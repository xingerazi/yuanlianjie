<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse=false
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>ChainStamp</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="childItem in item.children"
        :key="childItem.path"
      >
        <el-menu-item @click="clickMenu(childItem)">
          <i :class="`el-icon-${childItem.icon}`"></i
          >{{ childItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie"
export default {
  data() {
    return {
      isCollapse: false,
      value: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //跳转菜单
    clickMenu(item) {
      // 当页面的路由与跳转的路由不一致才允许跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
      this.$store.commit('selectMenu',item)
      console.log(this.menuData);
    },

  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    changeMenu(){
      console.log(1);
    },
    menuData() {
      // 判断当前数据,如果缓存中没有,当前store中去获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 120vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 15px;
    margin-bottom: 10px;
  }
}
</style>