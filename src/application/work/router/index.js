
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/application/work/views/index.vue'
import Room from '@/application/work/views/room.vue'
// import Read from '@/application/work/views/read.vue'
import { createRouter, createWebHistory } from 'vue-router'
//使用 vue-router
Vue.use(VueRouter)

//匯出vue-router 設置
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import( '../common/Home.vue'),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/Index',
                    component: Index,
                },
                {
                    path: '/Room',
                    component: Room,
                },
                // {
                //     path: '/Read',
                //     component: Read,
                // },
            ]
        }
    ]
})