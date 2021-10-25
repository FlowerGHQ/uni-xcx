/**
 * @desc bindingRedirect
 */

'/wxoauth/WechatPublicNumberIndex'

import * as defs from '../../baseClass'
import http from '@/http'

export class Params {
  /** businessLoginRedirectUrl */
  businessLoginRedirectUrl: string
  /** channelId */
  channelId: number
  /** flashAttributes */
  flashAttributes?: object
}

export const init = ''

export async function request(params) {
  return http.get('/oauth/wxoauth/WechatPublicNumberIndex', params)
}
