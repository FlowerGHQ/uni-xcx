/**
 * @desc 交易列表
 */

'/transaction/list'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** 消费者id，查询客户详情交易列表时传入 */
  customerId?: number
  /** pageIndex */
  pageIndex?: number
  /** pageSize */
  pageSize?: number
  /** 搜索字段：消费者手机号或姓名 */
  searchKey?: string
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/transaction/list', params)
}
