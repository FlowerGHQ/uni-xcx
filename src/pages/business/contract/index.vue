<template>
  <div class="talk-card-list">
    <div class="partner-card base-card flex-between">
      <div class="left">
        <div class="partner-card-name now-wrap">
          <!-- <span class="now-wrap">{{ name }}</span> -->
          <span class="now-wrap"
            >哈哈哈哈啊哈哈啊哈哈啊哈哈啊哈哈哈哈哈哈哈啊哈哈嗷嗷喊</span
          >
        </div>
        <div class="partner-card-phone">手机号： {{ phone }}</div>
        <div class="partner-card-phone">
          <div>创建时间： {{ createdAt }}</div>
        </div>
      </div>
      <div class="right">
        <img :src="rightImg" alt="" class="star-right" />
      </div>
    </div>

    <div class="base-title">合约信息</div>
    <div class="base-card tab-base">
      <div class="flex-column">
        <div class="flex contract-list">
          <div class="title">储值金额</div>
          <div class="content">{{ storedAmount }}</div>
        </div>
        <div class="flex contract-list">
          <div class="title">提成比例</div>
          <div class="content">{{ commissionRate }}</div>
        </div>
        <div class="flex contract-list">
          <div class="title">合约开始时间</div>
          <div class="content">{{ startTime }}</div>
        </div>
        <div class="flex contract-list">
          <div class="title">合约结束时间</div>
          <div class="content">{{ endTime }}</div>
        </div>
        <div class="flex contract-list" v-if="remark">
          <div class="title">备注</div>
          <div class="content">
            {{ remark }}
          </div>
        </div>
      </div>
      <div class="button-list flex">
        <div class="middle-btn red plain btn-reward" @click="historyContract">
          历史合约
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { API } from '@/models/api'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'Contact',
  data() {
    return {
      commissionRate: '',
      createdAt: '',
      endTime: '',
      remark: '',
      startTime: '',
      storedAmount: '',
      name: '',
      phone: '',
      rightImg: require('@/assets/images/star-partner-small.png')
    }
  },
  async onLoad() {
    const data = await API.partnersSBusiness.contract.detail.request({})
    const data1 = await API.partnersSBusiness.shareholder.detail.request({})
    console.log(data, data1)
    const {
      commissionRate,
      createdAt,
      endTime,
      remark,
      startTime,
      storedAmount
    } = data.data
    const { name, phone } = data1.data
    this.createdAt = dayjs(createdAt).format('YYYY-MM-DD HH:mm')
    this.startTime = dayjs(startTime).format('YYYY-MM-DD')
    this.endTime = dayjs(endTime).format('YYYY-MM-DD')
    this.storedAmount = `￥${storedAmount}`
    this.commissionRate = `${commissionRate}%`
    this.remark = remark
    this.name = name
    this.phone = phone
    console.log(data)
  },
  methods: {
    // 历史合约
    historyContract() {
      uni.navigateTo({
        url: `/pages/business/historyContract/index`
      })
    }
  }
})
</script>

<style lang="less" scoped>
.star-right {
  width: 166rpx;
  height: 160rpx;
}
.button-list {
  justify-content: flex-end;
}
.button-reward {
  margin-top: 48rpx;
}
.btn-reward {
  height: 64rpx;
  line-height: 64rpx;
  padding: 0rpx 44rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
}
.partner-card {
  width: 686rpx;
  height: 212rpx;
  margin: 32rpx 32rpx 0;
  background: linear-gradient(223deg, #fdb2a1 0%, #fd776c 100%);
  color: #ffffff;
  &-name {
    font-size: 32rpx;
    font-weight: 500;
    line-height: 44rpx;
    margin-bottom: 16rpx;
    justify-content: space-between;
    display: flex;
    width: 450rpx;
    span {
      width: 100%;
    }
  }
  &-phone {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    font-weight: 400;
    line-height: 40rpx;
    margin-bottom: 8rpx;
  }
}

.tab-base {
  margin: 16rpx 32rpx;
}
.contract-list {
  justify-content: space-between;
  margin-bottom: 30rpx;
  .title {
    font-size: 28rpx;
    font-weight: 400;
    color: #888888;
    line-height: 44rpx;
  }
  .content {
    font-size: 28rpx;
    font-weight: 400;
    color: #222222;
    line-height: 44rpx;
    width: 336rpx;
    text-align: right;
  }
}
</style>
