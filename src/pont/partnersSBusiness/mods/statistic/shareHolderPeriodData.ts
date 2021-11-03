/**
 * @desc 按合作人统计周期数据
 */

'/statistic/shareHolderPeriodData'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** endTime */
  endTime: string
  /** startTime */
  startTime: string
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get(
    '/partners-s-business/statistic/shareHolderPeriodData',
    params
  )
}
