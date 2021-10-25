/**
 * @desc 详情
 */

'/memberCard/detail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** id */
  id: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/memberCard/detail', params)
}
