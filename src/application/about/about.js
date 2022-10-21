import Vue from 'vue'
import App from './about.vue'
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
import { message} from 'ant-design-vue';
import VueCookies from 'vue-cookies';
Vue.config.productionTip = false

Vue.use(Carousel);
Vue.use(Input);
Vue.use(Select);
Vue.use(Modal);
Vue.use(Card);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Layout);
Vue.use(message);
Vue.use(VueCookies, { expire: '2d'})
Vue.prototype.$message = message;
message.config({
    duration: 2,// 持续时间
    top:`1%`, // 到页面顶部距离
    maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});
new Vue({
    render: h => h(App)
}).$mount('#app')