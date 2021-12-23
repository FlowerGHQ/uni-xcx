<template>
  <div class="user-login">
    <div class="flex login-img">
      <img src="../../../assets/images/login.png" class="login-icon" />
    </div>
    <div class="login-title">我的校区</div>
    <van-field
      type="number"
      :class="{ 'error-input': error && !/^1[34578]\d{9}$/.test(phone) }"
      :error="error"
      :error-message="
        error && !/^1[34578]\d{9}$/.test(phone) ? '请输入正确的手机号' : ''
      "
    >
      <template #left-icon>
        <img src="../../../assets/images/phone.png" alt="" class="phone-icon" />
      </template>
      <template #input>
        <input
          v-model="phone"
          placeholder="请输入"
          type="number"
          maxlength="11"
          placeholder-style="color:#CCCCCC"
        />
      </template>
    </van-field>
    <div class="middle-btn red btn-reward send-code" @click.stop="sendCode">
      发送验证码
    </div>
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
    <div class="footer-bar__item apply flex wx-login-btn" @click="back">
      <img src="../../../assets/images/wx.png" class="wx-icon" />
      <span>微信快捷登录</span>
    </div>
    <ImageCode
      :show="showCode"
      @onConfirm="onConfirm"
      @onCancel="onCancel"
      :phone="phone"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { API } from '@/models/api'
import ImageCode from '../components/image-code.vue'
export default Vue.extend({
  name: '',
  onLoad(options) {},
  components: { ImageCode },
  data() {
    return { phone: '', error: false, checked: false, showCode: false }
  },

  methods: {
    changeChenckbox(e) {
      this.checked = e.detail
    },
    openUserTerms() {
      uni.navigateTo({
        url: `/pages/login/user/terms`
      })
    },
    openPrivacyPolicy() {
      uni.navigateTo({
        url: `/pages/login/user/privacy`
      })
    },
    async sendCode() {
      if (!this.checked) {
        this.$toast('请阅读用户条款和隐私政策')
        return
      }
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.error = true
        return
      }
      this.showCode = true
    },
    async onConfirm() {
      console.log('confirm')
      this.showCode = false
      uni.navigateTo({
        url: `/pages/login/code/code?phone=${this.phone}`
      })
    },
    onCancel() {
      this.showCode = false
    },
    back() {
      uni.navigateBack()
    }
  }
})
</script>

<style scoped lang="less">
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
.login-img {
  justify-content: center;
}
.login-icon {
  height: 128rpx;
  width: 128rpx;
}
.phone-icon {
  height: 40rpx;
  width: 40rpx;
  margin-right: 10rpx;
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
.wx-login-btn {
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: calc(112rpx + var(--safe-area-inset-bottom));
  left: 0;
}
.wx-icon {
  height: 48rpx;
  width: 48rpx;
  margin-right: 10rpx;
}
.send-code {
  margin-top: 80rpx;
}
</style>
