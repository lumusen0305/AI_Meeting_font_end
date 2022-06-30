<template>
<div class="background">
          <div class="room_context">
            <nav class="contex_title">
                <h2 class="hero paths">MEETING ROOM CONTROL</h2>
            </nav>
            
            <div>
            <a-row >
              <a-col :span="7" >
              <div class="people_board">
                    <a-row > 
                        <a-col :span="5" :offset="1">
                 <a-icon class="people_icon" type="user" />
                          </a-col>
                        <a-col :span="3" :offset="4">
                          <span class="people_font">
                            X
                        </span>
                        </a-col>
                        <a-col :span="3" :offset="2">
                          <span class="people_font">
                            10
                        </span>
                        </a-col>
                    </a-row>
              </div>
              </a-col>
              <a-col :span="7" :offset="1" >
              <div class="bulb_board" @click="change_bulb">
                    <a-row > 
                        <div v-if="bulb_status===0">
                            <a-col :span="5" :offset="1">
                                    <a-icon class="bulb_icon" type="bulb" theme="filled" />
                              </a-col>
                              <span class="bulb_font">
                                turn on
                            </span>
                        </div>
                      <div v-else-if="bulb_status === 1">
                        <a-col :span="5" :offset="1">
                          <a-icon class="bulb_icon" type="bulb" />
                        </a-col>
                        <span class="bulb_font">
                                turn off
                            </span>
                      </div>
                        <div v-else>
                            <a-col :span="5" :offset="1">
                                    <a-icon class="bulb_icon" type="reddit" />
                              </a-col>
                              <span class="bulb_font">
                                auto
                            </span>

                        </div>
                    </a-row>
              </div>
              </a-col>
              <a-col :span="7" :offset="1" >
              <div class="door_board" @click="change_door">
                    <a-row > 
                        <div v-if="door_status=== 0">
                            <a-col :span="5" :offset="0">
                                    <a-icon class="door_icon" type="import"/>
                              </a-col>
                              <span class="door_font">
                                turn on
                            </span>
                        </div>
                      <div v-else-if="door_status === 1">
                        <a-col :span="5" :offset="1">
                          <a-icon class="door_icon" type="lock" />
                        </a-col>
                        <span class="door_font">
                                turn off
                            </span>
                      </div>
                      <div v-else>
                            <a-col :span="5" :offset="1">
                                    <a-icon class="door_icon" type="reddit" />
                              </a-col>
                              <span class="door_font">
                                auto
                            </span>

                        </div>
                    </a-row>
              </div>
              </a-col>
              <a-col :span="12" >
                <div class="container">
                  <div class="air">
                      <span class="led_font">17°C</span>
                      <div class="dot"> .</div>
                  </div>
            </div>

              </a-col>
            <a-col :span="4" :offset="2" >
              <div class="controller">
                <div>
                  <span class="led_controller_font">17°C</span>
                </div>
                <div class="controller_button">
                    <div class="controller_switch  "  style="margin-left: 10%;">
                      <a-icon type="poweroff" class="lable "/>
                      </div>
                      <div class="controller_font "  style="margin-left: 20%;">
                      <a-icon type="up" class="lable"/>
                      </div>
                    <div class="controller_font_snow " style="margin-left: 10%;">
                      <i class="fa fa-snowflake-o lable" style="font-size:4vh"></i>
                    </div>
                      <div class="controller_font "  style="margin-left: 20%;">
                      <a-icon type="down" class="lable"/>
                      </div>
                    <div class="controller_font_sun " style="margin-left: 10%;">
                      <i class="fa fa-sun-o lable" style="font-size:4vh"></i>
                    </div>


                </div>

              </div>
            </a-col>
            </a-row>
            </div>
          </div>
        </div>

</template>

<script>
import axios from "axios";
import Socket from "@/application/work/utils/socket";
export default {
name: "index",
  data() {
    return {
      value: 2,
      room:[
        {
          "name":"a",
          "address":"402台中市南區興大路145號",
        },
      ],
      bulb_status:0,
      door_status:0,
      roomid:this.$store.state.room.roomid
    };
  },
    methods: {
        change_bulb() {
          console.log(this.roomid);
          this.bulb_status = this.bulb_status+1;
          if (this.bulb_status==2){
            this.bulb_status=0;
          }
          if (this.bulb_status==0){
            Socket.send(
                {
                  "Msg":"turn on bulb",
                  "Roomid":this.roomid
                });
          }
          else {
            Socket.send(
                {
                  "Msg":"turn off bulb",
                  "Roomid":this.roomid
                });
          }
        },
        change_door() {
          this.door_status = this.door_status+1;
          if (this.door_status==2){
            this.door_status=0;
          }
          if (this.door_status==0){
            Socket.send(
                {
                  "Msg":"open door",
                  "Roomid":this.roomid
                });
          }
          else {
            Socket.send(
                {
                  "Msg":"close door",
                  "Roomid":this.roomid
                });
          }
        },
    }
  }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

.room_context{
  width: 60%;
  margin:0 auto;
  margin-left: 25%;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  overflow: hidden;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.people_board{
      font-family: "VT323", monospace;

    height: 20vh;
    border: 2px solid rgb(255, 224, 224);
	box-shadow: 0 0 20px rgb(255, 0, 0);
    background-color: rgba(255, 12, 12, 0.15);
	border-radius: 10px 10px 10px 10px;
}

.people_icon{
    text-shadow: 0 0 10px rgb(255, 0, 0);
    color: rgb(255, 224, 224);
    font-size: 15vh;
    height:  20vh;
    display: flex;
    width: 10vh;
    align-items: center;   
    margin-left: 1vh;

    /* background-color: #fff; */
}
.people_font{
    
    text-shadow: 0 0 10px rgb(255, 0, 0);
	color: rgb(255, 224, 224);
    font-size: 9vh;
    height:  20vh;
    display: flex;          /* ★ */
    align-items: center;    /* ★ */
    /* background-color: #fff; */
}
.bulb_board{
    font-family: "VT323", monospace;
    cursor: pointer;  /*鼠标悬停变小手*/
    height: 20vh;
    border: 2px solid rgb(252, 255, 224);
	box-shadow: 0 0 20px rgb(255, 247, 0);
    background-color: rgba(243, 255, 12, 0.15);
	border-radius: 10px 10px 10px 10px;
}

.bulb_icon{
    text-shadow: 0 0 10px  rgb(255, 247, 0);
    color: rgb(252, 255, 224);
    font-size: 15vh;
    height:  20vh;
    display: flex;
    width: 10vh;
    align-items: center;   
    margin-left: 1vh;

    /* background-color: #fff; */
}
.bulb_font{
    margin-left: 15vh;
    text-shadow: 0 0 10px  rgb(255, 247, 0);
	color: rgb(252, 255, 224);
    font-size: 6vh;
    height:  20vh;
    display: flex;          /* ★ */
    align-items: center;    /* ★ */
    /* background-color: #fff; */
}
.door_board{
    font-family: "VT323", monospace;
    cursor: pointer;  /*鼠标悬停变小手*/
    height: 20vh;
    border: 2px solid rgb(224, 247, 255);
	  box-shadow: 0 0 20px rgb(0, 217, 255);
    background-color: rgba(12, 214, 255, 0.15);
	border-radius: 10px 10px 10px 10px;
}

.door_icon{
    text-shadow: 0 0 10px  rgb(0, 217, 255);
    color: rgb(224, 247, 255);
    font-size: 15vh;
    height:  20vh;
    display: flex;
    width: 10vh;
    align-items: center;   
    margin-left: 1vh;

    /* background-color: #fff; */
}
.door_font{
    margin-left: 15vh;
    text-shadow: 0 0 10px  rgb(0, 217, 255);
	color: rgb(224, 247, 255);
    font-size: 6vh;
    height:  20vh;
    display: flex;          /* ★ */
    align-items: center;    /* ★ */
    /* background-color: #fff; */
}
/* ========================== */
.dot{
  width: 10px;
  height: 10px;
  border-radius: 50%;
  color: rgba(255, 255, 255, 0);
  margin-top: 13%;
  margin-left: 94%;
  border: 2px solid rgb(198, 240, 226);
  background-color: rgba(0, 255, 170, 0.885);
}
</style>


