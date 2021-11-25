<template>
  <div>
    <van-sticky>
      <div class="base-card tab-base">
        <div class="flex">
          <Field
            title="总储值金"
            :text="`${storedAmount}`"
            :showBorder="false"
          />
          <Field title="已消费储值金" :text="`${usedAmount}`" />
          <Field title="剩余储值金" :text="`${leftAmount}`" />
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
              <div>变动时间：{{ item.createdAt ? item.createdAt : '-' }}</div>
            </div>
            <Tag
              v-if="item.cancel"
              color="#FFE6E6"
              text-color="#FF3333"
              text="已撤销"
            />
          </div>
          <div class="list-center" v-else>
            <div class="construct-number">
              <div>变动时间：{{ item.createdAt ? item.createdAt : '-' }}</div>
            </div>
            <Tag
              v-if="item.cancel"
              color="#FFE6E6"
              text-color="#FF3333"
              text="已撤销"
            />
          </div>
        </div>
      </div>
    </div>
    <Empty v-if="!listReward.length && loading" text="暂无信息"></Empty>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Empty from '@/components/empty.vue'
import Field from '@/components/field.vue'
import Tag from '@/components/tag.vue'
import { API } from '@/models/api'

const TYPE_NAME = {
  1: '增加',
  2: '减少',
  3: '消费',
  4: '退款'
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
      activeClick: 1,
      showDialog: false,
      params: {
        pageIndex: 1,
        pageSize: 100,
        type: 1
      },
      loading: true,
      storedAmount: '',
      usedAmount: '',
      leftAmount: '',
      listReward: [],
      listUpAndDown: [
        {
          key: 1,
          name: '储值金变动'
        },
        {
          key: 2,
          name: '消费变动'
        }
      ],
      shareholderRewardDetailId: ''
    }
  },
  methods: {
    async getHistoryData() {
      const res = await API.partnersSBusiness.shareholder.detail.request({})
      console.log(res.data)
      this.storedAmount = res.data.storedAmount
      this.usedAmount = res.data.usedAmount
      this.leftAmount = res.data.leftAmount
    },
    async getRewardList() {
      // 合作人奖励金明细
      API.partnersSBusiness.shareholderStored.list
        .request(this.params)
        .then(res => {
          if (!res.data.list) {
            this.loading = true
          }
          if (res.data.list) {
            this.loading = false
            this.listReward = res.data.list.map(item => {
              return {
                ...item,
                typeName: TYPE_NAME[item.type],
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
    &-number {
      font-weight: 500;
    }
  }
  .list-center {
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    line-height: 32rpx;
    margin: 4rpx 0 0;
    display: flex;
    justify-content: space-between;
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
