<template>
  <div>
    <div class="content">
      <canvas
        canvas-id="posterCanvas"
        style="width: 848rpx; height: 716rpx"
      ></canvas>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SavePoster',
  props: {},
  data() {
    return {
      img: require('@/assets/images/background-home.png')
    }
  },
  onLoad() {
    this.openSave()
  },
  methods: {
    openSave() {
      let res = wx.getSystemInfoSync()
      let rpx = res.windowWidth / 375
      let ctx = uni.createCanvasContext('posterCanvas')
      let pic = this.img
      ctx.setFillStyle('#222222')
      ctx.setFontSize(28 * rpx) //字大小
      let school =
        '邀您一起加入芬香邀您一起加入芬香邀您一起加入芬香邀您一起加入芬香邀您一起加入芬香'
      ctx.fillText(school, 0, 40)

      ctx.drawImage(pic, 20, 60, 392, 280)
      ctx.draw(true, () => {
        setTimeout(() => {
          uni.canvasToTempFilePath({
            canvasId: 'posterCanvas',
            x: 0,
            y: 0,
            success: res => {
              console.log(res, 'success')
              // this.imageUrl = res.tempFilePath
            },
            complete: rs => {
              console.log('canvasToTempFilePath', rs)
            }
          })
        }, 200)
      })
      console.log(res, '你好呀')
    }
  }
})
</script>
<style lang="less" src="./savePoster.less"></style>
