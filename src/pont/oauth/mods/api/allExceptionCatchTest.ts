/**
 * @desc allExceptionCatchTest
 */

'/allExceptionCatchTest'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** name */
  name: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/allExceptionCatchTest', params)
}
