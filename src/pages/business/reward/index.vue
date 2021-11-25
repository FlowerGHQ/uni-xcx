<template>
  <div>
    <van-sticky v-if="showSticky">
      <div class="base-card tab-base">
        <div class="flex">
          <Field
            title="累计奖励金"
            :text="`${rewardAmount}`"
            :showBorder="false"
          />
          <Field title="已提现奖励金" :text="`${withdrawRewardAmount}`" />
          <Field title="可提现奖励" :text="`${leftRewardAmount}`" />
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
        <div class="partner-list">
          <div class="list-top">
            <div class="list-top-left list-top-text">
              {{ item.typeName ? item.typeName : '-' }}
            </div>
            <div class="list-top-number">{{ item.amount }}</div>
          </div>
          <div class="list-center" v-if="item.type === 1 || item.type === 2">
            <div class="construct-number">
              <div>奖励类型：{{ item.courseName ? item.courseName : '-' }}</div>
              <div>
                客户姓名：{{ item.customerName ? item.customerName : '-' }}
              </div>
              <div>订单金额：{{ item.realAmount ? item.realAmount : '-' }}</div>
              <div>
                {{ item.typeName }}时间：{{
                  item.createdAt ? item.createdAt : '-'
                }}
              </div>
             
            </div>
          </div>
          <div class="list-center" v-if="item.type === 3">
            <div class="construct-number">
              <div class="mar-b-8 grant-form">
                <span
                  >发放形式：{{
                    item.withdrawTypeName ? item.withdrawTypeName : '-'
                  }}</span
                >
                <Tag
                  v-if="item.cancelWithdraw"
                  color="#FFE6E6"
                  text-color="#FF3333"
                  text="已撤销"
                />
              </div>
              <div>
                发放时间：{{
                  item.createdAt
                    ? dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')
                    : '-'
                }}
              </div>
              <div class="mar-b-8" v-if="item.cancelWithdraw">
                撤销时间：{{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm') }}
              </div>
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
import Tag from '@/components/tag.vue'
import { API } from '@/models/api'
import dayjs from 'dayjs'

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
  components: { Empty, Field, Tag },
  props: {},
  onLoad(option: any) {
    this.getRewardList()
    this.getHistoryData()
  },
  data() {
    return {
      dayjs,
      activeClick: '',
      showDialog: false,
      params: {
        pageIndex: 1,
        pageSize: 100,
        type: ''
      },
      loading: true,
      rewardAmount: '',
      showSticky: true,
      withdrawRewardAmount: '',
      leftRewardAmount: '',
      listReward: [],
      listUpAndDown: [
        {
          key: '',
          name: '全部'
        },
        {
          key: 1,
          name: '收入'
        },
        {
          key: 2,
          name: '退款'
        },
        {
          key: 3,
          name: '奖励发放'
        }
      ],
      shareholderRewardDetailId: ''
    }
  },
  methods: {
    async getHistoryData() {
      const res = await API.partnersSBusiness.shareholder.detail.request({})
      console.log(res.data)
      this.rewardAmount = res.data.rewardAmount
      this.withdrawRewardAmount = res.data.withdrawRewardAmount
      this.leftRewardAmount = res.data.leftRewardAmount
    },
    async getRewardList() {
      // 合作人奖励金明细
      console.log(this.showSticky)
      API.partnersSBusiness.shareholderReward.list
        .request(this.params)
        .then(res => {
          if (!res.data.list && this.params.type === '') {
            this.showSticky = false
          }
          console.log(res.data.list)
          if (!res.data.list) {
            this.loading = true
          }
          if (res.data.list) {
            this.loading = false
            this.listReward = res.data.list.map(item => {
              return {
                ...item,
                typeName: TYPE_NAME[item.type],
                withdrawTypeName: WITH_DRAW_TYPE_NAME[item.withdrawType],
                amount:
                  item.amount.charAt(0) === '-'
                    ? item.amount
                    : `+${item.amount}`
              }
            })
          }
        })
    },
    onUpAndDown(key) {
      this.activeClick = key
      this.params.type = key
      // 每次切换的时候清空列表并且将pageIndex重置
      this.listReward = []
      this.params.pageIndex = 1
      this.getRewardList()
    },

    onConfirm() {
      this.showDialog = false
    }
  }
})
</script>
<style lang="less" scoped>
.tab-base {
  margin-top: 16rpx;
}
.partner-list {
  background: #ffffff;
  border-bottom: 1rpx solid #ecedf4;
  padding: 32rpx;
  .list-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 16rpx;
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
    &-list-top-number {
      font-weight: 500;
    }
  }
  .list-center {
    font-size: 24rpx;
    font-weight: 400;
    // padding-bottom: 16rpx;
    color: #666666;
    line-height: 32rpx;
    margin: 4rpx 0 0;
    .construct-number > div {
      margin-bottom: 8rpx;
    }
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
</style>
