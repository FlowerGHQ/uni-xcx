<template>
  <div class="user-login">
    <div class="top">
      <van-nav-bar
        title="首页"
        @click-left="onClickLeft"
        custom-style="background-color:transparent"
      />
      <div class="error-login" v-if="hasError">
        {{ errorMessage }}
      </div>
      <div class="change-org" @click="changeSchoolOrg">
        <div class="flex">
          <img
            src="../../assets/images/place.png"
            class="icon-place"
            v-if="!hasError"
          />
          <img
            src="../../assets/images/place-disabled.png"
            class="icon-place"
            v-else
          />
          <div class="school-title">{{ defaultSchool }}</div>
        </div>
        <img src="../../assets/images/right-arrow.png" class="icon-right" />
      </div>
      <img src="../../assets/images/background-home.png" class="icon-inmage" />
    </div>
    <div class="middle-item">
      <ScrollMiddle ref="scrollMiddle"></ScrollMiddle>
    </div>
    <div class="notice-title" v-if="hasReward">
      <img src="../../assets/images/message.png" alt="" class="icon-place" />
      <div class="content">拓展【试听课】也能获得奖励金啦！</div>
      <div class="check" @click="openDetail">去查看</div>
    </div>
    <div class="common-func" :class="{ 'common-func-height': hasError }">
      <div class="common-func-title">常用功能</div>
      <div
        class="flex talk-card base-card"
        @click="shareCard"
        :class="{ 'error-card': hasError, 'normal-card': !hasError }"
      >
        <img
          src="../../assets/images/card.png"
          class="talk-icon"
          v-if="!hasError"
        />
        <img
          src="../../assets/images/card-disabled.png"
          class="talk-icon"
          v-else
        />
        <div class="flex1">
          <div class="talk-title">拓客卡</div>
          <div class="talk-desc">分享权益，快速助力获客</div>
        </div>
        <div class="share-button">立即分享</div>
      </div>
      <div class="common-func-list" @click="notClick ? handleDetail() : null">
        <CommonList :error="notClick" ref="commonList" />
      </div>
    </div>
    <van-popup
      :show="showDetail"
      position="bottom"
      round
      closeable
      custom-style="height: 70%;"
      @close="closeDetail"
    >
      <div class="detail-title">奖励金规则</div>
      <div class="detail-item">
        <div class="detail-left">
          <img
            src="../../assets/images/gold.png"
            alt=""
            class="detail-gold"
          /><span class="detail-text">试听课奖励金</span>
        </div>
        <div class="detail-right">
          <span class="detail-num">{{ rewardCount }}</span
          ><span class="detail-text">元</span>
        </div>
      </div>
      <div class="wait-more">更多福利敬请期待</div>
    </van-popup>
    <van-dialog id="van-dialog" />
    <!-- 如果推荐人生成合作人显示两秒升级成功 -->
    <van-overlay :show="showOverlay" @click="clickCancel">
      <div class="content-overlay">
        <content-center></content-center>
      </div>
    </van-overlay>
    <!-- 成为推荐官 -->
    <van-overlay :show="showBeIntroduce">
      <div class="content-overlay-introduce">
        <div class="content">
          <div class="top">
            <img
              src="../../assets/images/star-partner.png"
              alt=""
              class="star-partner"
            />
          </div>
          <div class="center">
            <span class="mar-r-16">
              <img
                src="../../assets/images/left-rect.png"
                alt=""
                class="left-rect"
              />
            </span>
            <span class="bold success-font">恭喜成为推荐官</span>
            <span class="mar-l-16">
              <img
                src="../../assets/images/right-rect.png"
                alt=""
                class="right-rect"
              />
            </span>
          </div>
          <div class="bottom mar-t-15">
            <p>推荐官可领取试听课奖励</p>
          </div>
          <div class="card-bottom">
            <div class="close" @click="onClose">取消</div>
            <button class="share" @click="shareCard">立即分享拓客卡</button>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script lang="ts">
import CommonList from './components/common-button-list.vue'
import ScrollMiddle from './components/scrollMiddle/scroll-middle.vue'
import Vue from 'vue'
import { API } from '@/models/api'
import ContentCenter from '@/pages/home/components/center-content/index.vue'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'HomeList',
  components: { CommonList, ScrollMiddle, ContentCenter },
  data() {
    return {
      defaultSchool: '切换校区',
      errorMessage: '',
      hasError: false,
      errorTitle: '',
      notClick: false,
      showDetail: false,
      hasReward: false,
      rewardCount: '0.00',
      // 推荐官第一次升级为合作人
      showOverlay: false,
      showBeIntroduce: false,
      // 合作人还是推荐官 推荐官是2合作人是1
      dataType: 0
    }
  },
  onLoad(option: any) {
    // 显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    if (option.isAAAA === 'show') {
      this.showBeIntroduce = true
      setTimeout(() => {
        this.showBeIntroduce = false
      }, 2000)
    }
  },
  async onShow() {
    this.init()
    // 是否隐藏返回首页按钮
    wx.hideHomeButton()
    ;(this.$refs.scrollMiddle as any).getCampuHistory()
    ;(this.$refs.scrollMiddle as any).onUpAndDown(1)
    ;(this.$refs.commonList as any).getListAll()
    uni.setNavigationBarTitle({
      title: '首页'
    })
  },
  methods: {
    // 点击遮罩层
    clickCancel() {
      this.showOverlay = false
    },
    async init() {
      try {
        const res1 = await API.partnersSBusiness.account.authorized.request({})
        console.log(res1.data, '合作人端登录试一下')
      } catch (error) {}
      try {
        const res = await API.partnersSBusiness.campus.list.request({})
        this.defaultSchool = res.data.find(item => item.isDefault).name

        const res2 = await API.partnersSBusiness.rewardRule.freeCourseFixedDetail.request(
          {}
        )

        this.hasReward = res2.data ? res2.data.state : false
        // console.log(this.hasReward)
        if (this.dataType === 1) {
          const res1 = await API.partnersSBusiness.contract.detail.request({})
          if (!res1.data) {
            this.hasError = true
            this.notClick = true
            this.errorTitle = '暂无合约提醒'
            this.errorMessage =
              '暂未签订合约，请立即联系校区负责人去录入合约，才能正常使用以下功能去拓展客户'
            return
          }
          if (dayjs(res1.data.startTime) > dayjs()) {
            this.hasError = true
            this.notClick = false
            this.errorTitle = '合约暂未生效提醒'
            this.errorMessage = `合约生效时间：${dayjs(
              res1.data.startTime
            ).format('YYYY-MM-DD')}，合约生效前您的拓客卡分享功能不能使用`
            return
          }
          if (dayjs(res1.data.endTime) < dayjs()) {
            this.hasError = true
            this.notClick = false
            this.errorTitle = '合约到期提醒'
            this.errorMessage =
              '合约已到期，您的拓客卡分享功能无法使用，请立即联系校区负责人进行续约'
            return
          }
        }
        this.hasError = false
        this.notClick = false
        this.errorMessage = ''
      } catch {
        //   wx.reLaunch({
        //     url: '/pages/login/index'
        //   })
      }
      try {
        const resRecommend = await API.partnersSBusiness.account.info.request(
          {}
        )
        this.dataType = resRecommend.data.roleType
        if (resRecommend.data.roleType === 2) {
          // 如果是推荐官被禁用显示
          if (resRecommend.data.state === 0) {
            this.hasError = true
            this.notClick = true
            this.errorTitle = '已被禁用'
            this.errorMessage =
              '已被禁用，无法再分享拓客和获得新的奖励金，如有疑问可联系校区负责人'
            return
          }
        }
        if (resRecommend.data.upgradeRemind) {
          // 推荐官第一次升级为合作人
          this.showOverlay = true
          setTimeout(async () => {
            this.showOverlay = false
            await API.partnersSBusiness.shareholder.updateRemind.request({})
          }, 2000)
        }
      } catch (error) {}
    },
    handleDetail() {
      if (this.notClick) {
        this.$dialog.alert({
          title: this.errorTitle,
          message: this.errorMessage,
          confirmButtonText: '知道了'
        })
      }
    },
    onClose() {
      this.showBeIntroduce = false
    },
    shareCard() {
      this.showBeIntroduce = false
      if (this.hasError) {
        this.$dialog.alert({
          title: this.errorTitle,
          message: this.errorMessage,
          confirmButtonText: '知道了',
          className: 'confirmhahha'
        })
        return
      }
      uni.navigateTo({
        url: '/pages/business/talkCard/index'
      })
    },
    changeSchoolOrg() {
      uni.navigateTo({
        url: '/pages/business/schoolList/index'
      })
    },
    async openDetail() {
      const res = await API.partnersSBusiness.rewardRule.freeCourseFixedDetail.request(
        {}
      )
      try {
        const { fixedAmount = '0.00' } = res.data
        this.rewardCount = fixedAmount
      } catch (error) {}

      this.showDetail = true
    },
    closeDetail() {
      this.showDetail = false
    }
  }
})
</script>
<style lang="less" scoped>
/deep/.van-dialog__button:last-child .van-button {
  color: #0066ff !important;
}
.user-login {
  // padding: 32rpx;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.change-org {
  margin: 32rpx 32rpx 0;
  width: 686rpx;
  height: 96rpx;
  background: #ffffff;
  box-shadow: 10rpx 10rpx 56rpx 0rpx rgba(211, 222, 241, 0.5);
  border-radius: 32rpx;
  padding: 0 32rpx;
  border: 1rpx solid #ecf0f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.common-func {
  width: 750rpx;
  // height: 950rpx;
  background: #ffffff;
  border-radius: 64rpx 64rpx 0rpx 0rpx;
  flex: 1;
  // position: absolute;
  // bottom: 0;
  // left: 0;
  padding-bottom: 100rpx;
}
.content-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
// .common-func-height {
//   // height: 830rpx;
// }
.common-func-title {
  padding: 48rpx 32rpx 48rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 48rpx;
}
.common-func-list {
  padding: 0 48rpx;
}
.talk-card {
  height: 128rpx;

  border-radius: 8px;
  margin: 0 48rpx 48rpx;
  align-items: center;
  .talk-icon {
    width: 64rpx;
    height: 64rpx;
    margin-right: 16rpx;
  }
  .talk-title {
    width: 96rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 48rpx;
    margin-bottom: 4rpx;
  }
  .talk-desc {
    width: 264rpx;
    font-size: 24rpx;
    font-weight: 300;
    color: #ffffff;
    line-height: 32rpx;
  }
  .share-button {
    width: 176rpx;
    height: 48rpx;
    background: #ffffff;
    border-radius: 24rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 48rpx;
  }
}
.error-card {
  background: linear-gradient(209deg, #c6c6c6 0%, #888888 100%);
  box-shadow: 0px 20rpx 40rpx 0px rgba(102, 102, 102, 0.28);
  .share-button {
    color: #888888;
  }
}
.normal-card {
  background: linear-gradient(209deg, #ffb3a0 0%, #fc776c 100%);
  box-shadow: 0 10px 20px 0 rgba(253, 120, 108, 0.3);
  .share-button {
    color: #f86744;
  }
}

.school-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 44rpx;
  margin-left: 8rpx;
}

.icon-place {
  width: 44rpx;
  height: 44rpx;
}
.icon-right {
  width: 24rpx;
  height: 24rpx;
}

.error-login {
  width: 750rpx;
  // height: 132rpx;
  background: #888888;
  box-shadow: 0rpx 8rpx 32rpx 0rpx rgba(0, 0, 0, 0.08);
  font-size: 28rpx;
  font-weight: 400;
  color: #ffffff;
  line-height: 44rpx;
  padding: 22rpx 32rpx;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
}
.icon-inmage {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.74) 0%,
    rgba(255, 255, 255, 0.21) 100%
  );
  filter: blur(70rpx);
  z-index: -1;
  width: 750rpx;
  height: 1116rpx;
}
.notice-title {
  align-self: center;
  width: 686rpx;
  // height: 40px;
  background: #ffffff;
  box-shadow: 0 20rpx 40rpx 0 rgba(157, 96, 87, 0.06);
  border-radius: 16rpx;
  padding: 16rpx 32rpx;
  display: flex;
  justify-content: space-between;
  margin: 0 0 32rpx;
  .content {
    font-size: 28rpx;
    color: #222222;
  }
  .check {
    font-size: 28rpx;
    color: #f86744;
  }
}
.detail-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 48rpx;
  text-align: center;
  padding: 36rpx;
}
.detail-item {
  width: 686rpx;
  background: #fff9f3;
  border-radius: 18rpx;
  padding: 32rpx;
  margin: 32rpx;
  display: flex;
  justify-content: space-between;
  .detail-left,
  .detail-right {
    display: flex;
    align-items: center;
  }
  .detail-text {
    font-size: 28rpx;
    color: #222222;
  }
  .detail-num {
    font-size: 32rpx;
    color: #222222;
    font-weight: 500;
  }
  .detail-gold {
    height: 56rpx;
    width: 56rpx;
    margin-right: 16rpx;
  }
}
.wait-more {
  margin-top: 48rpx;
  text-align: center;
  font-size: 24rpx;
  color: #cccccc;
}
.content-overlay-introduce {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  @picWidth: 380.96rpx;
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    //   justify-content: center;
    align-items: center;
    width: 622rpx;
    // height: 386rpx;
    background: #ffffff;
    border-radius: 4rpx;
    border-radius: 32rpx;
  }
  .top {
    height: calc(@picWidth / 1.8);
  }
  .star-partner {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -@picWidth / 2;
    margin-top: -@picWidth / 2/1.2;
    width: @picWidth;
    height: @picWidth;
  }
  .center {
    display: flex;
    align-items: center;
  }
  .left-rect,
  .right-rect {
    width: 60rpx;
    height: 40rpx;
  }
  .bottom {
    p {
      font-family: PingFangSC-Regular;
      font-weight: Regular;
      font-size: 14px;
      color: #888888;
    }
  }
  .success-font {
    font-family: PingFangSC-Semibold;
    font-weight: Semibold;
    font-size: 40rpx;
    color: #222222;
  }
}

.card-bottom {
  display: flex;
  margin: 48rpx 0;
  align-items: center;
  .close {
    width: 160rpx;
    height: 80rpx;
    background: #ffffff;
    border-radius: 44rpx;
    border: 1rpx solid #f86744;
    color: #222222;
    font-size: 32rpx;
    text-align: center;
    line-height: 78rpx;
    margin-right: 32rpx;
  }
  .share {
    width: 366rpx;
    height: 80rpx;
    background-image: linear-gradient(90deg, #ff8360 0%, #f86744 100%);
    border-radius: 44rpx;
    font-size: 32rpx;
    color: #ffffff;
    text-align: center;
    line-height: 78rpx;
    margin: 0;
  }
}
</style>
