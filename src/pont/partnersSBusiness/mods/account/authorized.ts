/**
 * @desc 当前合作人是否已登录授权
 */

'/account/authorized'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/account/authorized', params)
}
