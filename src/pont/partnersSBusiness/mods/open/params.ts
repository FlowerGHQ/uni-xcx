/**
 * @desc 获取请求参数信息
 */

'/open/campus/params'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** code */
  code: string
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/open/campus/params', params)
}
