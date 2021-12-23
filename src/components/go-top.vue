<template>
  <div class="go-top" @click="goTop()" v-if="show"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop()
  show:boolean

  goTop() {
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }
  
};
</script>
<style lang="less" scoped>
@import '../styles/var';
.go-top {
  width: 96rpx;
  height: 96rpx;
  background-size: 100% 100%;
  background-image: url('https://cdn.xiaobaoxiu.cn/xbshow/XcxImages/icon/to-top.png');
  position: fixed;
  right: 40rpx;
  bottom: 280rpx;
  z-index: @zindex-back-top;
}
</style>