<template>
  <div class="introduce">
    <div class="introduce-title">校区介绍</div>
    <div
      v-for="item in curAttachments"
      :key="item.attachmentId"
      class="introduce-item"
    >
      <div v-if="item.attachmentType === 3">{{ item.text }}</div>
      <div v-if="item.attachmentType === 1">
        <img :src="item.text" mode="widthFix" alt="" class="img" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Introduce',
  props: {
    attachments: {
      type: Array,
      default: []
    }
  },
  data() {
    return { curAttachments: [] }
  },
  watch: {
    attachments(newV, oldV) {
      console.log(newV, 'new')
      this.curAttachments = newV
      console.log(this.curAttachments)
    }
  }
})
</script>
<style lang="less" scoped>
.introduce {
  background: #fff;
  padding: 20rpx 32rpx;
  margin-top: 16rpx;
}
.introduce-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 48rpx;
}
.introduce-item {
  margin-top: 48rpx;
}
.img {
  width: 100%;
}
</style>