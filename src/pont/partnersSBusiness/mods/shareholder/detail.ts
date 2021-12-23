/**
 * @desc 获取合作人详情
 */

'/shareholder/detail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/shareholder/detail', params)
}
