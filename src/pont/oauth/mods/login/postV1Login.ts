/**
 * @desc 登录
 */

'/v1/login'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.post('/oauth/v1/login', params)
}
