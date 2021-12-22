<template>
  <div class="member-card">
    <img src="../../../../assets/images/bgImage.png" alt="" class="bg-image" />
    <div class="member-card-cur">
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
          <p class="number-value">价值</p>
          <div class="number-color">
            <span>¥</span> {{ formatMoney(item.value) }}
          </div>
        </div>
        <div class="button-right" v-if="showIcon">
          <div class="list-det" @click="openDetail(item.id)">预览</div>
          <div class="list-det" @click="openShare(item.id)">分享</div>
        </div>
      </div>
    </div>
    <van-popup
      :show="showQRcode"
      position="bottom"
      round
      closeable
      custom-style="height: 70%;"
      @close="closeQRcode"
      lock-scroll
    >
      <SaveAlbum :src="src" />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Vue from 'vue'
import { API } from '@/models/api'
import SaveAlbum from './save-album.vue'
import appIdObj from '@/pages/business/talkCard/appId'
export default Vue.extend({
  data() {
    return { showQRcode: false, src: '' }
  },
  components: { SaveAlbum },
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
      const res1 = await API.partnersSBusiness.memberCard.shareInfoByWx.request(
        {
          id
        }
      )
      // 判断是测试和预发环境还是生产环境
      wx.navigateToMiniProgram({
        appId: appIdObj.appId,
        // appId: 'wxcf3a3fd9e27ea168', //小程序正式端
        // appId: 'wxb94eeef233d3d51d', //小程序测试端
        path: `/pages/jumpPage/index?url=${encodeURIComponent(
          res1.data.shareParams
        )}`, //path
        // envVersion: 'trial',
        envVersion: __wxConfig.envVersion, //开发版develop 开发版 trial   体验版 release 正式版
        success(res) {
          console.log('成功')
        }
      })
      return
    },
    closeQRcode() {
      this.showQRcode = false
      console.log(11)
    }
  }
})
</script>

<style lang="less" scoped>
.member-card {
  width: 686rpx;
  height: 280rpx;
  padding: 32rpx;
  background-size: 100% 100%;
  box-shadow: 0px 8rpx 10rpx 0px rgba(0, 0, 0, 0.37);
  border-radius: 16rpx;
  position: relative;
  top: 0;
  left: 0;
  .member-card-cur {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
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
    align-items: flex-end;
    margin-bottom: 10rpx;
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
</style>
