import { computed, watch, onMounted, ComputedRef, isRef } from 'vue'
import { useData } from 'vitepress'

interface TitleData {
  completedDays: ComputedRef<number> | number
}

export function usePageTitle(titleData: TitleData) {
  const { site } = useData()

  const completedDays = computed(() => 
    isRef(titleData.completedDays) 
      ? titleData.completedDays.value 
      : titleData.completedDays
  )

  const pageTitle = computed(() => 
    `100天5km跑步挑战 - 已完成${completedDays.value}天`
  )

  const updateTitle = () => {
    document.title = `${pageTitle.value} | ${site.value.title}`
  }

  onMounted(() => {
    updateTitle()
  })

  watch(completedDays, () => {
    updateTitle()
  })

  return {
    pageTitle,
    updateTitle
  }
} 
