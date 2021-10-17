<template>
  <div class="tab-bar flex flex-center">
    <div
      class="tab-bar-item"
      v-for="(item, index) in list"
      :class="{ selected: current === index }"
      :key="index"
      @click="select(index, item.key)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    current: {
      type: Number,
      default: 0
    }
  },
  methods: {
    select(index, key) {
      this.$emit('select', index, key)
    }
  }
}
</script>
<style lang="less" scoped>
.tab-bar {
  height: 88rpx;
  line-height: 88rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #969799;
  background: #fff;
  justify-content: space-around;
  .tab-bar-item {
    position: relative;
  }
  .tab-bar-item.selected::after {
    content: '';
    position: absolute;
    width: 80rpx;
    height: 6rpx;
    background: #ff4444;
    border-radius: 3rpx;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .tab-bar-item.selected {
    color: #323233;
  }
}
</style>
