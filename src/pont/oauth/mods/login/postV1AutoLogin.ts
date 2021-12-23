/**
 * @desc wx内自动登录 21 登录失败 20 登录成功
 */

'/v1/autoLogin'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.post('/oauth/v1/autoLogin', params)
}
