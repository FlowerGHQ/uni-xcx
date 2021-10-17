/**
 * @desc 第三方登录认证总入口接口（旧）
 */

'/api/oauth/v1/auth/publicNumberIndex'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** businessLoginRedirectUrl */
  businessLoginRedirectUrl: string
}

export const init = ''

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/auth/publicNumberIndex', params)
}
