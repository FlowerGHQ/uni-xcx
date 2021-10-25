/**
 * @desc 第三方登录认证总入口接口（新）
 */

'/api/oauth/v1/auth/thirdPartyCertification'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** bizRedirectUrl */
  bizRedirectUrl: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/auth/thirdPartyCertification', params)
}
