/**
 * @desc 上下架
 */

'/memberCard/changeState'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersBBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-b-business/memberCard/changeState', params)
}
