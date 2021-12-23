/**
 * @desc 获取校区详情
 */

'/campus/detail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/campus/detail', params)
}
