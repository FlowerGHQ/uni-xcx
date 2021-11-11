<template>
  <div>
    <div :class="className">
      <span v-for="item in listUpAndDown" :key="item.key">
        <span
          class="up-down"
          :class="active === item.key ? 'active-down' : ''"
          @click="onUpAndDown(item.key)"
          >{{ item.name }}</span
        >
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: '',
  props: {
    listUpAndDown: {
      type: Array,
      default: () => []
    },
    className: {
      type: String,
      default: '.base-title-all'
    },
    active: [String, Number]
  },
  data() {
    return {}
  },
  methods: {
    onUpAndDown(key) {
      this.$emit('onUpAndDown', key)
      // this.active = key
    }
  }
})
</script>

<style scoped lang="less">
.up-down,
.active-down {
  padding: 8rpx 24rpx;
  box-sizing: border-box;
  background: #fff;
  margin-right: 16rpx;
  border-radius: 24rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #888888;
}
.active-down {
  background: #f86744;
  color: #ffffff;
}
.base-title-all {
  height: 112rpx;
  line-height: 112rpx;
  padding-left: 32rpx;
  background-color: #f6f7f8;
}
</style>
