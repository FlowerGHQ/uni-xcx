<template>
  <div class="user-login">
    登录页
    <auth-button redirect="/pages/business/home/index" reLaunch>
      <div
        class="footer-bar__item apply"
        :class="{ active: current === 'applyList' }"
      >
        <div class="icon"></div>
        <span>我的报名</span>
      </div>
    </auth-button>
    <div @click="startOpen">测试登录</div>
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
  methods: {
    async startOpen() {
      try {
        const res = await API.partnersBBusiness.account.authorized.request({})
        console.log(res)
      } catch {
        console.log(111)
      }
    },

    openNext() {
      wx.reLaunch({
        url: '/pages/business/home/index'
      })
    }
  }
})
</script>
<style lang="less" scoped>
.user-login {
  padding: 103rpx 55rpx 0 55rpx;
  font-size: 28rpx;
}
</style>
