/**
 * @desc 获取交易退款列表
 */

'/transaction/refundList'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/transaction/refundList', params)
}
