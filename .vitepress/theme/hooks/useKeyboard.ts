import { onMounted, onUnmounted } from 'vue'

interface KeyboardHandlers {
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onEscape?: () => void
  isEnabled?: () => boolean
}

export function useKeyboard(handlers: KeyboardHandlers) {
  const handleKeydown = (event: KeyboardEvent) => {
    // 检查是否启用键盘事件
    if (handlers.isEnabled && !handlers.isEnabled()) return
    
    switch (event.key) {
      case 'ArrowLeft':
        if (handlers.onArrowLeft) {
          event.preventDefault()
          handlers.onArrowLeft()
        }
        break
      case 'ArrowRight':
        if (handlers.onArrowRight) {
          event.preventDefault()
          handlers.onArrowRight()
        }
        break
      case 'Escape':
        if (handlers.onEscape) {
          event.preventDefault()
          handlers.onEscape()
        }
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    handleKeydown
  }
} 
