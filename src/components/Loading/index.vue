<template>
  <div class="container">
    <Loading class="loading" type="spinner" size="34px" ></Loading>
  </div>
</template>

<script>
import { Loading } from 'vant';
import "vant/lib/loading/style";
  export default {
    components:{
       Loading
    },
  }
</script>

<style lang="less" scoped>
.container{
  position: absolute;
  top: 126px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 999;
  height: 100%;
  background-color:rgba(0, 0, 0, 0.6) ;
}
</style>