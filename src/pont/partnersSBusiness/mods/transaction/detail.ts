/**
 * @desc 交易详情
 */

'/transaction/detail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** 正向交易id */
  id?: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/transaction/detail', params)
}
