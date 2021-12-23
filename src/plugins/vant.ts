import Dialog from 'vant/dialog/dialog'
import Notify from 'vant/notify/notify'
import Toast from 'vant/toast/toast'

declare module 'vue/types/vue' {
  interface VueConstructor {
    readonly $notify: typeof Notify
    readonly $dialog: typeof Dialog
    readonly $toast: typeof Toast
  }
  interface Vue {
    readonly $notify: typeof Notify
    readonly $dialog: typeof Dialog
    readonly $toast: typeof Toast
  }
}

function getPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

interface SelectorOptions {
  context?: any
  selector: string
}

function checkComponent(options: SelectorOptions) {
  const ctx = options.context || getPage()
  const comp = ctx.selectComponent(options.selector)
  return comp != null
}

function notify(options: any) {
  if (typeof options !== 'object') {
    options = {
      message: options
    }
  }
  if (
    checkComponent({
      context: options.context,
      selector: options.selector || '#van-notify'
    })
  ) {
    Notify(options)
  } else {
    wx.showToast({
      icon: 'none',
      mask: true,
      title: options.message,
      duration: options.duration || 3000
    })
  }
}

function dialog(options: any) {
  if (
    checkComponent({
      context: options.context,
      selector: options.selector || '#van-dialog'
    })
  ) {
    return Dialog(options)
  }
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: options.title,
      content: options.message,
      showCancel: options.showCancelButton,
      confirmColor: '#1989fa',
      confirmText: options.confirmButtonText,
      cancelText: options.cancelButtonText,
      success: res => {
        if (res.confirm) {
          resolve(true)
        } else {
          reject()
        }
      },
      fail: res => reject(new Error(res.errMsg))
    })
  })
}
namespace dialog {
  export function alert(options: any) {
    if (
      checkComponent({
        context: options.context,
        selector: options.selector || '#van-dialog'
      })
    ) {
      return Dialog.alert(options)
    }
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: options.title,
        content: options.message,
        showCancel: false,
        confirmColor: options.confirmColor ? options.confirmColor : '#1989fa',
        cancelColor: '#323233',
        confirmText: options.confirmButtonText || '确认',
        success: () => resolve(true),
        fail: res => reject(new Error(res.errMsg))
      })
    })
  }
  export function confirm(options: any) {
    if (
      checkComponent({
        context: options.context,
        selector: options.selector || '#van-dialog'
      })
    ) {
      return Dialog.confirm(options)
    }
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: options.title,
        content: options.message,
        showCancel: true,
        confirmColor: '#1989fa',
        cancelColor: '#323233',
        confirmText: options.confirmButtonText || '确认',
        cancelText: options.cancelButtonText || '取消',
        success: res => {
          if (res.confirm) {
            resolve(true)
          } else {
            reject()
          }
        },
        fail: res => reject(new Error(res.errMsg))
      })
    })
  }
  export const close = Dialog.close
  export const stopLoading = Dialog.stopLoading
}

function toast(options: any) {
  if (typeof options !== 'object') {
    options = {
      message: options
    }
  }
  if (
    checkComponent({
      context: options.context,
      selector: options.selector || '#van-toast'
    })
  ) {
    Toast(options)
  } else {
    wx.showToast({
      icon: 'none',
      title: options.message,
      duration: options.duration || 2000,
      mask: options.mask
    })
  }
}
namespace toast {
  export function success(options: any) {
    if (typeof options !== 'object') {
      options = {
        message: options
      }
    }
    if (
      checkComponent({
        context: options.context,
        selector: options.selector || '#van-toast'
      })
    ) {
      Toast.success(options)
    } else {
      wx.showToast({
        icon: 'success',
        title: options.message,
        duration: options.duration || 2000,
        mask: options.mask
      })
    }
  }
  export function loading(options: any) {
    if (typeof options !== 'object') {
      options = {
        message: options
      }
    }
    if (
      checkComponent({
        context: options.context,
        selector: options.selector || '#van-toast'
      })
    ) {
      Toast.loading({
        message: '加载中...',
        loadingType: 'spinner',
        mask: false,
        ...options,
        duration: 0,
        forbidClick: true
      })
    } else {
      wx.showLoading({
        title: options.message || '加载中...',
        mask: true
      })
    }
  }
  export function clear() {
    if (checkComponent({ selector: '#van-toast' })) {
      Toast.clear()
    } else {
      wx.hideLoading()
    }
  }
  export const fail = Toast.fail
}

function install(Vue: any) {
  Object.defineProperty(Vue, '$notify', {
    get() {
      return notify
    }
  })
  Object.defineProperty(Vue, '$dialog', {
    get() {
      return dialog
    }
  })
  Object.defineProperty(Vue, '$toast', {
    get() {
      return toast
    }
  })
  Object.defineProperty(Vue.prototype, '$notify', {
    get() {
      return notify
    }
  })
  Object.defineProperty(Vue.prototype, '$dialog', {
    get() {
      return dialog
    }
  })
  Object.defineProperty(Vue.prototype, '$toast', {
    get() {
      return toast
    }
  })
}

export default {
  install
}
