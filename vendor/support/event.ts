import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 페이지 로딩시 이벤트를 설정할 수 있음
 * Comment by Alfred
 * @date 2022/09/14 4:34 PM
 */
export const useEventListener = (target: EventTarget, event: string, callback: any) => {
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => {
        target.removeEventListener(event, callback)
    })
}

/**
 * 마우스 위치 가져옴
 * Comment by Alfred
 * @date 2022/09/14 4:18 PM
 */
export const useMouse = () => {
    const x = ref(0)
    const y = ref(0)
    useEventListener(window, 'mousemove', (event: MouseEvent) => {
        x.value = event.pageX
        y.value = event.pageY
    })

    return { x, y }
}