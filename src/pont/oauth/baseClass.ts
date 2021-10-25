class CurrentUser {
  /** authenticated */
  authenticated = false

  /** openId */
  openId = ''

  /** permissions */
  permissions = []

  /** sessionTime */
  sessionTime = undefined

  /** thirdPartyAppId */
  thirdPartyAppId = ''

  /** thirdPartyLoginId */
  thirdPartyLoginId = ''

  /** ucId */
  ucId = undefined

  /** userToken */
  userToken = ''

  /** userUnauthorizedRedirectUrl */
  userUnauthorizedRedirectUrl = ''
}

class LoginSignVo {
  /** code */
  code = ''

  /** phone */
  phone = ''
}

class LoginStatusDto {
  /** loginStatus */
  loginStatus = false

  /** oauthUrl */
  oauthUrl = ''
}

class MiniProgramDecryptionLoginVo {
  /** encryptedData */
  encryptedData = ''

  /** iv */
  iv = ''
}

class MiniProgramLoginVo {
  /** code */
  code = ''

  /** notAutoLogin */
  notAutoLogin = false
}

class SimpleResponse {
  /** data */
  data = new CurrentUser()

  /** errorCode */
  errorCode = undefined

  /** errorMessage */
  errorMessage = ''

  /** status */
  status = false
}

class ThirdPartInfo {
  /** accessToken */
  accessToken = ''

  /** expiresIn */
  expiresIn = undefined

  /** openId */
  openId = ''

  /** refreshToken */
  refreshToken = ''

  /** scope */
  scope = ''

  /** unionId */
  unionId = ''
}

class UnionCurrentUser {
  /** accountId */
  accountId = ''

  /** authenticated */
  authenticated = false

  /** competitionOrgId */
  competitionOrgId = undefined

  /** corpInfoId */
  corpInfoId = undefined

  /** corpUserId */
  corpUserId = undefined

  /** currentUserSourceType */
  currentUserSourceType = ''

  /** dingUserId */
  dingUserId = ''

  /** merchantId */
  merchantId = undefined

  /** merchantNo */
  merchantNo = ''

  /** openId */
  openId = ''

  /** partnerCampusId */
  partnerCampusId = undefined

  /** partnerMerchantId */
  partnerMerchantId = undefined

  /** partnerUserId */
  partnerUserId = undefined

  /** permissions */
  permissions = []

  /** schoolPalCloudSignId */
  schoolPalCloudSignId = undefined

  /** scpUserId */
  scpUserId = ''

  /** sessionTime */
  sessionTime = undefined

  /** sessionTimeStr */
  sessionTimeStr = ''

  /** thirdPartyAppId */
  thirdPartyAppId = ''

  /** thirdPartyLoginId */
  thirdPartyLoginId = ''

  /** thirdPartySessionKey */
  thirdPartySessionKey = ''

  /** ucId */
  ucId = undefined

  /** userId */
  userId = ''

  /** userToken */
  userToken = ''

  /** userUnauthorizedRedirectUrl */
  userUnauthorizedRedirectUrl = ''

  /** walletAccountId */
  walletAccountId = undefined

  /** walletId */
  walletId = undefined

  /** xxBSourceType */
  xxBSourceType = ''
}

class UserInfoDto {
  /** telNum */
  telNum = ''
}

export const oauth = {
  CurrentUser,
  LoginSignVo,
  LoginStatusDto,
  MiniProgramDecryptionLoginVo,
  MiniProgramLoginVo,
  SimpleResponse,
  ThirdPartInfo,
  UnionCurrentUser,
  UserInfoDto
}
