
<template>
  <div class="bg">
    <a-layout id="components-layout-demo-basic">
      <a-layout-header>
          <a-row>
            <a-col :span="1" :offset="15">
              <a-icon class="icon" type="github"/>
            </a-col>
            <a-col :span="1" :offset="1">
              <a-icon class="icon" type="android" theme="filled" />
            </a-col>

            <a-col :span="1" :offset="1">
              <div @click="showModal" class="login_style">
                <a-icon type="user" class="icon"/>
                <a-modal v-model="visible" title="Login" ok-text="確認"  cancel-text="取消" @ok="hideModal">
                  <div>
                    <div class="login">
                      <a-input ref="userNameInput" v-model="account" placeholder="Your account">
                        <a-icon slot="prefix" type="user" />
                      </a-input>
                      <br />
                      <br />
                      <a-input-password ref="passwordinput" v-model="password" placeholder="Your password">
                        <a-icon slot="prefix" type="fire" />
                      </a-input-password>
                      <br />
                      <br />

                      <div name="register">
                        <a @click="showRegister">
                          沒有帳號？...
                        </a>
                        <a-modal v-model="registerVisible" title="Register" ok-text="確認" cancel-text="取消" @ok="sendRegister">
                          <a-input ref="userNameInput" v-model="userName" placeholder="Register Your username">
                            <a-icon slot="prefix" type="user" />
                          </a-input>
                          <br />
                          <br />
                          <a-input ref="accountInput" v-model="account" placeholder="Register Your account">
                            <a-icon slot="prefix" type="setting" />
                          </a-input>
                          <br />
                          <br />
                          <a-input-password ref="passwordinput" v-model="password" placeholder="Enter Your password">
                            <a-icon slot="prefix" type="fire" />
                          </a-input-password>
                          <br />
                          <br />
                          <div>
                            <a-input ref="emailinput" v-model="email" placeholder="Enter Your E-Mail" class="verifiedcode">
                              <a-icon slot="prefix" type="mail" />
                            </a-input>
                          </div>
                          <br />
                          <br />
                          <div style="display: flex;justify-content: flex-start;">
                            <a-input ref="verfiedInput" v-model="verification" placeholder="Enter your verfied code" enter-button="Get Your verfied code" style="width:80%">
                              <a-icon slot="prefix" type="user" />
                            </a-input>
                            <a-button type="primary" :size="size" v-on:click="sendVerfied">Send Code</a-button>
                          </div>
                        </a-modal>
                      </div>

                    </div>
                  </div>
                </a-modal>
              </div>
            </a-col>
            <a-col :span="3" :offset="1">
              <div class="title"  v-on:click="showIntroduce">AI Meeting</div>
            </a-col>
          </a-row>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="40%">
      <div class="box">
        <div class="cube">
          <div class="top"></div>
            <div>
              <span style="--i:0;">
                <h2>AI</h2>
                <h2>AI</h2>
              </span>
              <span style="--i:1;">
                <h2>AI</h2>
                <h2>AI</h2>
              </span>
              <span style="--i:2;">
                <h2>AI</h2>
                <h2>AI</h2>
              </span>
              <span style="--i:3;">
                <h2>AI</h2>
                <h2>AI</h2>
              </span>
              </div>
            </div>
       </div>
        </a-layout-sider>
        <a-layout-content >
          <div class="menu">
            <div class="introduce_1">
            <nav class="introduce">
              <div class="introduce_title shift_1">OBJECT DETECT</div>

              <div class="introduce_context shift_2">當議室中沒有檢測到人之後將自動關閉電燈等設施。
                  <div class="box-border">
                   </div>
              </div>
            </nav>
            </div>
            <div class="introduce_2">
            <nav class="introduce">
              <div class="introduce_title shift_3">SPEECH COMMAND</div>

              <div class="introduce_context shift_4">利用NLP接收指令，並且依據指令對冷氣等物件進行操作。
                  <div class="box-border">
                   </div>
              </div>
            </nav>
            </div>
                        <div class="introduce_3">

            <nav class="introduce">
              <div class="introduce_title shift_5">FACIAL RECOGNITION SYSTEMS</div>

              <div class="introduce_context shift_6">進行人臉識別，並且與資料庫的預約表進行對照。經查證有預約的話解除門鎖。
                  <div class="box-border">
                   </div>
              </div>
            </nav>
            </div>
              <div class="siber_btn">
              <button class="btn"  @click="showModal" >Start</button>
            </div>
            
          </div>

        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      account:"lumusen0305",
      userName:"lumusen",
      password:"guitar0305",
      email:"lumusen890305@gmail.com",
      verification:"",
      visible: false,
      registerVisible:false,
    };
  },
  created() {
    window.onresize = () => {
      fun()
      // 重置 animation 保证变量加载
      this.$refs.bg.classList.remove('animation')
      setTimeout(() => {
        this.$refs.bg.classList.add('animation')
      }, 100)
    }
    fun()
  },
  methods: {
    showIntroduce(){
      document.location.href = "/about";
    },
    showModal() {
      this.visible = true;
    },
    hideModal() {
      console.log(this.userName);
      axios({
        method: 'post',
        baseURL: 'http://174.138.28.25:12345',
        url: '/account/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "account":this.account,
          "password":this.password
        },
      }).then((response) => {
        console.log(response);
        this.visible = false;
        this.$cookies.set('jwt-tocken',response.data.token);
        this.$message.success('歡迎登入'+this.account);
        this.jumpToIndex()
      })
          .catch((err) => {
            console.log(err)
            this.$message.error('帳號密碼錯誤');
          })
    },
    confirm() {
      this.$confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: '確認',
        cancelText: '取消',
      });
    },
    jumpToWallpaper(){
    },
    jumpToIndex(){
      document.location.href = "/work#/Index";
    },

    showRegister() {
      this.visible=false;
      this.registerVisible = true;
    },
    sendRegister() {
      axios({
        method: 'post',
        baseURL: 'http://174.138.28.25:12345',
        url: '/account/register',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "account":this.account,
          "username":this.userName,
          "password":this.password,
          "email":this.email,
          "verification_code":this.verification
        },
      }).then((response) => {
        console.log(response);
        this.visible = false;
        this.$message.success('註冊成功請登入帳號');
        this.registerVisible = false;
      })
          .catch((err) => {
            console.log(err)
            this.$message.error(err.response.data.msg);
          })
    },
    sendVerfied(){
      axios({
        method: 'post',
        baseURL: 'http://174.138.28.25:12345',
        url: '/account/verification',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          "account":this.account,
          "username":this.userName,
          "password":this.password,
          "email":this.email
        },
      }).then((response) => {
        console.log(response);
        this.visible = false;
        this.$message.success('發送成功請到'+this.email+'查看驗證碼');
      })
          .catch((err) => {
            console.log(err)
            this.$message.error('請填寫完整再發送驗證');
          })
    }
  },
};
</script>

<style scoped>
  .box-border{
    position:relative;
    left:0%;
    width:80%;
    /* height: 2vh; */
    /* border-bottom:0.5vh solid #000; */
  }
.introduce{
  /* background-color: #011c3a; */
  padding-top: 3vh;
  text-align:left;

  /* height: 100%; */
}
.introduce_1{
    background:linear-gradient(105deg, transparent 30vh, rgba(225, 225, 225, 0.895) 0)top left;
}
@keyframes  swing  {
		15% { transform:  translateX(5px); }
		40% { transform:  translateX(-5px); }
		65% { transform:  translateX(2px); }
		85% { transform:  translateX(-2px); }
		100% { transform:  translateX(0px); }
	}
	
.introduce:hover { 
		animation : swing 1s 1;  
          cursor: pointer;  /*鼠标悬停变小手*/

  }
.introduce_2{
    background:linear-gradient(105deg, transparent 24vh, rgba(200, 200, 200, 0.895) 0)top left;
}
.introduce_3{
    background:linear-gradient(105deg, transparent 18vh, rgba(175, 175, 175, 0.895) 0)top left;
}
.shift_1{
  margin-left: 32vh;
}
.shift_2{
  margin-left: 34vh;
}
.shift_3{
  margin-left: 27vh;
}
.shift_4{
  margin-left: 29vh;
}
.shift_5{
  margin-left: 23vh;
}
.shift_6{
  margin-left: 25vh;
}

.introduce_title{
  margin-top: 2vh;
  color: #000000;
    font-family: dahot2;

    font-size: 6vh;
  height: 9vh;
}
.introduce_context{
  line-height:5vh;
  color: #313131;
  font-size: 2.5vh;
  height: 9vh;
}
.menu{
  width: 100%;
  height: 100%;
 background:linear-gradient(105deg, transparent 30vh, rgba(255, 255, 255, 0.895) 0)top left  ;
}
.box{
  margin-left: 20%;
  margin-top:35%;
}
.top{
  position:absolute;
  top:0;
  left: 0;
  width: 00px;
  height: 45vh;
  background:#222;
  transform: rotateX(90deg) translateZ(22.5vh);
}
.top::before{
  content: '';
  position: absolute;
  top:0;
  left: 0;
  width: 45vh;
  height: 45vh;
  background:#ffffff;
  transform: translateZ(-56vh);
  filter: blur(40px);
  box-shadow: 0 0 120px rgba(255, 255, 255, 0.2),
  0 0 200px rgba(255, 255, 255,0.4),
  0 0 300px rgba(255, 255, 255,0.6),
  0 0 400px rgba(255, 255, 255,0.8),
  0 0 500px rgba(255, 255, 255,1);
}
.cube{
  
  position: relative;
  width: 45vh;
  height: 45vh;
  transform-style: preserve-3d;
  transform: rotateX(-30deg) ;
  animation: animate 4s linear infinite;
}
@keyframes animate
{
  0%
  {
    transform: rotateX(-30deg) rotateY(0deg);
  }
  100%
  {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}
.cube div{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.cube div span{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  background:linear-gradient(#1f1f1f,#ffffff);
  transform: rotateY(calc(90deg * var(--i))) translateZ(22.3vh);
  display: flex;
  justify-content:center;
  align-items: center;
  transform-style: preserve-3d;
}
.cube div span h2{
  position: absolute;
  font-size: 16vh;
  color: white;
  transform:translateZ(50px);
}
.cube div span h2:nth-child(1){
  transform: translateZ(0) translateY(20px);
  color: #0000004d;
  filter: blur(2px);
}
.siber_btn{
  align-content: center;
  justify-content: center;
  align-items: center;
  /* margin-top:10%; */
  margin-left: 20%;
  margin-top: 8%;
}

.show_image{
  margin-top: 2%;
  margin-right: 6%;
  height: 55%;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  margin-top: 40px;
  /* height: 160px; */
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.preview{
  height: 100%;
  width: 100%;
}
html,body {
  height: 100%;
  padding: 0;
  margin: 0;

}
@font-face {
  font-family: dahot2;
  src: url("../../assets/font/MILLENNIA.TTF")
}

.title{
  font-size: 45px;
  font-family: dahot2;
  color:black;
}

.icon {
  margin-top: 10px;
  margin-right: 6px;
  font-size: 30px;
  color: rgb(27, 23, 23);
}

.ant-layout-sider,.ant-layout-header,.ant-layout{
  background-color:  #000000;                 
}
.ant-layout-header{
  background-color:  #ffffff;
  border-bottom:0.5vh solid #620017;
}
#components-layout-demo-basic .ant-layout-sider img {
  height: 100%;
  /* width: 100%; */

}
#components-layout-demo-basic {
  text-align: center;
  height: 100vh;
  width: 100%;
}
#components-layout-demo-basic .ant-layout-header{
  color: #fff;
}
#components-layout-demo-basic .ant-layout-sider {
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
.btn, .btn::after {
  width: 35vh;
  height: 9vh;
  font-size: 5vh;
  font-family: 'Bebas Neue', cursive;
  background: linear-gradient(45deg, transparent 5%, #011c3a 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  line-height: 88px;
  box-shadow: 6px 0px 0px #00E6F6;
  outline: transparent;
  position: relative;
}

.btn::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);
  
  content: 'Start';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 3%, #00E6F6 3%, #00E6F6 5%, #01213a 5%);
  text-shadow: -3px -3px 0px #F8F005, 3px 3px 0px #00E6F6;
  clip-path: var(--slice-0);
}

.btn:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}


@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}
</style>
