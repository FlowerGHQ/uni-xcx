/**
 * @desc 阿里认证回调转发code接口
 */

'/api/oauth/v1/alipay/auth/forwardCodeRedirect'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** auth_code */
  auth_code: string
  /** rl */
  rl: string
}

export const init = undefined

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/alipay/auth/forwardCodeRedirect', params)
}
