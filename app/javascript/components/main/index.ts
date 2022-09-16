import { onMounted } from 'vue'
import { useMouse } from '@vendor/support/event'
import $ from 'jquery'

export const arr = 0
export const MainIndex = {
    template: require('@/views/main/index'),
    data() {
        return {}
    },
    setup(){
        onMounted(()=>{
        })
        const { x: mouseX, y: mouseY } = useMouse()

        return {console, mouseX, mouseY}
    }

}