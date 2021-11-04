<template>
  <div class="user-login">
    <div class="error-login" v-if="hasError">
      {{ errorMessage }}
    </div>
    <div class="change-org" @click="changeSchoolOrg">
      <div class="flex">
        <img
          src="../../../assets/images/place.png"
          class="icon-place"
          v-if="!hasError"
        />
        <img
          src="../../../assets/images/place-disabled.png"
          class="icon-place"
          v-else
        />
        <div class="school-title">{{ defaultSchool }}</div>
      </div>
      <img src="../../../assets/images/right-arrow.png" class="icon-right" />
    </div>
    <div class="common-func">
      <div @click="openScan" class="common-func-title">常用功能</div>
      <div
        class="flex talk-card base-card"
        @click="shareCard"
        :class="{ 'error-card': hasError, 'normal-card': !hasError }"
      >
        <!-- <div class="talk-icon">1</div>“ -->
        <img
          src="../../../assets/images/card.png"
          class="talk-icon"
          v-if="!hasError"
        />
        <img
          src="../../../assets/images/card-disabled.png"
          class="talk-icon"
          v-else
        />
        <div class="flex1">
          <div class="talk-title">拓客卡</div>
          <div class="talk-desc">分享权益，快速助力获客</div>
        </div>
        <div class="share-button">立即分享</div>
      </div>
      <div class="common-func-list" @click="hasError ? handleDetail() : null">
        <CommonList :error="hasError" />
      </div>
    </div>

    <van-dialog id="van-dialog" />
  </div>
</template>
<script lang="ts">
import CommonList from './components/common-button-list.vue'
import Vue from 'vue'
import { API } from '@/models/api'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'HomeList',
  components: { CommonList },
  data() {
    return {
      defaultSchool: '切换校区',
      errorMessage: '',
      hasError: false,
      errorTitle: ''
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
    const res1 = await API.partnersSBusiness.contract.detail.request({})
    this.defaultSchool = res.data.find(item => item.isDefault).name
    if (!res1.data) {
      this.hasError = true
      this.errorTitle = '暂无合约提醒'
      this.errorMessage =
        '暂未签订合约，请立即联系校区负责人去录入合约，才能正常使用以下功能去拓展客户'
      return
    }
    if (dayjs(res1.data.startTime) > dayjs()) {
      this.hasError = true
      this.errorTitle = '合约暂未生效提醒'
      this.errorMessage = `合约生效时间：${dayjs(res1.data.startTime).format(
        'YYYY-MM-DD'
      )}，合约生效前您的拓客卡分享功能不能使用`
      return
    }
    if (dayjs(res1.data.endTime) < dayjs()) {
      this.hasError = true
      this.errorTitle = '合约到期提醒'
      this.errorMessage =
        '合约已到期，您的拓客卡分享功能无法使用，请立即联系校区负责人进行续约'
      return
    }
    this.hasError = false
    this.errorMessage = ''
  },
  methods: {
    openNext() {
      console.log(222)
    },
    handleDetail() {
      if (this.hasError) {
        this.$dialog.alert({
          title: this.errorTitle,
          message: this.errorMessage,
          confirmButtonText: '知道了'
        })
      }
    },
    shareCard() {
      if (this.hasError) {
        this.$dialog.alert({
          title: this.errorTitle,
          message: this.errorMessage,
          confirmButtonText: '知道了'
        })
        return
      }
      uni.navigateTo({
        url: '/pages/business/talkCard/index'
      })
    },
    changeSchoolOrg() {
      console.log(1)
      uni.navigateTo({
        url: '/pages/business/schoolList/index'
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
  height: calc(650rpx + var(--safe-area-inset-bottom));
  background: #ffffff;
  border-radius: 64rpx 64rpx 0rpx 0rpx;
  position: absolute;
  bottom: 0;
  left: 0;
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

  border-radius: 8px;
  margin: 0 48rpx 48rpx;
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
    line-height: 48rpx;
  }
}
.error-card {
  background: linear-gradient(209deg, #c6c6c6 0%, #888888 100%);
  box-shadow: 0px 20rpx 40rpx 0px rgba(102, 102, 102, 0.28);
  .share-button {
    color: #888888;
  }
}
.normal-card {
  background: linear-gradient(209deg, #ffb3a0 0%, #fc776c 100%);
  box-shadow: 0px 36rpx 80rpx -30rpx #fc776c;
  .share-button {
    color: #f86744;
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

.error-login {
  width: 750rpx;
  height: 132rpx;
  background: #888888;
  box-shadow: 0rpx 8rpx 32rpx 0rpx rgba(0, 0, 0, 0.08);
  font-size: 28rpx;
  font-weight: 400;
  color: #ffffff;
  line-height: 44rpx;
  padding: 22rpx 32rpx;
  text-align: center;
}
</style>
