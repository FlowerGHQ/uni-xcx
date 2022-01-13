<template>
  <div class="content-amount">
    <!-- 根据状态展示 -->
    <van-notice-bar
      v-if="
        orderFormListObj.state === 1 ||
        orderFormListObj.type === 2 ||
        orderFormListObj.type === 3
      "
      :background="backgroundNoticeColor"
    >
      <template>
        <div class="refund-center" :style="{ color: colorNotice }">
          {{ noticeMessage }}
          <!-- {{ refundTransactionTime }} 此订单退款成功 -->
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
            'realAmount',
            'transactionTime'
          ].includes(key)
            ? '32rpx'
            : '16rpx'
        }"
        :key="key"
      >
        <div class="all flex-between" v-if="orderFormListObj[key]">
          <span class="gray-text">{{ orderFormListObjKey[key] }}</span>
          <span class="black-text">{{ orderFormListObj[key] }}</span>
        </div>
      </div>

      <page-loading v-show="detailLoading"></page-loading>
    </div>
    <!-- 退款明细 -->
    <!-- 没有退款明细的话不显示 -->
    <RefoundList :list="refoundList" v-if="refoundList.length"></RefoundList>
  </div>
</template>

<script lang="ts">
// src/pont/partnersSBusiness/mods/transaction/index.ts
import { detail } from '@/pont/partnersSBusiness/mods/transaction'
import PageLoading from '@/components/page-loading.vue'
import Vue from 'vue'
import dayjs from 'dayjs'
import { notice } from '@/pages/business/trade/components/detailTransation/enum/noticeList'
// 退款列表
import RefoundList from '@/pages/business/trade/components/detailTransation/refoundList/refoundList.vue'
import { getRefundList } from '@/pont/partnersSBusiness/mods/transaction/index'
// 根据不同订单类型输出
const MASSAGE_NAME = {
  2: '此订单产生全额退款',
  3: '此订单产生部分退款',
  1: '此订单已作废'
}
const MASSAGE_COLOR = {
  2: '#FFE6E6',
  3: '#FFF5E6',
  1: '#888888'
}
const MASSAGE_TEST = {
  2: '#FF3333',
  3: '#FF9900',
  1: '#FFFFFF'
}
export default Vue.extend({
  name: 'DetailTransation',
  components: { PageLoading, RefoundList },
  data() {
    return {
      // 退款抽屉
      showSheet: false,
      // 退款notice
      backgroundNoticeColor: '',
      colorNotice: '',
      typeBg: '2',
      noticeMessage: '',
      refoundList: [],
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
        courseTypeName: '课程类型',
        courseName: '课程名称',
        originalAmount: '课程原价',
        useCouponAmount: '满减券',
        extraDiscountAmount: '额外优惠金额',
        // 加两个字段
        realAmount: '实际支付金额',
        payMethodType: '支付方式',
        transactionNo: '订单编号',
        // 加两个字段
        // 根据是否有外部订单动态增加该属性
        externalOrderNumber: '外部订单编号',
        transactionTime: '交易时间',
        shareholderName: '关联合作人'
      }
    }
  },
  onLoad(option: any) {
    if (!option.id) return
    this.transactionId = option.id
    this.getDetailList(option.id)
    this.getRefundDetailList(option.id)
  },
  methods: {
    // 获取退款列表
    getRefundDetailList(id) {
      getRefundList
        .request({ originalTransactionId: id })
        .then(res => {
          this.refoundList = Object.assign([], res.data.list)
        })
        .catch(error => {
          this.$toast(error.errorMessage)
        })
    },
    getDetailList(id) {
      this.detailLoading = true
      detail.request({ id: id }).then(res => {
        this.detailLoading = false
        this.orderFormListObj = Object.assign({}, res.data)
        this.refundTransactionTime = res.data.refundTransactionTime
        // 看返回的信息如何显示顶部信息栏
        // 部分退款和全部退款判断
        switch (res.data.type) {
          case notice.TYPE_ALL:
            this.noticeMessage = MASSAGE_NAME[notice.TYPE_ALL]
            this.backgroundNoticeColor = MASSAGE_COLOR[notice.TYPE_ALL]
            this.colorNotice = MASSAGE_TEST[notice.TYPE_ALL]
            break
          case notice.TYPE_PART:
            this.noticeMessage = MASSAGE_NAME[notice.TYPE_PART]
            this.backgroundNoticeColor = MASSAGE_COLOR[notice.TYPE_PART]
            this.colorNotice = MASSAGE_TEST[notice.TYPE_PART]
            break
          default:
            break
        }
        // 已作废判断
        switch (res.data.state) {
          case notice.TYPE_CANCEL:
            this.noticeMessage = `${dayjs(res.data.invalidTime).format(
              'YYYY-MM-DD HH:mm'
            )}  ${MASSAGE_NAME[notice.TYPE_CANCEL]}`
            this.backgroundNoticeColor = MASSAGE_COLOR[notice.TYPE_CANCEL]
            this.colorNotice = MASSAGE_TEST[notice.TYPE_CANCEL]
            break
        }
        this.addUnit(res.data)
        // this.orderFormListObj.useCouponAmount = `${this.orderFormListObj.useCouponAmount}元`
        // this.orderFormListObj.originalAmount = `${res.data.originalAmount}元`
        // this.orderFormListObj.extraDiscountAmount = `${res.data.extraDiscountAmount}元`
        this.orderFormListObj.courseType =
          res.data.courseType === 1 ? '正式课' : '试听课'
      })
    },
    // 是否添加单位元
    addUnit(dataList) {
      // 动态增加单位
      const listUnit = [
        'useCouponAmount',
        'originalAmount',
        'extraDiscountAmount',
        'realAmount'
      ]
      // 循环
      for (let j of listUnit) {
        this.orderFormListObj[j] = `${dataList[j]}元`
      }
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
  color: #ff3333;
}
.content-amount {
  padding-bottom: calc(64rpx + var(--safe-area-inset-bottom));
}
</style>
