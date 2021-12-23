/**
 * @desc 储值金明细列表
 */

'/shareholderStored/list'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** pageIndex */
  pageIndex?: number
  /** pageSize */
  pageSize?: number
  /** 类型：1-储值金变动，2-消费变动 */
  type?: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/shareholderStored/list', params)
}
