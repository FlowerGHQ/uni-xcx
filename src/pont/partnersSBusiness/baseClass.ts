class AccountAuthorizedDto {
  /** 是否已登录 */
  login = false
}

class CampusListBo {
  /** 校区id */
  campusId = undefined

  /** 是否默认校区 */
  isDefault = false

  /** 商户id */
  merchantId = undefined

  /** 校区名称 */
  name = ''

  /** 校区状态：0-冻结，1-正常 */
  state = undefined
}

class ContractDetailDto {
  /** 提成比例，1-100，单位% */
  commissionRate = undefined

  /** 创建时间/历史合约修改时间 */
  createdAt = ''

  /** 合约结束时间 */
  endTime = ''

  /** 备注 */
  remark = ''

  /** 合约起始时间 */
  startTime = ''

  /** 合约储值金额，单位元 */
  storedAmount = undefined
}

class CouponDto {
  /** 是否可用 */
  canUsed = false

  /** 满足金额，单位元 */
  conditionAmount = undefined

  /** 优惠券说明 */
  description = ''

  /** 减金额，单位元 */
  discountAmount = undefined

  /** 过期时间 */
  effectEndTime = ''

  /** 生效开始时间 */
  effectStartTime = ''

  /** 主键id */
  id = undefined

  /** 优惠券名称 */
  name = ''

  /** 规则描述 */
  ruleDescription = ''

  /** 规则类型：1-满减，2赠送 */
  ruleType = 'UN_KNOWN'

  /**  状态：0-下架，1上架 */
  state = false

  /** 使用范围 */
  usageRange = ''
}

class MemberCardDetailDto {
  /** 领取结束时间 */
  applyEndTime = ''

  /** 领取开始时间 */
  applyStartTime = ''

  /** 关联优惠券信息 */
  couponList = []

  /** 权益说明 */
  description = ''

  /** id */
  id = undefined

  /** 拓客卡名称 */
  name = ''

  /** 状态：0-下架，1-上架 */
  state = false

  /** 价值，单位元 */
  value = undefined
}

class MemberCardDto {
  /** 领取结束时间 */
  applyEndTime = ''

  /** 领取开始时间 */
  applyStartTime = ''

  /** 权益说明 */
  description = ''

  /** 拓客卡id */
  id = undefined

  /** 拓客卡名称 */
  name = ''

  /** 状态：false-下架，true-上架 */
  state = false

  /** 价值，单位元 */
  value = undefined
}

class MemberCardShareDto {
  /** 分享二维码图片url */
  url = ''
}

class Page {
  /** empty */
  empty = false

  /** list */
  list = []

  /** next */
  next = false

  /** page */
  page = undefined

  /** previous */
  previous = false

  /** size */
  size = undefined

  /** total */
  total = undefined

  /** totalPages */
  totalPages = undefined
}

class ShareholderDetailDto {
  /** 合约结束时间，无合约时返回null */
  contractEndTime = ''

  /** 合约id，无合约时返回null */
  contractId = undefined

  /** 合约起始时间，无合约时返回null */
  contractStartTime = ''

  /** 合作人创建时间 */
  createdAt = ''

  /** 是否有合约 */
  hasContract = false

  /** 合作人剩余储值金额，单位元 */
  leftAmount = undefined

  /** 合作人待提现奖励金额，单位元 */
  leftRewardAmount = undefined

  /** 合作人姓名 */
  name = ''

  /** 合作人手机号 */
  phone = ''

  /** 合作人总奖励金额，单位元 */
  rewardAmount = undefined

  /** 合作人总储值金额，单位元 */
  storedAmount = undefined

  /** 合作人已消费储值金额，单位元 */
  usedAmount = undefined

  /** 合作人已提现奖励金额，单位元 */
  withdrawRewardAmount = undefined
}

class SimpleResponse {
  /** data */
  data = new AccountAuthorizedDto()

  /** errorCode */
  errorCode = undefined

  /** errorMessage */
  errorMessage = ''

  /** status */
  status = false
}

class UpdateDefaultCampusVo {
  /** 校区id */
  campusId = undefined
}

export const partnersSBusiness = {
  AccountAuthorizedDto,
  CampusListBo,
  ContractDetailDto,
  CouponDto,
  MemberCardDetailDto,
  MemberCardDto,
  MemberCardShareDto,
  Page,
  ShareholderDetailDto,
  SimpleResponse,
  UpdateDefaultCampusVo
}
