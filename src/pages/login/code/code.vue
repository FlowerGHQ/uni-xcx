<template>
  <div class="user-login">
    <div class="vertify-code-module">
      <div class="title">请输入6位验证码</div>
      <p class="tip">验证码已发送至{{ formatPhone }}</p>
      <div class="vertify-code-box" @click="vertifyCodeFocus">
        <div
          class="vertify-code-item"
          :class="{ error: vertifyCodeError }"
          v-for="(item, index) in [1, 2, 3, 4, 5, 6]"
          :key="index"
        >
          <div class="input-value">{{ vertifyCode[index] }}</div>
          <div
            class="focus"
            :class="[index === focusIndex ? 'show' : 'hide']"
          ></div>
        </div>
        <input
          class="vertify-code-input"
          type="number"
          maxlength="6"
          v-model="vertifyCode"
          @input="inputVertifyCode"
          @blur="inputVertifyCode"
          @confirm="submitVertifyCode"
          @focus="vertifyCodeFocus"
          :focus="focus"
        />
      </div>
      <van-count-down
        v-if="isShowCountDown"
        use-slot
        :time="60000"
        @change="countDownChange"
        @finish="countDownFinished"
      >
        <p class="count-down">{{ timeData }}s</p>
      </van-count-down>
      <div v-else class="text-blue" @click="reCheckCaptcha">重新获取</div>
      <ImageCode
        :show="showCode"
        @onConfirm="onConfirm"
        @onCancel="onCancel"
        :phone="formatPhone"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { API } from '@/models/api'
import ImageCode from '../components/image-code.vue'
export default Vue.extend({
  name: '',
  components: { ImageCode },
  onLoad(option) {
    this.formatPhone = option.phone
  },
  components: {},
  data() {
    return {
      formatPhone: '',
      vertifyCode: '',
      focusIndex: 0,
      isLogining: false,
      focus: false,
      timeData: 6000,
      isShowCountDown: true,
      showCode: false,
      vertifyCodeError: false
    }
  },

  methods: {
    vertifyCodeFocus() {
      this.focus = true
      this.focusIndex =
        this.vertifyCode.length === 6 ? 5 : this.vertifyCode.length
    },
    async reCheckCaptcha() {
      this.showCode = true
    },
    async onConfirm() {
      this.showCode = false
      this.isShowCountDown = true
      this.timeData = 6000
    },
    onCancel() {
      this.showCode = false
    },
    countDownChange(e) {
      this.timeData = e.detail.seconds
    },
    countDownFinished() {
      this.isShowCountDown = false
    },
    inputVertifyCode() {
      if (this.vertifyCode.length === 6) {
        this.submitVertifyCode()
      }
    },
    async submitVertifyCode() {
      if (this.isLogining) {
        return
      }
      if (this.vertifyCode.length !== 6) {
        this.$toast('请输入6位验证码')
        this.vertifyCodeError = true
        return
      }
      this.isLogining = true
      try {
        await API.oauth.login.login.request({
          phone: this.formatPhone,
          code: this.vertifyCode
        })
        this.$toast('登录成功')
        uni.reLaunch({
          url: '/pages/home/index'
        })
      } catch {
        this.$toast('验证码错误')
        this.vertifyCodeError = true
      } finally {
        this.isLogining = false
      }
    }
  }
})
</script>

<style scoped lang="less">
.user-login {
  padding: 103rpx 55rpx 0 55rpx;
  font-size: 28rpx;
  .phone-module {
    .phone-input {
      height: 96rpx;
      line-height: 96rpx;
      font-size: 28rpx;
      color: #444;
      border-bottom: 1rpx solid #eee;
      margin: 40rpx 0 80rpx 0;
      &.error {
        color: #ff4444;
        border-bottom: 1rpx solid #ff4444;
      }
    }
  }
  .captcha-modal {
    width: 560rpx;
    padding: 40rpx;
    background: #ffffff;
    border-radius: 32rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .title {
      font-size: 32rpx;
      font-weight: 500;
      color: #222222;
      line-height: 40rpx;
      text-align: center;
      margin-bottom: 40rpx;
    }
    .captcha-input {
      width: 260rpx;
      height: 96rpx;
      line-height: 96rpx;
      background: #f7f7f8;
      border-radius: 8rpx;
      border: 1rpx solid #e9eaed;
      background: #f7f7f8;
      padding-left: 32rpx;
      font-size: 28rpx;
      box-sizing: border-box;
    }
    .captcha {
      width: 200rpx;
      height: 96rpx;
      background: #f1e1e0;
      border-radius: 8rpx;
    }
    .btn-group {
      margin: 40rpx auto 0 auto;
      width: 400rpx;
      .middle-btn {
        width: 188rpx;
      }
    }
  }
  .phone-module .title,
  .vertify-code-module .title {
    font-size: 48rpx;
    font-weight: 600;
    color: #000000;
    line-height: 56rpx;
  }
  .phone-module .tip,
  .vertify-code-module .tip {
    font-size: 28rpx;
    color: #999999;
    line-height: 36rpx;
    margin-top: 10rpx;
  }
  .vertify-code-module {
    .change-btn {
      margin-left: 20rpx;
      padding-left: 20rpx;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 10rpx;
        bottom: 10rpx;
        width: 1rpx;
        background: #dedede;
      }
    }
    .vertify-code-box {
      margin: 40rpx 0 32rpx 0;
      position: relative;
      display: flex;
      justify-content: space-between;
      .vertify-code-item {
        width: 88rpx;
        height: 96rpx;
        background: #f7f7f8;
        border-radius: 12rpx;
        border: 1rpx solid #e9eaed;
        position: relative;
        font-size: 0;
        &.error {
          border: 1rpx solid #ff4444;
        }
        .input-value {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 28rpx;
        }
      }
      .vertify-code-input {
        position: absolute;
        bottom: 0;
        top: 0;
        height: 96rpx;
        opacity: 0;
        left: -360rpx;
        width: 880rpx;
      }
      .focus {
        width: 2rpx;
        height: 50rpx;
        background-color: #333;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .show {
        display: block;
        animation: blink 1s linear infinite;
      }
      .hide {
        display: none;
      }
    }
    .count-down {
      font-size: 28rpx;
      color: #999999;
    }
    @keyframes blink {
      0%,
      50% {
        opacity: 1;
      }

      50.01%,
      to {
        opacity: 0;
      }
    }
  }
}
</style>
