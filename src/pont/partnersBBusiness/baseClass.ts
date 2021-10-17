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

class ChangeStateVo {
  /** id */
  id = undefined

  /** 上下架 true 上架 false 下架 */
  state = false
}

class CourseBo {
  /** editTime */
  editTime = ''

  /** id */
  id = undefined

  /** name */
  name = ''

  /** profitRate */
  profitRate = undefined
}

class DeleteCourseVo {
  /** 课程id */
  id = undefined
}

class MemberCardBo {
  /** applyEndTime */
  applyEndTime = ''

  /** applyStartTime */
  applyStartTime = ''

  /** description */
  description = ''

  /** id */
  id = undefined

  /** name */
  name = ''

  /** state */
  state = false

  /** value */
  value = undefined
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

class SaveCourseVo {
  /** 课程id */
  id = undefined

  /** 课程名称 */
  name = ''

  /** 毛利率，1-100，单位% */
  profitRate = undefined
}

class SaveMemberCardVo {
  /** 领取结束时间 */
  applyEndTime = ''

  /** 领取开始时间 */
  applyStartTime = ''

  /** 权益说明 */
  description = ''

  /** id */
  id = undefined

  /** 拓客卡名称 */
  name = ''

  /** 价值 */
  value = undefined
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

export const partnersBBusiness = {
  AccountAuthorizedDto,
  CampusListBo,
  ChangeStateVo,
  CourseBo,
  DeleteCourseVo,
  MemberCardBo,
  Page,
  SaveCourseVo,
  SaveMemberCardVo,
  SimpleResponse,
  UpdateDefaultCampusVo
}
