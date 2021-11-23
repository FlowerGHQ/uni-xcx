<template>
  <van-overlay :show="show">
    <div class="captcha-modal">
      <p class="title">图形验证码</p>
      <div class="flex captcha-content">
        <div class="captcha-title">
          <img
            class="captcha-img"
            @click="getCaptchaImg"
            :src="codeImage"
            alt=""
          />
          <span class="captcha-change" @click="getCaptchaImg">换一张</span>
        </div>
        <input
          class="captcha-input"
          :value="captcha"
          maxlength="4"
          placeholder="请输入验证码"
          focus
          @change="changeCaptcha"
        />
      </div>
      <div class="flex flex-between btn-group">
        <div class="cancel" @click="handleCancel">取消</div>
        <div class="confirm" @click="handleConfirm">确定</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import Vue from 'vue'
import { API } from '@/models/api'
export default Vue.extend({
  name: '',

  props: {
    show: {
      type: Boolean,
      default: false
    },
    onConfirm: {
      type: Function,
      default: null
    },
    onCancel: {
      type: Function,
      default: null
    },
    phone: {
      type: String,
      default: ''
    }
  },
  watch: {
    show(newV, oldV) {
      if (newV) {
        this.getCaptchaImg()
      }
      console.log(newV, oldV)
    }
  },
  onLoad() {},
  data() {
    return {
      captcha: '',
      codeImage: ''
    }
  },

  methods: {
    async getCaptchaImg() {
      let res = await API.oauth.sms.getCaptcha.request({})
      this.codeImage = 'data:image/png;base64,' + uni.arrayBufferToBase64(res)
    },
    handleCancel() {
      this.$emit('onCancel')
    },
    async handleConfirm() {
      try {
        const res = await API.oauth.sms.send.request({
          code: this.captcha,
          phone: this.phone
        })
        console.log(res, 'res')
        if (res.data) {
          console.log(111)
          this.$emit('onConfirm')
        } else {
          console.log(222)
          this.$toast('验证码错误')
        }
      } catch (error) {
        console.log(1111111)
        this.$toast('验证码错误')
      }
    },
    changeCaptcha(e) {
      this.captcha = e.detail.value
      console.log(this.captcha)
      console.log(e)
    }
  }
})
</script>

<style scoped lang="less">
.dialog-shelf {
  width: 662rpx;
  height: 260rpx;
}
.text-box {
  padding: 16rpx 48rpx 32rpx 48rpx;
  height: auto;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #888888;
}
.captcha-img {
  width: 144rpx;
  height: 80rpx;
}
.captcha-input {
  border: 1rpx solid #cccccc;
  border-radius: 16rpx;
  height: 80rpx;
  width: 526rpx;
  padding-left: 32rpx;
  margin-bottom: 32rpx;
}
.captcha-title {
  display: flex;
  align-items: center;
  margin: 32rpx 0 16rpx;
}
.captcha-content {
  flex-direction: column;
  align-items: center;
}
.captcha-change {
  font-size: 28rpx;
  color: #0066ff;
  letter-spacing: 0;
  line-height: 44rpx;
  margin-left: 16rpx;
}
.captcha-modal {
  width: 622rpx;
  padding: 40rpx 0 0;
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
  .captcha {
    width: 200rpx;
    height: 96rpx;
    background: #f1e1e0;
    border-radius: 8rpx;
  }
  .btn-group {
    border-top: 0.5rpx solid #ebedf0;
    align-items: center;
    height: 96rpx;
  }
  .cancel {
    font-size: 32rpx;
    color: #323233;
    text-align: center;
    line-height: 96rpx;
    height: 96rpx;
    flex: 1;
    border-right: 0.5rpx solid #ebedf0;
  }
  .confirm {
    font-size: 32rpx;
    color: #0066ff;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    flex: 1;
  }
}
</style>
