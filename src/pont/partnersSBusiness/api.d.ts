type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value
}

declare namespace defs {
  export namespace partnersSBusiness {
    export class AccountAuthorizedDto {
      /** 是否已登录 */
      login?: boolean
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

      /** 备注 */
      remark?: string

      /** 合约起始时间 */
      startTime?: string

      /** 合约储值金额，单位元 */
      storedAmount?: number
    }

    export class CouponBo {
      /** 是否可用 */
      canUsed?: boolean

      /** 满足金额，单位分 */
      conditionAmount?: number

      /** 优惠券说明 */
      description?: string

      /** 减金额，单位分 */
      discountAmount?: number

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

      /**  规则类型：1-满减，2赠送 */
      ruleType?: number

      /**  状态：0-下架，1上架 */
      state?: boolean

      /** 使用范围 */
      usageRange?: string
    }

    export class MemberCardBo {
      /** applyEndTime */
      applyEndTime?: string

      /** applyStartTime */
      applyStartTime?: string

      /** description */
      description?: string

      /** id */
      id?: number

      /** name */
      name?: string

      /** state */
      state?: boolean

      /** value */
      value?: number
    }

    export class MemberCardDetailBo {
      /** 领取结束时间 */
      applyEndTime?: string

      /** 领取开始时间 */
      applyStartTime?: string

      /** 关联优惠券信息 */
      couponList?: Array<defs.partnersSBusiness.CouponBo>

      /** 权益说明 */
      description?: string

      /** id */
      id?: number

      /** 拓客卡名称 */
      name?: string

      /** 状态：0-下架，1-上架 */
      state?: boolean

      /** 价值 */
      value?: number
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
      leftAmount?: number

      /** 合作人待提现奖励金额，单位元 */
      leftRewardAmount?: number

      /** 合作人姓名 */
      name?: string

      /** 合作人手机号 */
      phone?: string

      /** 合作人总奖励金额，单位元 */
      rewardAmount?: number

      /** 合作人总储值金额，单位元 */
      storedAmount?: number

      /** 合作人已消费储值金额，单位元 */
      usedAmount?: number

      /** 合作人已提现奖励金额，单位元 */
      withdrawRewardAmount?: number
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

    export class UpdateDefaultCampusVo {
      /** 校区id */
      campusId?: number
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
    }

    /**
     * Campus Controller
     */
    export namespace campus {
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
     * Member Card Controller
     */
    export namespace memberCard {
      /**
       * 详情
       * /memberCard/detail
       */
      export namespace detail {
        export class Params {
          /** id */
          id: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.MemberCardDetailBo
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.MemberCardDetailBo
          >
        >
      }

      /**
       * 列表
       * /memberCard/list
       */
      export namespace list {
        export class Params {
          /** pageIndex */
          pageIndex: number
          /** pageSize */
          pageSize: number
        }

        export type Response = defs.partnersSBusiness.SimpleResponse<
          defs.partnersSBusiness.Page<defs.partnersSBusiness.MemberCardBo>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersSBusiness.SimpleResponse<
            defs.partnersSBusiness.Page<defs.partnersSBusiness.MemberCardBo>
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
  }
}
