/**
 * @desc updateCurrentUser
 */

'/update/{gateWaySessionId}'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** gateWaySessionId */
  gateWaySessionId: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.post('/oauth/update/{gateWaySessionId}', params)
}
