<template>
  <div>
    <!-- 退款明细 -->
    <div class="base-title">退款明细</div>
    <div
      class="refound-content border-bottom"
      v-for="item in list"
      :key="item.id"
    >
      <div class="top flex-between font-weight-500 mar-b-16">
        <div class="name">退款</div>
        <div class="refound-amount">{{ item.refoundAmount }}</div>
      </div>
      <div
        class="middle clor-gray-6 font-24 flex-between"
        :class="!item.iscancel ? 'mar-b-8' : ''"
      >
        退款方式：{{ item.refoundWay }}
        <Tag v-if="item.iscancel" text="已作废"></Tag>
      </div>
      <div class="bottom clor-gray-6 font-24 mar-b-8">
        退款时间：{{ item.refoundTime }}
      </div>
      <!-- 作废添加作废时间和标签 -->
      <!-- 作废时间：2021-10-17 10:00 -->
      <div class="bottom clor-gray-6 font-24" v-if="item.iscancel">
        作废时间：{{ item.refoundTime }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Tag from '@/components/tag.vue'

export default Vue.extend({
  name: 'refoundList',
  components: { Tag },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  onLoad(option: any) {},
  methods: {}
})
</script>

<style lang="less" scoped>
@color: #222222;
@color-gray-6: #888888;
@font-weight-500: 500;
.refound-content {
  padding: 32rpx;
  box-sizing: border-box;
  background-color: #fff;
}
.border-bottom {
  border-bottom: 1px solid #ecedf4;
}
.font-weight-500 {
  font-weight: @font-weight-500;
}
.color-two {
  color: @color;
}
.clor-gray-6 {
  color: @color-gray-6;
}
</style>
