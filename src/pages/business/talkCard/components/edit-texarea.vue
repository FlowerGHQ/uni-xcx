<template>
  <div>
    <div class="content">
      <div class="top">
        <div class="title">请填写推荐语</div>
        <img
          :src="imageCancel"
          alt=""
          class="image-cancel"
          @click="clickCancel"
        />
      </div>
      <!-- <van-divider /> -->
      <van-field
        custom-style="border-top:1px solid #F8F8F8;border-bottom:1px solid #F8F8F8;"
        type="textarea"
        maxlength="50"
        :value="textContent"
        :autosize="{ minHeight: 104 }"
        show-word-limit
        placeholder="请输入新的推荐语"
        placeholder-style="color:#CCCCCC"
        :border="true"
        @change="changeTextArea"
      >
      </van-field>
      <!-- <van-divider /> -->
      <div class="bottom-btn-wrap">
        <van-button
          block
          round
          color="linear-gradient(90deg, #FF8360 0%, #F86744 100%)"
          @click="clickSave"
          >确定</van-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'EditText',
  props: {},
  data() {
    return {
      imageCancel: require('@/assets/images/cancel-x.png'),
      textContent: ''
    }
  },
  methods: {
    clickCancel() {
      this.$emit('clickCancel')
    },
    clickSave() {
      this.$emit('clickSave', this.textContent)
      this.textContent = ''
    },
    changeTextArea(val) {
      // console.log(val, '改变值')
      this.textContent = val.detail
    }
  }
})
</script>
<style lang="less" scoped>
.content {
  width: 750rpx;
  height: 900rpx;
  background: #ffffff;
  padding: 32rpx 0;
  position: relative;
}
.top {
  margin-bottom: 64rpx;
}
.title {
  font-family: PingFangSC-Medium;
  font-weight: Medium;
  font-size: 32rpx;
  color: #222222;
  letter-spacing: 0;
  text-align: center;
  line-height: 48rpx;
}
.image-cancel {
  width: 30.26rpx;
  height: 30.12rpx;
  position: absolute;
  right: 3%;
  top: 4%;
}
.bottom-btn-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx 40rpx 80rpx 40rpx;
  box-shadow: 0px 1rpx 0px 0px #dddddd;
}
// .van-cell {
//   height: 300rpx;
// }
</style>
