/**
 * @desc 获取图形验证码
 */

'/api/oauth/v1/sms/image/captcha'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = undefined

export async function request(params) {
  return http.get('/oauth/api/oauth/v1/sms/image/captcha', params)
}
