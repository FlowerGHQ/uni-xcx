<template>
  <div
    class="base-tag"
    :style="{
      'background-color': color,
      color: textColor,
      'font-size': fontSize,
      'line-height': `${lineHeight}rpx`,
      'border-radius': `${borderRadius}rpx`
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
    text: {
      type: String,
      default: '标签'
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
      default: 12
    },
    lineHeight: {
      type: Number,
      default: 32
    },
    borderRadius: {
      type: Number,
      default: 20
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
  font-size: 24rpx;
  font-weight: 400;
  color: #888888;
  line-height: 32rpx;
  background: #eeeeee;
  border-radius: 20rpx;
  padding: 4rpx 12rpx;
}
</style>
