
import {createRouter,createWebHistory} from "vue-router";
import weather from "../components/weather.vue";
const routes= [
        {
            name:"weather",
            path:'/weather',
            component:weather,
        }
    ]
const  router=createRouter({
    history:createWebHistory(),
    routes:routes
})
export default router;