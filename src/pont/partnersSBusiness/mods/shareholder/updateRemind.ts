/**
 * @desc 更新升级合作人后，是否需要提醒的状态
 */

'/shareholder/updateRemind'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/shareholder/updateRemind', params)
}
