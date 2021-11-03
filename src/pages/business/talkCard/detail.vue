<template>
  <div class="user-login">
    <div class="change-org">
      <div class="flex">
        <img src="../../../assets/images/place.png" class="icon-place" />
        <div class="school-title">{{ defaultSchool }}</div>
      </div>
    </div>
    <div class="talk-card">
      <Card :showIcon="false" :item="memberCard" />
    </div>
    <van-tabs @click="onClickTab">
      <van-tab title="尊享礼券" name="tickets">
        <div class="discount-list">
          <div v-for="item in memberCard.couponList" :key="item.id">
            <DiscountItem
              :type="item.ruleType"
              :discountObj="item"
              @viewClick="viewClick(item.id)"
              @shelfClick="shelfClick(item)"
            />
          </div>
        </div>
      </van-tab>
      <van-tab title="权益介绍" name="introdece">
        <div class="tab-rights">
          {{ memberCard.description }}
        </div>
      </van-tab>
      <van-tab title="校区介绍" name="school">
        <div class="tab-school">
          <van-cell-group>
            <van-cell title="校区名称" value="大同舞蹈学校城北校区" />
            <van-cell
              title="校区位置"
              value="浙江省/杭州市/西湖区 文三路华星时代广场A座10楼"
            />
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>
    <div class="bottom-test">
      <img src="../../../assets/images/limited.png" class="icon-limited" />
      <div class="limit-get">限时领取</div>
      <van-count-down
        use-slot
        :time="time"
        @change="onChange"
        @finish="onFinish"
      >
        <span class="count-down">{{ timeData.curHour }}</span>
        <span class="span-spacing">:</span>
        <span class="count-down">{{ timeData.minutes }}</span>
        <span class="span-spacing">:</span>
        <span class="count-down">{{ timeData.seconds }}</span>
      </van-count-down>
    </div>
    <div class="bottom-button">
      <button class="view" @click="openQRcode">生成二维码</button>
      <!-- <button class="save-list">分享至微信</button> -->
    </div>
    <van-popup
      :show="showQRcode"
      position="bottom"
      round
      closeable
      custom-style="height: 70%;"
      @close="closeQRcode"
    >
      <SaveAlbum :src="src" />
    </van-popup>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Card from './components/card.vue'
import SaveAlbum from './components/save-album.vue'
import DiscountItem from './components/discount-item.vue'
import { API } from '@/models/api'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'HomeList',
  components: { Card, DiscountItem, SaveAlbum },
  data() {
    return {
      defaultSchool: '',
      id: '',
      memberCard: {},
      time: 0,
      timeData: {},
      isFinish: false,
      showQRcode: false,
      src: ''
    }
  },
  async onLoad(option) {
    this.id = option?.id
    const res = await API.partnersSBusiness.campus.list.request({})
    const res1 = await API.partnersSBusiness.memberCard.detail.request({
      id: this.id
    })
    const date1 = dayjs()
    const date2 = dayjs(res1.data.applyEndTime)
    this.memberCard = res1.data
    this.defaultSchool = res.data.find(item => item.isDefault).name
    if (date1 > date2) {
      this.isFinish = true
      return
    }
    this.time = date2.diff(date1)
  },
  methods: {
    onClickTab(e: any) {
      console.log(e.target.name)
    },
    onChange(e) {
      const curHour = 24 * e.detail.days
      this.timeData = { ...e.detail, curHour }
    },
    onFinish() {
      this.isFinish = true
      console.log(1, 'end')
    },
    async openQRcode() {
      const res = await API.partnersSBusiness.memberCard.shareInfo.request({
        id: this.id
      })
      this.showQRcode = true
      this.src = res.data.url
      console.log('qrcode', res)
    },
    closeQRcode() {
      this.showQRcode = false
      console.log(11)
    },
  
  }
})
</script>
<style lang="less" scoped>
.user-login {
  padding: 32rpx 0;
  font-size: 28rpx;
}
.talk-card {
  margin: 32rpx;
}
.change-org {
  margin: 32rpx;
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
.view,
.save-list {
  width: 294rpx;
  height: 80rpx;
  background: #f86744;
  border-radius: 40rpx;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 1px solid #f86744;
  color: #fff;
}
.view {
  // margin-right: 32rpx;
  background: #fff;
  color: #f86744;
}

.icon-place {
  width: 44rpx;
  height: 44rpx;
}
.icon-right {
  width: 24rpx;
  height: 24rpx;
}
.tab-rights {
  padding: 40rpx 32rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #666666;
  line-height: 44rpx;
}
.bottom-test {
  width: 100%;
  height: 80rpx;
  padding-left: 48rpx;
  background: #ffebe6;
  position: fixed;
  bottom: calc(112rpx + var(--safe-area-inset-bottom));
  left: 0;
  display: flex;
  align-items: center;
}
.icon-limited {
  height: 66rpx;
  width: 66rpx;
  align-self: baseline;
}
.limit-get {
  width: 96rpx;
  height: 32rpx;
  font-size: 24rpx;
  font-weight: 400;
  color: #f86744;
  line-height: 32rpx;
  margin: 0 16rpx 0 72rpx;
}
.count-down {
  display: inline-block;
  text-align: center;
  height: 44rpx;
  padding: 2rpx 8rpx;
  background: #161718;
  border-radius: 8rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #f86744;
  line-height: 44rpx;
}
.span-spacing {
  padding: 0 10rpx;
}
</style>

<style lang="less" scoped>
.class-all {
  padding: 0 32rpx;
  .discount {
    width: 686rpx;
    height: 220rpx;
    border-radius: 20rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .discount-number {
      width: 240rpx;
      height: 200rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: DINAlternate-Bold, DINAlternate;
    }
    .color-number,
    .color-number-gift,
    .disabled-number {
      color: #e5c89c;
      font-size: 48rpx;
      margin-bottom: 8rpx;
      span {
        font-size: 24rpx;
      }
    }
    .color-number-gift,
    .disabled-number {
      color: #ffffff;
      font-weight: bold;
    }
    .use-number {
      color: #ffffff;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
    .discount-name {
      flex: 1;
      padding: 32rpx 16rpx 40rpx 16rpx;
      .right-top {
        margin-bottom: 36rpx;
        p {
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
        }
        span {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        p.name-color {
          color: #cccccc;
        }
        span.discount-dealine {
          color: #cccccc;
        }
      }
      .right-bottom {
        display: flex;
        justify-content: space-between;
        .icon {
          display: flex;
          align-items: center;
        }
        .icon-full {
          display: inline-block;
          width: 28rpx;
          height: 28rpx;
          border-radius: 50%;
          margin-right: 2rpx;
        }
        span {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
        .full {
          color: #ce9948;
        }
        .gift {
          color: #fa8130;
        }
        .disabled-all {
          color: #cccccc;
        }
      }
    }
  }
  .discount,
  .icon-full {
    background-size: cover !important;
  }
  .button {
    display: flex;
  }
  .view-tag,
  .shelf-tag {
    display: inline-block;
    margin-right: 16rpx;
    width: 120rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #f86744;
    border-radius: 24rpx;
    border: 1px solid #f86744;
  }
  .shelf-tag {
    background: #f86744;
    color: #ffffff;
  }
}
.gray {
  filter: grayscale(100%);
}

.discount-list {
  height: 540rpx;
}
</style>