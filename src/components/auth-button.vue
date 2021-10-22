<template>
  <div>
    <button v-if="logined" @click.prevent="next" class="auth-btn">
      <slot />
    </button>
    <button
      v-else
      open-type="getPhoneNumber"
      @getphonenumber="onAuth"
      class="auth-btn"
    >
      <slot />
    </button>
  </div>
</template>

<script lang="ts">
import { ActionMethod } from 'vuex'
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const account = namespace('account')
import { querystring } from '@/utils/common'
// import { API } from '@/models/api'

@Component
export default class extends Vue {
  @Prop()
  redirect: string

  @Prop({ default: false })
  reLaunch: boolean

  @account.State
  logined: boolean

  @account.Action
  decryptionLogin: ActionMethod

  async onAuth(e) {
    let data = await wx.login()
    // console.log(data)
    // /api/oauth/v1/miniProgramLogin
    // const res = API.oauth.login.miniProgramLogin.request({
    //   code: data.code,
    //   notAutoLogin: true
    // })
    // console.log(res)
    const { detail } = e
    console.log(detail)
    if (detail.errMsg !== 'getPhoneNumber:ok') {
      // 跳转手机号码登录页
      return
    }
    wx.showLoading({
      title: '登录中',
      mask: true
    })
    try {
      await this.decryptionLogin({
        iv: detail.iv,
        encryptedData: detail.encryptedData
      })
      this.next()
    } catch (e) {
      this.$toast(e.message)
    } finally {
      wx.hideLoading()
    }
  }

  async next() {
    if (this.redirect) {
      if (this.reLaunch) {
        wx.reLaunch({
          url: this.redirect
        })
      } else {
        wx.reLaunch({
          url: this.redirect
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.auth-btn {
  color: inherit;
  padding-left: 0;
  padding-right: 0;
  overflow: visible;
}
</style>
