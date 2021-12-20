<template>
  <div
    class="base-tag"
    :style="{
      'background-color': color,
      color: textColor,
      'font-size': `${fontSize}rpx`,
      'line-height': `${lineHeight}rpx`,
      'border-radius': `${borderRadius}rpx`,
      border: `${border}`,
      padding: `${padding}`,
      width: `${width}`
    }"
  >
    {{ text }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Tag',
  props: {
    padding: {
      type: String,
      default: '4rpx 12rpx'
    },
    text: {
      type: String,
      default: '标签'
    },
    border: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#EEEEEE'
    },
    textColor: {
      type: String,
      default: '#888888'
    },
    fontSize: {
      type: Number,
      default: 24
    },
    lineHeight: {
      type: Number,
      default: 32
    },
    borderRadius: {
      type: Number,
      default: 20
    },
    width: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {}
})
</script>
<style lang="less" scoped>
.base-tag {
  width: 100%;
  font-size: 24rpx;
  font-weight: 400;
  color: #888888;
  line-height: 32rpx;
  background: #eeeeee;
  border-radius: 20rpx;
  padding: 4rpx 12rpx;
}
</style>
