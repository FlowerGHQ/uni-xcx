<template>
  <div class="user-login">
    <div class="change-org" @click="changeSchoolOrg">
      <div class="flex">
        <img src="../../../assets/images/place.png" class="icon-place" />
        <div class="school-title">{{ defaultSchool }}</div>
      </div>
      <img src="../../../assets/images/right-arrow.png" class="icon-right" />
    </div>
    <div class="common-func">
      <div @click="openScan" class="common-func-title">常用功能</div>
      <div class="flex talk-card base-card" @click="shareCard">
        <!-- <div class="talk-icon">1</div>“ -->
        <img src="../../../assets/images/card.png" class="talk-icon" />
        <div class="flex1">
          <div class="talk-title">拓客卡</div>
          <div class="talk-desc">分享权益，快速助力获客</div>
        </div>
        <div class="share-button">立即分享</div>
      </div>
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
import { API } from '@/models/api'

export default Vue.extend({
  name: 'HomeList',
  components: { CommonList },
  data() {
    return {
      defaultSchool: '切换校区'
    }
  },
  onShow() {
    wx.hideHomeButton()
  },
  async onLoad(option) {
    uni.setNavigationBarTitle({
      title: '首页'
    })
    const res = await API.partnersSBusiness.campus.list.request({})
    this.defaultSchool = res.data.find(item => item.isDefault).name
  },
  methods: {
    openNext() {
      console.log(222)
    },
    shareCard() {
      uni.navigateTo({
        url: '/pages/business/talkCard/index'
      })
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
.talk-card {
  height: 128rpx;
  background: linear-gradient(209deg, #ffb3a0 0%, #fc776c 100%);
  border-radius: 8px;
  margin: 0 48rpx 48rpx;
  box-shadow: 0px 36rpx 80rpx -30rpx #fc776c;
  // justify-content: space-between;
  align-items: center;
  .talk-icon {
    width: 64rpx;
    height: 64rpx;
    margin-right: 16rpx;
  }
  .talk-title {
    width: 96rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 48rpx;
    margin-bottom: 4rpx;
  }
  .talk-desc {
    width: 264rpx;
    font-size: 24rpx;
    font-weight: 300;
    color: #ffffff;
    line-height: 32rpx;
  }
  .share-button {
    width: 176rpx;
    height: 48rpx;
    background: #ffffff;
    border-radius: 24rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #f86744;
    line-height: 48rpx;
  }
}

.school-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 44rpx;
  margin-left: 8rpx;
}

.icon-place {
  width: 44rpx;
  height: 44rpx;
}
.icon-right {
  width: 24rpx;
  height: 24rpx;
}
</style>
