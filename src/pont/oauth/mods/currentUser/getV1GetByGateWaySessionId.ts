/**
 * @desc 获取用户session
 */

'/v1/get/{gateWaySessionId}'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** gateWaySessionId */
  gateWaySessionId: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/v1/get/{gateWaySessionId}', params)
}
