/**
 * @desc 更新合作人用户信息
 */

'/account/update'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/account/update', params)
}
