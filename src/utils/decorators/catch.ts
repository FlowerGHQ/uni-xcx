import Vue from 'vue'

/**
 * 捕捉目标方法的异常(同步或异步)并用`Toast`方式显示
 */
export function Catch(
  target: Object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor | void {
  descriptor.value = Catch.wrap(descriptor.value)
}

export namespace Catch {
  /**
   * 捕捉目标方法的异常(同步或异步)并用`Toast`方式显示
   *
   * @param func 要进行封装的方法
   */
  export function wrap<T extends Function>(func: T): T {
    return async function (this: Vue, ...args: any[]) {
      try {
        return await func.apply(this, args)
      } catch (e) {
        this.$logger?.error(e)
        this.$toast(e.message)
      }
    } as any
  }
}
