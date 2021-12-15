<template>
  <div class="set">
    <div class="set-title">
      <div class="flex set-info">
        <img
          :src="avatar"
          alt=""
          class="icon-picture"
          v-if="avatar"
          @click="openGetInfo"
        />
        <img
          src="../../../assets/images/default.png"
          alt=""
          class="icon-picture"
          v-else
          @click="openGetInfo"
        />
        <div class="info-content">
          <div class="info-name flex">
            <span>{{ name || '未获取昵称' }}</span>
            <span class="mar-l-10">
              <Tag
                :text="text"
                :textColor="textColor"
                fontSize="24"
                color="#fff"
                :border="border"
                padding="4rpx 15rpx"
              ></Tag>
            </span>
          </div>
          <div class="info-phone">{{ phone }}</div>
        </div>
      </div>
    </div>
    <van-cell @click="logOut">
      <template #title>
        <div class="log-out">退出登录</div>
      </template>
    </van-cell>
    <van-dialog id="van-dialog" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// src/components/tag.vue
import Tag from '@/components/tag.vue'
import { API } from '@/models/api'
export default Vue.extend({
  name: 'Introduce',
  components: {
    Tag
  },
  data() {
    return {
      name: '',
      avatar: '',
      phone: '',
      // 标签样式
      text: '',
      textColor: '',
      border: '',
      padding: ''
    }
  },
  onLoad() {
    this.init()
  },
  methods: {
    async init() {
      try {
        const res = await API.partnersSBusiness.account.info.request({})
        this.name = res.data.name
        this.avatar = res.data.avatar
        this.phone = res.data.phone
        // 根据合作人还是推荐官显示相关标签
        if (res.data.roleType === 2) {
          this.text = '推荐官'
          this.textColor = '#55BD62'
          this.border = '1px solid #55BD62;'
        } else if (res.data.roleType === 1) {
          this.text = '合作人'
          this.textColor = '#F86744'
          this.border = '1px solid #F86744;'
        }
      } catch (error) {}
    },
    async openGetInfo() {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: async res => {
          let userInfo = res.userInfo
          console.log(userInfo)
          await API.partnersSBusiness.account.update.request({
            name: userInfo.nickName,
            avatar: userInfo.avatarUrl
          })
          this.init()
        }
      })
    },
    async logOut() {
      this.$dialog
        .confirm({
          title: '确定退出登录？',
          message: '退出登录后，您将不能第一时间查看最新的商户招生合作信息。',
          confirmButtonText: '取消',
          cancelButtonText: '退出登录'
        })
        .then(async () => {})
        .catch(async () => {
          try {
            await API.oauth.login.postV1LoginOut.request({})
            uni.reLaunch({
              url: '/pages/login/index'
            })
          } catch (e) {
            this.$toast.fail(e.errorMessage)
          }
        })
      console.log(1)
    }
  }
})
</script>
<style lang="less" scoped>
.set {
  margin-top: 16rpx;
  .set-info {
    align-items: center;
    .info-content {
      .info-name {
        font-size: 32rpx;
        font-weight: 500;
        color: #222222;
        letter-spacing: 0;
        line-height: 44rpx;
      }
      .info-phone {
        font-size: 24rpx;
        color: #666666;
        letter-spacing: 0;
        line-height: 32rpx;
        margin-top: 4rpx;
      }
    }
  }
  .set-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #222222;
    line-height: 48rpx;
    margin-bottom: 32rpx;
    background: #fff;
    padding: 20rpx 32rpx;
  }
  .icon-picture {
    width: 64rpx;
    height: 64rpx;
    margin-right: 16rpx;
    border-radius: 50%;
  }
}
.log-out {
  font-size: 28rpx;
  color: #f86744;
  letter-spacing: 0;
  line-height: 44rpx;
  text-align: center;
}
</style>
