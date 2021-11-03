/**
 * @desc 消费者详情
 */

'/customer/detail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** @Min: 1.0 - @Max: null (until #1244 gets fixed) */
  customerId: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/customer/detail', params)
}
