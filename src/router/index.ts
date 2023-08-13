import { createRouter, createWebHistory } from 'vue-router'
import Editor from '@/views/Editor.vue'
import MainPage from '@/views/MainPage.vue'
import { useLocalStorage } from '@vueuse/core';
const getlogin=useLocalStorage('login',{})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: MainPage,
      
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
       beforeEnter:(to, from, next) =>{
        if(getlogin.value===false){
          next('/')
        }else{
          next()
        } 
      } 
    }
  ]
})

export default router
