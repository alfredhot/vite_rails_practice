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
            console.log("mounted try this s d let  s go alfred" +
                "")
        })
        const { x: mouseX, y: mouseY } = useMouse()

        return {console, mouseX, mouseY}
    }

}