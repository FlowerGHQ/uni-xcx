<template>
  <div class="user-login">
    <div class="change-org" @click="changeSchoolOrg">
      <div>icon</div>
      <div>切换1校区</div>
      <div>Icon</div>
    </div>
    <Card class="talk-card" />
    <div class="bottom-button">
      <button class="view">生成二维码</button>
      <button class="save-list">分享至微信</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Card from './components/card.vue'

export default Vue.extend({
  name: 'HomeList',
  components: { Card },
  data() {
    return {}
  },

  methods: {}
})
</script>
<style lang="less" scoped>
.user-login {
  padding: 32rpx;
  font-size: 28rpx;
}
.change-org {
  margin: 32rpx 0;
  width: 686rpx;
  height: 96rpx;
  background: #ffffff;
  box-shadow: 10rpx 10rpx 56rpx 0rpx rgba(211, 222, 241, 0.5);
  border-radius: 32rpx;
  padding: 0 32rpx;
  border: 1rpx solid #ecf0f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.view,
.save-list {
  width: 294rpx;
  height: 80rpx;
  background: #f86744;
  border-radius: 40rpx;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 1px solid #f86744;
  color: #fff;
}
.view {
  margin-right: 32rpx;
  background: #fff;
  color: #f86744;
}
</style>
