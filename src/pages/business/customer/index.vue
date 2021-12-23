<template>
  <div>
    <van-sticky v-if="showSticky">
      <div class="base-card tab-base">
        <div class="flex">
          <Field
            title="累计拓客数"
            :text="shareRecordObj.totalCustomerCount"
            :showBorder="false"
            unit=" "
          />
          <Field
            title="待成交客户"
            :text="shareRecordObj.noTransactionCustomerCount"
            unit=" "
          />
          <Field
            title="累计成交额"
            :text="shareRecordObj.totalTransactionAmount"
          />
        </div>
      </div>
      <div class="base-title-all">
        <span class="shelf" v-for="item in listUpAndDown" :key="item.key">
          <span
            class="up-down"
            :class="activeClick === item.key ? 'active-down' : ''"
            @click="onUpAndDown(item.key)"
            >{{ item.name }}</span
          >
        </span>
      </div>
    </van-sticky>
    <div class="list-content">
      <div class="list-all" v-for="item in listReward" :key="item.id">
        <div class="partner-list base-card" @click="openDetail(item.id)">
          <div class="list-top">
            <div class="list-top-left list-top-text">
              {{ item.name ? item.name : '-' }}
            </div>
            <div class="list-top-number">
              <span v-if="Number(item.totalAmount) > 0" class="small-add"
                >+</span
              >{{ item.totalAmount }}
            </div>
          </div>
          <div class="list-center">
            <div class="construct-number">
              <div class="">{{ item.phone }}</div>
              <div class="thin-line"></div>
              <div>录入时间：{{ item.createdAt ? item.createdAt : '-' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Empty
      v-if="!listReward.length && loading"
      text="暂无内容，快去使用拓客卡吸引家长吧"
    ></Empty>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Empty from '@/components/empty.vue'
import Field from '@/components/field.vue'
import { API } from '@/models/api'

const TYPE_NAME = {
  1: '收入',
  2: '退款',
  3: '奖励发放'
}
const WITH_DRAW_TYPE_NAME = {
  1: '微信',
  2: '支付宝',
  3: '银行转账',
  4: 'POS机',
  5: '现金',
  99: '其它方式'
}

export default Vue.extend({
  name: '',
  components: { Empty, Field },
  props: {},
  onLoad(option: any) {
    this.getRewardList()
    this.getHistoryData()
  },
  data() {
    return {
      activeClick: 0,
      showDialog: false,
      params: {
        pageIndex: 1,
        pageSize: 1000,
        hasTransactionType: 0
      },
      loading: true,
      showSticky: true,
      shareRecordObj: {
        noTransactionCustomerCount: '',
        totalCustomerCount: '',
        totalTransactionAmount: ''
      },
      listReward: [],
      listUpAndDown: [
        {
          key: 0,
          name: '全部'
        },
        {
          key: 1,
          name: '已成交'
        },
        {
          key: 2,
          name: '未成交'
        }
      ],
      shareholderRewardDetailId: ''
    }
  },
  methods: {
    async getHistoryData() {
      const res = await API.partnersSBusiness.customer.statistic.request({})
      this.shareRecordObj = Object.assign({}, res.data)
    },
    async getRewardList() {
      API.partnersSBusiness.customer.list.request(this.params).then(res => {
        if (!res.data.list && this.params.hasTransactionType === 0) {
          this.showSticky = false
        }
        console.log(res.data.list)
        if (!res.data.list) {
          this.loading = true
        }
        if (res.data.list) {
          this.loading = false
          this.listReward = res.data.list
        }
      })
    },
    onUpAndDown(key) {
      this.activeClick = key
      this.params.hasTransactionType = key
      // 每次切换的时候清空列表并且将pageIndex重置
      this.listReward = []
      this.params.pageIndex = 1
      this.getRewardList()
    },

    onConfirm() {
      this.showDialog = false
    },
    openDetail(id) {
      uni.navigateTo({
        url: `/pages/business/customer/detail?customerId=${id}`
      })
    }
  }
})
</script>
<style lang="less" scoped>
.list-all {
  margin: 0 32rpx 16rpx;
}
.tab-base {
  margin-top: 16rpx;
}
.partner-list {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx 0 32rpx 32rpx;
  .list-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-right: 32rpx;
    &-number {
      font-size: 32rpx;
      font-weight: 500;
      color: #222222;
      line-height: 48rpx;
      .small-add {
        font-size: 24rpx;
      }
    }
    &-text {
      font-size: 32rpx;
      font-weight: 500;
      color: #222222;
      line-height: 44rpx;
      span {
        color: #0066ff;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }
    }
  }
  .list-center {
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    line-height: 32rpx;
    margin: 4rpx 0 0;
  }
}
.list-content {
  overflow-y: scroll;
}
.up-down,
.active-down {
  padding: 8rpx 24rpx;
  box-sizing: border-box;
  background: #fff;
  margin-right: 16rpx;
  border-radius: 24rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #888888;
}
.active-down {
  background: #f86744;
  color: #ffffff;
}
.base-title-all {
  height: 112rpx;
  line-height: 112rpx;
  padding-left: 32rpx;
  background-color: #f6f7f8;
}
.mar-b-8 {
  margin-bottom: 8rpx;
}
.grant-form {
  display: flex;
  justify-content: space-between;
}
.thin-line {
  margin: 16rpx 0;
  height: 1rpx;
  width: 100%;
  background-color: #eeeeee;
}
.small-add {
  font-size: 24rpx;
  font-weight: bold;
  color: #222222;
  line-height: 48rpx;
}
</style>
