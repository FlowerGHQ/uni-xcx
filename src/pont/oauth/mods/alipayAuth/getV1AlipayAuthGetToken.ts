/**
 * @desc 阿里通过code获取user_id接口
 */

'/v1/alipay/auth/getToken'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** app_id */
  app_id: string
  /** auth_code */
  auth_code: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/v1/alipay/auth/getToken', params)
}
