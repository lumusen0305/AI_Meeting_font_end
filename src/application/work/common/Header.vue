<template>
<div>
  <div class="outside">
  <div class="menu cyberpunk" >
    <div class="silder_bar_title">
      SETTING
    </div>
    <hr>
    <div class="silder_bar_wrap ">
      <button type="button" class="silder_bar_context ghost-button" @click="jumpToHome" >
        Home
      </button>
      <button type="button" class="silder_bar_context ghost-button"   @click="jumpToSetting">
        Setting
      </button>
      <button type="button" class="silder_bar_context ghost-button"   @click="showAddRoom">
        Add Meeting Room
      </button>
      <button type="button" class="silder_bar_context ghost-button"  @click="showRemoveRoom" >
        Remove Meeting Room
      </button>
      <button type="button" class="silder_bar_context ghost-button" @click="sign_out" >
        Sign Out
      </button>
    </div>
</div>
</div>
  <div   v-bind:class="{ 'navbar_top' : isTop, 'navbar': !isTop}">
    <div class="navbar_tool" >
      <a-row>
        <a-col :span="4" :offset="1" >
          <div class="title">AI Meeting</div>
        </a-col>
        <a-col :span="6" :offset="3" >
            <a-input ref="userNameInput" v-model="userName" placeholder="Search">
              <a-tooltip slot="suffix" title="Extra information">
              <a-icon type="search" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
        </a-col>
        <a-col :span="10" class="top_bar_container">
          <a-icon class="navbar_icon" type="menu-unfold" />
          <a-icon class="navbar_icon" type="book" />
          <a-icon class="navbar_icon" type="tag" />
          <div class="navbar_icon">
            <a-avatar  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></div>
         </a-col>

      </a-row>
    </div>

  </div>
    <div>
    <a-back-top />
    <strong style="color: rgba(64, 64, 64, 0.6)">  </strong>
  </div>
  <a-modal v-model="addRoomVisible" title="Add Room" ok-text="Enter" cancel-text="Cancel" @ok="addRoom" >
    <a-input ref="userNameInput" v-model="add_room" placeholder="Input Room ID">
      <a-icon slot="prefix" type="plus" />
    </a-input>
  </a-modal>

  <a-modal v-model="removeRoomVisible"  title="Remove Room" ok-text="Enter" cancel-text="Cancel" @ok="removeRoom" >
    <a-select v-model:value="roomInfo"    style="width: 100%"  @change='handleChange'>
      <a-select-option v-for="(item, index) in this.$store.state.roomList"  :value="index" :key="index">
        {{item.roomName}}
      </a-select-option>
    </a-select>
  </a-modal>
</div>

</template>

<style>
.ant-modal {
  max-width: 100%;
  margin-top: 11%;
}
.ant-modal-content {
  display: flex;
  flex-direction: column;
}
.ant-modal-body {
  flex: 1;
}
.silder_bar_wrap{
    /* display: flex; */
    height: 35vh;
    padding-top:1vh;
    padding-left:2vh;
    padding-right:2vh;
}
.silder_bar_context{
  margin-top: 2vh;
  font-size: 1.7vh;
  margin-right: 2vh;
  display: inline-block;
  border-radius: 10px;
}
.silder_bar_context:hover{
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

}
 .ghost-button:active {
	background: lightcyan;
	box-shadow: 0 0 10px cyan;
	border: 3px solid white;
	background-color: rgba(0, 220, 255, 0.5);
	text-shadow: 0 0 5px cyan;
	font-weight: bold;
	transition: all ease-in 200ms;
}
.ghost-button {
	background: lightcyan;
	box-shadow: 0 0 20px cyan;
	border: 2px solid lightcyan;
	background-color: rgba(0, 220, 255, 0.2);
	text-shadow: 0 0 10px cyan;
	color: lightcyan; 
	padding: 5px 10px;
	transition: all ease-out 200ms;
}
.silder_bar_title{
	text-shadow: 0 0 10px cyan;
	color: lightcyan;
	font-family: 'Orbitron', sans-serif;
  margin-top: 1.4vh;
  padding-bottom: 1vh;
  font-size: 3vh;
  padding-left: 2vh;
  /* border-bottom: 3px solid cyan;; */
}
.menu{
  position: fixed;
  left: 8vh;
  top: 24%;
  width: 32vh;
}
.top_bar_container{
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
}
html,body,#root{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color:rgb(0, 0, 0);
  
}
.navbar_icon{
  padding-right: 30px;
  padding-left: 20px;
}
.navbar {
  z-index:9999 ;
  overflow: hidden;
  background-color: white;
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  /*border-top: 1px solid #ddd;*/
  border-bottom: 3px solid #ff0000;
    -webkit-transition: 0.5s;
}
.navbar_top{
  z-index:9999 ;
  overflow: hidden;
  color: white;
  /* background-color: white; */
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  -webkit-transition: 0.5s;
  /*border-top: 1px solid #ddd;*/
  /* border-bottom: 3px solid #ff0000;  */
}
.navbar_tool{
  width: 100%;
  height: 100%;
  font-size: 30px;
}

hr {
	background: lightcyan;
	box-shadow: 0 0 20px cyan;
	height: 0.3vh;
}
</style>
<script>
import bus from './bus';
import indexPage from "../views/index";
import axios from "axios";

export default {
  data() {
    return {
      visible: false,
      addRoomVisible: false,
      registerVisible:false,
      removeRoomVisible:false,
      i : 0,
      isTop: true,
      roomInfo:0,
      add_room:"",
    };
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    handleChange(e){
      console.log(e);
    },
      randomRgb(item) {
        let R = Math.floor(Math.random() * 255);
        let G = Math.floor(Math.random() * 255);
        let B = Math.floor(Math.random() * 255);
        return {
          // 'border-left': '0.6vh rgb(' + R + ',' + G + ',' + B + ')'+'solid'
          color: 'rgb(' + R + ',' + G + ',' + B + ')',
          border:' 1px solid '+ 'rgb(' + R + ',' + G + ',' + B + ')'
        };
      },
    jumpToHome(){
      document.location.href = "/about#";
    },
    sign_out(){
      this.$cookies.remove('jwt-tocken');
      this.jumpToHome();
    },
    showAddRoom(){
      this.addRoomVisible = true;
    },
    showRemoveRoom(){
      this.removeRoomVisible = true;
    },
    addRoom(){
      console.log(this.add_room)
      axios({
        method: 'post',
        baseURL: 'http://0.0.0.0:12345',
        url: '/account/addRooms',
        headers: {
          Authorization: `Bearer `+this.$cookies.get('jwt-tocken')
        },
        data: {
          "roomid": this.add_room
        },
      }).then((response) => {
        this.$store.state.roomList=[]
        this.getRoomData();
        this.$message.success('添加成功');
        this.addRoomVisible=false;
      }).catch((err) => {
        console.log(err)
        this.$message.error('添加失敗');
      })
    },
    removeRoom(){
      console.log(this.$store.state.roomList[this.roomInfo])
      axios({
        method: 'post',
        baseURL: 'http://0.0.0.0:12345',
        url: '/account/removeRooms',
        headers: {
          Authorization: `Bearer `+this.$cookies.get('jwt-tocken')
        },
        data: {
          "roomid":this.$store.state.roomList[this.roomInfo].roomid,
        },
      }).then((response) => {
        this.$message.success('刪除成功');
        this.$store.state.roomList.splice(this.roomInfo,1)
        this.removeRoomVisible=false;
      })
          .catch((err) => {
            this.$message.error('刪除失敗');
          })
    },
    getRoomData(){
      axios({
        method: 'post',
        baseURL: 'http://0.0.0.0:12345',
        url: '/user/getRooms',
        headers: {
          Authorization: `Bearer `+this.$cookies.get('jwt-tocken')
        }
      }).then((response) => {
        console.log(response.data.data)
        response.data.data.forEach(item => {
          this.$store.state.roomList.push(
              {
                roomid : item.roomid,
                roomName : item.roomName,
                roomOffice :item.roomOffice,
                address:item.address,
              })
          // this.room.push(
          //     {
          //       roomid : item.roomid,
          //       roomName : item.roomName,
          //       roomOffice :item.roomOffice,
          //       address:item.address,
          //     })
        });

      })
          .catch((err) => {
            console.log(err);
            // this.$message.error('帳號密碼錯誤');
          })
    },
    handleScroll(){
      // 頁面滾動距頂部距離
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                document.body.scrollTop
      var scroll = scrollTop - this.i;
      this.i = scrollTop;
      if(scrollTop==0){
          this.isTop=true;
      }else{
          this.isTop=false;
    }
        },
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
    confirm() {
      this.$confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      });
    },
    jumpToWallpaper(){
      document.location.href = "/work";
    },
    jumpToSong(){
      document.location.href = "/work";
    },
    jumpToWine(){
      document.location.href = "/work";
    },
    showRegister() {
      this.visible=false;
      this.registerVisible = true;
    },
    hideRegister() {
      this.registerVisible = false;
    },
    jumpToSetting(){

    }
  },
  
};

</script>


