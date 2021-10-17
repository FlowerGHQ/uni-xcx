/**
 * @desc 小程序自动登录
 */

'/api/oauth/v1/miniProgramLogin'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {}

export const init = new defs.oauth.SimpleResponse()

export async function request(params) {
  return http.post('/oauth/api/oauth/v1/miniProgramLogin', params)
}
