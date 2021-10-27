<template>
  <div>
    <div class="base-title">您的账号加入了{{ partnerList.length }}个校区</div>
    <div class="content">
      <div
        v-for="item in partnerList"
        :key="item.campusId"
        class="base-list"
        @click="changeSchool(item.campusId)"
      >
        <div :class="{ 'list-item': true, 'freeze-item': item.state === 0 }">
          <span>{{ item.name }}</span>
          <span v-if="item.state === 0">（已冻结）</span>
          <div v-if="item.isDefault" class="school-checked">当前校区</div>
        </div>
        <img
          v-if="item.isDefault"
          src="../../../assets/images/checked.png"
          class="icon-checked"
        />
      </div>
    </div>
    <!-- <van-dialog id="van-dialog" /> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { API } from '@/models/api'

export default Vue.extend({
  name: 'AddList',
  data() {
    return {
      partnerList: [] as any,
      totalCount: 0
    }
  },
  onLoad(option) {
    this.init()
  },
  methods: {
    async init() {
      const res = await API.partnersSBusiness.campus.list.request({})
      this.partnerList = res.data
      console.log(res)
    },
    // async changeSchool(campusId: number) {
    //   const res = await API.partnersBBusiness.campus.list.request({})
    //   try {
    //     const res = await API.partnersBBusiness.campus.updateDefault.request({
    //       campusId
    //     })
    //     this.init()
    //   } catch (error) {}
    // }
  }
})
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
  align-items: center;
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
  margin-left: 16rpx;
}
.icon-checked {
  width: 32rpx;
  height: 32rpx;
}
</style>
