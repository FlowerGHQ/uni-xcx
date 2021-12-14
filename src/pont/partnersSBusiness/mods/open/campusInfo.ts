/**
 * @desc 获取校区信息
 */

'/open/campus/info'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/open/campus/info', params)
}
