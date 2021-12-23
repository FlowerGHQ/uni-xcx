/**
 * @desc 当前用户信息
 */

'/account/info'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/account/info', params)
}
