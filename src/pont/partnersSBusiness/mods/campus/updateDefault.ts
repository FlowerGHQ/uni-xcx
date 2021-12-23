/**
 * @desc 切换默认校区
 */

'/campus/updateDefault'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/campus/updateDefault', params)
}
