/**
 * @desc 按合作人统计历史数据
 */

'/statistic/shareHolderHistoryData'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get(
    '/partners-s-business/statistic/shareHolderHistoryData',
    params
  )
}
