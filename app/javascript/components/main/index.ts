import { onMounted } from 'vue'
import { useMouse } from '@vendor/support/event'
import $ from 'jquery'

export const MainIndex = {
    template: require('@/views/main/index'),
    data() {
        return {}
    },
    setup(){
        onMounted(()=>{
            console.log("mounted")
            console.log($('.jquery-test')[0])
        })
        const { x: mouseX, y: mouseY } = useMouse()

        return {console, mouseX, mouseY}
    }

}