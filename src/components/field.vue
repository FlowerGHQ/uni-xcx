<template>
  <div :class="{ 'field-content': true, 'r-border': showBorder }">
    <div class="field-title">
      {{ title }}
    </div>
    <div class="field-text" v-if="location === '0'">
      <span v-if="Number(text) !== 0">{{ unit }}</span>
      <span class="field-text-t" v-if="Number(text) !== 0">{{ text }}</span>
      <span class="field-text-t" v-else>--</span>
    </div>
    <div class="field-text" v-if="location === '1'">
      <span class="field-text-t" v-if="Number(text) !== 0">{{ text }}</span>
      <span class="field-text-t" v-if="Number(text) !== 0">{{ unit }}</span>
      <span class="field-text-t" v-else>--</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Field',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    text: {
      type: String,
      default: '内容'
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    unit: {
      type: String,
      default: '￥'
    },
    location: {
      type: String,
      // 0为前1为后
      default: '0'
    }
  },
  data() {
    return {}
  },
  onLoad(option) {},
  methods: {}
})
</script>
<style lang="less" scoped>
.field-content {
  display: flex;
  width: 190rpx;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  .field-title {
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    line-height: 32rpx;
    margin-bottom: 8rpx;
  }
  .field-text {
    font-size: 24rpx;
    font-weight: bold;
    color: #222222;
    line-height: 48rpx;
  }
  .field-text-t {
    font-size: 28rpx;
    font-weight: bold;
    color: #222222;
    line-height: 48rpx;
  }
}
.r-border {
  padding-left: 44rpx;
  box-sizing: content-box;
  ::before {
    content: '';
    width: 0.5px;
    height: 76rpx;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #eeeeee;
  }
}
</style>
