import httpConfig from '@/config/http'
import weuse from 'weuse'
import store from '@/store'

export class ApiError extends Error {
  readonly code: number | string
  constructor(code: number, message?: string) {
    super(message)
    this.code = code
  }
}

class Request {
  baseUrl: string
  headers: Record<string, any>;
  [key: string]: any
  setHeader(key: string, value: string) {
    this.headers[key] = value
  }
  delHeader(key: string) {
    delete this.headers[key]
  }
  constructor() {
    let url = httpConfig.api
    console.log(url, 'url====================>')
    let baseUrl = url[ENV] || url[__wxConfig.envVersion] || url.trial
    console.log(ENV, 'ENV====================>')
    console.log(__wxConfig.envVersion, '__wxConfig====================>')
    console.log(baseUrl, 'baseurl====================>')
    this.baseUrl = baseUrl + '/api'
    this.headers = {
      'Content-Type': 'application/json',
      'x-platform': __wxConfig.platform || 'devtools',
      'x-os': __wxConfig.system || 'devtools',
      'x-sdk': (wx as any).version.version,
      'x-env': __wxConfig.envVersion || 'develop'
    }
  }
}
const methods = ['get', 'post', 'put', 'delete', 'head', 'options', 'patch']

methods.forEach(method => {
  Request.prototype[method] = async function (url: string, data: any) {
    url = url.indexOf('http') > -1 ? url : this.baseUrl + url
    return new Promise(async (resolve, reject) => {
      const sid = await weuse.storage.get('sessionid')
      if (sid) {
        this.headers['Cookie'] = sid
      }
      uni.request({
        url,
        data,
        header: this.headers,
        responseType: url.includes('captcha') ? 'arraybuffer' : 'text',
        method: method.toLocaleUpperCase() as any,
        success: async res => {
          if (
            url.includes('miniProgramLogin') ||
            url.includes('authorized') ||
            url.includes('miniProgramDecryptionLogin') ||
            url.includes('login')
          ) {
            let setCookie = res.header['Set-Cookie'] || res.header['set-cookie']
            if (setCookie && setCookie.includes('SESSION=')) {
              await weuse.storage.set({
                key: 'sessionid',
                data: setCookie,
                ttl: 7200
              })
            }
          }
          const responseBody = res.data as any
          if (url.includes('captcha')) {
            resolve(responseBody)
          } else {
            if (!responseBody.status) {
              if (
                [-9999, 401].indexOf(responseBody.errorCode) !== -1 &&
                !url.includes('authorized') &&
                !url.includes('autoLogin')
              ) {
                var pages = getCurrentPages()
                var currentPage = pages[pages.length - 1] // 当前页面
                if (currentPage) {
                  uni.reLaunch({ url: currentPage.$page.fullPath })
                }
                // uni.reLaunch({
                //   url: '/pages/login/index'
                // })
                // await store.dispatch('account/reset')
                // await store.dispatch('account/auth')
                // wx.showToast({
                //   icon: 'none',
                //   mask: true,
                //   title: '登录过期，已重新登录',
                //   duration: 3000
                // })
                // var pages = getCurrentPages()
                // var currentPage = pages[pages.length - 1] // 当前页面
                // if (currentPage) {
                //   uni.reLaunch({ url: currentPage.$page.fullPath })
                // }
              } else {
                reject(responseBody)
              }
            }
            resolve(responseBody)
          }
        },
        fail(e) {
          console.log(e)
          reject(new Error(e.errMsg))
        }
      })
    })
  }
})

const http = new Request()

export default http
