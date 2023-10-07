<template>
  <div class="tab-group">
        <el-tag
            v-for="(item) in tags"
            :key="item.path"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            size="small"
            >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:'CommonTag',
    data(){
        return{
        }
    },
    computed:{
        ...mapState({
                tags:state=>state.tab.tabsList
            })
    },
    mounted() {
    },
};
</script>

<style lang="less" scoped>
.tab-group{
    padding: 10px 20px 0px 20px;
    .el-tag{
        margin-right:10px ;
    }
}
</style>