<template>
    <div id="app">
        <router-view>
        </router-view>
    </div>
</template>


<script>
  import Socket from '@/application/work/utils/socket';
  import { mapMutations } from "vuex";
  import axios from "axios";
    export default {
        name: "work",
      created(){
        this.getUserData();
        console.log("open");
        // console.log(this.handleGetMessage);
      },

      beforeDestroy() {
        Socket.$off("message", this.handleGetMessage);
      },
      methods: {
        getUserData(){
          axios({
            method: 'post',
            baseURL: 'http://0.0.0.0:12345',
            url: '/account/member/profile',
            headers: {
              Authorization: `Bearer `+this.$cookies.get('jwt-tocken')
            }
          }).then((response) => {
            this.$store.state.username=response.data.data.username;
            this.$store.state.account=response.data.data.account;
            this.$store.state.id=response.data.data.id;
            Socket.$on("message", this.handleGetMessage);
            Socket.connect(response.data.data.id);
          })
              .catch((err) => {
                console.log(err);
                // this.$message.error('帳號密碼錯誤');
              })
        },
        ...mapMutations({
        setWsRes: "ws/setWsRes",
        }),
        handleGetMessage(msg) {
      // 一些全局的動作可以放在這裡
        this.setWsRes(JSON.parse(msg));
    }
  }
    }
</script>

<style scoped>
    @import "./assets/css/main.css";
    @import "./assets/css/air_conditioner.css";
    
    /* @import "./assets/css/color-dark.css"; */
    html,body,#app{
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>