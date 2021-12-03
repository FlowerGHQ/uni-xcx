<template>
  <div>
    <div class="detail-page" :class="{ 'no-top-m': refundTransactionTime }">
      <div class="top-detail">
        <div class="round">
          <img :src="img" alt="" />
          <div class="top-bottom">收款成功</div>
        </div>
      </div>
      <div
        class="detail-text"
        v-for="(item, key) in orderFormListObjKey"
        :style="{
          'margin-bottom': [
            'customerPhone',
            'transactionTime',
            'courseName'
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
// src/pont/partnersBBusiness/mods/transaction/index.ts
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
        // 记得上一个也要加课程类型
        courseTypeName: '课程类型',
        courseName: '课程名称',
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
        this.orderFormListObj.courseTypeName =
          res.data.courseType === 1 ? '正式课' : '试听课'
      })
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
  color: #ff3333;
}
</style>
