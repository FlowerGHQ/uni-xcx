/**
 * @desc 用户信息
 */

'/api/oauth/v1/userInfo'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** id */
  id?: number
  /** ucId */
  ucId?: number
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/userInfo', params)
}
