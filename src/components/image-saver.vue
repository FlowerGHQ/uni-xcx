<template>
  <div v-if="isShowAuthModal" class="xb-alert-cover">
    <div class="xb-alert">
      <div class="xb-alert-title">提示</div>
      <div class="xb-alert-content">是否同意访问相册</div>
      <div class="xb-alert-btn">
        <div class="btn" @click="cancel">否</div>
        <button class="btn" @opensetting="confirm" open-type="openSetting">
          是
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { authWriteToAlbum, saveToAlbumPromise } from '@/utils/poster'

@Component({
  components: {}
})
export default class extends Vue {
  isShowAuthModal: boolean = false

  /**
   * 下载并保存全部海报
   */
  async downloadImages(images: string[]) {
    try {
      for (const url of images) {
        await this.downloadFile(url)
      }
      this.$toast('海报已保存在相册，快去分享给好友吧！')
    } catch (error) {
      throw error
    } finally {
    }
    this.$emit('success')
  }
  /**
   * 下载并保存
   * @param {string} url 文件地址
   */
  downloadFile(url) {
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        url,
        header: 'Content-Type: image/jpeg',
        success: res => {
          if (res.statusCode === 200) {
            this.saveFile(res.tempFilePath).then(resolve).catch(reject)
          } else {
            reject(new Error(`下载失败(状态码${res.statusCode})`))
          }
        },
        fail: res => {
          reject(new Error(res))
        }
      })
    })
  }
  /**
   * 保存
   * @param {string} file 文件临时路径
   */
  async saveFile(file) {
    try {
      await authWriteToAlbum()
    } catch (error) {
      this.isShowAuthModal = true
      throw error
    }
    await saveToAlbumPromise(file)
  }

  confirm() {
    this.$emit('confirm')
    this.isShowAuthModal = false
  }

  cancel() {
    this.$emit('cancel')
    this.isShowAuthModal = false
  }
}
</script>

<style lang="less" scoped>
.xb-alert-cover {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .xb-alert {
    position: absolute;
    padding-top: 30rpx;
    width: 560rpx;
    left: 96rpx;
    top: 334rpx;
    background: #fff;
    border-radius: 25rpx;
    text-align: center;
    .xb-alert-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #151e26;
      padding: 30rpx 0 10rpx;
    }
    .xb-alert-content {
      padding: 20rpx 30rpx 30rpx 30rpx;
      color: #151e26;
      font-size: 30rpx;
    }
    .xb-alert-btn {
      border-top: 1rrpx solid #eee;
      display: flex;
      & > .btn {
        width: 50%;
        line-height: 50px;
        &:first-child {
          border-right: 1rpx solid #eee;
        }
      }
      .btn {
        font-size: 32rpx;
        color: #151e26;
      }
    }
  }
}
</style>
