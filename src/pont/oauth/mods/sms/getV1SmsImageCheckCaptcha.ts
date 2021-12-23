/**
 * @desc 验证图形验证码
 */

'/v1/sms/image/check/captcha'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** captchaCode */
  captchaCode: string
}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.get('/oauth/v1/sms/image/check/captcha', params)
}
