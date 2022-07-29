<template>
  <div class="background">
    <div class="context">
      <nav class="contex_title">
        <h2 class="hero paths">{{this.$store.state.username}}`s MEETING ROOM</h2>
      </nav>
      <div class="chose_box">
        <div class="stripe-btn" v-for="item in cities" :style="randomTitleRGB(item) ">
          <span>{{item}}</span>
          <div class="corners">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
          <div class="stripes">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </div>
      <div>
        <a-row v-for="item in this.room"  >
          <a-col :span="7" :offset="0"  style="margin-right:3vh;" >
            <div class="meet_room btn" :style="randomRgb(item)"  v-on:click="goToRoom(item)">
              <div class="room_title ">
                {{item.roomName}}
              </div>
              <div class="room_addr">
                {{item.roomOffice}}
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-row>

      <a-col :span="24" >
        <div class="bottom_introduce">
          <div class="bottom_context">
            <a-row>
              <a-col :span="5" class="bottom_title">
                <nav>說明</nav>
                <nav>
                  <a class="bottom_item">說明中心</a>
                </nav>
                <nav>
                  <a class="bottom_item">說明論壇 </a>
                </nav>
                <nav>
                  <a class="bottom_item">影片教學 </a>
                </nav>
              </a-col>
              <a-col :span="5" class="bottom_title">
                <nav>社群</nav>
                <nav>
                  <a class="bottom_item">AI_Meeting Discord</a>
                </nav>
              </a-col>
              <a-col :span="5" class="bottom_title">
                <nav>開發者</nav>
                <nav>
                  <a class="bottom_item" href="https://github.com/lumusen0305">Lumusen</a>
                </nav>
              </a-col>
              <a-col :span="12" >
              </a-col>
            </a-row>
          </div>
          <div style="  margin-left: 15%; margin-right: 15%;">
            <a-row>
              <a-col :span="2" class="bottom_bottom">
                <a>服務條款</a>
              </a-col>
              <a-col :span="2" class="bottom_bottom">
                <a>隱私權</a>
              </a-col>
              <a-col :span="2" class="bottom_bottom">
                <a>內容政策</a>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>

</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      value: 2,
      room:[],
      cities:["台北","高雄","新北","台中","台南","桃園"],
      page : 1,
      isBottom: false,
      spinning: false
    };
  },
  methods: {
    ColorToHex(color){
      var hexadecimal = color.toString(16);
      return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
    },
    ConvertRGBtoHex(red, green, blue) {
      return "#" + this.ColorToHex(red) + this.ColorToHex(green) + this.ColorToHex(blue);
    },
    goToRoom(item){
      this.$store.state.room=item;
      console.log(item);
      console.log(this.$store.state.room.roomid);
      this.$router.push('/Room');
    },
    randomRgb(item) {
      var RGB = new Array();
      let i = Math.floor(Math.random() * 2);
      console.log(i);
      RGB[0]=Math.floor(Math.random() * 255);
      RGB[1]=Math.floor(Math.random() * 255);
      RGB[2]=Math.floor(Math.random() * 255);
      RGB[i]=255;
      let color = this.ConvertRGBtoHex(RGB[0],RGB[1],RGB[2]);
      return {
        'border': '0.4vh rgb(' + RGB[0] + ',' + RGB[1] + ',' + RGB[2] + ')'+'solid',
        'color':'rgb(' + RGB[0] + ',' + RGB[1] + ',' + RGB[2] + ')',
        '--primary':'rgb(' + RGB[0] + ',' + RGB[1] + ',' + RGB[2] + ')'
      };
    },
    randomTitleRGB(item) {
      var RGB = new Array();
      let i = Math.floor(Math.random() * 2);
      console.log(i);
      RGB[0]=Math.floor(Math.random() * 255);
      RGB[1]=Math.floor(Math.random() * 255);
      RGB[2]=Math.floor(Math.random() * 255);
      RGB[i]=255;
      let color = this.ConvertRGBtoHex(RGB[0],RGB[1],RGB[2]);
      return {
        '--primary':'rgb(' + RGB[0] + ',' + RGB[1] + ',' + RGB[2] + ')'
      };
    },
    getRoomData(){
      axios({
        method: 'post',
        baseURL: 'http://174.138.28.25:12345',
        url: '/user/getRooms',
        headers: {
          Authorization: `Bearer `+this.$cookies.get('jwt-tocken')
        }
      }).then((response) => {
        console.log(response.data.data)
        response.data.data.forEach(item => {
          this.room.push(
              {
                roomid : item.roomid,
                roomName : item.roomName,
                roomOffice :item.roomOffice,
                address:item.address,
              })
        });

      })
          .catch((err) => {
            console.log(err);
            // this.$message.error('帳號密碼錯誤');
          })
    }
  },

  mounted() {
    this.getRoomData();
  }
}
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  overflow: hidden;
}
.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
.hero {
  font-family: GrandnessDemoRegular;
  color: #fff;
  z-index: 2;
  filter: drop-shadow(0 1px 3px);
}

.paths {
  animation: paths 5s step-end infinite;
}

@keyframes paths {
  0% {
    clip-path: polygon(
        0% 43%,
        83% 43%,
        83% 22%,
        23% 22%,
        23% 24%,
        91% 24%,
        91% 26%,
        18% 26%,
        18% 83%,
        29% 83%,
        29% 17%,
        41% 17%,
        41% 39%,
        18% 39%,
        18% 82%,
        54% 82%,
        54% 88%,
        19% 88%,
        19% 4%,
        39% 4%,
        39% 14%,
        76% 14%,
        76% 52%,
        23% 52%,
        23% 35%,
        19% 35%,
        19% 8%,
        36% 8%,
        36% 31%,
        73% 31%,
        73% 16%,
        1% 16%,
        1% 56%,
        50% 56%,
        50% 8%
    );
  }

  5% {
    clip-path: polygon(
        0% 29%,
        44% 29%,
        44% 83%,
        94% 83%,
        94% 56%,
        11% 56%,
        11% 64%,
        94% 64%,
        94% 70%,
        88% 70%,
        88% 32%,
        18% 32%,
        18% 96%,
        10% 96%,
        10% 62%,
        9% 62%,
        9% 84%,
        68% 84%,
        68% 50%,
        52% 50%,
        52% 55%,
        35% 55%,
        35% 87%,
        25% 87%,
        25% 39%,
        15% 39%,
        15% 88%,
        52% 88%
    );
  }

  30% {
    clip-path: polygon(
        0% 53%,
        93% 53%,
        93% 62%,
        68% 62%,
        68% 37%,
        97% 37%,
        97% 89%,
        13% 89%,
        13% 45%,
        51% 45%,
        51% 88%,
        17% 88%,
        17% 54%,
        81% 54%,
        81% 75%,
        79% 75%,
        79% 76%,
        38% 76%,
        38% 28%,
        61% 28%,
        61% 12%,
        55% 12%,
        55% 62%,
        68% 62%,
        68% 51%,
        0% 51%,
        0% 92%,
        63% 92%,
        63% 4%,
        65% 4%
    );
  }

  45% {
    clip-path: polygon(
        0% 33%,
        2% 33%,
        2% 69%,
        58% 69%,
        58% 94%,
        55% 94%,
        55% 25%,
        33% 25%,
        33% 85%,
        16% 85%,
        16% 19%,
        5% 19%,
        5% 20%,
        79% 20%,
        79% 96%,
        93% 96%,
        93% 50%,
        5% 50%,
        5% 74%,
        55% 74%,
        55% 57%,
        96% 57%,
        96% 59%,
        87% 59%,
        87% 65%,
        82% 65%,
        82% 39%,
        63% 39%,
        63% 92%,
        4% 92%,
        4% 36%,
        24% 36%,
        24% 70%,
        1% 70%,
        1% 43%,
        15% 43%,
        15% 28%,
        23% 28%,
        23% 71%,
        90% 71%,
        90% 86%,
        97% 86%,
        97% 1%,
        60% 1%,
        60% 67%,
        71% 67%,
        71% 91%,
        17% 91%,
        17% 14%,
        39% 14%,
        39% 30%,
        58% 30%,
        58% 11%,
        52% 11%,
        52% 83%,
        68% 83%
    );
  }

  76% {
    clip-path: polygon(
        0% 26%,
        15% 26%,
        15% 73%,
        72% 73%,
        72% 70%,
        77% 70%,
        77% 75%,
        8% 75%,
        8% 42%,
        4% 42%,
        4% 61%,
        17% 61%,
        17% 12%,
        26% 12%,
        26% 63%,
        73% 63%,
        73% 43%,
        90% 43%,
        90% 67%,
        50% 67%,
        50% 41%,
        42% 41%,
        42% 46%,
        50% 46%,
        50% 84%,
        96% 84%,
        96% 78%,
        49% 78%,
        49% 25%,
        63% 25%,
        63% 14%
    );
  }

  90% {
    clip-path: polygon(
        0% 41%,
        13% 41%,
        13% 6%,
        87% 6%,
        87% 93%,
        10% 93%,
        10% 13%,
        89% 13%,
        89% 6%,
        3% 6%,
        3% 8%,
        16% 8%,
        16% 79%,
        0% 79%,
        0% 99%,
        92% 99%,
        92% 90%,
        5% 90%,
        5% 60%,
        0% 60%,
        0% 48%,
        89% 48%,
        89% 13%,
        80% 13%,
        80% 43%,
        95% 43%,
        95% 19%,
        80% 19%,
        80% 85%,
        38% 85%,
        38% 62%
    );
  }

  1%,
  7%,
  33%,
  47%,
  78%,
  93% {
    clip-path: none;
  }
}
.chose_box{
  display: flex;
}
.movement {
  /* Normally this position would be absolute & on the layers, set to relative here so we can see it on the div */
  position: relative;
  animation: movement 8s step-end infinite;
}
.meet_room:hover{
  text-shadow: 0px 0px 10px var(--primary);
}
.stripe-btn {
  cursor: pointer;  /*鼠标悬停变小手*/

  margin-right:6vh;
  width: 10vh;
  /* --primary: hsl(0, 100%, 50%); */
  --secondary: hsl(224, 20%, 17%);
  --text-shadow-thickness: 0.05ch;
  --text-shadow-negative-thickness: calc(-1 * var(--text-shadow-thickness));
  position: relative;
  padding: 0.5vh 2vh;
  border: 2px solid var(--primary);
  font-size:2.5vh;
  font-family: "Poppins", sans-serif;
  color: var(--primary);
  text-transform: uppercase;
  text-shadow:
      var(--text-shadow-thickness) var(--text-shadow-thickness) 0px var(--secondary),
      var(--text-shadow-thickness) var(--text-shadow-negative-thickness) 0px var(--secondary),
      var(--text-shadow-negative-thickness) var(--text-shadow-thickness) 0px var(--secondary),
      var(--text-shadow-negative-thickness) var(--text-shadow-negative-thickness) 0px	var(--secondary);
}

.corners {
  --corner-dimension: 0.7ch;
  --corner-thickness: 3px;
  --corner-negative-thickness: calc(-1 * var(--corner-thickness));
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.corners > i {
  content: "";
  position: absolute;
  width: var(--corner-dimension);
  height: var(--corner-dimension);
}

.corners > i:nth-child(1) {
  top: 0;
  left: 0;
  box-shadow: inset var(--corner-thickness) var(--corner-thickness) 0	var(--primary);
}

.corners > i:nth-child(2) {
  top: 0;
  right: 0;
  box-shadow: inset var(--corner-negative-thickness) var(--corner-thickness) 0 var(--primary);
}

.corners > i:nth-child(3) {
  bottom: 0;
  right: 0;
  box-shadow: inset var(--corner-negative-thickness) var(--corner-negative-thickness) 0 var(--primary);
}

.corners > i:nth-child(4) {
  bottom: 0;
  left: 0;
  box-shadow: inset var(--corner-thickness) var(--corner-negative-thickness) 0 var(--primary);
}

.stripes {
  --stripes-position: 0.3ch;
  content: "";
  position: absolute;
  display: flex;
  justify-content: space-between;
  height: calc(100% - var(--stripes-position) * 2);
  width: calc(100% - var(--stripes-position) * 2);
  top: var(--stripes-position);
  left: var(--stripes-position);
  overflow: hidden;
}

.stripes > i {
  content: "";
  height: calc(100% + 2ch);
  width: 0.5ch;
  background: var(--primary);
  opacity: 0.3;
  transform: translateY(-1ch) rotate(37deg);
  transition: all 0.2s cubic-bezier(0.85, 0, 0.15, 1)
}

.stripes > i:nth-child(1) {transition-delay: 0.02s;}
.stripes > i:nth-child(2) {transition-delay: 0.04s;}
.stripes > i:nth-child(3) {transition-delay: 0.06s;}
.stripes > i:nth-child(4) {transition-delay: 0.08s;}
.stripes > i:nth-child(5) {transition-delay: 0.10s;}
.stripes > i:nth-child(6) {transition-delay: 0.12s;}
.stripes > i:nth-child(7) {transition-delay: 0.14s;}
.stripes > i:nth-child(8) {transition-delay: 0.16s;}
.stripes > i:nth-child(9) {transition-delay: 0.18s;}
.stripes > i:nth-child(10) {transition-delay: 0.20s;}
.stripes > i:nth-child(11) {transition-delay: 0.22s;}
.stripes > i:nth-child(12) {transition-delay: 0.24s;}
.stripes > i:nth-child(13) {transition-delay: 0.26s;}
.stripes > i:nth-child(14) {transition-delay: 0.28s;}
.stripes > i:nth-child(15) {transition-delay: 0.3s;}
.stripes > i:nth-child(16) {transition-delay: 0.32s;}
.stripes > i:nth-child(17) {transition-delay: 0.34s;}
.stripes > i:nth-child(18) {transition-delay: 0.36s;}
.stripes > i:nth-child(19) {transition-delay: 0.38s;}
.stripes > i:nth-child(20) {transition-delay: 0.4s;}

.stripe-btn:hover .stripes > i {opacity: 0.5;}

span {
  position: relative;
  z-index: 10000;
}


@keyframes movement {
  0% {
    top: 0px;
    left: -20px;
  }

  15% {
    top: 10px;
    left: 10px;
  }

  60% {
    top: 5px;
    left: -10px;
  }

  75% {
    top: -5px;
    left: 20px;
  }

  100% {
    top: 10px;
    left: 5px;
  }
}

.opacity {
  animation: opacity 5s step-end infinite;
}

@keyframes opacity {
  0% {
    opacity: 0.1;
  }

  5% {
    opacity: 0.7;
  }

  30% {
    opacity: 0.4;
  }

  45% {
    opacity: 0.6;
  }

  76% {
    opacity: 0.4;
  }

  90% {
    opacity: 0.8;
  }

  1%,
  7%,
  33%,
  47%,
  78%,
  93% {
    opacity: 0;
  }
}
.btn {

  border: 0;
  outline: none;
  background-color: var(--black-color);
  /* background-color: #fff; */
  cursor: pointer;
  position: relative;
  font-family: Tomorrow, sans-serif;
  font-size: .85rem;
  text-transform: uppercase;
  color: var(--black-color);
  /* clip-path: polygon(90% 0, 100% 25%, 100% 100%, 10% 100%, 0% 75%, 0 0); */
  clip-path: polygon(85% 0, 100% 35%, 100% 100%, 15% 100%, 0% 65%, 0 0);

}
</style>



