<template>
  <div class="user-login">
    登录页
    <!-- <div class="btn" @click="openNext">进入下一页</div> -->
    <auth-button redirect="/pages/business/schoolList/index" reLaunch>
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
import { Auth, Catch } from '@/utils/decorators'
import { Component, Vue } from 'vue-property-decorator'
import AuthButton from '@/components/auth-button.vue'
import { API } from '@/models/api'

@Component({ components: { AuthButton } })
@Component
export default class extends Vue {
  // 界面开始渲染
  async startOpen() {
    try {
      const res = await API.partnersBBusiness.account.authorized.request({})
      console.log(res)
    } catch {
      console.log(111)
    }
  }

  openNext() {
    // wx.reLaunch({
    //   url: '/pages/business/home/index'
    // })
  }
  //
  // async login() {
  //   /** 获取微信登录信息 */
  //   let data = await wx.login()
  // }
}
</script>
<style lang="less" scoped>
.user-login {
  padding: 103rpx 55rpx 0 55rpx;
  font-size: 28rpx;
}
</style>
