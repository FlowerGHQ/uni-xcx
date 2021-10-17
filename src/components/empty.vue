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
  padding-top: 112px;
  .empty-image {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    background-color: transparent;
    background-position: center;
    background-size: contain;
    background-image: url('https://cdn.xiaobaoxiu.cn/xbshow/XcxImages/Common/empty-bg.png');
  }
  .empty-text {
    max-width: 200px;
    margin: 12px auto 0 auto;
    font-size: 14px;
    color: #8c8c8c;
    text-align: center;
    word-break: break-word;
  }
}
</style>
