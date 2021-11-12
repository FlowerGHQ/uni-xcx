<template>
  <div>
    <button v-if="!checked" @click.prevent="handleNoChecked" class="auth-btn">
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
    <div class="privacy-policy">
      <van-checkbox
        name="1"
        :value="checked"
        @change="changeChenckbox"
        icon-size="28rpx"
        label-disabled
      >
        登录即代表同意
        <span class="bold" @click="openUserTerms">《用户条款》</span>
        和
        <span class="bold" @click="openPrivacyPolicy">《隐私条款》</span>
      </van-checkbox>
    </div>
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

  checked: boolean = false

  code: string = ''

  @account.Action
  decryptionLogin: ActionMethod

  async onAuth(e) {
    try {
      let data = await wx.login()
      await API.oauth.login.miniProgramLogin.request({
        code: data.code,
        notAutoLogin: false
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
  changeChenckbox(e) {
    console.log(0)
    this.checked = e.detail
  }
  openUserTerms() {
    uni.navigateTo({
      url: `/pages/login/user/terms`
    })

    console.log(0)
  }
  openPrivacyPolicy() {
    uni.navigateTo({
      url: `/pages/login/user/privacy`
    })
  }
  handleNoChecked() {
    this.$toast('请阅读用户条款和隐私政策')
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
.privacy-policy {
  font-size: 24rpx;
  font-weight: 400;
  color: #8c8c8c;
  line-height: 32rpx;
  margin-top: 32rpx;
  display: flex;
  justify-content: center;
  .bold {
    color: #000000;
  }
}
</style>
