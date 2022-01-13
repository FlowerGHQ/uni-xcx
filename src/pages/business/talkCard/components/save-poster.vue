<template>
  <div class="all-content" :capture-catch:touchmove="preventdefault">
    <!-- <posterOne v-if="showCanvas && loadingPoster"></posterOne> -->
    <canvas
      v-if="showCanvas"
      class="canvas"
      canvas-id="mycanvas"
      :style="{
        width: 750 + 'rpx',
        height: 1400 + 'rpx'
      }"
    />
    <img
      :src="imageUrl"
      :style="{
        width: imgWidth,
        height: imgHeight
      }"
    />
    <div id="text-content" v-if="showCanvas">
      {{ textContent }}
    </div>
    <bottom-button
      view="修改推荐语"
      save="下载至相册"
      @viewClick="editClick"
      @saveClick="picClick"
      :saveLoading="saveLoading"
    ></bottom-button>
    <van-popup
      :show="showPopup"
      position="bottom"
      round
      :close-on-click-overlay="false"
    >
      <edit-area @clickCancel="clickCancel" @clickSave="clickSave"></edit-area>
    </van-popup>
    <!-- 相机权限弹窗 -->
    <dialog-show
      :show="noPhoto"
      @onClose="onCloseNoShelf"
      @onConfirm="onConfirmNoShelf"
      :title="titleNoShelf"
      :content="contentNoShelf"
      :confirmButtonText="confirmButtonNoShelf"
      confirmButtonColor="#0066FF"
      cancelButtonColor="#666666"
    ></dialog-show>
  </div>
</template>
<script lang="ts">
// import posterOne from '@/pages/business/talkCard/components/save-posterone.vue'
import Vue from 'vue'
import EditArea from '@/pages/business/talkCard/components/edit-texarea.vue'
import { authWriteToAlbum, saveToAlbumPromise } from '@/utils/poster'
import dialogShow from '@/components/dialog-show.vue'
import mixin from '@/pages/business/talkCard/components/mixin/mixin'
import {
  drawtextLinebreak,
  drawText,
  drawRoundedRect,
  drawBorderRect,
  textValueChange,
  drawHeightText
} from '@/utils/canvas'
import bottomButton from '@/components/bottom-button.vue'
// import posterOne from '@/pages/business/talkCard/components/save-posterone.vue'
import { API } from '@/models/api'
import { showLoading, hideLoading } from '@/utils/common'
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default Vue.extend({
  name: 'SavePoster',
  mixins: [mixin],
  props: {},
  components: { bottomButton, EditArea, dialogShow },
  data() {
    return {
      saveLoading: false,
      // 控制遮罩层后面是否可以滚动
      preventdefault: '',
      noPhoto: false,
      titleNoShelf: '当前操作需要访问你的相册',
      contentNoShelf: '请前往系统设置中开启相册权限',
      confirmButtonNoShelf: '前往设置',
      // titleTime: '',
      // formObj: {} as any,
      // showImage: false,
      showCanvas: true,
      // 修改推荐语
      showPopup: false,
      // canvas
      id: -1,
      _width: 0, //手机屏宽
      _heigth: 0, //手机屏高
      // 海报分享起始位置
      paddingSchool: 15,
      // codeUrl:
      // 'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/schoolpal/59-10-47-202112131314028.jpg', //二维码网络路径
      rpx: 0, // 百分比占比
      dpr: 0,
      // school: '满天星艺术培训学校文一路校区',
      textContent: '收下这张会员卡，只有我的朋友可以获得哦',
      // name: '张某某',
      // avatar:
      // 'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16393661620003e392f.png',
      textHeight: 0, // 中间文字高度
      imageUrl: require('@/assets/images/clip-poster.png'),
      imgWidth: 100 + 'vw',
      imgHeight: 1300 + 'rpx',
      // 底部小程序码距离上面的距离
      bottomCodeBegin: -50,
      // 海报展示页面加载中默认显示
      loadingPoster: true
    }
  },
  onLoad(option: any) {
    // if (!option.id) return
    // this.id = option.id
    this.getInfoSystem()
  },
  computed: {
    ...mapState('poster', [
      'avatar',
      'name',
      'formObj',
      'titleTime',
      'school',
      'codeUrl'
    ])
  },
  methods: {
    // 获取文字动态高度
    getTextHeight() {
      const that = this
      // 为了保证获取可靠高度
      setTimeout(() => {
        wx.createSelectorQuery()
          .select('#text-content')
          .fields(
            {
              size: true,
              scrollOffset: true,
              properties: ['scrollX', 'scrollY'],
              computedStyle: ['margin', 'backgroundColor'],
              context: true
            },
            function (res) {
              that.textHeight = res.height // 节点的高度
              that.drawTwo()
            }
          )
          .exec()
      }, 20)
    },
    // 将海报保存到系统相册
    picClick() {
      // console.log('是否下载到相册')
      const that = this
      this.saveLoading = true
      uni.canvasToTempFilePath({
        //把当前画布指定区域的内容导出生成指定大小的图片
        canvasId: 'mycanvas',
        success(res) {
          authWriteToAlbum()
            .then(resOne => {
              saveToAlbumPromise(res.tempFilePath)
              wx.showToast({
                title: '图片保存成功'
              })
              that.saveLoading = false
            })
            .catch(error => {
              console.log('获取失败')
              that.saveLoading = false
              that.onConfirmNoShelf() //如果拒绝，在这里进行再次获取授权的操作
            })
        },
        fail: () => {
          that.saveLoading = false
          wx.showToast({
            title: '获取图片失败'
          })
        }
      })
    },
    // 保存图片文件到手机相册
    // getPicture() {
    // },
    onCloseNoShelf() {
      this.noPhoto = false
    },
    onConfirmNoShelf() {
      this.noPhoto = true
      // 打开相册设置
      wx.openSetting({
        success: res => {
          console.log(res, 'openSetting')
        }
      })
    },
    // 获取该手机屏幕宽高
    getInfoSystem() {
      this.init()
    },
    // 绘制
    drawImage(screenHeight, screenWidth) {
      showLoading()
      // console.log('是否绘制')
      let rpx = screenWidth / 375
      this.rpx = rpx
      //缩小比例
      let ctx = uni.createCanvasContext('mycanvas')
      const grd = ctx.createLinearGradient(
        0,
        0,
        screenWidth,
        1400 * rpx + this.textHeight
      )
      grd.addColorStop(0, '#e9d9c2')
      grd.addColorStop(1, '#d0b796')
      // 绘制背景
      ctx.setFillStyle(grd)
      // ctx.scale(0.9, 0.9)
      // 图片生成固定的大小
      ctx.fillRect(0, 0, screenWidth, 1400 * rpx)
      // 绘制字体
      ctx.setFillStyle('#000')
      ctx.setFontSize(16 * rpx) //字大小
      ctx.fillText(
        this.school.length > 14
          ? `${this.school.slice(0, 13)}...`
          : this.school,
        (this.paddingSchool + 28) * rpx,
        38 * rpx
      )
      // 先绘制圆角矩形再绘制图片 避免遮盖
      drawRoundedRect(
        this.paddingSchool * rpx,
        54 * rpx,
        screenWidth - 32.1 * rpx,
        540 * rpx + this.textHeight + this.bottomCodeBegin * rpx,
        20,
        ctx,
        rpx
      )
      //绘制图片
      wx.getImageInfo({
        src:
          'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16393616720004fba83.png',
        //网络图片路径
        success: res => {
          let path = res.path //图片临时本地路径
          ctx.drawImage(
            path,
            this.paddingSchool * rpx,
            20 * rpx,
            24 * rpx,
            24 * rpx
          )
        }
      })
      // 二维码图片位置
      let codeX = 34 * rpx + 230 * rpx
      let codeY =
        330 * rpx + 150 * rpx + this.textHeight + this.bottomCodeBegin * rpx
      // 绘制二维码边框
      wx.getImageInfo({
        src:
          'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads163953268500054556f.png',
        success: res => {
          let path = res.path //图片临时本地路径
          // 图片高度和宽度
          ctx.drawImage(
            path,
            codeX - 10 * rpx,
            codeY - 10 * rpx,
            90 * rpx,
            90 * rpx
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
          let picX = 343 * rpx
          let picY = 370 * rpx
          ctx.drawImage(path, this.paddingSchool * rpx, 54 * rpx, picX, picY)
          drawText(
            ctx,
            '#a09fa2',
            12 * rpx,
            90 * rpx,
            120 * rpx,
            '有效期：' + this.titleTime
          )
          // ----背景图中间部分
          ctx.setFillStyle('#a09fa2')
          ctx.setFontSize(20 * rpx) //字大小
          ctx.setTextBaseline('middle')
          ctx.fillText('价值', (this._width / 2.5) * rpx, (400 / 2) * rpx)
          // 居中文字坐标
          // 数字长度
          // `${this.formObj.value}`
          let numberLength = textValueChange(`${this.formObj.value}`, this.rpx)
          let centerTextX = (picX / 2 - numberLength) * rpx
          let centerTextY = (400 / 2) * rpx

          // ----底部
          ctx.setFontSize(16 * rpx) //字大小
          ctx.setTextBaseline('middle')
          ctx.setFillStyle('#000000')
          // console.log(textValueChange('0.00'), 'this.textContenthha')
          // 返回文字的高度
          drawtextLinebreak(
            ctx,
            this.textContent,
            34 * rpx,
            picY + 45 * rpx,
            screenWidth - 70 * rpx,
            rpx
          )
          // 绘制头像
          wx.getImageInfo({
            src: this.avatar,
            //网络图片路径
            success: res => {
              // 绘制的头像坐标
              let avatarX = 34 * rpx
              let avatarY =
                picY + 120 * rpx + this.textHeight + this.bottomCodeBegin * rpx
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
              // 右侧文字
              let name =
                this.name.length > 6 ? `${this.name.slice(0, 6)}...` : this.name
              drawText(
                ctx,
                '#000000',
                16 * rpx,
                avatarX + 57 * rpx,
                avatarY + 15 * rpx,
                `${name} 推荐`
              )
              drawText(
                ctx,
                '#888',
                12 * rpx,
                avatarX + 57 * rpx,
                avatarY + 35 * rpx,
                '长按识别二维码，领取福利'
              )
              // 将name截图省略号拓客卡名称字体加粗为了保证粗体不会被后面的字体继承所以放在最后绘制
              let nameCustom =
                this.formObj.name.length > 13
                  ? `${this.formObj.name.slice(0, 12)}...`
                  : this.formObj.name
              ctx.setFillStyle('#E5C89C')
              ctx.setFontSize(18 * rpx) //字大小
              // ctx.font = 'normal bold 20rpx PingFangSC-Semibold'
              ctx.fillText(nameCustom, 90 * rpx, 90 * rpx)
              // drawText(
              //   ctx,
              //   '#E5C89C',
              //   20 * rpx,
              //   90 * rpx,
              //   100 * rpx,
              //   nameCustom
              // )
              // ____绘制价格部分
              ctx.setFillStyle('#E5C89C')
              ctx.setFontSize(16 * rpx) //字大小
              ctx.font = 'normal bold 24rpx DINAlternate-Bold'
              ctx.fillText('￥', centerTextX - 5 * rpx, centerTextY + 47 * rpx)
              ctx.setTextBaseline('middle')
              ctx.setFillStyle('#E5C89C')
              ctx.setFontSize(24 * rpx) //字大小
              ctx.font = `normal bold 40rpx DINAlternate-Bold`
              ctx.fillText(
                `${this.formObj.value}`,
                centerTextX + 15 * rpx,
                centerTextY + 42 * rpx
              )

              //绘制图片
              const that = this
              // 绘制右侧二维码 为了保证二维码后绘制不被圆角矩形覆盖并且可以等绘制好二维码之后再调用draw方法
              that
                .drawCode()
                .then((res: any) => {
                  ctx.drawImage(res, codeX, codeY, 70 * rpx, 70 * rpx)
                  ctx.draw(false, () => {
                    setTimeout(() => {
                      wx.canvasToTempFilePath({
                        //把当前画布指定区域的内容导出生成指定大小的图片
                        canvasId: 'mycanvas',
                        success(res) {
                          that.imgWidth = 750 + 'rpx'
                          that.imgHeight = 1400 + 'rpx'
                          that.imageUrl = res.tempFilePath
                        }
                      })
                      hideLoading()
                      this.loadingPoster = false
                    }, 500)
                  })
                })
                .catch(res => {
                  console.log(res, '小程序码绘制失败')
                })
              // ctx.drawImage(path, codeX, codeY, 70 * rpx, 70 * rpx)

              // hideLoading()
              // console.log('能否走到这里')
            }
          })
        }
      })
    },
    // 为了保证二维码正确绘制
    drawCode() {
      const p = new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: this.codeUrl,
          success: res => {
            let path = res.path //图片临时本地路径
            // 图片高度和宽度
            resolve(path)
          },
          fail: res => {
            reject(res)
          }
        })
      })
      return p
    },
    // 获取头像
    init() {
      const that = this
      uni.getSystemInfo({
        success(res) {
          // const dpr = wx.getSystemInfoSync().pixelRatio
          that._heigth = res.windowHeight
          that._width = res.screenWidth
          that.rpx = res.screenWidth / 375
          // that.textHeight = drawHeightText(
          //   that.textContent,
          //   that._width / 375
          // )
          // 将异步数据请求完成之后再渲染
          that.getTextHeight()
          // that.drawImage(res.windowHeight, res.screenWidth)
        }
      })
      // })
      //   .catch(error => {
      //     hideLoading()
      //     this.$toast(error.errorMessage)
      //   })
    },
    // onClose() {
    //   this.showPopup = false
    //   this.preventdefault = ''
    // },
    editClick() {
      this.showCanvas = false
      this.showPopup = true
      this.preventdefault = 'preventdefault'
    },
    clickCancel(val) {
      this.textContent = '收下这张会员卡，只有我的朋友可以获得哦'
      this.showCanvas = true
      this.showPopup = false
      this.preventdefault = ''
      this.getTextHeight()
    },
    clickSave(val) {
      // console.log(val == null, '是否存在')
      this.textContent = val ? val : '收下这张会员卡，只有我的朋友可以获得哦'
      this.showCanvas = true
      this.showPopup = false
      this.preventdefault = ''
      this.getTextHeight()
    },
    // 再次绘制
    drawTwo() {
      // this.textHeight = drawHeightText(this.textContent, this._width / 375)
      this.drawImage(this._heigth, this._width)
    }
  }
})
</script>
<style lang="less" scoped>
.canvas {
  z-index: 1;
  position: absolute;
  top: -1999998rpx;
  left: 0;
}
.all-content {
  width: 750rpx;
  // height: 1500rpx;
  padding-bottom: 200rpx;
  overflow: auto;
  background-image: linear-gradient(#e9d9c2, #d7c0a1);
}
/deep/.van-dialog__button {
  &:first-child {
    .van-button {
      color: #666666 !important;
    }
  }
  &:last-child {
    .van-button {
      color: #0066ff !important;
    }
  }
}
#text-content {
  position: absolute;
  top: -999rpx;
  line-height: 60rpx;
  width: 686rpx;
  margin-left: 30rpx;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
  font-size: 32rpx;
  padding: 40rpx 34rpx;
  white-space: pre-line;
  background-color: #fff;
}
/deep/ .text-box {
  text-align: center;
}
</style>
