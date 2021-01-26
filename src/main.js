import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'bulma/css/bulma.css';

const AV = require('leancloud-storage');

AV.init({
	appId: 'j7GN2dwJQsvonfSW0LkUbLzg-gzGzoHsz',
	appKey: 'iTS2PTykmS6IuBWeS9p32W6Y',
	serverURL: 'https://api.zkl2333.com'
});

Vue.prototype.$cloud = AV;

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
