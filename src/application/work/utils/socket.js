import Vue from "vue";
const wsUrl ="ws://0.0.0.0:12345/ws/";
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
                console.log("message", msg.data);
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
