
import Vue from 'vue';
import Vuex from 'vuex';
import ws from "./ws";
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        wsNotify: {},
        account:{},
        username:{},
        room:{},
        id:{},
    },
    mutations: {
        //當接收到最新的後端送來的websocket資訊，直接存到state中的wsNotify
        setWsNotify(state, param) {
            Vue.set(state, 'wsNotify', param);
        },
    },
    actions: {},
    modules: { ws }

});