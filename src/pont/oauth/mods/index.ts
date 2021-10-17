import * as alipayAuth from './alipayAuth'
import * as api from './api'
import * as currentUser from './currentUser'
import * as currentUserDeprecated from './currentUserDeprecated'
import * as login from './login'
import * as sms from './sms'
import * as test from './test'
import * as wechatAuth from './wechatAuth'
import * as wechatDeprecated from './wechatDeprecated'

export const oauth = {
  alipayAuth,
  api,
  currentUser,
  currentUserDeprecated,
  login,
  sms,
  test,
  wechatAuth,
  wechatDeprecated
}
