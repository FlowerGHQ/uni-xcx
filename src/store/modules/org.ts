import { Module } from 'vuex'
import { RootState } from '..'
import weuse from 'weuse'
import { OrgInfo } from '@/models/competition'
// import { API } from '@/models/api'

export interface OrgState {
  /**
   * 当前赛事所带的机构id
   */
  orgId: number

  /**
   * 赛事的机构信息
   */
  orgInfo: OrgInfo | null
}

const org: Module<OrgState, RootState> = {
  namespaced: true,
  state: {
    orgId: 0,
    orgInfo: null
  },
  mutations: {
    M_SET_ORG_ID(state: OrgState, orgId: number) {
      state.orgId = orgId
    },
    M_SET_ORG_INFO(state: OrgState, orgInfo: OrgInfo | null) {
      state.orgInfo = orgInfo
    }
  },
  actions: {
    async setOrgId({ commit, dispatch, state }, { orgId, id }) {
      let storage = ''
      try {
        const res = await weuse.wx.getStorage({ key: 'orgId' })
        if (res) {
          storage = res.data || ''
        }
      } catch (e) {
        storage = ''
      }
      let orgIdConfig: Object = (storage && JSON.parse(storage)) || {}
      if (orgId && orgId > 0) {
        orgIdConfig[`detail_${id}`] = orgId
        await weuse.wx.setStorage({
          key: 'orgId',
          data: JSON.stringify(orgIdConfig)
        })
      }
      commit('M_SET_ORG_ID', orgIdConfig[`detail_${id}`] || 0)
    },
    async getOrgId({ commit, dispatch, state }, id: number) {
      let storage = ''
      try {
        const res = await weuse.wx.getStorage({ key: 'orgId' })
        if (res) {
          storage = res.data || ''
        }
      } catch (e) {
        storage = ''
      }
      let orgIdConfig: Object = (storage && JSON.parse(storage)) || {}
      let orgId = orgIdConfig[`detail_${id}`] || 0
      commit('M_SET_ORG_ID', orgId)
    },
  }
}

export default org
