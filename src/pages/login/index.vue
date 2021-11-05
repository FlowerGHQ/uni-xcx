<template>
  <div class="user-login">
    <div class="flex login-img">
      <img src="../../assets/images/login.png" class="login-icon" />
    </div>
    <div class="login-title">一群伙伴</div>
    <auth-button redirect="/pages/home/index" reLaunch>
      <div
        class="footer-bar__item apply middle-btn green flex wx-login-btn"
        :class="{ active: current === 'applyList' }"
      >
        <img src="../../assets/images/wx.png" class="wx-icon" />
        <span>微信快捷登录</span>
      </div>
    </auth-button>
  </div>
</template>
<script lang="ts">
import AuthButton from '@/components/auth-button.vue'
import { API } from '@/models/api'
import Vue from 'vue'

export default Vue.extend({
  name: 'AddList',
  components: { AuthButton },
  data() {
    return {}
  },
  async onLoad() {
    this.startOpen()

    wx.login()
  },
  methods: {
    async startOpen() {
      try {
        const res = await API.partnersSBusiness.account.authorized.request({})
        this.openNext()
      } catch {}
    },

    openNext() {
      wx.reLaunch({
        url: '/pages/home/index'
      })
    }
  }
})
</script>
<style lang="less" scoped>
.user-login {
  padding: 103rpx 55rpx 0 55rpx;
  font-size: 28rpx;
  background-color: #fff;
  height: 100vh;
}
.login-title {
  font-size: 48rpx;
  font-weight: 600;
  color: #222222;
  line-height: 64rpx;
  margin-bottom: 160rpx;
  margin-top: 16rpx;
  text-align: center;
}
.green {
  background-color: #0abb08;
  color: #fff;
}
.login-icon {
  height: 128rpx;
  width: 128rpx;
}
.login-img {
  justify-content: center;
}
.wx-icon {
  height: 64rpx;
  width: 64rpx;
}
.wx-login-btn {
  justify-content: center;
  align-items: center;
}
</style>
