<template>
  <div class="navbar">
    <hamburger class="hamburger-container"></hamburger>
    <beadcrumb class="beadcrumb-container"></beadcrumb>
    <div class="right-menu">
      <header-search class="right-menu-item hover-effect"></header-search>
      <screenfull class="right-menu-item hover-effect"></screenfull>
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <!--      国际化-->
      <lang-select class="right-menu-item hover-effect"></lang-select>
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
              <el-dropdown-item>{{ $t('navBar.home') }}</el-dropdown-item>
            </router-link>
            <a target="__blank" href="http://www.wenweipo.com">
              <el-dropdown-item>{{ $t('navBar.course') }}</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">{{
              $t('navBar.logout')
            }}</el-dropdown-item>
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
import LangSelect from '@/components/lange-select'
import ThemeSelect from '@/components/theme-select'
import screenfull from '@/components/screenfull'
import HeaderSearch from '@/components/header-search'

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

  ::v-deep .right-menu-item {
    display: inline-block;
    padding: 0 18px 0 0;
    font-size: 24px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &.hover-effect {
      cursor: pointer;
    }
  }
  ::v-deep .avatar-container {
    cursor: pointer;
    .avatar-wrapper {
      margin-top: 5px;
      position: relative;
      .el-avatar {
        --el-avatar-background-color: none;
        --el-avatar-bg-color: none;
        margin-right: 12px;
      }
    }
  }
}

.beadcrumb-container {
  float: left;
}
</style>
