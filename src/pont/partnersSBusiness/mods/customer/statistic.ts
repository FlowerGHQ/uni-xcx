/**
 * @desc 消费者统计
 */

'/customer/statistic'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/customer/statistic', params)
}
