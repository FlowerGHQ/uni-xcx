<template>
  <div
    class="submit-button"
    :class="['submit-button-' + size, disabled ? 'disabled' : '']"
    :style="{ width: width + 'rpx' }"
    @click="track"
  >
    <slot />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  @Prop({ default: 'large' })
  size: 'large' | 'normal' | 'small'
  @Prop({ default: 400 })
  width: number
  @Prop()
  disabled: boolean
  @Emit('submit')
  track() {}
}
</script>
<style lang="less" scoped>
.submit-button {
  display: inline-block;
  text-align: center;
  background: linear-gradient(
    270deg,
    rgba(253, 96, 63, 1) 0%,
    rgba(253, 146, 98, 1) 100%
  );
  border-radius: 50rpx;
  width: 670rpx;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
  &-large {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 32rpx;
    font-weight: 600;
  }
  &-normal {
    height: 80rpx;
    line-height: 80rpx;
    font-size: 32rpx;
    font-weight: 600;
  }
  &-small {
    height: 56rpx;
    line-height: 56rpx;
    font-size: 28rpx;
  }
  &.disabled {
    background: linear-gradient(
      270deg,
      rgba(253, 96, 63, 0.5) 0%,
      rgba(253, 146, 98, 0.5) 100%
    );
  }
}
</style>
