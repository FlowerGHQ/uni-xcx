/**
 * @desc firstRedirect
 */

'/wxoauth/firstRedirect'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** flashAttributes */
  flashAttributes?: object
  /** gatewaySessionId */
  gatewaySessionId?: string
}

export const init = undefined

export async function request(params) {
  return http.get('/oauth/wxoauth/firstRedirect', params)
}
