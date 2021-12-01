type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value
}

declare namespace defs {
  export namespace partnersSBusiness {
    export class AccountAuthorizedDto {
      /** 是否已登录 */
      login?: boolean
    }

    export class AccountDto {
      /** 头像url */
      avatar?: string

      /** 姓名 */
      name?: string

      /** 手机号 */
      phone?: string
    }

    export class CampusAttachmentDto {
      /** 校区附件id */
      attachmentId?: number

      /** 附件类型：1-图片，2-视频，3-文本 */
      attachmentType?: number

      /** 附件排序号 */
      orderNumber?: number

      /** oss地址或文本内容 */
      text?: string
    }

    export class CampusDetailDto {
      /** 详细地址 */
      address?: string

      /** 校区附件列表 */
      attachments?: Array<defs.partnersSBusiness.CampusAttachmentDto>

      /** 校区id */
      campusId?: number

      /** 区id */
      districtId?: number

      /** 省市区列表 */
      districts?: Array<defs.partnersSBusiness.SimpleBo>

      /** 商户id */
      merchantId?: number

      /** 校区名称 */
      name?: string

      /** 校区状态：0-冻结，1-正常 */
      state?: number
    }

    export class CampusListBo {
      /** 校区id */
      campusId?: number

      /** 是否默认校区 */
      isDefault?: boolean

      /** 商户id */
      merchantId?: number

      /** 校区名称 */
      name?: string

      /** 校区状态：0-冻结，1-正常 */
      state?: number
    }

    export class ContractDetailDto {
      /** 提成比例，1-100，单位% */
      commissionRate?: number

      /** 创建时间/历史合约修改时间 */
      createdAt?: string

      /** 合约结束时间 */
      endTime?: string

      /** 合约创建时间（第一次创建该合约的时间） */
      firstCreatedAt?: string

      /** 备注 */
      remark?: string

      /** 合约起始时间 */
      startTime?: string

      /** 合约储值金额，单位元 */
      storedAmount?: string
    }

    export class CouponDto {
      /** 是否可用 */
      canUsed?: boolean

      /** 满足金额，单位元 */
      conditionAmount?: string

      /** 优惠券说明 */
      description?: string

      /** 减金额，单位元 */
      discountAmount?: string

      /** 过期时间 */
      effectEndTime?: string

      /** 生效开始时间 */
      effectStartTime?: string

      /** 主键id */
      id?: number

      /** 优惠券名称 */
      name?: string

      /** 规则描述 */
      ruleDescription?: string

      /** 规则类型：1-满减，2赠送 */
      ruleType?: 'UN_KNOWN' | 'DISCOUNT_IF_ACHIEVE' | 'GIVE_AWAY'

      /**  状态：0-下架，1上架 */
      state?: boolean

      /** 使用范围 */
      usageRange?: string
    }

    export class CustomerListDto {
      /** 创建时间 */
      createdAt?: string

      /** 消费者id */
      id?: number

      /** 消费者姓名 */
      name?: string

      /** 消费者手机号 */
      phone?: string

      /** 总金额，单位元 */
      totalAmount?: string
    }

    export class GetTransactionListVo {
      /** 消费者id，查询客户详情交易列表时传入 */
      customerId?: number

      /** offset */
      offset?: number

      /** pageIndex */
      pageIndex?: number

      /** pageSize */
      pageSize?: number

      /** 搜索字段：消费者手机号或姓名 */
      searchKey?: string
    }

    export class MemberCardDetailDto {
      /** 领取结束时间 */
      applyEndTime?: string

      /** 领取开始时间 */
      applyStartTime?: string

      /** 关联优惠券信息 */
      couponList?: Array<defs.partnersSBusiness.CouponDto>

      /** 权益说明 */
      description?: string

      /** id */
      id?: number

      /** 拓客卡名称 */
      name?: string

      /** 状态：0-下架，1-上架 */
      state?: boolean

      /** 价值，单位元 */
      value?: string
    }

    export class MemberCardDto {
      /** 领取结束时间 */
      applyEndTime?: string

      /** 领取开始时间 */
      applyStartTime?: string

      /** 权益说明 */
      description?: string

      /** 拓客卡id */
      id?: number

      /** 拓客卡名称 */
      name?: string

      /** 状态：false-下架，true-上架 */
      state?: boolean

      /** 价值，单位元 */
      value?: string
    }

    export class MemberCardShareByWxDto {
      /** 通过微信好友列表分享拓客卡需要带的参数字符串 */
      shareParams?: string
    }

    export class MemberCardShareDto {
      /** 分享二维码图片url */
      url?: string
    }

    export class Page<T0 = any> {
      /** empty */
      empty?: boolean

      /** list */
      list?: Array<T0>

      /** next */
      next?: boolean

      /** page */
      page?: number

      /** previous */
      previous?: boolean

      /** size */
      size?: number

      /** total */
      total?: number

      /** totalPages */
      totalPages?: number
    }

    export class RewardRuleFreeCourseFixedDto {
      /** 固定奖励金金额，单位元 */
      fixedAmount?: string

      /** 奖励金方案id */
      id?: number

      /** 状态：0-关闭，1-开启 */
      state?: boolean
    }

    export class ShareholderDetailDto {
      /** 合约结束时间，无合约时返回null */
      contractEndTime?: string

      /** 合约id，无合约时返回null */
      contractId?: number

      /** 合约起始时间，无合约时返回null */
      contractStartTime?: string

      /** 合作人创建时间 */
      createdAt?: string

      /** 是否有合约 */
      hasContract?: boolean

      /** 合作人剩余储值金额，单位元 */
      leftAmount?: string

      /** 合作人待提现奖励金额，单位元 */
      leftRewardAmount?: string

      /** 合作人姓名 */
      name?: string

      /** 合作人手机号 */
      phone?: string

      /** 合作人总奖励金额，单位元 */
      rewardAmount?: string

      /** 合作人总储值金额，单位元 */
      storedAmount?: string

      /** 合作人已消费储值金额，单位元 */
      usedAmount?: string

      /** 合作人已提现奖励金额，单位元 */
      withdrawRewardAmount?: string
    }

    export class ShareholderRewardDetailDto {
      /** 奖励金变更金额，单位元 */
      amount?: string

      /** 是否撤销发放 */
      cancelWithdraw?: boolean

      /** 奖励原因 */
      courseName?: string

      /** 课程类型：1-正式课，2-试听课 */
      courseType?: number

      /** 收入/退款/发放时间 */
      createdAt?: string

      /** 客户姓名 */
      customerName?: string

      /** 合作人奖励金明细表主键id */
      id?: number

      /** 订单实际金额，单位元 */
      realAmount?: string

      /** 变更类型：1-交易新增，2-退款减少，3-奖励发放 */
      type?: number

      /** 奖励金撤销时间 */
      updatedAt?: string

      /** 发放形式：1-微信，2-支付宝，3-银行转账，4-POS机，5-现金，99-其它方式 */
      withdrawType?: number
    }

    export class SimpleBo {
      /** id */
      id?: number

      /** name */
      name?: string
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

    export class StatisticShareHolderCustomerDto {
      /** 待成交客户数，单位个 */
      noTransactionCustomerCount?: number

      /** 累计拓客数，单位个 */
      totalCustomerCount?: number

      /** 累计交易金额（交易+退款），单位元 */
      totalTransactionAmount?: string
    }

    export class StatisticShareHolderHistoryDto {
      /** 历史客源数，单位个 */
      totalCustomerCount?: number

      /** 历史奖励金 */
      totalRewardAmount?: string

      /** 历史奖励金单位 */
      totalRewardAmountUnit?: string

      /** 历史交易数，单位笔 */
      totalTransactionCount?: number
    }

    export class StatisticShareholderPeriodDto {
      /** 新增客源数，单位个 */
      increaseCustomerCount?: number

      /** 新增的奖励金额 */
      increaseRewardAmount?: string

      /** 新增的奖励金额单位 */
      increaseRewardAmountUnit?: string

      /** 新增交易数，单位笔 */
      increaseTransactionCount?: number

      /** 减少的奖励金额 */
      refundRewardAmount?: string

      /** 减少的奖励金额单位 */
      refundRewardAmountUnit?: string

      /** 退款交易数，单位笔 */
      refundTransactionCount?: number
    }

    export class StoredAmountDetailListDto {
      /** 变更金额，单位元 */
      amount?: string

      /** 是否撤销：true-是，false-否 */
      cancel?: boolean

      /** 变动时间 */
      createdAt?: string

      /** 变更类型：1-充值，2-退还，3-消费，4-消费退款 */
      type?: number
    }

    export class TransactionDetailDto {
      /** 课程名称 */
      courseName?: string

      /** 课程类型，1-正式课，2-试听课 */
      courseType?: number

      /** 消费者姓名 */
      customerName?: string

      /** 消费者手机号 */
      customerPhone?: string

      /** 额外优惠金额，单位元 */
      extraDiscountAmount?: string

      /** 是否存在退款 */
      hasRefund?: boolean

      /** 交易id */
      id?: number

      /** 课程原价，单位元 */
      originalAmount?: string

      /** 支付方式 */
      payMethodType?: string

      /** 实际交易金额，单位元 */
      realAmount?: string

      /** 退款交易id，存在退款记录时有值，否则为null */
      refundTransactionId?: number

      /** 退款交易时间，存在退款记录时有值，否则为null */
      refundTransactionTime?: string

      /** 合作人姓名 */
      shareholderName?: string

      /** 订单编号 */
      transactionNo?: string

      /** 交易时间 */
      transactionTime?: string

      /** 使用优惠券优惠金额，单位元 */
      useCouponAmount?: string

      /** 使用优惠券列表 */
      useCoupons?: Array<defs.partnersSBusiness.TransactionUseCouponDto>
    }

    export class TransactionListDto {
      /** 课程名称 */
      courseName?: string

      /** 课程类型，1-正式课，2-试听课 */
      courseType?: number

      /** 消费者id */
      customerId?: number

      /** 消费者姓名 */
      customerName?: string

      /** 消费者手机号 */
      customerPhone?: string

      /** 是否存在退款 */
      hasRefund?: boolean

      /** 正向交易id */
      id?: number

      /** 实际交易金额，单位元 */
      realAmount?: string

      /** 退款交易id，存在退款记录时有值，否则为null */
      refundTransactionId?: number

      /** 退款交易时间，存在退款记录时有值，否则为null */
      refundTransactionTime?: string

      /** 合作人id */
      shareholderId?: number

      /** 合作人姓名 */
      shareholderName?: string

      /** 正向交易时间 */
      transactionTime?: string
    }

    export class TransactionUseCouponDto {
      /** 优惠券名称 */
      couponName?: string

      /** 优惠券规则类型：1-满减，2-赠送 */
      couponRuleType?: number

      /** 优惠券金额，单位元 */
      discountAmount?: string
    }

    export class UpdateDefaultCampusVo {
      /** 校区id */
      campusId?: number
    }

    export class UpdateShareholderVo {
      /** 头像url */
      avatar?: string
    }
  }
}

declare namespace API {
  export namespace partnersSBusiness {
    /**
     * Account Controller
     */
    export namespace account {
      /**
       * 当前合作人是否已登录授权
       * /account/authorized
       */
      export namespace authorized {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.AccountAuthorizedDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.AccountAuthorizedDto
          >
        >
      }

      /**
       * 当前用户信息
       * /account/info
       */
      export namespace info {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.AccountDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.AccountDto
          >
        >
      }

      /**
       * 更新合作人用户信息
       * /account/update
       */
      export namespace update {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.partnersSBusiness.UpdateShareholderVo
        ): Promise<defs.partnersSBusiness.SimpleResponse<boolean>>
      }
    }

    /**
     * Campus Controller
     */
    export namespace campus {
      /**
       * 获取校区详情
       * /campus/detail
       */
      export namespace detail {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.CampusDetailDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.CampusDetailDto
          >
        >
      }

      /**
       * 获取校区列表
       * /campus/list
       */
      export namespace list {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          Array<defs.partnersSBusiness.CampusListBo>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            Array<defs.partnersSBusiness.CampusListBo>
          >
        >
      }

      /**
       * 切换默认校区
       * /campus/updateDefault
       */
      export namespace updateDefault {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.partnersSBusiness.UpdateDefaultCampusVo
        ): Promise<defs.partnersSBusiness.SimpleResponse<boolean>>
      }
    }

    /**
     * Contract Controller
     */
    export namespace contract {
      /**
       * 获取最新的合约详情
       * /contract/detail
       */
      export namespace detail {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.ContractDetailDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.ContractDetailDto
          >
        >
      }

      /**
       * 历史合约列表
       * /contract/historicalList
       */
      export namespace historicalList {
        export class Params {
          /** pageIndex */
          pageIndex?: number
          /** pageSize */
          pageSize?: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.Page<defs.partnersSBusiness.ContractDetailDto>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.Page<
              defs.partnersSBusiness.ContractDetailDto
            >
          >
        >
      }
    }

    /**
     * Customer Controller
     */
    export namespace customer {
      /**
       * 消费者详情
       * /customer/detail
       */
      export namespace detail {
        export class Params {
          /** @Min: 1.0 - @Max: null (until #1244 gets fixed) */
          customerId: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.CustomerListDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.CustomerListDto
          >
        >
      }

      /**
       * 消费者列表
       * /customer/list
       */
      export namespace list {
        export class Params {
          /** 成交类型：0-全部，1-已成交，2-未成交 */
          hasTransactionType?: number
          /** pageIndex */
          pageIndex?: number
          /** pageSize */
          pageSize?: number
          /** searchKey */
          searchKey?: string
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.Page<defs.partnersSBusiness.CustomerListDto>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.Page<defs.partnersSBusiness.CustomerListDto>
          >
        >
      }

      /**
       * 消费者统计
       * /customer/statistic
       */
      export namespace statistic {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.StatisticShareHolderCustomerDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.StatisticShareHolderCustomerDto
          >
        >
      }
    }

    /**
     * Member Card Controller
     */
    export namespace memberCard {
      /**
       * 拓客卡详情
       * /memberCard/detail
       */
      export namespace detail {
        export class Params {
          /** @Min: 1.0 - @Max: null (until #1244 gets fixed) */
          id: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.MemberCardDetailDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.MemberCardDetailDto
          >
        >
      }

      /**
       * 拓客卡列表
       * /memberCard/list
       */
      export namespace list {
        export class Params {
          /** pageIndex */
          pageIndex?: number
          /** pageSize */
          pageSize?: number
          /** state */
          state?: boolean
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.Page<defs.partnersSBusiness.MemberCardDto>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.Page<defs.partnersSBusiness.MemberCardDto>
          >
        >
      }

      /**
       * 获取通过二维码分享拓客卡的返回信息
       * /memberCard/shareInfo
       */
      export namespace shareInfo {
        export class Params {
          /** @Min: 1.0 - @Max: null (until #1244 gets fixed) */
          id: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.MemberCardShareDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.MemberCardShareDto
          >
        >
      }

      /**
       * 获取通过微信好友列表分享拓客卡的返回信息
       * /memberCard/shareInfoByWx
       */
      export namespace shareInfoByWx {
        export class Params {
          /** @Min: 1.0 - @Max: null (until #1244 gets fixed) */
          id: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.MemberCardShareByWxDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.MemberCardShareByWxDto
          >
        >
      }
    }

    /**
     * Reward Rule Controller
     */
    export namespace rewardRule {
      /**
       * 试听课固定奖励金方案详情
       * /rewardRule/freeCourseFixedDetail
       */
      export namespace freeCourseFixedDetail {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.RewardRuleFreeCourseFixedDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.RewardRuleFreeCourseFixedDto
          >
        >
      }
    }

    /**
     * Shareholder Controller
     */
    export namespace shareholder {
      /**
       * 获取合作人详情
       * /shareholder/detail
       */
      export namespace detail {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.ShareholderDetailDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.ShareholderDetailDto
          >
        >
      }
    }

    /**
     * Shareholder Reward Controller
     */
    export namespace shareholderReward {
      /**
       * 合作人奖励金明细分页列表
       * /shareholderReward/list
       */
      export namespace list {
        export class Params {
          /** pageIndex */
          pageIndex?: number
          /** pageSize */
          pageSize?: number
          /** 变更类型：1-交易新增，2-退款减少，3-奖励发放，不传为全部 */
          type?: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.Page<
            defs.partnersSBusiness.ShareholderRewardDetailDto
          >
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.Page<
              defs.partnersSBusiness.ShareholderRewardDetailDto
            >
          >
        >
      }
    }

    /**
     * Shareholder Stored Controller
     */
    export namespace shareholderStored {
      /**
       * 储值金明细列表
       * /shareholderStored/list
       */
      export namespace list {
        export class Params {
          /** pageIndex */
          pageIndex?: number
          /** pageSize */
          pageSize?: number
          /** 类型：1-储值金变动，2-消费变动 */
          type?: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.Page<
            defs.partnersSBusiness.StoredAmountDetailListDto
          >
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.Page<
              defs.partnersSBusiness.StoredAmountDetailListDto
            >
          >
        >
      }
    }

    /**
     * Statistic Controller
     */
    export namespace statistic {
      /**
       * 按合作人统计历史数据
       * /statistic/shareHolderHistoryData
       */
      export namespace shareHolderHistoryData {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.StatisticShareHolderHistoryDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.StatisticShareHolderHistoryDto
          >
        >
      }

      /**
       * 按合作人统计周期数据
       * /statistic/shareHolderPeriodData
       */
      export namespace shareHolderPeriodData {
        export class Params {
          /** endTime */
          endTime: string
          /** startTime */
          startTime: string
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.StatisticShareholderPeriodDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.StatisticShareholderPeriodDto
          >
        >
      }
    }

    /**
     * Transaction Controller
     */
    export namespace transaction {
      /**
       * 交易详情
       * /transaction/detail
       */
      export namespace detail {
        export class Params {
          /** 正向交易id */
          id?: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.TransactionDetailDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.TransactionDetailDto
          >
        >
      }

      /**
       * 交易列表
       * /transaction/list
       */
      export namespace list {
        export class Params {}

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.Page<defs.partnersSBusiness.TransactionListDto>
        >
        export const init: Response
        export function request(
          bodyParams: defs.partnersSBusiness.GetTransactionListVo
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.Page<
              defs.partnersSBusiness.TransactionListDto
            >
          >
        >
      }
    }
  }
}
