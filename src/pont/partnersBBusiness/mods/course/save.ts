/**
 * @desc 保存课程
 */

'/course/save'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersBBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-b-business/course/save', params)
}
