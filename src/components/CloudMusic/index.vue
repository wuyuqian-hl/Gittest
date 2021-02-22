<template>
  <div>
    <div class="downloads">
      <img src="../../assets/img/01.gif" alt="" srcset="" class="left" />
      <img src="../../assets/img/02.gif" alt="" srcset="" class="right" />
    </div>
    <Tabs @change="changeType" v-model="active" class="Tabs" line-width="58px">
      <Tab title="推荐音乐"></Tab>
      <Tab title="热歌榜"></Tab>
      <Tab title="搜索"></Tab>
    </Tabs>
    <!-- 通过name来实现懒加载 -->
    <div v-if="MusicType">
      <component :is="MusicType"></component>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import "vant/lib/tab/style";
import "vant/lib/tabs/style";

export default {
  data() {
    return {
      active: 0,
      MusicType: "Recommend",
    };
  },
  components: {
    Tab,
    Tabs,
    Recommend: () => import("../RecommendMusic/index"),
    HotMusic: () => import("../HotMusic/index"),
    SearchMusic: () => import("../searchMusic/index"),
  },
  methods: {
    changeType(val) {
      if (val == 0) {
        this.MusicType = "Recommend";
      } else if (val == 1) {
        this.MusicType = "HotMusic";
      } else if (val == 2) {
        this.MusicType = "SearchMusic";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.downloads {
  width: calc(100% - 10px);
  display: flex;
  justify-content: space-between;
  padding: 20px 5px;
  background: #d43c33;
}

&/deep/ .van-tabs__wrap {
  border-bottom: 1px solid #ccc;
}
</style>