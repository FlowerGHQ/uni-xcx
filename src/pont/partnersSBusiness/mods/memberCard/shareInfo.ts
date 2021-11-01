/**
 * @desc 获取分享拓客卡信息
 */

'/memberCard/shareInfo'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** @Min: 1.0 - @Max: null (until #1244 gets fixed) */
  id: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/memberCard/shareInfo', params)
}
