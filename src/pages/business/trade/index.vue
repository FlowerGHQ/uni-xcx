<template>
  <div class="transtion-manage safe-list-bottom">
    <header-search
      :value="formObj.searchKey"
      :clearable="true"
      placeholder="搜索消费者手机号/姓名"
      @change="change"
    ></header-search>
    <div class="list-transation">
      <!-- <van-search></van-search> -->
      <div class="base-title">共计{{ total }}条</div>
      <div class="content-all">
        <Empty
          v-if="!loading && !transationList.length"
          text="暂无内容，请先选择下面核销方式进行核销"
        ></Empty>
        <page-loading v-if="loading"></page-loading>
      </div>
      <div class="list-content" v-for="item in transationList" :key="item.id">
        <div class="partner-list" @click="clickTransation(item)">
          <div class="list-top">
            <div class="list-top-left list-top-text">
              {{ item.customerName ? item.customerName : '-' }}
            </div>
            <div class="list-top-number" v-if="item.courseType === 2">
              <Tag color="#E6F0FF" text-color="#0066FF" text="试听交易" />
            </div>
            <div class="list-top-number" v-else>
              <span v-if="Number(item.realAmount) > 0" class="small-add">+</span
              >{{ item.realAmount }}
            </div>
          </div>
          <div class="list-center">
            <div class="construct-number">
              {{ item.customerPhone ? item.customerPhone : '-' }}
            </div>
            <Tag
              color="#FFE6E6"
              text-color="#FF3333"
              v-show="item.hasRefund"
              :text="item.hasRefund ? '已退款' : ''"
            />
          </div>
          <div class="van-hairline--bottom be-half"></div>
          <div class="list-bottom">
            <div class="person-relation list-bottom-text">
              关联合作人：{{
                item.shareholderName ? item.shareholderName : '-'
              }}
            </div>
            <div class="person-time list-bottom-text">
              交易时间：{{ item.transactionTime ? item.transactionTime : '-' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Tag from '@/components/tag.vue'
import Empty from '@/components/empty.vue'
import PageLoading from '@/components/page-loading.vue'
import { list } from '@/pont/partnersSBusiness/mods/transaction'
import HeaderSearch from '@/components/header-search/index.vue'
import _ from 'lodash'

export default Vue.extend({
  name: 'PartnerList',
  components: {
    Tag,
    Empty,
    PageLoading,
    HeaderSearch
  },
  data() {
    return {
      value: '',
      loading: false,
      formObj: {
        customerName: '',
        customerPhone: '',
        searchKey: '',
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      transationList: [],
      finished: false
    }
  },
  // 下拉触底
  onReachBottom() {
    // 实现分页加载
    if (!this.finished) {
      this.getTransationList()
    }
  },
  onShow() {
    this.formObj.pageIndex = 1
    this.getTransationList()
  },
  methods: {
    // 搜索框发生变化
    change(val) {
      this.formObj.searchKey = val
      const paramsObj = {
        ...this.formObj,
        pageIndex: 0,
        pageSize: 0
      }
      this.loading = true
      list.request(paramsObj).then(res => {
        this.loading = false
        this.transationList = res.data.list
        this.total = res.data.total
      })
    },
    getTransationList() {
      this.loading = true
      list.request(this.formObj).then(res => {
        this.loading = false
        // 分页加载
        if (this.formObj.pageIndex === 1) {
          // this.changeTransationList(res.data.list)
          this.transationList = res.data.list
        } else if (res.data.list && res.data.list.length) {
          // this.changeTransationList(res.data.list)
          ;(this.transationList as any).push(...res.data.list)
        }
        if (res.data.total === this.transationList?.length) {
          this.finished = true
        } else {
          this.formObj.pageIndex++
        }
        this.total = res.data.total
      })
    },
    mobileClick() {
      ;(this.$refs.mobileVerify as any).showSheet()
    },
    // 跳转订单详情
    clickTransation(item) {
      if (item.courseType === 1) {
        uni.navigateTo({
          url: `/pages/business/trade/components/detailTransation/index?id=${item.id}`
        })
      } else {
        uni.navigateTo({
          url: `/pages/business/trade/components/detailTransationListenTest/index?id=${item.id}`
        })
      }
    }
  }
})
</script>
<style lang="less" scoped>
.list-content {
  padding: 0 32rpx;
  margin-bottom: 16rpx;
}
.list-transation {
  padding-bottom: 120rpx;
  // height: 526rpx;
  overflow: auto;
}
.partner-list {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx 0 32rpx 32rpx;
  .list-center,
  .list-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-right: 32rpx;
    &-text {
      font-size: 32rpx;
      font-weight: 500;
      color: #222222;
      line-height: 44rpx;
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
    font-size: 24rpx;
    font-weight: 400;
    color: #666666;
    line-height: 32rpx;
    margin: 4rpx 0 32rpx;
    padding-right: 32rpx;
  }
  .list-bottom {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #888888;
    padding-right: 32rpx;
    &-test {
      margin-top: 8rpx;
    }
  }
}
.be-half {
  height: 1rpx;
  width: 100%;
  background: #eeeeee;
  transform: scale(1, 0.5);
  margin-bottom: 16rpx;
}
</style>
