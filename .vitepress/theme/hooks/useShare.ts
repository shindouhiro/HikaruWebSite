import { computed, ComputedRef, isRef } from 'vue'

interface ShareData {
  completedDays: ComputedRef<number> | number
  totalDistance: ComputedRef<string> | string
  pageUrl: string
}

export function useShare(shareData: ShareData) {
  const completedDays = computed(() => 
    isRef(shareData.completedDays) 
      ? shareData.completedDays.value 
      : shareData.completedDays
  )
  
  const totalDistance = computed(() => 
    isRef(shareData.totalDistance) 
      ? shareData.totalDistance.value 
      : shareData.totalDistance
  )

  const shareTitle = computed(() => `100天5km跑步挑战,已完成${completedDays.value}天`)
  
  const shareDesc = computed(() => 
    `已完成${completedDays.value}天，总距离${totalDistance.value}km！一起来挑战吧！`
  )

  const weiboShareText = computed(() => 
    `我正在参与100天5km跑步挑战！已完成${completedDays.value}天，总距离${totalDistance.value}km！一起来挑战吧！`
  )

  const shareToWeChat = () => {
    // 使用原生分享API（如果支持）
    if (navigator.share) {
      navigator.share({
        title: shareTitle.value,
        text: shareDesc.value,
        url: shareData.pageUrl,
      })
    } else {
      // 如果不支持，则显示二维码或复制链接
      alert("请长按链接进行分享：" + shareData.pageUrl)
    }
  }

  const shareToWeibo = () => {
    const shareUrl = encodeURIComponent(shareData.pageUrl)
    const shareTitle = encodeURIComponent(weiboShareText.value)
    const weiboShareUrl = `http://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`
    window.open(weiboShareUrl, "_blank")
  }

  return {
    shareTitle,
    shareDesc,
    shareToWeChat,
    shareToWeibo
  }
} 
