<template>
  <div class="transtion-manage">
    <van-sticky>
      <div class="list-content">
        <div class="list-top flex">
          <div class="list-top-bold">
            {{ formObj.name }}
          </div>
          <div class="list-top-bold">
            <span class="font-24">+</span>
            <span>{{ formObj.totalAmount }}</span>
          </div>
        </div>
        <div class="list-center thin-list">
          {{ formObj.phone }}
        </div>
        <div class="list-bottom thin-list">
          录入时间：{{
            formObj.createdAt
              ? dayjs(formObj.createdAt).format('YYYY-MM-DD HH:mm')
              : '-'
          }}
        </div>
      </div>
      <div class="base-title customer-detail">交易明细</div>
    </van-sticky>

    <scroll-view
      scroll-y
      class="transation-content"
      @scrolltolower="scrolltolower"
    >
      <div class="list-detail" v-for="item in listTransation" :key="item.id">
        <div class="top flex">
          <div>消费</div>
          <div class="list-top-number" v-if="item.courseType === 2">
            <Tag color="#E6F0FF" text-color="#0066FF" text="试听交易" />
          </div>
          <div v-else>
            <span class="font-24">+</span>
            <span>{{ item.realAmount ? item.realAmount : '-' }}</span>
          </div>
        </div>
        <div class="bottom flex thin-list">
          <div class="course">
            课程名称 ：{{ item.courseName ? item.courseName : '-' }}
          </div>
          <div class="tag-product">
            <Tag
              color="#FFE6E6"
              text-color="#FF3333"
              v-if="item.hasRefund"
              :text="item.hasRefund ? '已退款' : ''"
            />
          </div>
        </div>
        <div class="bottom thin-list">
          购买时间：{{
            item.transactionTime
              ? dayjs(item.transactionTime).format('YYYY-MM-DD HH:mm')
              : '-'
          }}
        </div>
        <div class="bottom thin-list" v-if="item.hasRefund">
          退款时间：{{
            item.refundTransactionTime
              ? dayjs(item.refundTransactionTime).format('YYYY-MM-DD HH:mm')
              : '-'
          }}
        </div>
      </div>
      <Empty v-if="!listTransation.length"></Empty>
    </scroll-view>
    <page-loading v-if="!formObj"></page-loading>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Empty from '@/components/empty.vue'
import PageLoading from '@/components/page-loading.vue'
// src/pont/partnersSBusiness/mods/transaction/index.ts
import { list } from '@/pont/partnersSBusiness/mods/transaction/index'
import { detail } from '@/pont/partnersSBusiness/mods/customer/index'
import Tag from '@/components/tag.vue'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'PartnerList',
  components: {
    Empty,
    PageLoading,
    Tag
  },
  data() {
    return {
      dayjs,
      formObj: {
        createdAt: '',
        name: '',
        phone: '',
        shareholderName: '',
        totalAmount: '',
        id: ''
      },
      customerObj: {
        customerId: '',
        pageIndex: 1,
        pageSize: 10
      },
      // 是否结束分页请求
      finished: false,
      listTransation: [] as any
    }
  },
  onLoad(option: any) {
    if (!option.customerId) return
    this.customerObj.customerId = option.customerId
    this.getDetailCustomer()
    this.getTransationList()
  },
  // 下拉触底
  onReachBottom() {},
  onShow() {},
  methods: {
    // 客户详情接口
    getDetailCustomer() {
      detail.request({ customerId: this.customerObj.customerId }).then(res => {
        this.formObj = Object.assign({}, res.data)
        // // 处理对象为空
        for (let key in this.formObj) {
          if (!this.formObj[key]) {
            this.formObj[key] = '-'
          }
        }
      })
    },
    // 触发触底事件请求分页
    scrolltolower() {
      // console.log('滚动加载')
      if (!this.finished) {
        this.getTransationList()
      }
    },
    // 交易明细列表
    getTransationList() {
      list.request(this.customerObj).then(res => {
        // 切换分页参照
        if (this.customerObj.pageIndex === 1 && res.data.list === null) {
          this.listTransation = []
        } else if (this.customerObj.pageIndex === 1) {
          this.listTransation = [...res.data.list]
        } else {
          if (
            this.listTransation &&
            this.listTransation.length &&
            res.data.list
          ) {
            this.listTransation.push(...res.data.list)
          }
        }
        if (this.listTransation.length === res.data.total) {
          this.finished = true
        } else {
          this.customerObj.pageIndex++
        }
      })
    }
  }
})
</script>
<style lang="less" scoped>
.list-content {
  margin-top: 16rpx;
  background: #ffffff;
  .list-top {
    justify-content: space-between;
    padding: 32rpx 32rpx 0;
    .list-top-bold {
      font-size: 32rpx;
      font-weight: 500;
      color: #222222;
    }
    &-number {
      font-size: 32rpx;
      font-weight: 500;
      color: #222222;
      line-height: 48rpx;
      .small-add {
        font-size: 24rpx;
      }
    }
  }
  .list-center {
    padding: 4rpx 0 16rpx 0;
    margin-left: 32rpx;
    border-bottom: 1rpx solid #eeeeee;
  }
  .list-bottom {
    padding: 54rpx 32rpx 32rpx;
  }
}
.thin-list {
  font-size: 24rpx;
  font-weight: 400;
  color: #666666;
  line-height: 32rpx;
}
.font-24 {
  font-size: 24rpx;
}
.list-detail {
  background: #ffffff;
  padding: 32rpx;
  border-bottom: 1rpx solid #ecedf4;
  .top {
    justify-content: space-between;
    font-size: 32rpx;
    font-weight: 500;
    color: #222222;
    margin-bottom: 16rpx;
  }
  .bottom {
    justify-content: space-between;
    margin-bottom: 8rpx;
    .course {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 560rpx;
    }
  }
}
.customer-detail{
  background-color: #F6F7F8;
}
</style>
