/**
 * @desc 微信认证回调转发code接口
 */

'/api/oauth/v1/wechat/auth/forwardCodeRedirect'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** code */
  code: string
  /** rl */
  rl: string
}

export const init = undefined

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/wechat/auth/forwardCodeRedirect', params)
}
