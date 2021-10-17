/**
 * @desc 课程列表
 */

'/course/list'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** pageIndex */
  pageIndex: number
  /** pageSize */
  pageSize: number
}

export const init = new defs.partnersBBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-b-business/course/list', params)
}
