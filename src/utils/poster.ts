/**
 * 获取相册写入权限
 *
 * @returns {Promise<void>}
 */
export function authWriteToAlbum() {
  return new Promise((resolve, reject) => {
      uni.getSetting({
          success: res => {
              if (res.authSetting['scope.writePhotosAlbum']) {
                  resolve(true)
              } else {
                  uni.authorize({
                      scope: 'scope.writePhotosAlbum',
                      success: () => {
                          resolve(true)
                      },
                      fail: (e) => {
                          reject(new Error('授权失败'))
                      }
                  })
              }
          },
          fail: res => {
              reject(new Error('获取用户当前设置调用失败: ' + JSON.stringify(res)))
          }
      })
  })
}

/**
 * 保存文件到相册，返回一个promise
 *
 */
export function saveToAlbumPromise(filePath) {
  return new Promise((resolve, reject) => {
      uni.saveImageToPhotosAlbum({
          filePath,
          success: () => {
              resolve(true)
          },
          fail: () => {
              reject(new Error('保存文件到相册失败'))
          }
      })
  })
}