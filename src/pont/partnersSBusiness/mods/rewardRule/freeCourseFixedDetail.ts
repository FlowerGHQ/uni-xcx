/**
 * @desc 试听课固定奖励金方案详情
 */

'/rewardRule/freeCourseFixedDetail'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get(
    '/partners-s-business/rewardRule/freeCourseFixedDetail',
    params
  )
}
