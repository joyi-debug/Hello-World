<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path"  v-if="current">{{current.label}}</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <span class="el-dropdown-link">
          <img :src="userImg" class="user"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon='el-icon-user'>个人中心</el-dropdown-item>
          <el-dropdown-item icon='el-icon-switch-button'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
   handleMenu (){
     this.$store.commit("collapseMenu")
   }
  },
  computed: {
    ...mapState({
      current: (state) => state.Tab.currentMenu
    })
  }
}
</script>

<style lang="scss" scoped>
header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
     margin-right: 20px;
  }
}
.r-content{
  display: flex;
  align-items: center;
  .user{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    padding-top: 3px;
  }
}
.el-breadcrumb_item{
  color: #666;
  font-weight: normal;
  &:last-child{
    .el-breadcrumb_inner{
      color: #666;
      font-weight: normal;
    }
  }
}
</style>
