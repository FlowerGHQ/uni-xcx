/**
 * @desc 获取校区列表
 */

'/campus/list'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersBBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-b-business/campus/list', params)
}
