/**
 * @desc 更新登录用户session
 */

'/api/oauth/v1/updateUnionCurrentUser/{gateWaySessionId}'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** gateWaySessionId */
  gateWaySessionId: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.post(
    '/oauth/api/oauth/v1/updateUnionCurrentUser/{gateWaySessionId}',
    params
  )
}
