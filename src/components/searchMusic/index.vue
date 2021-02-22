<template>
  <div class="container" v-height="126">
    <Loading v-if="loading"></Loading>
    <Search class="search" @input="HotKey" @blur="changeKey()" @clear="clearList" v-model="searchValue" shape="round" background="#fff" placeholder="搜索歌曲,歌手,专辑" />
    <!-- 热门搜索 -->
    <div class="hot_search" v-if="showList">
      <h3>热门搜索</h3>
      <span @click="HotKey(item.first)" v-for="(item,index) in HotList" :key="index">{{item.first}}</span>
    </div>
    <!-- 歌单部分 -->
    <div class="content" v-if="!showList">
        <div class="title" v-for="(item, index) in musicList" :key="index">
          <div>
            {{ item.name }}
          </div>
          <div class="miusc_info">
            <span :class="{ icon: item.copyright == 1 }"></span>
            {{ item.name }} - {{ item.artists[0].name }}
          </div>
          <div class="play"></div>
        </div>
    </div>
    <!-- 历史查询记录部分 -->
    <ul v-if="showList">
      <li class="lishi" v-for="(item,index) in doList" :key="index">
        <Icon class="icon1" name="clock-o"></Icon>
        <span>{{item}}</span>
        <Icon class="icon2" name="cross" @click="removeLishi(item)"></Icon>
      </li>
      <li v-if="showLishi" class="clear" @click="removeOverlishi">清除全部历史记录</li>
    </ul>
  </div>
</template>

<script>
import Loading from '../Loading/index'
import { Search } from 'vant';
import { Icon } from 'vant';
import { Toast } from 'vant';
import "vant/lib/search/style";
import "vant/lib/icon/style";
import "vant/lib/toast/style";

export default {
  name: "SearchMusic",
  components:{
    Search,
    Icon,
    Loading
  },
  data(){
    return {
      searchValue:null,
      HotList:[],//热搜词
      showList:true, // 是否显示热搜词
      musicList:[], // 通过搜索实时请求回来的数据
      doList:[],//存储历史记录
      showLishi:false, 
      loaing:true,
    }
  },
  created(){
    this.SearchList()
  },
  methods:{
    clearList(){
        
      //当搜索框点击了清除按钮之后显示热搜词
        this.showList = true;
    },
    HotKey(val){
      if(!val) return 
      this.searchValue = val;
      //当搜索框的有内容 不 显示热搜词
      this.showList = false;
      //点击热搜词时发送请求
      this.getmusicList()
      //将搜索过的词语存储起来
      if(this.searchValue && !this.doList.includes(this.searchValue)){
        this.doList.push(val)
        this.showLishi = true;
      }
    },  
    //请求接口
    SearchList(){
      this.loading = true;
      this.$http.post('/api/search/hot').then((res)=>{
        if(res.data.code == 200 && res.status == 200){
          this.HotList = res.data.result.hots;
          this.loading = false;
        }
      })
    },
    //清除历史记录
    removeLishi(val){
      this.doList = this.doList.filter((item)=>item != val)
      this.showLishi = true;
    },
    //清除全部历史记录
    removeOverlishi(){
      this.doList = [];
      this.showLishi = true;
      Toast({
        message: '清除成功',
        icon: 'like-o',
        position: 'bottom',
      });
    },
    changeKey(val){
      if(!val) return 
      //当搜索框发生改变时实时触发
     
        this.searchValue = val;
      
        this.getmusicList()
    },
    getmusicList(){
      this.loading = true;
      this.$http.get('/api/search',{
        params:{
          keywords:this.searchValue
      }
      }).then((res)=>{
        this.musicList = res.data.result.songs;
        this.loading = false;
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container{
  overflow: auto;
  .hot_search{
      padding-left: 10px;
    h3{
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 12px;
      color: rgb(116, 112, 112);
    }
    span{
      display: inline-block;
      height: 32px;
      line-height: 32px;
      padding: 0 14px;
      margin: 5px;
      font-size: 14px;
      color: rgb(32, 31, 31);
      border: 1px solid #ccc;
      border-radius: 32px;
    }
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
ul{
  padding-left: 10px;
  margin-right: 10px;
  .lishi{
    border-bottom: 1px solid #ccc;
    position: relative;
    padding-bottom: 10px;
    padding-top: 10px;
    span{
      vertical-align: middle;
      color: rgb(77, 74, 74);
      font-size: 15px;
    }
    .icon1{
      vertical-align: middle;
      padding-right: 10px;
      color: #ccc;
    }
    .icon2{
      vertical-align: middle;
      position: absolute;
      right: 10px;
      color: #ccc;
    }
  }
  .clear{
    margin-top: 10px;
    width: 200px;
    text-align: center;
    border: 1px solid #eee;
    height: 30px;
    line-height: 30px;
    background: rgba(248, 6, 54, 0.651);
    color: #fff;
    border-radius: 31px;
    font-size: 14px;
    margin-left: 70px;
  }
}
&/deep/ .search{
  border-bottom:1px solid #eee;
}
</style>