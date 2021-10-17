/**
 * @description 更新当前登录用户session接口
 */
import * as clearCurrentUser from './clearCurrentUser'
import * as getCurrentUser from './getCurrentUser'
import * as updateCurrentUser from './updateCurrentUser'
import * as updateUnionCurrentUser from './updateUnionCurrentUser'
import * as postV1ClearByGateWaySessionId from './postV1ClearByGateWaySessionId'
import * as getV1GetByGateWaySessionId from './getV1GetByGateWaySessionId'
import * as postV1UpdateByGateWaySessionId from './postV1UpdateByGateWaySessionId'
import * as postV1UpdateUnionCurrentUserByGateWaySessionId from './postV1UpdateUnionCurrentUserByGateWaySessionId'

export {
  clearCurrentUser,
  getCurrentUser,
  updateCurrentUser,
  updateUnionCurrentUser,
  postV1ClearByGateWaySessionId,
  getV1GetByGateWaySessionId,
  postV1UpdateByGateWaySessionId,
  postV1UpdateUnionCurrentUserByGateWaySessionId
}
