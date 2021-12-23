<template>
  <div class="middle">
    <div class="tag-top flex space-between">
      <div class="left-top font-24">
        {{
          `${dayjs(formTime.startTime).format('YYYY年MM月DD')}~${dayjs(
            formTime.endTime
          ).format('YYYY年MM月DD')}`
        }}
      </div>
      <tag-small
        :listUpAndDown="listUpAndDown"
        className="tag-name"
        :active="active"
        @onUpAndDown="onUpAndDown"
      ></tag-small>
    </div>
    <scroll-view
      scroll-x="true"
      @scroll="scroll"
      class="scroll"
      scroll-left="0"
      :scroll-with-animation="true"
    >
      <div class="view-all flex">
        <div v-for="item in listBottom" :key="item.id">
          <scrollitemBottom
            :tagObj="item"
            :class="className"
            @click.native="clickItem(item.type)"
          ></scrollitemBottom>
          <!-- <div  :class="item.className">你好呀</div> -->
        </div>
      </div>
    </scroll-view>
    <van-calendar
      :show="showCalendar"
      @confirm="onConfirm"
      @close="onClose"
      type="range"
      title="自定义时间范围"
      color="#F86744"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>
<script lang="ts">
import TagSmall from '@/components/tag-small/index.vue'
import Vue from 'vue'
import scrollItem from '@/pages/home/components/scrollMiddle/scrollItem.vue'
import dayjs from 'dayjs'
import { API } from '@/models/api'
// import {
//   campusHistoryData,
//   campusPeriodData
// } from '@/pont/partnersSBusiness/mods/statistic/index'
import selectCalendar from '@/components/select-calendar.vue'
import scrollitemBottom from '@/pages/home/components/scrollMiddle/scrollitemBottom.vue'

export default Vue.extend({
  name: 'HomeList',
  components: { TagSmall, selectCalendar, scrollItem, scrollitemBottom },
  data() {
    return {
      dayjs,
      active: 1,
      formTime: {
        endTime: '',
        startTime: ''
      },
      minDate: new Date(2021, 0, 1).getTime(),
      maxDate: new Date().getTime(),
      listUpAndDown: [
        {
          key: 1,
          name: '本月'
        },
        {
          key: 2,
          name: '上月'
        },
        {
          key: 3,
          name: '自定义'
        }
      ],
      // 上面的列表
      list: [
        {
          id: 1,
          name: '历史客源数(个）',
          type: 'customer',
          className: 'red',
          totalNumber: '',
          addNumber: '',
          refundNumber: '',
          totalUnit: ''
        },
        {
          id: 2,
          name: '历史交易数(笔）',
          type: 'transationCount',
          className: 'blue',
          totalNumber: '',
          addNumber: '',
          refundNumber: '',
          typeName: '退款',
          totalUnit: ''
        },
        {
          id: 3,
          name: '历史交易金额',
          type: 'transationAmount',
          className: 'black',
          totalNumber: '',
          addNumber: '',
          refundNumber: '',
          typeName: '退款',
          totalUnit: ''
        }
      ],
      // 下面的列表
      listBottom: [
        {
          id: 4,
          name: '历史客源数(个）',
          className: 'white',
          type: 'customer',
          totalNumber: '',
          addNumber: '',
          refundNumber: '',
          totalUnit: ''
        },
        {
          id: 5,
          name: '历史交易笔数(笔)',
          type: 'transationCount',
          className: 'white',
          totalNumber: '',
          addNumber: '',
          refundNumber: '',
          typeName: '退款',
          totalUnit: ''
        },
        {
          id: 6,
          name: '',
          type: 'rewardAmount',
          className: 'white',
          totalNumber: '',
          addNumber: '',
          refundNumber: '',
          typeName: '减少',
          totalUnit: ''
        }
      ],
      showCalendar: false
    }
  },
  methods: {
    scroll() {},
    // 点击跳转
    clickItem(type) {
      console.log(type)
      switch (type) {
        case 'customer':
          uni.navigateTo({
            url: '/pages/business/customer/index'
          })
          break
        case 'transationCount':
          uni.navigateTo({
            url: '/pages/business/trade/index'
          })
          break
        case 'rewardAmount':
          uni.navigateTo({
            url: '/pages/business/reward/index'
          })
          break
      }
    },
    async onUpAndDown(key) {
      switch (key) {
        // 本月
        case 1:
          this.formTime.startTime = dayjs()
            .startOf('month')
            .format('YYYY-MM-DD 00:00:00')
          this.formTime.endTime = dayjs()
            .endOf('month')
            .format('YYYY-MM-DD 23:59:59')
          break
        // 上月
        case 2:
          this.formTime.startTime = dayjs(new Date())
            .subtract(1, 'months')
            .startOf('month')
            .format('YYYY-MM-DD 00:00:00')
          this.formTime.endTime = dayjs(new Date())
            .subtract(1, 'months')
            .endOf('month')
            .format('YYYY-MM-DD 23:59:59')
          break
        // 自定义
        case 3:
          this.showCalendar = true
          break
      }
      // 新增和到期
      await API.partnersSBusiness.statistic.shareHolderPeriodData
        .request(this.formTime)
        .then(res => {
          this.getNumberChange(res)
        })
      this.active = key
    },
    async onConfirm(val) {
      this.formTime.startTime = dayjs(val.detail[0]).format(
        'YYYY-MM-DD 00:00:00'
      )
      this.formTime.endTime = dayjs(val.detail[1]).format('YYYY-MM-DD 23:59:59')
      this.showCalendar = false
      await API.partnersSBusiness.statistic.shareHolderPeriodData
        .request(this.formTime)
        .then(res => {
          this.getNumberChange(res)
        })
    },
    // 添加属性主要为了好循环
    getNumberChange(res) {
      if (res.data) {
        this.listBottom.forEach(item => {
          if (item.id === 4) {
            item.addNumber = res.data.increaseCustomerCount || 0
          }
          if (item.id === 5) {
            item.addNumber = res.data.increaseTransactionCount || 0
            item.refundNumber = res.data.refundTransactionCount || 0
          }
          if (item.id === 6) {
            item.addNumber = `${res.data.increaseRewardAmount}${res.data.increaseRewardAmountUnit}`
            item.refundNumber = `${res.data.refundRewardAmount}${res.data.refundRewardAmountUnit}`
          }
        })
      }
    },
    onClose() {
      this.showCalendar = false
    },
    async getCampuHistory() {
      await API.partnersSBusiness.statistic.shareHolderHistoryData
        .request({})
        .then(res => {
          if (res.data) {
            this.list.forEach(item => {
              if (item.id === 1) {
                item.totalNumber = res.data.totalCustomerCount
              }
              if (item.id === 2) {
                item.totalNumber = `${res.data.totalTransactionCount}`
              }
              if (item.id === 3) {
                item.totalUnit = res.data.totalTransactionAmountUnit
                item.totalNumber = `${res.data.totalTransactionAmount}`
                item.name = `历史交易金额(${res.data.totalTransactionAmountUnit})`
              }
            })
            this.listBottom.forEach(item => {
              if (item.id === 4) {
                item.totalNumber = res.data.totalCustomerCount
              }
              if (item.id === 5) {
                item.totalNumber = res.data.totalTransactionCount
              }
              if (item.id === 6) {
                item.name = `历史奖励金额(${res.data.totalRewardAmountUnit})`
                item.totalUnit = res.data.totalRewardAmountUnit
                item.totalNumber = res.data.totalRewardAmount
              }
            })
          }
        })
    }
  },
  async onLoad() {
    // // 按校区统计历史数据
    await this.getCampuHistory()
    // // 按校区统计周期数据
    await this.onUpAndDown(1)
  }
})
</script>
<style lang="less" src="./index.less"></style>
