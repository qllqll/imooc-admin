<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!--  左侧menu -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVars.menuBg }"
    ></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!--  顶部navbar -->
        <navbar></navbar>
        <tags-view id="guide-tags"></tags-view>
      </div>
      <app-main>
        <!--  内容区 -->
      </app-main>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import Navbar from './components/navbar'
import AppMain from './components/app-main'
import Sidebar from './components/sidebar/index'
import TagsView from '@/components/tags-view/index'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sidebarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
