<template>
  <van-sticky>
    <van-search
      shape="round"
      :value="value"
      :clearable="clearable"
      :placeholder="placeholder"
      placeholder-style="cccccc"
      @search="onSearch"
      @change="onChange"
      @cancel="onCancel"
    />
  </van-sticky>
</template>
<script lang="ts">
import Vue from 'vue'
import { debounce } from 'lodash'
export default Vue.extend({
  name: 'HeaderSearch',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {
    onSearch(val) {
      this.$emit('search', val.detail)
    },
    onCancel(val) {
      this.$emit('cancel')
    },
    onChange(val) {
      // debounce(val => {
      this.$emit('change', val.detail)
      // }, 1000)(val)
    }
  }
})
</script>
<style lang="less" scoped>
:root {
  --van-search-left-icon-color: var(--van-gray-1);
}
/deep/.van-icon-search:before {
  color: #cccccc;
  font-weight: 700;
}
/deep/input::-webkit-input-placeholder {
  color: #cccccc;
}
</style>
