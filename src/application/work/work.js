import 'ant-design-vue/dist/antd.css';
import router from './router';
import Vuex from 'vuex';
import axios from 'axios';
import http from './api/config.js';
import Vue from 'vue';
import App from './work.vue';
import 'ant-design-vue/dist/antd.css';
import { Button } from 'ant-design-vue';
import { Layout } from 'ant-design-vue';
import { Icon } from 'ant-design-vue';
import { Col } from 'ant-design-vue';
import { Modal } from 'ant-design-vue';
import { Card } from 'ant-design-vue';
import { Input } from 'ant-design-vue';
import { Select } from 'ant-design-vue';
import { Carousel} from 'ant-design-vue';
import { Avatar} from 'ant-design-vue';
import { Rate} from 'ant-design-vue';
import { BackTop} from 'ant-design-vue';
import { Spin} from 'ant-design-vue';
import { Statistic} from 'ant-design-vue';
import { Slider} from 'ant-design-vue';

import store from './store';
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.$http = http;
Vue.use(Vuex);
Vue.use(Spin);
Vue.use(BackTop);
Vue.use(Rate);
Vue.use(Carousel);
Vue.use(Input);
Vue.use(Select);
Vue.use(Modal);
Vue.use(Card);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Avatar);
Vue.use(Statistic);
Vue.use(Slider);

Vue.use(VueCookies, { expire: '2d'});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


