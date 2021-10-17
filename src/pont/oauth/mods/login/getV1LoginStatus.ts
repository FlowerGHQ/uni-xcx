/**
 * @desc 登录状态
 */

'/v1/loginStatus'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/v1/loginStatus', params)
}
