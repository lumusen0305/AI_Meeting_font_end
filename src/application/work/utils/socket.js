import Vue from "vue";
import store from '../store';

const wsUrl ="ws://188.166.209.73:12345/ws/";
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
                if (store.state.room.roomid===JSON.parse(msg.data).Sender){
                    console.log("bashdiuashdius");
                    if(context.device==="bulb") {
                        store.state.bulb.status = context.status;
                        console.log("bulb:1231231");

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
