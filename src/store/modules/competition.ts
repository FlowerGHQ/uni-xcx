import { Module } from 'vuex'
import { RootState } from '..'
import {
  CompetitionDetail,
  WorkDemand,
  ApplyStatus,
  OrgInfo
} from '@/models/competition'
// import { API } from '@/models/api'

export interface CompetitionState {
  /**
   * 当前id
   */
  currentId: number
  /**
   * 当前赛事详情
   */
  currentDetail: CompetitionDetail | null
  /**
   * 当前赛事作品要求
   */
  workDemand: WorkDemand | null

  /**
   * 自定义选项
   */
  // diyOptionsInfo: defs.ssbC.DiyOptionsBo[]

  // /**
  //  * sku选项
  //  */
  // skuInfo: defs.ssbC.SkuInfoBo[]
}

const competition: Module<CompetitionState, RootState> = {
  namespaced: true,
  state: {
    currentId: 0,
    currentDetail: null,
    workDemand: null,
    // diyOptionsInfo: [],
    // skuInfo: []
  },
  mutations: {
    M_SET_CURRENT_ID(state: CompetitionState, id: number) {
      state.currentId = id
    },
    M_SET_CURRENT_DETAIL(
      state: CompetitionState,
      detail: CompetitionDetail | null
    ) {
      state.currentDetail = detail
    },
    M_SET_WORK(state: CompetitionState, workDemand: WorkDemand | null) {
      state.workDemand = workDemand
    },
    // M_SET_DIY_OPTIONS_INFO(
    //   state: CompetitionState,
    //   info: defs.ssbC.DiyOptionsBo[]
    // ) {
    //   state.diyOptionsInfo = info
    // },
    // M_SET_SKU_INFO(state: CompetitionState, info: defs.ssbC.SkuInfoBo[]) {
    //   state.skuInfo = info
    // }
  },
  actions: {
    /**
     * 获取赛事详情
     */
    async getDetail({ commit, dispatch, state }, id: number) {
      if (!id) {
        throw new Error('id不允许为空')
      }
      if (id === state.currentId && state.currentDetail) {
        return
      }
      try {
        // commit('M_SET_CURRENT_ID', id)
        // const res = (await API.ssbC.competition.detail.request({
        //   id: Number(state.currentId)
        // })) as defs.ssbC.CompetitionDetailDto
        // const detail = new CompetitionDetail(res)
        // commit('M_SET_CURRENT_DETAIL', detail)
      } catch (error) {
        throw new Error(error.message)
      }
    },
    /**
     * 获取赛事作品要求
     */
    async getWorkDemand({ commit, dispatch, state }, id: number) {
      if (!id) {
        throw new Error('id不允许为空')
      }
      if (id === state.currentId && state.workDemand) {
        return
      }
      try {
        // commit('M_SET_CURRENT_ID', id)
        // const res = (await API.ssbC.competition.worksDemandInfo.request({
        //   id: Number(state.currentId)
        // })) as defs.ssbC.WorksDemandInfoDto
        // const workDemand = new WorkDemand(res)
        // commit('M_SET_WORK', workDemand)
      } catch (error) {
        throw new Error(error.message)
      }
    },
    /**
     * 获取自定义字段
     */
    async getDiyOptionsInfo({ commit, dispatch, state }, id: number) {
      if (!id) {
        throw new Error('id不允许为空')
      }
      // if (id === state.currentId && state.diyOptionsInfo.length) {
      //   return
      // }
      // try {
      //   commit('M_SET_CURRENT_ID', id)
      //   const res = (await API.ssbC.competition.getDiyOptionsInfo.request({
      //     id: Number(state.currentId)
      //   })) as defs.ssbC.DiyOptionsBo[]
      //   commit('M_SET_DIY_OPTIONS_INFO', res || [])
      // } catch (error) {
      //   throw new Error(error.message)
      // }
    },
    /**
     * 获取sku字段
     */
    async getSku({ commit, dispatch, state }, id: number) {
      if (!id) {
        throw new Error('id不允许为空')
      }
      console.log(id)
      // if (id === state.currentId && state.skuInfo.length) {
      //   return
      // }
      // try {
      //   commit('M_SET_CURRENT_ID', id)
      //   const res = (await API.ssbC.competition.skuInfo.request({
      //     id: Number(state.currentId)
      //   })) as defs.ssbC.SkuInfoBo[]
      //   commit('M_SET_SKU_INFO', res || [])
      // } catch (error) {
      //   throw new Error(error.message)
      // }
    },
    resetDetail({ commit }) {
      commit('M_SET_CURRENT_ID', 0)
      commit('M_SET_CURRENT_DETAIL', null)
    },
    resetSignOption({ commit, state }) {
      commit('M_SET_DIY_OPTIONS_INFO', [])
      commit('M_SET_SKU_INFO', [])
    },
    resetWorkOption({ commit }) {
      commit('M_SET_WORK', null)
    }
  }
}

export default competition
