import Vue from 'vue'

/**
 * 先通过身份验证再执行目标方法
 */
export function Auth(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void {
  descriptor.value = Auth.wrap(descriptor.value)
}
export namespace Auth {
  /**
   * 先通过身份验证再执行目标方法
   *
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(func: T): T {
    return async function (this: Vue, ...args: any[]) {
      try {
        await this.$store.dispatch('account/auth', null, {
          root: true
        })
      } catch (error) {
        this.$toast(error.message)
        return
      }
      return func.apply(this, args)
    } as any
  }
}
