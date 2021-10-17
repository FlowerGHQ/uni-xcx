/**
 * @desc 当前用户是否已登录授权
 */

'/account/authorized'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersBBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-b-business/account/authorized', params)
}
