<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="project-card"> </project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('profile.feature')" name="feature">
              <feature></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.author')" name="author">
              <auther></auther>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/project-card'
import Feature from './components/feature'
import Chapter from './components/chapter'
import Auther from './components/auther'
import { ref } from 'vue'
const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.project-card {
  margin-right: 20px;
}
</style>
