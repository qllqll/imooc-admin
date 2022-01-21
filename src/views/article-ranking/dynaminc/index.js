import { ref, watch } from 'vue'
import DynamicData from './dynamic-data'
import { watchSwitchLang } from '@/utils/i18n'

// 暴露出动态的列数据
export const dynamicData = ref(DynamicData())

watchSwitchLang(() => {
  dynamicData.value = DynamicData()
  initSelectDynamicLabel()
})

// 被勾选的动态列数据
export const selectDynamicLabel = ref([])
// 默认全部勾选
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}

initSelectDynamicLabel()

// 声明table的列数据
export const tableColumns = ref([])
watch(
  selectDynamicLabel,
  (val) => {
    tableColumns.value = []
    //  遍历列数据，判断当前列是否被勾选
    const selectData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectData)
  },
  {
    immediate: true
  }
)
