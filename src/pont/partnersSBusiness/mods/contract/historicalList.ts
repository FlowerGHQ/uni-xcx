/**
 * @desc 历史合约列表
 */

'/contract/historicalList'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** pageIndex */
  pageIndex?: number
  /** pageSize */
  pageSize?: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/contract/historicalList', params)
}
