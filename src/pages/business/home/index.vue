<template>
  <div class="user-login">
    <div class="change-org" @click="changeSchoolOrg">
      <div>icon</div>
      <div>切换校区</div>
      <div>Icon</div>
    </div>
    <div class="common-func">
      <div @click="openScan" class="common-func-title">常用功能</div>
      <div class="common-func-list">
        <CommonList />
      </div>
    </div>

    <!-- <div @click="openNext">点击测试</div> -->
  </div>
</template>
<script lang="ts">
import CommonList from './components/common-button-list.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeList',
  components: { CommonList },
  data() {
    return {}
  },
  onShow() {
    wx.hideHomeButton()
  },
  onLoad(option) {
    uni.setNavigationBarTitle({
      title: '创建课程'
    })
  },
  methods: {
    openNext() {
      console.log(222)
    },
    changeSchoolOrg() {
      console.log(1)
      uni.navigateTo({
        url: '/pages/business/schoolList/index'
      })
    },
    openScan() {
      // 扫码
      wx.scanCode({
        // 调起客户端扫码界面进行扫码
        complete: res => {}, //接口调用结束的回调函数（调用成功、失败都会执行）
        fail: res => {}, //接口调用失败的回调函数
        onlyFromCamera: true, //是否只能从相机扫码，不允许从相册选择图片,这里是只允许相机扫码
        scanType: ['qrCode'], // 扫码类型 : 二维码
        success: result => {
          // 接口调用成功的回调函数
          console.log(result)
        }
      })
    }
  }
})
</script>
<style lang="less" scoped>
.user-login {
  // padding: 32rpx;
  font-size: 28rpx;
}
.change-org {
  margin: 32rpx;
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
.common-func {
  width: 750rpx;
  height: 650rpx;
  background: #ffffff;
  border-radius: 64rpx 64rpx 0rpx 0rpx;
}
.common-func-title {
  padding: 48rpx 32rpx 48rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 48rpx;
}
.common-func-list {
  padding: 0 48rpx;
}
</style>
