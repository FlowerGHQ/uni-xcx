/**
 * @desc 获取登录手机号
 */

'/account/phone'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/account/phone', params)
}
