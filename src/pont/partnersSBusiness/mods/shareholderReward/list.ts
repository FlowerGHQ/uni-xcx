/**
 * @desc 合作人奖励金明细分页列表
 */

'/shareholderReward/list'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** pageIndex */
  pageIndex?: number
  /** pageSize */
  pageSize?: number
  /** 变更类型：1-交易新增，2-退款减少，3-奖励发放，不传为全部 */
  type?: number
}

export const init = new defs.partnersSBusiness.SimpleResponse()

export async function request(params) {
  return http.get('/partners-s-business/shareholderReward/list', params)
}
