<template>
  <div class="invite-intro">
    <!-- <div class=""> -->
    <div class="invite-school">{{ schoolName }}</div>
    <div class="invite-card">
      <div class="invite-card-top">
        预计可获得拓客卡(张)：<span class="invite-num-span">{{
          totalCount
        }}</span>
      </div>
      <div>
        累计价值(元)：<span class="invite-num-span">{{ value }}</span>
      </div>
    </div>
    <img
      src="https://production-sam.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads1639377333000220315.png"
      alt=""
      class="img-background"
      mode="widthFix"
    />
    <!-- </div> -->
    <div class="bottom-button flex">
      <button
        class="invite-share animate__heartBeat"
        @getphonenumber="onAuth"
        open-type="getPhoneNumber"
      >
        我要成为推荐官
      </button>
      <!-- <div class="invite-share animate__heartBeat" @click="openShare">
        我要成为推荐官
      </div> -->
    </div>
    <van-popup
      :show="showMessage"
      position="bottom"
      round
      custom-style="height: 50%;"
      closeable
      @close="closePopup"
    >
      <div>
        <div class="title">请填写信息</div>
        <van-field
          label="姓名"
          required
          :class="{ 'error-input': error && !defaultVVVV }"
          :error="error"
          :error-message="error && !defaultVVVV ? '请输入真实姓名' : ''"
        >
          <template #input>
            <input
              v-model="defaultVVVV"
              placeholder="请输入真实姓名"
              placeholder-style="color:#CCCCCC"
            />
          </template>
        </van-field>
        <van-field
          label="手机号"
          required
          :value="`${phone}(不可修改)`"
          readonly
        />
        <div class="bottom-btn-wrap">
          <div class="middle-btn red" @click="openNext">确定</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { API } from '@/models/api'
export default Vue.extend({
  name: 'Invite',
  data() {
    return {
      totalCount: 0,
      value: '',
      state: '',
      schoolName: '',
      phone: '',
      showMessage: false,
      defaultVVVV: '',
      error: false
    }
  },
  onShareAppMessage: function (res): any {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.schoolName,
      path: `/pages/jumpPage/index?scene=${encodeURIComponent(
        this.$data.state
      )}`,
      imageUrl:
        'https://production-sam.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads1639385533000e1a573.png'
    }
  },
  //   eccfc2cca1c852f8b5dc6ef9ee366e64
  async onLoad(option: any) {
    this.state = decodeURIComponent(option.scene)
    const parmaState = this.state.split('&')
    // const parma = {
    //   campusId: 1,
    //   merchantId: 1,
    //   sign: 'eccfc2cca1c852f8b5dc6ef9ee366e64'
    // }
    const parma = {
      campusId: parmaState[0],
      merchantId: parmaState[1],
      sign: parmaState[2]
    }
    const res = await API.partnersSBusiness.open.campusInfo.request(parma)
    this.schoolName = res.data.name
  },
  async onShow() {
    const parmaState = this.state.split('&')
    // const parma = {
    //   campusId: 1,
    //   merchantId: 1,
    //   sign: 'eccfc2cca1c852f8b5dc6ef9ee366e64'
    // }
    const parma = {
      campusId: parmaState[0],
      merchantId: parmaState[1],
      sign: parmaState[2]
    }
    let res = await API.partnersSBusiness.open.memberCardStatistic.request(
      parma
    )
    this.totalCount = res.data.count
    this.value = res.data.value
  },
  methods: {
    closePopup() {
      this.showMessage = false
    },
    async onAuth(e) {
      const { detail } = e
      if (detail.errMsg !== 'getPhoneNumber:ok') {
        // 跳转手机号码登录页
        return
      }
      try {
        await API.oauth.login.postV1LoginOut.request({})
      } catch (error) {}
      //   try {
      //     await API.partnersSBusiness.account.authorized.request({})
      //     this.next()
      //   } catch (error) {
      // await API.oauth.login.postV1LoginOut.request({})
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
        const res1 = await API.oauth.login.miniProgramDecryptionLogin.request({
          iv: detail.iv,
          encryptedData: detail.encryptedData
        })
        if (!res1.data) {
          let data1 = await wx.login()
          await API.oauth.login.miniProgramLogin.request({
            code: data1.code,
            notAutoLogin: false
          })
          const { detail: detail1 } = e
          if (detail1.errMsg !== 'getPhoneNumber:ok') {
            // 跳转手机号码登录页
            return
          }
          wx.showLoading({
            title: '登录中',
            mask: true
          })
          await API.oauth.login.miniProgramDecryptionLogin.request({
            iv: detail1.iv,
            encryptedData: detail1.encryptedData
          })
        }
        this.next()
      } catch (e) {
        const { errorMessage = '' } = e as any
        this.$toast(errorMessage)
      } finally {
        wx.hideLoading()
      }
      //   }
    },
    async next() {
      const res = await API.partnersSBusiness.account.phone.request({})
      this.phone = res.data.phone
      this.showMessage = true
    },
    async openNext() {
      if (!this.defaultVVVV) {
        this.error = true
        return
      }
      const parmaState = this.state.split('&')
      //   const parma = {
      //     campusId: 1,
      //     merchantId: 1,
      //     sign: 'eccfc2cca1c852f8b5dc6ef9ee366e64'
      //   }
      const parma = {
        campusId: parmaState[0],
        merchantId: parmaState[1],
        sign: parmaState[2]
      }
      try {
        const res =
          await API.partnersSBusiness.shareholder.saveIntroducer.request({
            name: this.defaultVVVV,
            phone: this.phone,
            open: parma
          })
        uni.reLaunch({
          url: '/pages/home/index?isIntroduce=show'
        })
      } catch (error) {
        const { errorMessage = '' } = error as any
        this.$toast(errorMessage)
      }
    }
  }
})
</script>
<style lang="less" scoped>
.invite-intro {
  height: 100vh;
}
.title {
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 48rpx;
  text-align: center;
  padding: 36rpx;
}
.invite-school {
  text-align: center;
  margin-top: 145rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #666;
}
.invite-card {
  margin-top: 580rpx;
  padding-left: 328rpx;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
  font-size: 24rpx;
  color: #5c4e45;
  .invite-card-top {
    margin-bottom: 4rpx;
  }
  .invite-num-span {
    font-size: 32rpx;
    font-weight: 600;
  }
}
.invite-share {
  //   width: 600rpx;
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #f86744;
  border-radius: 40rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 1px solid #f86744;
  color: #fff;
}
.img-background {
  // wid
  width: 750rpx;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.animate__heartBeat {
  animation-name: heartBeat;
  animation-duration: calc(1s * 1);
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes heartBeat {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>