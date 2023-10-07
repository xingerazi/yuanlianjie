import Vue from 'vue'
import App from './App.vue'
//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入mock
import './api/mock'

//引入router
import router from './router'

//引入vuex
import store from './store';

//引入cookie
import Cookie from 'js-cookie';

Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')

  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})


new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
  beforeCreate(){
		this.__proto__.$bus = this	//安装全局事件总线
	}
}).$mount('#app')
