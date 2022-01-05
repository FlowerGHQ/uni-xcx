<template>
  <div>
    <!-- 先绘制 -->
    <div class="content-poster">
      <div class="top flex-align">
        <span class="mar-r-15">
          <img :src="imgLocation" alt="" class="location-img" />
        </span>
        <p class="school-location">{{ school }}</p>
      </div>
      <div class="content-info">
        <div
          class="center"
          :style="{ background: `url(${imageBg}) no-repeat center` }"
        >
          <div class="top-title flex-align">
            <div class="left"></div>
            <div class="right">
              <p class="title">{{ formObj.name }}</p>
              <span class="time">{{ titleTime }}</span>
            </div>
          </div>
          <div class="center-content">
            <p class="value">价值</p>
            <div class="center-number">
              <span class="number">
                <span class="symbol">¥</span>
                <span>20000.00</span>
              </span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <p class="textRecommend">
            {{ textContent }}
          </p>
          <div class="set-title">
            <div class="set-info">
              <div class="info-content flex-between flex-align">
                <div class="left flex">
                  <img
                    :src="avatar"
                    alt=""
                    class="icon-picture"
                    v-if="avatar"
                    @click="openGetInfo"
                  />
                  <div class="info-name">
                    <span v-if="name"
                      >{{ name }} <span class="mar-l-10">推荐</span></span
                    >
                    <span v-else>未获取昵称</span>
                    <p class="gray-text">长按识别二维码，领取福利</p>
                  </div>
                </div>
                <div class="right">
                  <!-- 二维码 -->
                  <div class="img">
                    <image
                      :src="srcImg"
                      show-menu-by-longpress="true"
                      class="QR-img"
                    >
                    </image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// src/components/bottom-button.vue
// import bottomButton from '@/components/bottom-button.vue'
import { API } from '@/models/api'
import { mapState } from 'vuex'
export default Vue.extend({
  name: 'SavePoster',
  props: {},
  // components: {}
  components: {},
  computed: {
    ...mapState('poster', [
      'avatar',
      'imageUrl',
      'name',
      'formObj',
      'titleTime',
      'school',
      'codeUrl'
    ])
  },
  data() {
    return {
      // 生成canvas海报
      showPoster: false,
      // 修改推荐语
      showPopup: false,
      id: '',
      srcImg: '',
      imgLocation: require('@/assets/images/location.png'),
      imageBg:
        'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16391284380005f6db2.png',
      // imageAvatar:
      //   'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16393661620003e392f.png',
      // name: '',
      // avatar:
      //   'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16393661620003e392f.png',
      textContent: '强力推荐这家机构！分享给你，好机构陪伴孩子一生！'
    }
  },
  onLoad(option: any) {
    if (!option.id) return
    this.id = option.id
    this.init()
    this.openQRcode()
  },
  mounted() {},
  methods: {
    async init() {
      try {
        const res = await API.partnersSBusiness.account.info.request({})
        // this.name = res.data.name
        // this.avatar = res.data.avatar
      } catch (error) {}
    },
    async openGetInfo() {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: async res => {
          let userInfo = res.userInfo
          await API.partnersSBusiness.account.update.request({
            name: userInfo.nickName,
            avatar: userInfo.avatarUrl
          })
          this.init()
        }
      })
    },
    openQRcode() {
      // const res = await API.partnersSBusiness.memberCard.shareInfo.request({
      //   id: this.id
      // })
      // this.srcImg = res.data.url
      console.log('qrcode')
    },
    onClose() {
      this.showPopup = false
    },
    editClick() {
      this.showPopup = true
    },
    picClick() {
      this.showPoster = true
    },
    onClosePoster() {
      this.showPoster = false
    },
    clickCancel() {
      // console.log('clickCancel')
      this.showPopup = false
    },
    clickSave(val) {
      this.textContent = val
      this.showPopup = false
    }
  }
})
</script>
<style lang="less" src="./savePoster.less"></style>
