/**
 * @desc 获取最新的合约详情
 */

'/contract/detail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/contract/detail', params)
}
