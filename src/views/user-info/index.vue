<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button :loading="printLoading" type="primary" v-print="printObj">{{
        $t('userInfo.print')
      }}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <!--        标题-->
        <h2 class="title">{{ $t('userInfo.title') }}</h2>
        <!--        头部-->
        <div class="header">
          <!--          头部表格-->
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('userInfo.name')">{{
              detailData.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.sex')">{{
              detailData.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.nation')">{{
              detailData.nationality
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.mobile')">{{
              detailData.mobile
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.province')">{{
              detailData.province
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.date')">{{
              $filters.dateFilter(detailData.openTime)
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.remark')" :span="2"
              ><el-tag
                class="remark"
                size="small"
                v-for="(item, index) in detailData.remark"
                :key="index"
                >{{ item }}</el-tag
              ></el-descriptions-item
            >
            <el-descriptions-item :label="$t('userInfo.address')" :span="2">{{
              detailData.address
            }}</el-descriptions-item>
          </el-descriptions>
          <!--          头像-->
          <el-image class="avatar" :src="detailData.avatar"></el-image>
        </div>
        <!--        内容-->
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('userInfo.experience')">
              <ul>
                <li v-for="(item, index) in detailData.experience" :key="index">
                  <span
                    >{{ $filters.dateFilter(item.startTime, 'YYYY/MM') }} ----
                    {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <!--        尾部-->
        <div class="foot">{{ $t('userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { userDetail } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: { type: String, required: true }
})

const detailData = ref({})
const getUserDetail = async () => {
  detailData.value = await userDetail(props.id)
}
watchSwitchLang(getUserDetail)

// 打印
const printLoading = ref(false)
const printObj = {
  //  打印区域
  id: 'userInfoBox',
  //  打印标题
  popTitle: 'imooc-vue-element-admin',
  //  打印前的回调
  beforeOpenCallback() {
    printLoading.value = true
  },
  // 执行打印
  openCallback() {
    printLoading.value = false
  }
}
getUserDetail()
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
