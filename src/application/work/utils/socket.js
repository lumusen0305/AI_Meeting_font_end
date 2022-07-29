import Vue from "vue";
import store from '../store';

const wsUrl ="ws://174.138.28.25:12345/ws/";
var socket;
const emitter = new Vue({
    methods: {
        send(message) {
            if (1 === socket.readyState) socket.send(JSON.stringify(message));
        },
        connect(item) {
            socket = new WebSocket(wsUrl+item);
            console.log(wsUrl+item);
            socket.onmessage = function(msg) {
                emitter.$emit("message", msg.data);
                // console.log("message", JSON.parse(msg.data));
                let context=JSON.parse(msg.data).context.replace(/'/g, '"');
                context=JSON.parse(context);
                // console.log("1231231231",store.state.room);
                // console.log('12312312312');
                if (store.state.room.roomid===JSON.parse(msg.data).roomId){
                    // console.log(context);
                    if(context.device==="bulb") {
                        store.state.bulb.status = context.status;
                        // "Msg":"{'device':'door','status':2}",
                    };
                    if(context.device==="door") {
                        store.state.door.status = context.status;
                    };
                    if(context.device==="person") {
                        store.state.person = context.number;
                        // {
                        //     "Msg":"{'device':'person','number':3}",
                        //     "Roomid":"2"
                        // }
                    };
                };
            };
            socket.onerror = function(err) {
                emitter.$emit("error", err);
                console.log(err);
            };
            socket.onclose = function() {
                emitter.connect();
            };
        }
    }
});

emitter.connect();
export default emitter;
