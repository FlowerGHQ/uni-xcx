<template>
  <div>
    <van-popup :close-on-click-overlay="false" :show="true" round>
      <div class="popup-card">
        <div class="card-content">
          <img
            src="https://production-sam.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads1639385533000e1a573.png"
            alt=""
            class="bg-image"
          />
        </div>
        <div class="card-bottom">
          <!-- {{ state }} -->
          <div class="close" @click="onClose">取消</div>
          <button class="share" @click="onShare" open-type="share">
            确定分享
          </button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { API } from '@/models/api'
export default Vue.extend({
  onShareAppMessage: function (res): any {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.schoolName,
      path: `/pages/jumpPage/index?scene=${encodeURIComponent(
        this.$data.state
      )}`,
      imageUrl:
        'https://production-sam.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads1639385533000e1a573.png'
    }
  },
  async onLoad(option: any) {
    this.state = decodeURIComponent(option.url)
    const parmaState = this.state.split('&')
    const parma = {
      campusId: parmaState[0],
      merchantId: parmaState[1],
      sign: parmaState[2]
    }
    const res = await API.partnersSBusiness.open.campusInfo.request(parma)
    this.schoolName = res.data.name
    console.log(option, this.schoolName)
  },
  data() {
    return {
      isShared: false,
      state: '',
      schoolName: ''
    }
  },
  onShow() {
    if (!this.isShared) {
      return
    }
    uni.showToast({ title: '转发成功' })
    setTimeout(() => {
      wx.navigateBackMiniProgram({
        // extraData: {
        //   foo: 'bar'
        // },
        success(res) {
          uni.showToast({ title: '转发成功' })
          // 返回成功
        }
      })
    }, 1000)
  },
  methods: {
    onShare() {
      this.isShared = true
    },
    onClose() {
      wx.navigateBackMiniProgram({
        // extraData: {
        //   foo: 'bar'
        // },
        success(res) {
          uni.showToast({ title: '返回成功' })
          // 返回成功
        }
      })
    }
  }
})
</script>
<style lang="less" scoped>
.card-bottom {
  //   margin-top: 42rpx;
  display: flex;
  padding: 0 32rpx;
  //   justify-content: space-evenly;
  position: relative;
  top: -22rpx;
  left: 0;
  height: 84rpx;
  .close {
    width: 160rpx;
    height: 80rpx;
    background: #ffffff;
    border-radius: 44rpx;
    border: 1rpx solid #f86744;
    color: #222222;
    font-size: 32rpx;
    text-align: center;
    line-height: 78rpx; 
    margin-right: 32rpx;
    // position: absolute;
    // top: 0;
    // left: 32rpx;
  }
  .share {
    // position: absolute;
    // top: 0;
    // right: 32rpx;
    // width: 366rpx;
    flex: 1;
    height: 80rpx;
    background-image: linear-gradient(90deg, #ff8360 0%, #f86744 100%);
    border-radius: 44rpx;
    font-size: 32rpx;
    color: #ffffff;
    text-align: center;
    line-height: 78rpx;
    margin: 0;
  }
}
</style>