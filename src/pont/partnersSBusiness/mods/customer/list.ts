/**
 * @desc 消费者列表
 */

'/customer/list'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** 成交类型：0-全部，1-已成交，2-未成交 */
  hasTransactionType?: number
  /** pageIndex */
  pageIndex?: number
  /** pageSize */
  pageSize?: number
  /** searchKey */
  searchKey?: string
  /** shareholderId */
  shareholderId?: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/customer/list', params)
}
