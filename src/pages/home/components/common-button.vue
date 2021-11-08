<template>
  <div class="common" @click="!error ? openList() : null">
    <div class="common-image" :class="image"></div>
    <div class="common-text">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AddList',
  props: {
    openUrl: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },

  methods: {
    openList() {
      console.log(11, this.openUrl)
      uni.navigateTo({
        url: this.openUrl
      })
    }
  }
})
</script>

<style lang="less" scoped>
.common {
  width: 120rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  .common-image {
    width: 96rpx;
    height: 96rpx;
    background-color: transparent;
    background-position: center;
    background-size: contain;
    margin-bottom: 16rpx;
    background-size: 96rpx 96rpx;
    border-radius: 50%;
  }
  .common-text {
    font-size: 24rpx;
    color: #8c8c8c;
    text-align: center;
    word-break: break-word;
  }
}
.book {
  background-image: url('../../../assets/images/book.png');
}
.set {
  background-image: url('../../../assets/images/set.png');
}
.reward {
  background-image: url('../../../assets/images/reward.png');
}
.wallet {
  background-image: url('../../../assets/images/wallet.png');
}
.contract {
  background-image: url('../../../assets/images/contract.png');
}
.money {
  background-image: url('../../../assets/images/save-money.png');
}
</style>
