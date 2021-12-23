type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value
}

declare namespace defs {
  export namespace oauth {
    export class CurrentUser {
      /** authenticated */
      authenticated?: boolean

      /** openId */
      openId?: string

      /** permissions */
      permissions?: Array<string>

      /** sessionTime */
      sessionTime?: number

      /** thirdPartyAppId */
      thirdPartyAppId?: string

      /** thirdPartyLoginId */
      thirdPartyLoginId?: string

      /** ucId */
      ucId?: number

      /** userToken */
      userToken?: string

      /** userUnauthorizedRedirectUrl */
      userUnauthorizedRedirectUrl?: string
    }

    export class LoginSignVo {
      /** code */
      code?: string

      /** phone */
      phone?: string
    }

    export class LoginStatusDto {
      /** loginStatus */
      loginStatus?: boolean

      /** oauthUrl */
      oauthUrl?: string
    }

    export class MiniProgramDecryptionLoginVo {
      /** encryptedData */
      encryptedData?: string

      /** iv */
      iv?: string
    }

    export class MiniProgramLoginVo {
      /** code */
      code?: string

      /** notAutoLogin */
      notAutoLogin?: boolean
    }

    export class SimpleResponse<T0 = any> {
      /** data */
      data?: T0

      /** errorCode */
      errorCode?: number

      /** errorMessage */
      errorMessage?: string

      /** status */
      status?: boolean
    }

    export class ThirdPartInfo {
      /** accessToken */
      accessToken?: string

      /** expiresIn */
      expiresIn?: number

      /** openId */
      openId?: string

      /** refreshToken */
      refreshToken?: string

      /** scope */
      scope?: string

      /** unionId */
      unionId?: string
    }

    export class UnionCurrentUser {
      /** accountId */
      accountId?: string

      /** authenticated */
      authenticated?: boolean

      /** competitionOrgId */
      competitionOrgId?: number

      /** corpInfoId */
      corpInfoId?: number

      /** corpUserId */
      corpUserId?: number

      /** currentUserSourceType */
      currentUserSourceType?: string

      /** dingUserId */
      dingUserId?: string

      /** merchantId */
      merchantId?: number

      /** merchantNo */
      merchantNo?: string

      /** openId */
      openId?: string

      /** partnerCampusId */
      partnerCampusId?: number

      /** partnerMerchantId */
      partnerMerchantId?: number

      /** partnerUserId */
      partnerUserId?: number

      /** permissions */
      permissions?: Array<string>

      /** schoolPalCloudSignId */
      schoolPalCloudSignId?: number

      /** scpUserId */
      scpUserId?: string

      /** sessionTime */
      sessionTime?: number

      /** sessionTimeStr */
      sessionTimeStr?: string

      /** thirdPartyAppId */
      thirdPartyAppId?: string

      /** thirdPartyLoginId */
      thirdPartyLoginId?: string

      /** thirdPartySessionKey */
      thirdPartySessionKey?: string

      /** ucId */
      ucId?: number

      /** userId */
      userId?: string

      /** userToken */
      userToken?: string

      /** userUnauthorizedRedirectUrl */
      userUnauthorizedRedirectUrl?: string

      /** walletAccountId */
      walletAccountId?: number

      /** walletId */
      walletId?: number

      /** xxBSourceType */
      xxBSourceType?: string
    }

    export class UserInfoDto {
      /** telNum */
      telNum?: string
    }
  }
}

declare namespace API {
  export namespace oauth {
    /**
     * 支付宝(生活号)认证接口
     */
    export namespace alipayAuth {
      /**
       * 阿里认证回调重定向获取code接口
       * /api/oauth/v1/alipay/auth/firstRedirect
       */
      export namespace firstRedirect {
        export class Params {
          /** auth_code */
          auth_code: string
          /** gs */
          gs: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 阿里认证回调转发code接口
       * /api/oauth/v1/alipay/auth/forwardCodeRedirect
       */
      export namespace forwardCodeRedirect {
        export class Params {
          /** auth_code */
          auth_code: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 阿里通过code获取user_id接口
       * /api/oauth/v1/alipay/auth/getToken
       */
      export namespace getToken {
        export class Params {
          /** app_id */
          app_id: string
          /** auth_code */
          auth_code: string
        }

        export type Response = defs.oauth.SimpleResponse<
          defs.oauth.ThirdPartInfo
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.ThirdPartInfo>>
      }

      /**
       * 阿里认证回调重定向获取code接口
       * /v1/alipay/auth/firstRedirect
       */
      export namespace getV1AlipayAuthFirstRedirect {
        export class Params {
          /** auth_code */
          auth_code: string
          /** gs */
          gs: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 阿里认证回调转发code接口
       * /v1/alipay/auth/forwardCodeRedirect
       */
      export namespace getV1AlipayAuthForwardCodeRedirect {
        export class Params {
          /** auth_code */
          auth_code: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 阿里通过code获取user_id接口
       * /v1/alipay/auth/getToken
       */
      export namespace getV1AlipayAuthGetToken {
        export class Params {
          /** app_id */
          app_id: string
          /** auth_code */
          auth_code: string
        }

        export type Response = defs.oauth.SimpleResponse<
          defs.oauth.ThirdPartInfo
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.ThirdPartInfo>>
      }
    }

    /**
     * Api Controller
     */
    export namespace api {
      /**
       * allExceptionCatchTest
       * /allExceptionCatchTest
       */
      export namespace allExceptionCatchTest {
        export class Params {
          /** name */
          name: string
        }

        export type Response = defs.oauth.SimpleResponse
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse>
      }
    }

    /**
     * 更新当前登录用户session接口
     */
    export namespace currentUser {
      /**
       * 清除登录用户session
       * /api/oauth/v1/clear/{gateWaySessionId}
       */
      export namespace clearCurrentUser {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse>
      }

      /**
       * 获取用户session
       * /api/oauth/v1/get/{gateWaySessionId}
       */
      export namespace getCurrentUser {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse<
          defs.oauth.UnionCurrentUser
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.UnionCurrentUser>>
      }

      /**
       * 更新登录用户session
       * /api/oauth/v1/update/{gateWaySessionId}
       */
      export namespace updateCurrentUser {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse<defs.oauth.CurrentUser>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.CurrentUser
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.CurrentUser>>
      }

      /**
       * 更新登录用户session
       * /api/oauth/v1/updateUnionCurrentUser/{gateWaySessionId}
       */
      export namespace updateUnionCurrentUser {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse<defs.oauth.CurrentUser>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.UnionCurrentUser
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.CurrentUser>>
      }

      /**
       * 清除登录用户session
       * /v1/clear/{gateWaySessionId}
       */
      export namespace postV1ClearByGateWaySessionId {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse>
      }

      /**
       * 获取用户session
       * /v1/get/{gateWaySessionId}
       */
      export namespace getV1GetByGateWaySessionId {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse<
          defs.oauth.UnionCurrentUser
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.UnionCurrentUser>>
      }

      /**
       * 更新登录用户session
       * /v1/update/{gateWaySessionId}
       */
      export namespace postV1UpdateByGateWaySessionId {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse<defs.oauth.CurrentUser>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.CurrentUser
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.CurrentUser>>
      }

      /**
       * 更新登录用户session
       * /v1/updateUnionCurrentUser/{gateWaySessionId}
       */
      export namespace postV1UpdateUnionCurrentUserByGateWaySessionId {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse<defs.oauth.CurrentUser>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.UnionCurrentUser
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.CurrentUser>>
      }
    }

    /**
     * Current User Deprecated Controller
     */
    export namespace currentUserDeprecated {
      /**
       * clearCurrentUser
       * /clear/{gateWaySessionId}
       */
      export namespace clearCurrentUser {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse>
      }

      /**
       * updateCurrentUser
       * /update/{gateWaySessionId}
       */
      export namespace updateCurrentUser {
        export class Params {
          /** gateWaySessionId */
          gateWaySessionId: string
        }

        export type Response = defs.oauth.SimpleResponse<defs.oauth.CurrentUser>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.CurrentUser
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.CurrentUser>>
      }
    }

    /**
     * 登录认证接口
     */
    export namespace login {
      /**
       * 获取登录页域名地址
       * /api/oauth/v1/auth/loginDomain
       */
      export namespace loginDomain {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<string>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<string>>
      }

      /**
       * 第三方登录认证总入口接口（旧）
       * /api/oauth/v1/auth/publicNumberIndex
       */
      export namespace bindingRedirect {
        export class Params {
          /** businessLoginRedirectUrl */
          businessLoginRedirectUrl: string
        }

        export type Response = string
        export const init: Response
        export function request(params: Params): Promise<string>
      }

      /**
       * 第三方登录认证总入口接口（新）
       * /api/oauth/v1/auth/thirdPartyCertification
       */
      export namespace thirdPartyCertification {
        export class Params {
          /** bizRedirectUrl */
          bizRedirectUrl: string
        }

        export type Response = defs.oauth.SimpleResponse<string>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<string>>
      }

      /**
       * wx内自动登录 21 登录失败 20 登录成功
       * /api/oauth/v1/autoLogin
       */
      export namespace autoLogin {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 登录
       * /api/oauth/v1/login
       */
      export namespace login {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.LoginSignVo
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 登出
       * /api/oauth/v1/loginOut
       */
      export namespace logOut {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 登录状态
       * /api/oauth/v1/loginStatus
       */
      export namespace loginStatus {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<
          defs.oauth.LoginStatusDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.LoginStatusDto>>
      }

      /**
       * 小程序解密手机号登录
       * /api/oauth/v1/miniProgramDecryptionLogin
       */
      export namespace miniProgramDecryptionLogin {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.MiniProgramDecryptionLoginVo
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 小程序自动登录
       * /api/oauth/v1/miniProgramLogin
       */
      export namespace miniProgramLogin {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.MiniProgramLoginVo
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 用户信息
       * /api/oauth/v1/userInfo
       */
      export namespace userInfo {
        export class Params {
          /** id */
          id?: number
          /** ucId */
          ucId?: number
        }

        export type Response = defs.oauth.SimpleResponse<defs.oauth.UserInfoDto>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.UserInfoDto>>
      }

      /**
       * 获取登录页域名地址
       * /v1/auth/loginDomain
       */
      export namespace getV1AuthLoginDomain {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<string>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<string>>
      }

      /**
       * 第三方登录认证总入口接口（旧）
       * /v1/auth/publicNumberIndex
       */
      export namespace getV1AuthPublicNumberIndex {
        export class Params {
          /** businessLoginRedirectUrl */
          businessLoginRedirectUrl: string
        }

        export type Response = string
        export const init: Response
        export function request(params: Params): Promise<string>
      }

      /**
       * 第三方登录认证总入口接口（新）
       * /v1/auth/thirdPartyCertification
       */
      export namespace getV1AuthThirdPartyCertification {
        export class Params {
          /** bizRedirectUrl */
          bizRedirectUrl: string
        }

        export type Response = defs.oauth.SimpleResponse<string>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<string>>
      }

      /**
       * wx内自动登录 21 登录失败 20 登录成功
       * /v1/autoLogin
       */
      export namespace postV1AutoLogin {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 登录
       * /v1/login
       */
      export namespace postV1Login {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.LoginSignVo
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 登出
       * /v1/loginOut
       */
      export namespace postV1LoginOut {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 登录状态
       * /v1/loginStatus
       */
      export namespace getV1LoginStatus {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<
          defs.oauth.LoginStatusDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.LoginStatusDto>>
      }

      /**
       * 小程序解密手机号登录
       * /v1/miniProgramDecryptionLogin
       */
      export namespace postV1MiniProgramDecryptionLogin {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.MiniProgramDecryptionLoginVo
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 小程序自动登录
       * /v1/miniProgramLogin
       */
      export namespace postV1MiniProgramLogin {
        export class Params {}

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.oauth.MiniProgramLoginVo
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 用户信息
       * /v1/userInfo
       */
      export namespace getV1UserInfo {
        export class Params {
          /** id */
          id?: number
          /** ucId */
          ucId?: number
        }

        export type Response = defs.oauth.SimpleResponse<defs.oauth.UserInfoDto>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<defs.oauth.UserInfoDto>>
      }
    }

    /**
     * 登录短信接口
     */
    export namespace sms {
      /**
       * 获取图形验证码
       * /api/oauth/v1/sms/image/captcha
       */
      export namespace getCaptcha {
        export class Params {}

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 验证图形验证码
       * /api/oauth/v1/sms/image/check/captcha
       */
      export namespace checkCaptcha {
        export class Params {
          /** captchaCode */
          captchaCode: string
        }

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 发送验证码短信
       * /api/oauth/v1/sms/send
       */
      export namespace send {
        export class Params {
          /** code */
          code: string
          /** phone */
          phone: string
        }

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 获取图形验证码
       * /v1/sms/image/captcha
       */
      export namespace getV1SmsImageCaptcha {
        export class Params {}

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 验证图形验证码
       * /v1/sms/image/check/captcha
       */
      export namespace getV1SmsImageCheckCaptcha {
        export class Params {
          /** captchaCode */
          captchaCode: string
        }

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }

      /**
       * 发送验证码短信
       * /v1/sms/send
       */
      export namespace getV1SmsSend {
        export class Params {
          /** code */
          code: string
          /** phone */
          phone: string
        }

        export type Response = defs.oauth.SimpleResponse<boolean>
        export const init: Response
        export function request(
          params: Params
        ): Promise<defs.oauth.SimpleResponse<boolean>>
      }
    }

    /**
     * Test Controller
     */
    export namespace test {
      /**
       * doTest
       * /api/oauth/v1/test
       */
      export namespace doTest {
        export class Params {
          /** isSleep */
          isSleep: boolean
          /** sleepTime */
          sleepTime?: number
        }

        export type Response = string
        export const init: Response
        export function request(params: Params): Promise<string>
      }

      /**
       * doTest
       * /v1/test
       */
      export namespace getV1Test {
        export class Params {
          /** isSleep */
          isSleep: boolean
          /** sleepTime */
          sleepTime?: number
        }

        export type Response = string
        export const init: Response
        export function request(params: Params): Promise<string>
      }
    }

    /**
     * 微信认证接口
     */
    export namespace wechatAuth {
      /**
       * 微信认证回调重定向获取code接口
       * /api/oauth/v1/wechat/auth/firstRedirect
       */
      export namespace firstRedirect {
        export class Params {
          /** code */
          code: string
          /** gs */
          gs: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 微信认证回调转发code接口
       * /api/oauth/v1/wechat/auth/forwardCodeRedirect
       */
      export namespace forwardCodeRedirect {
        export class Params {
          /** code */
          code: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 微信认证回调重定向获取code接口
       * /v1/wechat/auth/firstRedirect
       */
      export namespace getV1WechatAuthFirstRedirect {
        export class Params {
          /** code */
          code: string
          /** gs */
          gs: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }

      /**
       * 微信认证回调转发code接口
       * /v1/wechat/auth/forwardCodeRedirect
       */
      export namespace getV1WechatAuthForwardCodeRedirect {
        export class Params {
          /** code */
          code: string
          /** rl */
          rl: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }
    }

    /**
     * Wechat Deprecated Controller
     */
    export namespace wechatDeprecated {
      /**
       * bindingRedirect
       * /wxoauth/WechatPublicNumberIndex
       */
      export namespace bindingRedirect {
        export class Params {
          /** businessLoginRedirectUrl */
          businessLoginRedirectUrl: string
          /** channelId */
          channelId: number
          /** flashAttributes */
          flashAttributes?: object
        }

        export type Response = string
        export const init: Response
        export function request(params: Params): Promise<string>
      }

      /**
       * firstRedirect
       * /wxoauth/firstRedirect
       */
      export namespace firstRedirect {
        export class Params {
          /** flashAttributes */
          flashAttributes?: object
          /** gatewaySessionId */
          gatewaySessionId?: string
        }

        export type Response = any
        export const init: Response
        export function request(params: Params): Promise<any>
      }
    }
  }
}
