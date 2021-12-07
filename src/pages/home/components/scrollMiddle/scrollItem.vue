<template>
  <div class="list-view" :class="tagObj.className">
    <div class="title mar-b-8" styl="white-space:nowrap;">
      {{ tagObj.name }}
      <!-- <span class="number-unit">{{ '(' + tagObj.totalUnit + ')' }}</span> -->
    </div>

    <div class="number mar-b-8">
      {{ tagObj.totalNumber }}
      <span class="number-unit mar-l-10">{{ tagObj.totalUnit }}</span>
    </div>
    <div class="add-number mar-b-8 base-nowrap">
      <span class="mar-r-10">新增</span>
      <span class="font-28 number-family">{{ tagObj.addNumber }}</span>
      <img :src="imageWhiteUp" class="mar-l-10" />
    </div>
    <div class="refund-number base-nowrap" v-show="tagObj.refundNumber">
      <span class="mar-r-10">{{ tagObj.typeName }}</span>
      <span class="font-28 number-family">{{ tagObj.refundNumber }}</span>
      <img :src="imageWhiteDown" class="mar-l-10" />
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
      imageWhiteUp: require('@/assets/images/white-up.png'),
      imageWhiteDown: require('@/assets/images/white-down.png')
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
.list-view {
  width: 260rpx;
  height: 256rpx;
  background: linear-gradient(209deg, #ffb3a0 0%, #fc776c 100%);
  // box-shadow: 0px 20rpx 40rpx 0px rgba(254, 88, 49, 0.37);
  border-radius: 16rpx;
  padding: 32rpx 0 32rpx 32rpx;
  box-sizing: border-box;
  margin-left: 16rpx;
  margin-bottom: 32rpx;
  .title {
    font-size: 24rpx;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: #ffffff;
  }
  .number {
    font-size: 48rpx;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #ffffff;
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
    color: #ffffff;
  }
  .number-family {
    font-family: D-DIN, D;
    font-weight: normal;
  }
}

.number-unit {
  font-size: 24rpx;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
}

.blue {
  background: linear-gradient(209deg, #9397ff 0%, #6f6feb 100%);
  // box-shadow: 0px 20rpx 40rpx 0px rgba(129, 143, 255, 0.37);
}
.black {
  background: linear-gradient(209deg, #51515d 0%, #333639 100%);
  // box-shadow: 0px 20rpx 40rpx 0px rgba(129, 143, 255, 0.37);
  border-radius: 16rpx;
}
.white {
  background: #ffffff;
  // box-shadow: 0px 10px 20px 0px rgba(3, 3, 3, 0.06);
}
</style>
