<template>
  <div>
    <van-notice-bar v-if="refundTransactionTime" background="#FFE6E6">
      <template>
        <div class="refund-center">
          {{ refundTransactionTime }} 此订单退款成功
        </div>
      </template>
    </van-notice-bar>
    <div class="detail-page" :class="{ 'no-top-m': refundTransactionTime }">
      <div class="top-detail">
        <div class="round">
          <img :src="img" alt="" />
          <div class="incom">
            <span class="font-24">¥</span>
            <span class="number">{{
              orderFormListObj.realAmount ? orderFormListObj.realAmount : '-'
            }}</span>
          </div>
          <div class="top-bottom" v-if="orderFormListObj.hasRefund">
            退款成功
          </div>
          <div class="top-bottom" v-else>收款成功</div>
        </div>
      </div>
      <div
        class="detail-text"
        v-for="(item, key) in orderFormListObjKey"
        :style="{
          'margin-bottom': [
            'customerPhone',
            'extraDiscountAmount',
            'transactionTime'
          ].includes(key)
            ? '32rpx'
            : '16rpx'
        }"
        :key="key"
      >
        <span class="gray-text">{{ orderFormListObjKey[key] }}</span>
        <span class="black-text">{{
          orderFormListObj[key] ? orderFormListObj[key] : '-'
        }}</span>
      </div>

      <page-loading v-show="detailLoading"></page-loading>
    </div>
  </div>
</template>

<script lang="ts">
// src/pont/partnersSBusiness/mods/transaction/index.ts
import { detail } from '@/pont/partnersSBusiness/mods/transaction'
import PageLoading from '@/components/page-loading.vue'
import Vue from 'vue'
import dayjs from 'dayjs'
export default Vue.extend({
  name: 'DetailTransation',
  components: { PageLoading },
  data() {
    return {
      showDialog: false,
      showNotify: false,
      detailLoading: false,
      dayjs,
      transactionId: '',
      refundTransactionTime: '',
      img: require('@/assets/images/shape.png'),
      orderFormListObj: {} as any,
      orderFormListObjKey: {
        customerName: '消费者姓名',
        customerPhone: '手机号',
        courseName: '购买课程',
        originalAmount: '课程原价',
        useCouponAmount: '满减券',
        extraDiscountAmount: '额外优惠金额',
        payMethodType: '支付方式',
        transactionNo: '订单编号',
        transactionTime: '交易时间',
        shareholderName: '关联合作人'
      }
    }
  },
  onLoad(option: any) {
    if (!option.id) return
    this.transactionId = option.id
    this.getDetailList(option.id)
  },
  methods: {
    getDetailList(id) {
      this.detailLoading = true
      detail.request({ id: id }).then(res => {
        this.detailLoading = false
        this.orderFormListObj = Object.assign({}, res.data)
        this.refundTransactionTime = res.data.refundTransactionTime
        this.orderFormListObj.useCouponAmount = `${this.orderFormListObj.useCouponAmount}元`
        this.orderFormListObj.originalAmount = `${res.data.originalAmount}元`
        this.orderFormListObj.extraDiscountAmount = `${res.data.extraDiscountAmount}元`
      })
    },
    refundClick() {
      this.showDialog = true
    },
    onConfirm() {
      // this.showNotify = true
      this.showDialog = false
    }
  }
})
</script>

<style lang="less" src="./index.less"></style>
<style lang="less" scoped>
.no-top-m {
  margin-top: 0;
}
.mg-16 {
  margin-bottom: 32rpx;
}
.refund-center {
  text-align: center;
  color: #FF3333;
}
</style>
