<template>
  <div class="invite-intro">
    <!-- <div class=""> -->
    <div class="invite-school">这是校区</div>
    <div class="invite-card">
      <div class="invite-card-top">
        预计可获得拓客卡(张)：<span class="invite-num-span">{{
          totalCount
        }}</span>
      </div>
      <div>
        累计价值(元)：<span class="invite-num-span">{{ value }}</span>
      </div>
    </div>
    <img
      src="https://production-sam.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads1639377333000220315.png"
      alt=""
      class="img-background"
      mode="widthFix"
    />
    <!-- </div> -->
    <div class="bottom-button flex">
      <div class="invite-share" @click="openShare">我要成为推荐官</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { API } from '@/models/api'
export default Vue.extend({
  name: 'Invite',
  data() {
    return {
      totalCount: 0,
      value: ''
    }
  },
  async onShow() {
    // let res = await API.partnersSBusiness.memberCard.statistic.request({})
    // console.log(res)
    // this.totalCount = res.data.count
    // this.value = res.data.value
  },
  methods: {
    // async openShare() {
    //   const res1 =
    //     await API.partnersSBusiness.shareholder.shareInfoByWx.request({})
    //   wx.navigateToMiniProgram({
    //     // appId: 'wx8f2cb6c647d8bc94', //小程序正式
    //     appId: 'wxcc8d7cb6b0bc8037', //小程序测试端
    //     path: `/pages/jumpPage/index?campusId=${encodeURIComponent(
    //       res1.data.campusId
    //     )}&merchantId=${encodeURIComponent(
    //       res1.data.merchantId
    //     )}&sign=${encodeURIComponent(res1.data.sign)}`, //path
    //     envVersion: 'trial', //开发版develop 开发版 trial   体验版 release 正式版
    //     success(res) {
    //       console.log('成功')
    //     }
    //   })
    //   return
    // }
  }
})
</script>
<style lang="less" scoped>
.invite-intro {
  height: 100vh;
}
.invite-school {
  text-align: center;
  margin-top: 145rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #666;
}
.invite-card {
  margin-top: 580rpx;
  padding-left: 328rpx;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
  font-size: 24rpx;
  color: #5c4e45;
  .invite-card-top {
    margin-bottom: 4rpx;
  }
  .invite-num-span {
    font-size: 32rpx;
    font-weight: 600;
  }
}
.invite-share {
  //   width: 600rpx;
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #f86744;
  border-radius: 40rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 1px solid #f86744;
  color: #fff;
}
.img-background {
  // wid
  width: 750rpx;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>