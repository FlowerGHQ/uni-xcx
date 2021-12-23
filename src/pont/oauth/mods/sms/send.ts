/**
 * @desc 发送验证码短信
 */

'/api/oauth/v1/sms/send'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** code */
  code: string
  /** phone */
  phone: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/sms/send', params)
}
