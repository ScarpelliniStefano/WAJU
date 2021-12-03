import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'



Vue.config.productionTip = false


/*/
Vue.use(VueNativeSock, 'ws://'+process.env.VUE_APP_ENGINE_SERVER,{
  connectManually: true,
});

const vm = new Vue();
var connected=false;
var preDone=false;

export var connect = () => {
  vm.$connect();
}

export var disconnect = () => {
  vm.$disconnect();
  vm.$destroy();
}

export var setConnected = () => {
  connected=!connected;
}

export var isConnected = () => {
  return connected;
}

export var setPreDone = () => {
  preDone=!preDone;
}

export var isPreDone = () => {
  return preDone;
}*/


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
