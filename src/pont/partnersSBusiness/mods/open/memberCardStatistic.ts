/**
 * @desc 获取拓客卡统计信息
 */

'/open/memberCard/statistic'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/open/memberCard/statistic', params)
}
