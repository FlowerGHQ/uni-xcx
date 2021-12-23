/**
 * @desc 获取用户session
 */

'/api/oauth/v1/get/{gateWaySessionId}'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** gateWaySessionId */
  gateWaySessionId: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/get/{gateWaySessionId}', params)
}
