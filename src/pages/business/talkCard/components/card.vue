<template>
  <div class="member-card">
    <img src="../../../../assets/images/bgImage.png" alt="" class="bg-image" />
    <div class="name-member">
      <div class="icon-picture"></div>
      <div class="right">
        <p class="tuo-name">{{ item.name || 'name' }}</p>
        <p class="time">
          有效期：{{
            item.applyStartTime ? format(item.applyStartTime) : '2021-01-22'
          }}
          ~ {{ item.applyEndTime ? format(item.applyEndTime) : '2021-01-22' }}
        </p>
      </div>
    </div>
    <div class="bottom-member">
      <div class="num-box">
        <div class="number-color">
          <span>¥</span> {{ formatMoney(item.value) }}
        </div>
        <p class="number-value">价值</p>
      </div>
      <div class="button-right" v-if="showIcon">
        <div class="list-det" @click="openDetail(item.id)">预览</div>
        <div class="list-det" @click="openShare(item.id)">分享</div>
      </div>
    </div>
    <van-popup
      :show="showQRcode"
      position="bottom"
      closeable
      @close="closeQRcode"
    >
      <button class="save-list" @click="openSave">保存至相册</button>
      <img :src="src" alt="" class="QR-img" />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Vue from 'vue'
import { API } from '@/models/api'
export default Vue.extend({
  data() {
    return { showQRcode: false, src: '' }
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    openDetail(id) {
      uni.navigateTo({
        url: `/pages/business/talkCard/detail?id=${id}`
      })
    },
    format(time) {
      return dayjs(time).format('YYYY-MM-DD')
    },
    formatMoney(money) {
      var f = parseFloat(money)
      if (isNaN(f)) {
        return '0.00'
      }
      var f = Math.round(money * 100) / 100
      var s = f.toString()
      var rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    },
    async openShare(id) {
      const res = await API.partnersSBusiness.memberCard.shareInfo.request({
        id
      })
      this.showQRcode = true
      this.src = res.data.url
      console.log('qrcode', res)
    },
    closeQRcode() {
      this.showQRcode = false
      console.log(11)
    },
    openSave() {
      wx.downloadFile({
        url: this.src,
        success: function (res) {
          console.log(res)
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (err) {
              console.log(err)
              wx.showToast({
                title: err.errMsg,
                icon: 'success',
                duration: 2000
              })
              if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                console.log('当初用户拒绝，再次发起授权')
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log(
                        '获取权限成功，给出再次点击图片保存到相册的提示。'
                      )
                    } else {
                      console.log(
                        '获取权限失败，给出不给权限就无法正常使用的提示'
                      )
                    }
                  }
                })
              }
            },
            complete(res) {
              console.log(res)
            }
          })
        }
      })
    }
  }
})
</script>

<style lang="less" scoped>
.member-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 686rpx;
  height: 280rpx;
  padding: 32rpx 32rpx 16rpx 32rpx;
  background-size: 100% 100%;
  box-shadow: 0px 8rpx 10rpx 0px rgba(0, 0, 0, 0.37);
  border-radius: 16rpx;
  position: relative;
  top: 0;
  left: 0;

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 686rpx;
    height: 280rpx;
    z-index: -1;
  }
}
.name-member {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48rpx;
  .icon-picture {
    width: 64rpx;
    height: 64rpx;
    background: url('@/assets/images/talk-icon.png') no-repeat center;
    border-radius: 50%;
    margin-right: 16rpx;
  }
  .right {
    flex: 1;
    .tuo-name {
      font-size: 32rpx;
      color: #e5c89c;
      margin-bottom: 4rpx;
    }
    .time {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
.number-color {
  font-size: 48rpx;
  font-weight: bold;
  color: #e5c89c;
  span {
    font-size: 32rpx;
    margin-right: 10rpx;
  }
}
.bottom-member {
  display: flex;
  justify-content: space-between;
  .number-value {
    width: 96rpx;
    height: 32rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
  }
  .button-right {
    display: flex;
    align-items: center;
    .list-det {
      width: 120rpx;
      height: 48rpx;
      line-height: 48rpx;
      background: #ffffff;
      border-radius: 24rpx;
      color: #222222;
      font-size: 28rpx;
      text-align: center;
      margin-left: 20rpx;
    }
  }
}
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
.QR-img {
  height: 480rpx;
  width: 480rpx;
}
</style>
