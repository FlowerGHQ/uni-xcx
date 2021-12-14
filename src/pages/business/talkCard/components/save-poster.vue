<template>
  <div class="all-content">
    <canvas
      v-if="showCanvas"
      class="canvas"
      canvas-id="mycanvas"
      :style="{
        width: 750 + 'rpx',
        height: _heigth * rpx * 1.45 + 'rpx'
      }"
    />
    <bottom-button
      view="修改推荐语"
      save="下载至相册"
      @viewClick="editClick"
      @saveClick="picClick"
    ></bottom-button>
    <van-popup :show="showPopup" @close="onClose" position="bottom" round>
      <edit-area @clickCancel="clickCancel" @clickSave="clickSave"></edit-area>
    </van-popup>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import EditArea from '@/pages/business/talkCard/components/edit-texarea.vue'
import { drawtextLinebreak, drawText, drawRoundedRect } from '@/utils/canvas'
import bottomButton from '@/components/bottom-button.vue'
import { API } from '@/models/api'
import { showLoading, hideLoading } from '@/utils/common'
export default Vue.extend({
  name: 'SavePoster',
  props: {},
  components: { bottomButton, EditArea },
  data() {
    return {
      showCanvas: true,
      // 修改推荐语
      showPopup: false,
      // canvas
      id: 59,
      _width: 0, //手机屏宽
      _heigth: 0, //手机屏高
      codeUrl:
        'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/schoolpal/59-10-47-202112131314028.jpg', //二维码网络路径
      rpx: 0, // 百分比占比
      school: '满天星艺术培训学校文一路校区',
      textContent: '强力推荐这家机构！分享给你，好机构陪伴孩子一生！',
      name: '张某某',
      avatar:
        'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16393661620003e392f.png'
      // localImageUrl: '', //绘制的商品图片本地路径
      // localCodeUrl: '' //绘制的二维码图片本地路径
    }
  },
  onLoad(option: any) {
    if (!option.id) return
    // console.log(option, 'option')
    this.id = option.id
    this.getInfoSystem()
  },
  mounted() {
    // this.getInfoSystem()
  },
  methods: {
    // 将海报保存到系统相册
    picClick() {
      uni.canvasToTempFilePath({
        //把当前画布指定区域的内容导出生成指定大小的图片
        canvasId: 'mycanvas',
        success(res) {
          wx.authorize({
            //向用户发起授权请求
            scope: 'scope.writePhotosAlbum', //保存相册授权
            success: () => {
              wx.saveImageToPhotosAlbum({
                //保存图片到系统相册
                filePath: res.tempFilePath,
                success: () => {
                  wx.showToast({
                    title: '图片保存成功'
                  })
                }
              })
            }
          })
        },
        fail() {
          console.log('调用失败')
        }
      })
    },
    // 获取该手机屏幕宽高
    getInfoSystem() {
      let that = this
      showLoading()
      uni.getSystemInfo({
        success(res) {
          that._heigth = res.windowHeight
          that._width = res.screenWidth
          that.init()
          // that.openQRcode()
          setTimeout(() => {
            that.drawImage(res.windowHeight, res.screenWidth)
          }, 1000)
        }
      })
    },
    // 绘制
    drawImage(screenHeight, screenWidth) {
      let rpx = screenWidth / 375
      this.rpx = rpx
      //缩小比例
      let ctx = uni.createCanvasContext('mycanvas')
      // 绘制背景
      ctx.setFillStyle('#ebddc8')
      ctx.fillRect(0, 0, screenWidth, screenHeight)
      // 绘制字体
      ctx.setFillStyle('#222222')
      ctx.setFontSize(16 * rpx) //字大小
      ctx.fillText(
        this.school.length > 14
          ? `${this.school.slice(0, 13)}...`
          : this.school,
        38 * rpx,
        30 * rpx
      )
      //绘制图片
      wx.getImageInfo({
        src:
          'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16393616720004fba83.png',
        //网络图片路径
        success: res => {
          let path = res.path //图片临时本地路径
          ctx.drawImage(path, 10 * rpx, 10 * rpx, 24 * rpx, 24 * rpx)
        }
      })
      // 绘制右侧图像
      wx.getImageInfo({
        src: this.codeUrl,
        success: res => {
          console.log('是否走这里', res.path)
          let path = res.path //图片临时本地路径
          // 图片高度和宽度
          ctx.drawImage(
            path,
            34 * rpx + 230 * rpx,
            350 * rpx + 130 * rpx,
            70 * rpx,
            70 * rpx
          )
        }
      })
      // 绘制中间背景
      wx.getImageInfo({
        src:
          'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16391284380005f6db2.png',
        //网络图片路径
        success: res => {
          let path = res.path //图片临时本地路径
          // 图片高度和宽度
          let picX = 342 * rpx
          let picY = 350 * rpx
          ctx.drawImage(path, 10 * rpx, 54 * rpx, picX, picY)
          drawText(
            ctx,
            '#E5C89C',
            20 * rpx,
            82 * rpx,
            100 * rpx,
            '贵宾卡贵宾卡贵宾卡贵宾…'
          )
          drawText(
            ctx,
            '#a09fa2',
            12 * rpx,
            82 * rpx,
            120 * rpx,
            '有效期：2021–12-01 ～ 2022-12-01'
          )
          // ----背景图中间部分
          ctx.setFillStyle('#a09fa2')
          ctx.setFontSize(20 * rpx) //字大小
          ctx.setTextBaseline('middle')
          ctx.fillText('价值', (this._width / 2.5) * rpx, (400 / 2) * rpx)
          ctx.setFontSize(32 * rpx) //字大小
          ctx.setTextBaseline('middle')
          ctx.setFillStyle('#E5C89C')
          // 居中文字坐标
          let centerTextX = (this._width / 2.5) * rpx
          let centerTextY = (400 / 2) * rpx
          ctx.fillText(
            '¥ 20000.00',
            centerTextX - 76 * rpx,
            centerTextY + 32 * rpx
          )
          // ----底部
          ctx.setFillStyle('#fff')
          // ctx.setGlobalAlpha(0.2)
          drawRoundedRect(
            11,
            picY + 54 * rpx,
            screenWidth - 32.5 * rpx,
            120 * rpx,
            10,
            ctx,
            rpx
          )
          // ctx.rect(11, picY + 54 * rpx, screenWidth - 32.5 * rpx, 300 * rpx)
          ctx.setFontSize(16 * rpx) //字大小
          ctx.setTextBaseline('middle')
          ctx.setFillStyle('#000000')
          drawtextLinebreak(
            ctx,
            this.textContent,
            34 * rpx,
            picY + 60 * rpx,
            screenWidth - 70 * rpx
          )
          // ctx.clearRect(246, picY + 54 * rpx, 150, 175)
          // 绘制头像
          wx.getImageInfo({
            src: this.avatar,
            //网络图片路径
            success: res => {
              // 绘制的头像坐标
              let avatarX = 34 * rpx
              let avatarY = picY + 130 * rpx
              let avatarurl_width = 48 * rpx //绘制的头像宽度
              let avatarurl_heigth = 48 * rpx //绘制的头像高度
              ctx.save()
              ctx.beginPath() //开始绘制 //先画个圆 前两个参数确定了圆心 （x,y） 坐标 第三个参数是圆的半径 四参数是绘图方向 默认是false，即顺时针
              ctx.arc(
                avatarurl_width / 2 + avatarX,
                avatarurl_heigth / 2 + avatarY,
                avatarurl_width / 2,
                0,
                Math.PI * 2,
                false
              )
              ctx.closePath()
              ctx.clip() //画好了圆 剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
              ctx.drawImage(
                res.path,
                avatarX,
                avatarY,
                avatarurl_width,
                avatarurl_heigth
              ) // 推进去图片，必须是https图片
              ctx.restore() //恢复之前保存的绘图上下文 恢复之前保存的绘图上下文即状态 还可以继续绘制
              // ctx.drawImage(path, avatarX, avatarY, 48 * rpx, 48 * rpx)
              // 右侧文字
              drawText(
                ctx,
                '#000000',
                16 * rpx,
                avatarX + 70 * rpx,
                avatarY + 15 * rpx,
                `${this.name} 推荐`
              )
              drawText(
                ctx,
                '#888',
                12 * rpx,
                avatarX + 70 * rpx,
                avatarY + 35 * rpx,
                '长按识别二维码，领取福利'
              )
              // ctx.beginPath()
              // ctx.moveTo(20, 20)
              // ctx.lineTo(20, 100)
              // ctx.lineTo(200, 20)
              // ctx.setStrokeStyle('#AAAAAA')
              // ctx.stroke()
              ctx.draw(true)
              hideLoading()
              // this.picClick()
            }
          })
        }
      })
    },
    // 获取二维码
    async openQRcode() {
      const res = await API.partnersSBusiness.memberCard.shareInfo.request({
        id: this.id
      })
      this.codeUrl = res.data.url
      console.log(this.codeUrl, '获取二维码')
    },
    // 获取头像
    async init() {
      try {
        const res = await API.partnersSBusiness.account.info.request({})
        console.log(res, '你好你要')
        this.name = res.data.name
        // this.avatar = res.data.avatar
      } catch (error) {}
    },
    onClose() {
      this.showPopup = false
    },
    editClick() {
      this.showCanvas = false
      this.showPopup = true
      console.log('修改推荐语')
    },
    clickCancel() {
      // console.log('clickCancel')
      this.showPopup = false
    },
    clickSave(val) {
      this.textContent = val
      this.showPopup = false
      this.showCanvas = true
      this.drawImage(this._heigth, this._width)
    }
  }
})
</script>
<style lang="less" scoped>
// .canvas {
//   z-index: 1;
// }
.all-content {
  width: 750rpx;
  height: 1500rpx;
  overflow: hidden;
  background-color: #ebddc8;
}
</style>
