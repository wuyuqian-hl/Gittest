<template>
  <div class="container" v-height='0'>
    <audio :src="songUrl" v-if="songUrl" ref="songRun"></audio>
    <div class="bgc" :style="{'background-image':'url('+picUrl+')'}"></div>
    <div class="musicRun">
      <div class="musicbgk" @click="playMusic">
        <!-- 音乐 -->
        <div class="song">
          <b class="stop" v-if="showStop"></b>
          <img :src="picUrl" alt="" class="pic" :class="{'stoproute':showStop}">
          <div class="musicBg"></div>
        </div>
        <div class="zonal"></div>
        <!-- logo -->
        <div class="logo">
          <img src="../../assets/img/lo.png" >网易云音乐
        </div>
        <!-- 歌名信息 -->
        <div class="info">
          <h3>{{name}}-<span>{{songName}}</span></h3>
          <!-- <p>作曲：{{data.}}</p> -->
        </div>
      </div>
      <!-- 按钮 -->
      <div class="openApp">
        <Button round plain size="large" type="danger">打开</Button>
        <Button round size="large" type="danger">下载</Button>
      </div> 
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import "vant/lib/button/style";
  export default {
    components:{
      Button
    },
    data(){
      return {
        name:null,
        picUrl:null,
        songUrl:null,
        showStop:false,
        songName:null,
        id:null,
        data:[],//歌词数组
        composer:null,//作曲家
      }
    },
    created(){
      this.name=this.$route.query.name;
      this.picUrl=this.$route.query.picUrl;
      this.songName=this.$route.query.songName;
      this.id=this.$route.query.id;
      this.songUrl='https://music.163.com/song/media/outer/url?id='+this.$route.query.id+'.mp3';
      this.getLyric()
    },
    methods:{
      playMusic(){
        this.showStop=!this.showStop;
        if(this.showStop){
          this.$refs.songRun.pause()
        }else{
          this.$refs.songRun.play()
        }
      },
      getLyric(){
        this.$http.get('/api/lyric',{
          params:{
            id:this.id
          }
        }).then((res)=>{
          this.data=res.data.lrc;
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  .bgc{
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  filter:blur(5px);
  background-position: 50%;
  background-size: auto 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  transform-origin: top center;
  // transform: scale(1.2);
  &::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
  }
}
  .musicRun{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .musicbgk{
      padding-top: 70px;
      .song{
        width: 296px;
        height: 296px;
        margin: 0 auto;
        position: relative;
        .musicBg{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('../../assets/img/disc-ip6.png') no-repeat;
          background-size: 100%;
        }
        .pic{
          display: inline-block;
          width: 190px;
          height: 190px;
          position: absolute;
          transform: translate(-50%,-50%);
          top: 50%;
          left: 50%;
          animation: donghua 10s linear infinite 0s;
          animation-play-state:running;
          @keyframes donghua {
            from{
              transform: translate(-50%,-50%) rotate(0deg);
            }
            to{
              transform: translate(-50%,-50%) rotate(360deg);
            }
          }
          &.stoproute{
            animation-play-state:paused;
          }
        }
        
        .stop{
          width: 56px;
          height: 56px;
          position: absolute;
          transform: translate(-50%,-50%);
          top: 50%;
          left: 50%;
          z-index: 10;
          background: url('../../assets/img/lock.png') no-repeat;
          background-size: 100%;
        }
      }
      .zonal{
        position: absolute;
        top: 0;
        // z-index: 20;
        width: 100%;
        height: 100%;
        left: 45%;
        background: url('../../assets/img/needle-ip6.png') no-repeat;
        background-size:30%;
      }
      .logo{
        position: absolute;
        top: 20px;
        left: 20px;
        color: #fff;
        font-size: 20px;
        vertical-align: middle;
        img{
          width: 32px;
          height: 32px;
          display: inline-block;
          border-radius: 8px;
          vertical-align: middle;
          padding-right: 5px;
        }
      }
      .info{
        margin-top: 10px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        span{
          color: #ccc;
          font-size: 16px;
        }
      }
    }
    .openApp{
      position: fixed;
      top: 93%;
      left: 0px;
      z-index: 20;
      width: 100%;
      height: 100%;
      display: flex;
      padding-right: 10px;
      &/deep/ .van-button{
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}

</style>