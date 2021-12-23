/**
 * @desc 拓客卡详情
 */

'/memberCard/detail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** @Min: 1.0 - @Max: null (until #1244 gets fixed) */
  id: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/memberCard/detail', params)
}
