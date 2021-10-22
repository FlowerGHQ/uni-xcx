<template>
  <div class="common" @click.stop="openList">
    <div class="common-image" :class="image"></div>
    <div class="common-text">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddList',
  props: {
    openUrl: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },

  methods: {
    openList() {
      console.log(11, this.openUrl)
      uni.navigateTo({
        url: this.openUrl
      })
    }
  }
})
</script>

<style lang="less" scoped>
.common {
  width: 120rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  .common-image {
    width: 50rpx;
    height: 50rpx;
    background-color: transparent;
    background-position: center;
    background-size: contain;
    margin-bottom: 16rpx;
  }
  .common-text {
    font-size: 24rpx;
    color: #8c8c8c;
    text-align: center;
    word-break: break-word;
  }
}
.white {
  background-image: url('../../../../assets/images/white.png');
}
</style>
