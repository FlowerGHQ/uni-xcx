type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value
}

declare namespace defs {
  export namespace partnersBBusiness {
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

    export class ChangeStateVo {
      /** id */
      id?: number

      /** 上下架 true 上架 false 下架 */
      state?: boolean
    }

    export class CourseBo {
      /** editTime */
      editTime?: string

      /** id */
      id?: number

      /** name */
      name?: string

      /** profitRate */
      profitRate?: number
    }

    export class DeleteCourseVo {
      /** 课程id */
      id?: number
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

    export class SaveCourseVo {
      /** 课程id */
      id?: number

      /** 课程名称 */
      name?: string

      /** 毛利率，1-100，单位% */
      profitRate?: number
    }

    export class SaveMemberCardVo {
      /** 领取结束时间 */
      applyEndTime?: string

      /** 领取开始时间 */
      applyStartTime?: string

      /** 权益说明 */
      description?: string

      /** id */
      id?: number

      /** 拓客卡名称 */
      name?: string

      /** 价值 */
      value?: number
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
  export namespace partnersBBusiness {
    /**
     * Account Controller
     */
    export namespace account {
      /**
       * 当前用户是否已登录授权
       * /account/authorized
       */
      export namespace authorized {
        export class Params {}

        export type Response = defs.partnersBBusiness.SimpleResponse<
          defs.partnersBBusiness.AccountAuthorizedDto
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersBBusiness.SimpleResponse<
            defs.partnersBBusiness.AccountAuthorizedDto
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

        export type Response = defs.partnersBBusiness.SimpleResponse<
          Array<defs.partnersBBusiness.CampusListBo>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersBBusiness.SimpleResponse<
            Array<defs.partnersBBusiness.CampusListBo>
          >
        >
      }

      /**
       * 切换默认校区
       * /campus/updateDefault
       */
      export namespace updateDefault {
        export class Params {}

        export type Response = defs.partnersBBusiness.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.partnersBBusiness.UpdateDefaultCampusVo
        ): Promise<defs.partnersBBusiness.SimpleResponse<boolean>>
      }
    }

    /**
     * Course Controller
     */
    export namespace course {
      /**
       * 删除课程
       * /course/delete
       */
      export namespace remove {
        export class Params {}

        export type Response = defs.partnersBBusiness.SimpleResponse<number>
        export const init: Response
        export function request(
          bodyParams: defs.partnersBBusiness.DeleteCourseVo
        ): Promise<defs.partnersBBusiness.SimpleResponse<number>>
      }

      /**
       * 课程列表
       * /course/list
       */
      export namespace list {
        export class Params {
          /** pageIndex */
          pageIndex: number
          /** pageSize */
          pageSize: number
        }

        export type Response = defs.partnersBBusiness.SimpleResponse<
          defs.partnersBBusiness.Page<defs.partnersBBusiness.CourseBo>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersBBusiness.SimpleResponse<
            defs.partnersBBusiness.Page<defs.partnersBBusiness.CourseBo>
          >
        >
      }

      /**
       * 保存课程
       * /course/save
       */
      export namespace save {
        export class Params {}

        export type Response = defs.partnersBBusiness.SimpleResponse<number>
        export const init: Response
        export function request(
          bodyParams: defs.partnersBBusiness.SaveCourseVo
        ): Promise<defs.partnersBBusiness.SimpleResponse<number>>
      }
    }

    /**
     * Demo Controller
     */
    export namespace demo {
      /**
       * demo
       * /demo
       */
      export namespace demo {
        export class Params {}

        export type Response = string
        export const init: Response
        export function request(params: Params): Promise<string>
      }
    }

    /**
     * Member Card Controller
     */
    export namespace memberCard {
      /**
       * 上下架
       * /memberCard/changeState
       */
      export namespace changeState {
        export class Params {}

        export type Response = defs.partnersBBusiness.SimpleResponse<boolean>
        export const init: Response
        export function request(
          bodyParams: defs.partnersBBusiness.ChangeStateVo
        ): Promise<defs.partnersBBusiness.SimpleResponse<boolean>>
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

        export type Response = defs.partnersBBusiness.SimpleResponse<
          defs.partnersBBusiness.Page<defs.partnersBBusiness.MemberCardBo>
        >
        export const init: Response
        export function request(
          params: Params
        ): Promise<
          defs.partnersBBusiness.SimpleResponse<
            defs.partnersBBusiness.Page<defs.partnersBBusiness.MemberCardBo>
          >
        >
      }

      /**
       * 保存
       * /memberCard/save
       */
      export namespace save {
        export class Params {}

        export type Response = defs.partnersBBusiness.SimpleResponse<number>
        export const init: Response
        export function request(
          bodyParams: defs.partnersBBusiness.SaveMemberCardVo
        ): Promise<defs.partnersBBusiness.SimpleResponse<number>>
      }
    }
  }
}
