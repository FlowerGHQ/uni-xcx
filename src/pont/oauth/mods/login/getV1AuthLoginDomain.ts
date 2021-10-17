/**
 * @desc 获取登录页域名地址
 */

'/v1/auth/loginDomain'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/v1/auth/loginDomain', params)
}
