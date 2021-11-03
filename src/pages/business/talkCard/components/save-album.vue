<template>
  <div>
    <div class="title">分享二维码</div>
    <div class="flex img"><img :src="src" alt="" class="QR-img" /></div>
    <div class="bottom-button">
      <button class="save-list" @click="openSave">保存至相册</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SaveAlbum',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  methods: {
    openSave() {
      wx.downloadFile({
        url: this.src,
        success: function (res) {
          console.log(res)
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function (err) {
              console.log(err)
              wx.showToast({
                title: err.errMsg,
                icon: 'success',
                duration: 2000
              })
              if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                console.log('当初用户拒绝，再次发起授权')
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log(
                        '获取权限成功，给出再次点击图片保存到相册的提示。'
                      )
                    } else {
                      console.log(
                        '获取权限失败，给出不给权限就无法正常使用的提示'
                      )
                    }
                  }
                })
              }
            },
            complete(res) {
              console.log(res)
            }
          })
        }
      })
    }
  }
})
</script>
<style lang="less" scoped>
.title {
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 48rpx;
  text-align: center;
  padding: 36rpx;
}

.save-list {
  width: 622rpx;
  height: 80rpx;
  background: linear-gradient(90deg, #ff8360 0%, #f86744 100%);
  border-radius: 44rpx;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 1px solid #f86744;
  color: #fff;
}
.QR-img {
  height: 480rpx;
  width: 480rpx;
}
.img {
    justify-content: center;
    margin-top: 100rpx;
}
</style>