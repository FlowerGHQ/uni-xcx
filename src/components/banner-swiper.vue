<template>
  <div class="banner-swipper">
    <swiper
      class="swiper"
      autoplay="true"
      interval="3000"
      @change="switchBanner"
    >
      <block v-for="(item, index) in images" :key="index">
        <swiper-item>
          <div class="img-container">
            <img :src="item" mode="aspectFill" />
          </div>
        </swiper-item>
      </block>
    </swiper>
    <div class="image-count">{{ currentBanner + 1 }}/{{ images.length }}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop()
  images!: string[]

  currentBanner: number = 0
  // banner图切换
  switchBanner(e: any) {
    this.currentBanner = e.detail.current
  }
}
</script>
<style lang="less" scoped>
.banner-swipper {
  width: 100%;
  height: 350rpx;
  position: relative;
  .swiper {
    height: 350rpx;
  }
  .image-count {
    width: 80rpx;
    height: 40rpx;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20rpx;
    color: #fff;
    font-size: 24rpx;
    line-height: 40rpx;
    text-align: center;
    position: absolute;
    right: 40rpx;
    bottom: 67rpx;
  }
  .img-container {
    width: 100%;
    height: 350rpx;
    background-color: #fff;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
