<template>
  <div class="navbar">
    <hamburger class="hamburger-container"></hamburger>
    <beadcrumb class="beadcrumb-container"></beadcrumb>
    <div class="right-menu">
      <!--      头像-->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>主页</el-dropdown-item>
            </router-link>
            <a target="__blank" href="http://www.wenweipo.com">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import Hamburger from '@/components/hamburger'
import Beadcrumb from '@/components/beadcrumb'
import { useStore } from 'vuex'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.hamburger-container {
  line-height: 46px;
  height: 100%;
  float: left;
  cursor: pointer;
  //  hover动画
  transition: background 0.5s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

.right-menu {
  display: flex;
  align-items: center;
  float: right;
  padding-right: 16px;
  ::v-deep .avatar-container {
    cursor: pointer;
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
      .el-avatar {
        --el-avatar-background-color: none;
        margin-right: 12px;
      }
    }
  }
}

.beadcrumb-container {
  float: left;
}
</style>
