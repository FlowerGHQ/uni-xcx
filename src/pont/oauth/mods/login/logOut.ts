/**
 * @desc 登出
 */

'/api/oauth/v1/loginOut'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.post('/oauth/api/oauth/v1/loginOut', params)
}
