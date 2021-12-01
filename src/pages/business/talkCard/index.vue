<template>
  <div class="talk-card-list">
    <Card
      class="talk-card"
      :item="item"
      v-for="item in curList"
      :key="item.id"
    />
    <Empty v-if="!curList.length"></Empty>
  </div>
</template>

<script>
import Vue from 'vue'
import Card from './components/card.vue'
import Empty from '@/components/empty.vue'
import { API } from '@/models/api'

export default Vue.extend({
  name: 'TalkList',
  components: { Card, Empty },
  data() {
    return { curList: [] }
  },
  async onLoad() {
    const data = await API.partnersSBusiness.memberCard.list.request({
      pageIndex: 1,
      pageSize: 1000,
      state: true
    })
    console.log(data)
    this.curList = data.data.list
  }
})
</script>

<style lang="less" scoped>
.talk-card-list {
  padding: 16rpx 32rpx;
  display: flex;
  flex-direction: column;
}
.talk-card {
  margin-bottom: 16rpx;
}
</style>