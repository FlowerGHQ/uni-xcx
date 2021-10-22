<template>
  <div class="talk-card-list">
    <Card class="talk-card" />
    <Card class="talk-card" />
    <Card class="talk-card" />
    <Card class="talk-card" />
  </div>
</template>

<script>
import Vue from 'vue'
import Card from './components/card.vue'

export default Vue.extend({
  name: 'TalkList',
  components: { Card }
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