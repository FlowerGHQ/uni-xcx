/**
 * @desc 阿里认证回调重定向获取code接口
 */

'/api/oauth/v1/alipay/auth/firstRedirect'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** auth_code */
  auth_code: string
  /** gs */
  gs: string
  /** rl */
  rl: string
}

export const init = undefined

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/alipay/auth/firstRedirect', params)
}
