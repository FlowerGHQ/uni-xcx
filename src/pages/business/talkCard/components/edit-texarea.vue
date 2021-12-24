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
      <div class="textarea-recommend">
        <textarea
          @linechange="lineChange"
          placeholder="请输入新的推荐语"
          placeholder-style="color:#CCCCCC"
          maxlength="50"
          :cursor-spacing="50"
          :value="textContent"
          @input="changeTextArea"
          :disabled="disabled"
          style="
            width: 100%;
            box-sizing: border-box;
            max-height: 208rpx;
            overflow: auto;
            padding: 32rpx;
            position: relative;
          "
        />
        <div class="text-count-display f f-end">
          {{ textContent ? textContent.length : 0 }}/50
        </div>
        <!-- <van-field
          custom-style="border-top:1px solid #F8F8F8;border-bottom:1px solid #F8F8F8;overflow:auto;"
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
        </van-field> -->
      </div>
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
      textContent: null,
      lineCount: 0,
      disabled: false,
      textLength: 0
    }
  },
  methods: {
    clickCancel() {
      this.$emit('clickCancel', this.textContent)
      this.textContent = null
      this.disabled = false
    },
    clickSave() {
      if (this.lineCount > 3) {
        this.$toast('只支持换行输入三行,请重新编辑')
        // this.textContent = null
        this.disabled = false
        return
      }
      this.$emit('clickSave', this.textContent)
      this.textContent = null
      this.disabled = false
    },
    changeTextArea(val) {
      if (val.detail.value.trim().length > 50) {
        this.textContent = val.detail.value.trim().slice(0, 49)
      } else {
        this.textContent = val.detail.value.trim()
      }
    },
    // 行数改变ios不支持
    lineChange(val) {
      // console.log(val.detail.lineCount)
      this.lineCount = val.detail.lineCount
      // if (val.detail.lineCount > 3) {
      //   this.disabled = true
      // } else {
      //   this.disabled = false
      // }
    }
  }
})
</script>
<style lang="less" scoped>
.textarea-height {
  display: flex;
}
.content {
  width: 750rpx;
  height: 900rpx;
  background: #ffffff;
  padding: 32rpx 0;
  padding-bottom: 300rpx;
  overflow-y: auto;
  position: relative;
}
.textarea-height {
  height: 300rpx;
  overflow-y: auto;
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
.f {
  display: flex;
}
.f-end {
  justify-content: flex-end;
}

.text-count-display {
  padding: 2%;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
  font-size: 24rpx;
  color: #8a8e92;
}

.textarea-recommend {
  border-top: 1px solid #f8f8f8;
  border-bottom: 1px solid #f8f8f8;
}
</style>
