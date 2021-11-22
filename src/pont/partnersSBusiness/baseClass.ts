class AccountAuthorizedDto {
  /** 是否已登录 */
  login = false
}

class AccountDto {
  /** 头像url */
  avatar = ''

  /** 姓名 */
  name = ''

  /** 手机号 */
  phone = ''
}

class CampusAttachmentDto {
  /** 校区附件id */
  attachmentId = undefined

  /** 附件类型：1-图片，2-视频，3-文本 */
  attachmentType = undefined

  /** 附件排序号 */
  orderNumber = undefined

  /** oss地址或文本内容 */
  text = ''
}

class CampusDetailDto {
  /** 详细地址 */
  address = ''

  /** 校区附件列表 */
  attachments = []

  /** 校区id */
  campusId = undefined

  /** 区id */
  districtId = undefined

  /** 商户id */
  merchantId = undefined

  /** 校区名称 */
  name = ''

  /** 校区状态：0-冻结，1-正常 */
  state = undefined
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
  storedAmount = ''
}

class CouponDto {
  /** 是否可用 */
  canUsed = false

  /** 满足金额，单位元 */
  conditionAmount = ''

  /** 优惠券说明 */
  description = ''

  /** 减金额，单位元 */
  discountAmount = ''

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

class CustomerListDto {
  /** 创建时间 */
  createdAt = ''

  /** 消费者id */
  id = undefined

  /** 消费者姓名 */
  name = ''

  /** 消费者手机号 */
  phone = ''

  /** 总金额，单位元 */
  totalAmount = ''
}

class GetTransactionListVo {
  /** 消费者id，查询客户详情交易列表时传入 */
  customerId = undefined

  /** offset */
  offset = undefined

  /** pageIndex */
  pageIndex = undefined

  /** pageSize */
  pageSize = undefined

  /** 搜索字段：消费者手机号或姓名 */
  searchKey = ''
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
  value = ''
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
  value = ''
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
  leftAmount = ''

  /** 合作人待提现奖励金额，单位元 */
  leftRewardAmount = ''

  /** 合作人姓名 */
  name = ''

  /** 合作人手机号 */
  phone = ''

  /** 合作人总奖励金额，单位元 */
  rewardAmount = ''

  /** 合作人总储值金额，单位元 */
  storedAmount = ''

  /** 合作人已消费储值金额，单位元 */
  usedAmount = ''

  /** 合作人已提现奖励金额，单位元 */
  withdrawRewardAmount = ''
}

class ShareholderRewardDetailDto {
  /** 奖励金变更金额，单位元 */
  amount = ''

  /** 是否撤销发放 */
  cancelWithdraw = false

  /** 奖励原因 */
  courseName = ''

  /** 收入/退款/发放时间 */
  createdAt = ''

  /** 客户姓名 */
  customerName = ''

  /** 合作人奖励金明细表主键id */
  id = undefined

  /** 订单实际金额，单位元 */
  realAmount = ''

  /** 变更类型：1-交易新增，2-退款减少，3-奖励发放 */
  type = undefined

  /** 发放形式：1-微信，2-支付宝，3-银行转账，4-POS机，5-现金，99-其它方式 */
  withdrawType = undefined
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

class StatisticShareHolderCustomerDto {
  /** 待成交客户数，单位个 */
  noTransactionCustomerCount = undefined

  /** 累计拓客数，单位个 */
  totalCustomerCount = undefined

  /** 累计交易金额（交易+退款），单位元 */
  totalTransactionAmount = ''
}

class StatisticShareHolderHistoryDto {
  /** 历史客源数，单位个 */
  totalCustomerCount = undefined

  /** 历史奖励金 */
  totalRewardAmount = ''

  /** 历史奖励金单位 */
  totalRewardAmountUnit = ''

  /** 历史交易数，单位笔 */
  totalTransactionCount = undefined
}

class StatisticShareholderPeriodDto {
  /** 新增客源数，单位个 */
  increaseCustomerCount = undefined

  /** 新增的奖励金额 */
  increaseRewardAmount = ''

  /** 新增的奖励金额单位 */
  increaseRewardAmountUnit = ''

  /** 新增交易数，单位笔 */
  increaseTransactionCount = undefined

  /** 减少的奖励金额 */
  refundRewardAmount = ''

  /** 减少的奖励金额单位 */
  refundRewardAmountUnit = ''

  /** 退款交易数，单位笔 */
  refundTransactionCount = undefined
}

class StoredAmountDetailListDto {
  /** 变更金额，单位元 */
  amount = ''

  /** 是否撤销：true-是，false-否 */
  cancel = false

  /** 变动时间 */
  createdAt = ''

  /** 变更类型：1-充值，2-退还，3-消费，4-消费退款 */
  type = undefined
}

class TransactionDetailDto {
  /** 课程名称 */
  courseName = ''

  /** 消费者姓名 */
  customerName = ''

  /** 消费者手机号 */
  customerPhone = ''

  /** 额外优惠金额，单位元 */
  extraDiscountAmount = ''

  /** 是否存在退款 */
  hasRefund = false

  /** 交易id */
  id = undefined

  /** 课程原价，单位元 */
  originalAmount = ''

  /** 支付方式 */
  payMethodType = ''

  /** 实际交易金额，单位元 */
  realAmount = ''

  /** 退款交易id，存在退款记录时有值，否则为null */
  refundTransactionId = undefined

  /** 退款交易时间，存在退款记录时有值，否则为null */
  refundTransactionTime = ''

  /** 合作人姓名 */
  shareholderName = ''

  /** 订单编号 */
  transactionNo = ''

  /** 交易时间 */
  transactionTime = ''

  /** 使用优惠券优惠金额，单位元 */
  useCouponAmount = ''

  /** 使用优惠券列表 */
  useCoupons = []
}

class TransactionListDto {
  /** 课程名称 */
  courseName = ''

  /** 消费者id */
  customerId = undefined

  /** 消费者姓名 */
  customerName = ''

  /** 消费者手机号 */
  customerPhone = ''

  /** 是否存在退款 */
  hasRefund = false

  /** 正向交易id */
  id = undefined

  /** 实际交易金额，单位元 */
  realAmount = ''

  /** 退款交易id，存在退款记录时有值，否则为null */
  refundTransactionId = undefined

  /** 退款交易时间，存在退款记录时有值，否则为null */
  refundTransactionTime = ''

  /** 合作人id */
  shareholderId = undefined

  /** 合作人姓名 */
  shareholderName = ''

  /** 正向交易时间 */
  transactionTime = ''
}

class TransactionUseCouponDto {
  /** 优惠券名称 */
  couponName = ''

  /** 优惠券规则类型：1-满减，2-赠送 */
  couponRuleType = undefined

  /** 优惠券金额，单位元 */
  discountAmount = ''
}

class UpdateDefaultCampusVo {
  /** 校区id */
  campusId = undefined
}

class UpdateShareholderVo {
  /** 头像url */
  avatar = ''
}

export const partnersSBusiness = {
  AccountAuthorizedDto,
  AccountDto,
  CampusAttachmentDto,
  CampusDetailDto,
  CampusListBo,
  ContractDetailDto,
  CouponDto,
  CustomerListDto,
  GetTransactionListVo,
  MemberCardDetailDto,
  MemberCardDto,
  MemberCardShareDto,
  Page,
  ShareholderDetailDto,
  ShareholderRewardDetailDto,
  SimpleResponse,
  StatisticShareHolderCustomerDto,
  StatisticShareHolderHistoryDto,
  StatisticShareholderPeriodDto,
  StoredAmountDetailListDto,
  TransactionDetailDto,
  TransactionListDto,
  TransactionUseCouponDto,
  UpdateDefaultCampusVo,
  UpdateShareholderVo
}
