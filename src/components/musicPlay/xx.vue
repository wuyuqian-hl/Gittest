<template>
  <div class="container" v-height="0">
    <audio :src="songUrl" ref="myaudio" v-if="songUrl"></audio>
    <div :style="{'background':'url('+this.picUrl+') no-repeat','background-position':'50%','background-size': 'auto 100%'}" class="bgkPic"></div> 
    <div class="bgPlay" @click="play" v-if="!losing">
      <div class="bgbox"> </div>
      <div class="musicPic">
          <img :src="this.picUrl" alt="">
          <div class="playbutton"></div>
      </div>
    </div>
    <div class="xiantiao"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        picUrl:null,
        id:null,
        name:null,
        songUrl:null,
        //是否播放歌曲
        losing:false,
      }
    },
    created(){
      //图片
      this.picUrl = this.$route.query.picUrl;
      //歌名
      this.name = this.$route.query.name;
      //歌曲地址
      this.songUrl = 'https://music.163.com/song/media/outer/url?id='+this.$route.query.id+'.mp3'
    },
    methods:{
      play(){
        this.losing=!this.losing;
        if(losing){
          this.$refs.myaudio.play()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.container{
  // width: 100%;
  // height: 100%;
  
}
.bgkPic{
      height:100%;
      filter:blur(5px);
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
    transform-origin: center top;
    overflow: hidden;
    transform: scale(1.2);
    &::before{
      content:'';
      position: absolute;
      top:0;
      left:0;
      bottom: 0;
      right: 0;
       background: rgba(0, 0, 0, .5);
    }
}
  .bgPlay{
    padding-top: 70px;
    position: relative;
    top: 0;
    left: 0;
    .bgbox{
      width: 298px;
      height: 298px;
      position: relative;
      top: 10%;
      left: 10%;
      z-index: 10;
      background: url(../../assets/img/disc-ip6.png);
      background-size: 100%;
    }
    .musicPic{
      position: absolute;
      top: 33%;
      left:25%;
      img{
        display: inline-block;
        width:190px;
        height: 190px;
      }
    }
    .playbutton{
      display: inline-block;
      position: absolute;
      top: 30%;
      left: 40%;
      width: 96px;
      height: 96px;
       background: url(../../assets/img/index_icon.jpg) no-repeat -50px 20px;
       background-size: 370%;
    }
  }
  .xiantiao{
    position: absolute;
    top: 0;
    width: 50%;
    height: 50%;
    left: 44%;
    z-index: 20;
    background: url(../../assets/img/needle-ip6.png) no-repeat;
    background-size:60%;
  }
</style>