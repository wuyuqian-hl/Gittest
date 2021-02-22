import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//解决重复点击的报错问题  push才有用（有记录），replace没用（无记录）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err) 
}

let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name:'home',
      component:()=>import('@/components/CloudMusic')
    },{
      path: '/musicPlay',
      name:'musicPlay',
      component:()=>import('@/components/musicPlay')
    },
    {
      path: '*',
      redirect:'home'
    }
  ]
  
})

export default router