import { Module } from 'vuex'
import { State } from 'vuex-class'
import { RootState } from '..'
import { API } from '@/models/api'
import dayjs from 'dayjs'
import { showLoading, hideLoading } from '@/utils/common'

// export interface sketchState {
//   // 将海报的数据储存起来
//   sketchFlag: Boolean
// }
const posterStore = {
  namespaced: true,
  state: {
    avatar: '',
    imageUrl: '',
    name: '',
    formObj: {},
    titleTime: '',
    school: '',
    codeUrl: ''
  },
  mutations: {
    // 修改头像和名称
    editInfo(state, value0) {
      state.name = value0.name
      state.avatar = value0.avatar
      if (value0.avatar) {
        state.avatar = value0.avatar
      } else {
        state.avatar =
          'https://greedyint-qa.oss-cn-hangzhou.aliyuncs.com/innovation/partners/partners-b-business/uploads16393661620003e392f.png'
      }
    },
    // 拓客卡详情
    cardDetail(state, value1) {
      state.formObj = Object.assign({}, value1)
      state.formObj.value = value1.value.toString()
      state.titleTime = `${dayjs(value1.applyStartTime).format(
        'YYYY-MM-DD'
      )}~ ${dayjs(value1.applyEndTime).format('YYYY-MM-DD')}`
    },
    // 校区
    editSchoolInfo(state, value2) {
      state.school = value2.name ? value2.name : '-'
      // console.log(state.school, 'stauthWriteToAlbum.scholl')
    },
    // 小程序码
    codeUrlEdit(state, value3) {
      state.codeUrl = value3.url
    }
  },
  // 异步请求海报数据
  actions: {
    // 获取头像
    getInfoPoster({ state, commit }, id) {
      // 等所有的异步加载完成之后再执行绘画代码
      //res0校区地区 res1获取二维码
      const res0 = API.partnersSBusiness.account.info.request({})
      const res1 = API.partnersSBusiness.memberCard.shareInfo.request({
        id: id
      })
      Promise.all([res0, res1])
        .then(values => {
          commit('editInfo', values[0].data)
          commit('codeUrlEdit', values[1].data)
        })
        .catch(error => {
          hideLoading()
          console.log(error)
        })
    }
  }
}

export default posterStore
