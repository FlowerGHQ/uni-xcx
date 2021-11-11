<template>
  <div class="list-view" :class="tagObj.className">
    <div class="title mar-b-8">{{ tagObj.name }}</div>
    <div class="number mar-b-8">
      {{ tagObj.totalNumber }}
      <span class="number-unit mar-l-10">{{ tagObj.totalUnit }}</span>
    </div>
    <div class="add-number mar-b-8 base-nowrap">
      <span class="mar-r-10">新增</span>
      <span class="font-28 number-family">{{ tagObj.addNumber }}</span>
      <img :src="imageUp" class="mar-l-10" />
    </div>
    <div class="refund-number base-nowrap" v-if="tagObj.typeName">
      <span class="mar-r-10">{{ tagObj.typeName }}</span>
      <span class="font-28 number-family">{{
        tagObj.refundNumber ? tagObj.refundNumber : '-'
      }}</span>
      <img :src="imageDown" class="mar-l-10" />
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
  height: 256rpx;
  background: linear-gradient(209deg, #ffb3a0 0%, #fc776c 100%);
  box-shadow: 0px 20rpx 40rpx 0px rgba(254, 88, 49, 0.37);
  border-radius: 16rpx;
  padding: 32rpx 0 32rpx 32rpx;
  box-sizing: border-box;
  margin-left: 16rpx;
  margin-bottom: 16rpx;
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
.white {
  background: #ffffff;
  box-shadow: 0px 10px 20px 0px rgba(3, 3, 3, 0.06);
}
</style>
