<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb
        width="60px"
        height="60px"
        image="https://avatars.githubusercontent.com/u/11662465?v=4"
      >
        {{ $t('profile.name') }}
      </pan-thumb>
      <div class="header-desc">
        <h3>{{ $t('profile.name') }}</h3>
        <span>{{ $t('profile.job') }}</span>
      </div>
    </div>
    <div class="info">
      {{ $t('profie.projectIntroduction') }}
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import PanThumb from '@/components/pan-thumb'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
