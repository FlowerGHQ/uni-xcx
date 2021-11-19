<template>
  <div>
    <scroll-view
      class="content-history"
      :scroll-y="true"
      v-if="list.length"
      @scrolltolower="lowerScroll"
    >
      <div
        class="base-card mar-t-16"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="time">修改时间：{{ item.createdAt }}</div>
        <div class="flex-column" v-for="(v, k) in formValue" :key="k">
          <div class="flex contract-list" v-if="item[k]">
            <div class="title">{{ v }}</div>
            <div class="content" v-html="item[k]"></div>
          </div>
        </div>
      </div>
    </scroll-view>
    <page-loading v-show="loading"></page-loading>
    <Empty v-if="!list.length && !loading"></Empty>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import PageLoading from '@/components/page-loading.vue'
import Empty from '@/components/empty.vue'
import { historicalList } from '@/pont/partnersSBusiness/mods/contract/index'

export default Vue.extend({
  name: '',
  components: { PageLoading, Empty },
  props: {},
  onLoad(option: any) {
    this.getHistoryList()
  },
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      formValue: {
        storedAmount: '储值金额',
        commissionRate: '提成比例',
        startTime: '合约起始时间',
        endTime: '合约结束时间',
        remark: '备注'
      },
      list: [] as any,
      loading: false,
      finished: false
    }
  },
  methods: {
    getHistoryList() {
      this.loading = true
      historicalList.request(this.params).then(res => {
        this.loading = false
        // 切换分页参照简单
        if (this.params.pageIndex === 1 && res.data.list === null) {
          this.list = []
        } else if (this.params.pageIndex === 1) {
          res.data.list.forEach(element => {
            element.commissionRate = `<span class="number-font">${element.commissionRate}</span><span class="font-32">%</span>`
            element.storedAmount = `<span class="font-24"> ¥ <span><span class="number-font">${element.storedAmount}</span>`
          })
          this.list = [...res.data.list]
        } else {
          if (this.list && this.list.length && res.data.list) {
            res.data.list.forEach(element => {
              element.commissionRate = `<span class="number-font">${element.commissionRate}</span><span class="font-32">%</span>`
              element.storedAmount = `<span class="font-24"> ¥ <span><span class="number-font">${element.storedAmount}</span>`
            })
            this.list.push(...res.data.list)
          }
        }
        if (this.list.length === res.data.total) {
          this.finished = true
        } else {
          this.params.pageIndex++
        }
      })
    },
    lowerScroll() {
      if (!this.finished) {
        this.getHistoryList()
      }
    }
  },
  created() {}
})
</script>
<style lang="less" src="./index.less"></style>
