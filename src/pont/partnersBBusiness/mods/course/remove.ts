/**
 * @desc 删除课程
 */

'/course/delete'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersBBusiness.SimpleResponse()

export async function request(params) {
  return http.post('/partners-b-business/course/delete', params)
}
