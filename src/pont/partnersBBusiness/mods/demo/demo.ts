/**
 * @desc demo
 */

'/demo'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = ''

export async function request(params) {
  return http.get('/partners-b-business/demo', params)
}
