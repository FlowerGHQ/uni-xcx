<template>
  <div class="func-button-list">
    <CommonButton
      :error="error"
      v-for="(item, index) in ButtonList"
      :key="item.type"
      :text="item.title"
      :class="(index + 1) % 4 === 0 ? 'mr0' : 'mr50'"
      :image="item.imageStyle"
      :openUrl="item.openUrl"
    />
  </div>
</template>
<script lang="ts">
import CommonButton from './common-button.vue'
import { ButtonList } from './constant'
import Vue from 'vue'

export default Vue.extend({
  name: 'AddList',
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  components: { CommonButton },
  data() {
    return {
      ButtonList
    }
  },
  methods: {}
})
</script>

<style lang="less" scoped>
.func-button-list {
  display: flex;
  flex-wrap: wrap;
  :nth-child(n + 5) {
    margin-top: 40rpx;
  }
}

.mr50 {
  margin-right: 50rpx;
}
.mr0 {
  margin-right: 0;
}
</style>
