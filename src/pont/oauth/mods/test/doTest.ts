/**
 * @desc doTest
 */

'/api/oauth/v1/test'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** isSleep */
  isSleep: boolean
  /** sleepTime */
  sleepTime?: number
}

export const init = ''

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/test', params)
}
