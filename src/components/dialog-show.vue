<template>
  <div>
    <van-dialog
      class="dialog-shelf"
      use-slot
      :title="title"
      :show="show"
      :show-cancel-button="showCancelButton"
      @close="onClose"
      @cancel="onCancel"
      @confirm="onConfirm"
      :confirm-button-color="confirmButtonColor"
      :cancel-button-color="cancelButtonColor"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
    >
      <div class="text-box">{{ content }}</div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: '',

  props: {
    title: {
      type: String,
      default: '标题'
    },
    show: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    cancelButtonColor: {
      type: String,
      default: '#666666'
    },
    confirmButtonColor: {
      type: String,
      default: '#0066FF'
    },
    showCancelButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },

  methods: {
    // 确认按钮
    onConfirm() {
      this.$emit('onConfirm')
    },
    // 关闭按钮的事件
    onClose() {
      this.$emit('onClose')
    },
    // 取消按钮的事件
    onCancel() {
      this.$emit('onCancel')
    }
  }
})
</script>

<style scoped lang="less">
.dialog-shelf {
  width: 662rpx;
  height: 260rpx;
}
.text-box {
  padding: 16rpx 48rpx 32rpx 48rpx;
  height: auto;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #888888;
}
</style>
