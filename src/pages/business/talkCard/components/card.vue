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
        <div class="list-det">分享</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {}
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
</style>
