/**
 * @desc 成为推荐官
 */

'/shareholder/saveIntroducer'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-s-business/shareholder/saveIntroducer', params)
}
