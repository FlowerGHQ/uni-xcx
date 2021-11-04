<template>
  <div class="empty">
    <div class="empty-image"></div>
    <div class="empty-text">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: '无数据' })
  text: string
}
</script>

<style lang="less" scoped>
.empty {
  .empty-image {
    width: 300rpx;
    height: 300rpx;
    margin: 0 auto;
    background-color: transparent;
    background-position: center;
    background-size: contain;
    background-image: url('../assets/images/empty-box.png');
  }
  .empty-text {
    max-width: 400rpx;
    margin: 24rpx auto 0 auto;
    font-size: 28rpx;
    color: #8c8c8c;
    text-align: center;
    word-break: break-word;
  }
}
</style>
