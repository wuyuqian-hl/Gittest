<template>
  <div id="container" v-height="126">
    <Loading v-if="loading"></Loading>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <!-- 推荐歌单 -->
      <h2 class="music">推荐歌单</h2>
      <div class="SongList">
        <div v-for="(item, index) in countData" :key="index">
          <div class="img">
            <img :src="item.picUrl" alt="" srcset="" />
            <span>{{ item.playCount | count }}万</span>
          </div>
          <div class="info">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <!-- 最新音乐 -->
      <h2 class="music">最新音乐</h2>
      <div class="content">
        <Loading v-if="loading"></Loading>
        <div class="title" v-for="(item, index) in newsMusicData" :key="index">
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
      <!-- 底部 -->
      <div class="footer">
        <div class="logo">
          <img src="../../assets/img/lo.png" alt="" class="left" />
          <h2 class="right">网易云音乐</h2>
        </div>
        <div class="footer_info" @click="openApp">
          打开APP,发现更多好音乐&nbsp;>
        </div>
        <p class="copyright">
          网易公司版权所有@1997-2020 杭州乐读科技有限公司运营
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading/index'
export default {
  name: "Recommend",
  components:{
    Loading
  },
  data() {
    return {
      countData: [],
      newsMusicData: [],
      loading:true,
    };
  },
  created() {
    this.getList();
    this.getNewList();
  },
  methods: {
    getList() {
      this.loading = true;
      this.$http.get("/api/personalized?limit=6").then((res) => {
        if (res.status === 200 && res.data.code === 200) {
          this.countData = res.data.result;
          this.loading = false;
        }
      });
    },
    getNewList() {
      this.loading = true;
      this.$http.get("/api/top/list?idx=1").then((res) => {
        if (res.status === 200 && res.data.code === 200) {
          this.newsMusicData = res.data.playlist.tracks.slice(0, 30);
          this.loading = false;
        }
      });
    },
    openApp() {
      window.location =
        "https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fopenurl";
    },
  },
  filters: {
    count(val) {
      return (val / 10000).toFixed(1);
    },
  },
};
</script>

<style lang="less" scoped>
#container {
  overflow: auto;
  .recommend {
    .music {
      margin-top: 10px;
      margin-bottom: 10px;
      padding-left: 5px;
      border-left: 2px solid rgb(233, 27, 27);
      font-size: 17px;
    }
    .SongList {
      display: flex;
      flex-wrap: wrap;
      div {
        flex: calc(33% - 4px);
        margin: 1px;
        .img {
          position: relative;
          img {
            width: 100%;
          }

          span {
            position: absolute;
            top: 3px;
            right: 5px;
            color: #fff;
            background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
            background-repeat: no-repeat;
            background-size: 60% 60%;
            background-position: center left;
            padding-left: 31px;
            font-size: 12px;
          }
        }
      }
      .info {
        span {
          font-size: 12px;
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
    .footer {
      width: 100%;
      height: 200px;
      background: url(../../assets/img/recommand_bg_2x.png);
      background-size: 100%;
      position: relative;
      .logo {
        width: 250px;
        height: 40px;
        position: absolute;
        left: 20%;
        top: 30%;
        display: flex;
        .left {
          width: 40px;
          height: 100%;
          position: relative;
          top: 5px;
          border-radius: 10px;
          flex: 1;
        }
        .right {
          flex: 6;
          padding-left: 4px;

          font-size: 35px;
        }
      }
      .footer_info {
        position: absolute;
        left: 10%;
        bottom: 20%;
        width: 80%;
        border: 1px solid rgb(231, 39, 39);
        line-height: 40px;
        border-radius: 50px;
        color: rgb(231, 39, 39);
        text-align: center;
      }
      .copyright {
        position: absolute;
        bottom: 8%;
        font-size: 12px;
        text-align: center;
        color: rgb(100, 90, 90);
        left: 10%;
      }
    }
  }
}
</style>