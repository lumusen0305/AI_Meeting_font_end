<template>
<div>
  <div class="outside">
  <div class="menu cyberpunk" >
    <div class="silder_bar_title">
      設定
    </div>
    <hr>
    <div class="silder_bar_wrap ">
    <button type="button" class="silder_bar_context ghost-button"  v-for="item in setting_data"> 
         {{item}}
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
</div>
</template>

<style>

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
export default {
  data() {
    return {
      visible: false,
      registerVisible:false,
      i : 0,
      isTop: true,
      setting_data:[
        "首頁","控制頁面", "修改個人資料","添加會議室","移除會議室","登出"
      ]
    };
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
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
  },
  
};

</script>


