<template>
  <div>
    <van-popup :close-on-click-overlay="false" :show="true" round>
      <div class="popup-card">
        <div class="card-content">
          <img
            src=" https://production-sam.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads1639385533000e1a573.png"
            alt=""
            class="bg-image"
          />
        </div>
        <div class="card-bottom">
          {{ state }}
          <!-- <div class="close" @click="onClose">取消</div> -->
          <!-- <button class="share" @click="onShare" open-type="share">
            确定分享
          </button> -->
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  onLoad(option: any) {
    this.state = decodeURIComponent(option.url)
    console.log(option)
  },
  data() {
    return {
      isShared: false,
      state: ''
    }
  },
  methods: {
    onShare() {
      this.isShared = true
    }
  }
})
</script>
<style lang="less" scoped>
.card-bottom {
  width: 500rpx;
  word-break: break-all;
}
</style>