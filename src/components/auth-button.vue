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
import { API } from '@/models/api'

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
    try {
      let data = await wx.login()
      await API.oauth.login.miniProgramLogin.request({
        code: data.code,
        notAutoLogin: true
      })
      const { detail } = e
      if (detail.errMsg !== 'getPhoneNumber:ok') {
        // 跳转手机号码登录页
        return
      }
      wx.showLoading({
        title: '登录中',
        mask: true
      })
      await API.oauth.login.miniProgramDecryptionLogin.request({
        iv: detail.iv,
        encryptedData: detail.encryptedData
      })
      await API.partnersSBusiness.account.authorized.request({})
      this.next()
    } catch (e) {
      console.log(e)
      this.$toast(e.errorMessage)
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
