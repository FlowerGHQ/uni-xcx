import { Module } from 'vuex'
import { RootState } from '..'
// import { API } from '@/models/api'
import weuse from 'weuse'
import { ApiError } from '@/http'

export interface AccountState {
  /**
   * 是否已验证身份
   */
  authenticated: boolean
  /**
   * 当前用户是否登录
   */
  logined: boolean
  /**
   * 登录手机号
   */
  phone: string
}
const account: Module<AccountState, RootState> = {
  namespaced: true,
  state: {
    authenticated: false,
    logined: false,
    phone: ''
  },
  mutations: {
    M_SET_AUTHENTICATED(state: AccountState, authenticated: boolean) {
      state.authenticated = authenticated
    },
    M_SET_LOGINED(state: AccountState, logined: boolean) {
      state.logined = logined
    },
    M_SET_PHONE(state: AccountState, phone: string) {
      state.phone = phone
    }
  },
  actions: {
    /**
     * 身份验证(检查会话ID, 不存在则进行登录;)
     */
    async auth({ commit, dispatch, state }) {
      if (state.authenticated) {
        return
      }
      await dispatch('getAccount')
    },

    /**
     * 获取用户信息
     */
    async getAccount({ commit, dispatch }) {
      // try {
      //   let res = (await API.ssbC.account.authorized.request(
      //     {}
      //   )) as defs.ssbC.AccountAuthorizedDto
      //   if (!res.logged) {
      //     throw new ApiError(-9999, '用户未授权登录')
      //   } else {
      //     commit('M_SET_LOGINED', true)
      //     commit('M_SET_PHONE', res.phone)
      //     commit('M_SET_AUTHENTICATED', true)
      //   }
      // } catch (e) {
      //   if (e.code === -9999 || e.code === 401) {
      //     await dispatch('login')
      //   } else {
      //     throw new Error(e.message)
      //   }
      // }
    },
    /**
     * code免登
     */
    async login({ commit, dispatch }) {
      const data = await weuse.wx.login()
      // try {
      //   let res = await API.oauth.login.miniProgramLogin.request({
      //     code: data.code
      //   })
      //   if (res) {
      //     await dispatch('getAccount')
      //   }
      // } catch (e) {
      //   throw new Error('免登失败')
      // }
    },
    /**
     * 手机号授权登录
     */
    async decryptionLogin({ commit, dispatch }, { iv, encryptedData }) {
      // try {
      //   await API.oauth.login.miniProgramDecryptionLogin.request({
      //     iv,
      //     encryptedData
      //   })
      //   await dispatch('getAccount')
      // } catch (e) {
      //   throw new Error(e)
      // }
    },
    /**
     * 重置
     */
    async reset({ commit, dispatch }) {
      commit('M_SET_AUTHENTICATED', false)
      commit('M_SET_LOGINED', false)
      commit('M_SET_PHONE', '')
    }
  }
}

export default account
