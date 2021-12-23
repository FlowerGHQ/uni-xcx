<template>
  <div class="list-view" :class="tagObj.className">
    <div class="title mar-b-8">{{ tagObj.name }}</div>
    <div class="number mar-b-8">
      {{ tagObj.totalNumber || 0 }}
      <span class="number-unit mar-l-10">{{ tagObj.totalUnit }}</span>
    </div>
    <div class="add-number mar-b-8 base-nowrap">
      <span class="mar-r-10">新增</span>
      <span class="font-28 number-family">{{ tagObj.addNumber || 0  }}</span>
      <img :src="imageUp" class="mar-l-10" />
    </div>
    <div class="refund-number base-nowrap">
      <span class="mar-r-10">{{ tagObj.typeName }}</span>
      <span class="font-28 number-family" v-if="tagObj.typeName" >{{ tagObj.refundNumber || 0}}</span>
      <img :src="imageDown" class="mar-l-10" v-if="tagObj.typeName" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeList',
  components: {},
  props: {
    tagObj: {
      type: Object,
      default: () => {}
    }
  },
  // render(){},
  data() {
    return {
      imageUp: require('@/assets/images/red-up.png'),
      imageDown: require('@/assets/images/green-down.png')
    }
  },
  methods: {},
  created() {}
})
</script>
<style lang="less" scope>
img {
  width: 8rpx;
  height: 16rpx;
}
.number-unit {
  font-size: 24rpx;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
}
.list-view {
  width: 260rpx;
  background: #ffffff;
  // box-shadow: 0px 20rpx 40rpx 0px rgba(3, 3, 3, 0.06);
  border-radius: 16rpx;
  padding: 32rpx 0 32rpx 32rpx;
  box-sizing: border-box;
  margin-right: 16rpx;
  margin-bottom: 32rpx;
  .title {
    font-size: 24rpx;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: #888888;
    white-space: nowrap;
  }
  .number {
    font-size: 48rpx;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #222222;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .add-number,
  .refund-number {
    font-size: 24rpx;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: #888888;
  }
  .number-family {
    font-family: D-DIN, D;
    font-weight: normal;
  }
}
</style>
