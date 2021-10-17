<template>
  <van-loading custom-class="common-page-loading" />
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class extends Vue {}
</script>
<style lang="less">
.common-page-loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
