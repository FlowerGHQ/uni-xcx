/**
 * @desc 微信认证回调重定向获取code接口
 */

'/v1/wechat/auth/firstRedirect'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** code */
  code: string
  /** gs */
  gs: string
  /** rl */
  rl: string
}

export const init = undefined

export async function request(params) {
  return http.get('/oauth/v1/wechat/auth/firstRedirect', params)
}
