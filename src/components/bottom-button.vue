<template>
  <div class="bottom-button">
    <div class="yu-view" v-if="!viewLoading" @click="viewClick">
      {{ view }}
    </div>
    <div class="yu-view" v-else>
      <van-loading type="spinner" size="32rpx" color="#fff"></van-loading>
    </div>
    <div class="save-list" v-if="!saveLoading" @click="saveClick">
      {{ save }}
    </div>
    <div class="save-list" v-else>
      <van-loading type="spinner" size="32rpx" color="#fff"
        ><span style="color: #fff">保存中...</span></van-loading
      >
    </div>
  </div>
</template>

<script>
// 交易管理 权益管理底部按钮组件
import Vue from 'vue'
export default Vue.extend({
  name: '',
  props: {
    view: {
      type: String,
      default: '效果预览'
    },
    save: {
      type: String,
      default: '保存'
    },
    viewLoading: {
      type: Boolean,
      default: false
    },
    saveLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    viewClick() {
      this.$emit('viewClick')
    },
    saveClick() {
      this.$emit('saveClick')
    }
  }
})
</script>

<style scoped lang="less">
.bottom-button {
  z-index: 99;
  display: flex;
  padding: 16rpx 64rpx;
  // justify-content: space-around;
  // align-items: center;
  width: 100%;
  height: calc(112rpx + var(--safe-area-inset-bottom));
  background-color: #fff;
  position: fixed;
  bottom: 0;
  .yu-view,
  .save-list,
  .van-button--normal {
    width: 294rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    background: #f86744;
    border-radius: 40rpx;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border: 1px solid #f86744;
    color: #fff;
  }
  .yu-view {
    margin-right: 32rpx;
    background: #fff;
    color: #f86744;
  }
}
</style>
