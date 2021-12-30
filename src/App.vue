<script>
import { API } from '@/models/api'
export default {
  onLaunch: function () {
    console.log('App Launch')
    this.update()
  },
  onShow: async function () {
    var pages = getCurrentPages()
    console.log(pages, 'pages')
    // try {
    //   const res = await wx.login()
    //   const res1 = await API.oauth.login.miniProgramLogin.request({
    //     code: res.code,
    //     notAutoLogin: false
    //   })
    //   await API.partnersSBusiness.account.authorized.request({})
    // } catch {
    //   wx.reLaunch({
    //     url: '/pages/login/index'
    //   })
    // }
  },
  methods: {
    update: function () {
      if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function (res) {
          console.log(res)
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate()
                  } else if (res.cancel) {
                    //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                    wx.showModal({
                      title: '温馨提示~',
                      content:
                        '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                      showCancel: false, //隐藏取消按钮
                      confirmText: '确定更新', //只保留确定更新按钮
                      success: function (res) {
                        if (res.confirm) {
                          updateManager.applyUpdate()
                        }
                      }
                    })
                  }
                }
              })
            })
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              wx.showModal({
                title: '已经有新版本了哟~',
                content:
                  '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
              })
            })
          }
        })
      }
    }
  }
}
</script>
