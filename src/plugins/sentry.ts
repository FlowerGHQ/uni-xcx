import * as Sentry from 'sentry-miniapp'

let dsn = 'https://95f3546052cc4ee180cb4c31f0200a18@sentry.xiaobaoonline.com/11'

declare module 'vue/types/vue' {
  interface VueConstructor {
    readonly $logger?: Logger
  }
  interface Vue {
    readonly $logger?: Logger
  }
}

export class Logger {
  constructor() {
    // 初始化 Sentry
    if (dsn) {
      Sentry.init({
        dsn
      })
    }
    this.setTag('env', ENV)
    if (!Logger.instance) {
      Logger.instance = this
    }
  }
  setUser(user: Sentry.User) {
    return Sentry.setUser(user)
  }
  setTag(key: string, value: string) {
    return Sentry.setTag(key, value)
  }
  error(e: Error) {
    return Sentry.captureException(e)
  }
  warn(message: string) {
    return Sentry.captureMessage(message, Sentry.Severity.Warning)
  }
  debug(message: string) {
    return Sentry.captureMessage(message, Sentry.Severity.Debug)
  }
}
export namespace Logger {
  export let instance: Logger
  export function install(Vue: any) {
    Object.defineProperty(Vue, '$logger', {
      get() {
        return Logger.instance
      }
    })
    Object.defineProperty(Vue.prototype, '$logger', {
      get() {
        return Logger.instance
      }
    })
  }
}
export default Logger
