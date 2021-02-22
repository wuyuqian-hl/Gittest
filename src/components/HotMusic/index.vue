<template>
  <div class="container" v-height="126">
    <Loading v-if="loading"></Loading>
    <div class="hot">
      <img class="music" src="../../assets/img/index_icon.jpg" alt="">
      <span>更新日期：{{data.updateTime | changeTime}}</span>
    </div>
    <div class="content">
      <div class="title" @click="songPlay(item)" v-for="(item, index) in newsMusicData" :key="index">
        <div>
          {{ item.name }}
        </div>
        <div class="miusc_info">
          <span :class="{ icon: item.copyright == 1 }"></span>
          {{ item.ar[0].name }} - {{ item.al.name }}
        </div>
        <div class="play"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Loading from '../Loading/index'
export default {
  name: "HotMusic",
  components:{
    Loading
  },
  data(){
    return {
      newsMusicData:[],
      data:{},
      loading:true,
    }
  },
  created() {
    this.getNewList();
  },
  methods: {
    getNewList() {
      this.loading = true;
      this.$http.get("/api/top/list?idx=1").then((res) => {
        if (res.status === 200 && res.data.code === 200) {
          this.newsMusicData = res.data.playlist.tracks.slice(0, 30);
          this.data= res.data.playlist;
          this.loading = false;
        }
      });
    },
    songPlay(item){
      let obj = {
        path:'musicPlay',
        query:{
          name:item.name,
          id:item.id,
          picUrl:item.al.picUrl,
          songName:item.ar[0].name,
        }
      }
      this.$router.push(obj)
    console.log(item)
    }
  },
  filters:{
    changeTime(val){
      return moment(val).format('MM月DD日')
    }
  }
};
</script>

<style lang="less" scoped>
.container{
  overflow: auto;
}
.hot{
  padding-top:145px;
  // height:100px;
  overflow: hidden;
  position: relative;
  background: url('../../assets/img/hot_music_bg.jpg') no-repeat;
  background-size: 100%;
  .music{
    position: absolute;
    padding-top: 10px;
    top: -35px;
    left: -20px;
    width: 200px;
  }
  span{
    position: absolute;
    top: 105px;
    left:15px;
    color: #fff;
    font-size: 14px;
  }
}
.content {
  margin-left: 5px;
  .title {
    border-bottom: 1px solid #eee;
    position: relative;
    padding: 10px 0;
    .miusc_info {
      padding-top: 3px;
      font-size: 12px;
      color: rgb(158, 151, 151);
      .icon {
        display: inline-block;
        width: 22px;
        height: 22px;
        margin-top: -10px;
        background: url(../../assets/img/index_icon.jpg) no-repeat 1px 10px;
        background-size: 250px;
      }
    }
    .play {
      width: 40px;
      height: 33px;
      position: absolute;
      top: 12px;
      right: 10px;
      background: url(../../assets/img/index_icon.jpg) no-repeat -30px 0px;
      background-size: 250px;
    }
  }
}
</style>