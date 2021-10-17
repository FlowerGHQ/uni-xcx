<template>
  <div>
    <div class="base-title">您的账号加入了{{ mockList.length }}个校区</div>
    <div class="content">
      <div v-for="item in mockList" :key="item.campusId" class="base-list">
        <div :class="{ 'list-item': true, 'freeze-item': item.state === 0 }">
          <span>{{ item.name }}</span>
          <span v-if="item.state === 0">（已冻结）</span>
          <div v-if="item.isDefault" class="school-checked">当前校区</div>
        </div>

        <div v-if="item.isDefault">√</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { API } from '@/models/api'

@Component
export default class extends Vue {
  mockList = [
    {
      campusId: 12580,
      isDefault: true,
      merchantId: 13213131,
      name: '校区列表',
      state: 0
    },
    {
      campusId: 125801,
      isDefault: false,
      merchantId: 13213131,
      name: '校区列表1',
      state: 0
    },
    {
      campusId: 125802,
      isDefault: false,
      merchantId: 13213131,
      name: '校区列表2',
      state: 1
    },
    {
      campusId: 125803,
      isDefault: false,
      merchantId: 13213131,
      name: '校区列表3',
      state: 0
    }
  ]
  openNext() {
    // const res = API.partnersBBusiness.campus.list.request({})
  }
}
</script>
<style lang="less" scoped>
.content {
  padding-left: 32rpx;
  background-color: #fff;
}
.base-list {
  padding: 20rpx 32rpx 20rpx 0rpx;
  line-height: 44rpx;
  border-bottom: 0.5px solid #eeeeee;
  display: flex;
  justify-content: space-between;
}
.list-item {
  font-size: 32rpx;
  font-weight: 400;
  color: #222222;
  display: flex;
  align-items: center;
}
.freeze-item {
  color: #cccccc;
}
.school-checked {
  width: 128rpx;
  background: #fff5f3;
  border-radius: 18rpx;
  font-size: 24rpx;
  font-weight: 300;
  color: #f86744;
  text-align: center;
}
</style>
