/**
 * @desc 交易列表
 */

'/transaction/list'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/transaction/list', params)
}
