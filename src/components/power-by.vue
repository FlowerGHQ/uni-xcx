<template>
  <div class="powerby" :style="{ color: color }">Powered by 校宝赛事宝</div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ default: 'rgba(0,0,0,0.6)' })
  color: string
}
</script>
<style lang="less" scoped>
.powerby {
  padding: 90rpx 0;
  text-align: center;
  font-size: 24rpx;
}
</style>
