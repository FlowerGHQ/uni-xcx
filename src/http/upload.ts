// import { API } from '@/models/api'
import dayjs from 'dayjs'
import httpConfig from '@/config/http'
let url = httpConfig.cdn
let baseUrl = url[ENV] || url[__wxConfig.envVersion] || url.trial

/**
 * guid.
 * @returns {string} uid
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}
export interface UploadOptions {
  url: string
  success: (res: any) => void
  fail: (res: any) => void
  complete: (res: any) => void
}
export async function uploadFile(options: UploadOptions): Promise<any> {
  let dir = 'innovation/competition/competition-c-fe/uploads'
  // partners-b-business-fe
  // let signRes = (await API.ssbC.common.getOssMiniProgramToken.request({
  //   dir: dir
  // })) as defs.ssbC.OSSMiniProgramTokenDto
  let extension = options.url.split('.').pop()
  let path = `${dir}/${dayjs().format('YYYYMMDDhhmmss')}-${guid()}.${extension}`
  const uploadTask = wx.uploadFile({
    url: baseUrl,
    filePath: options.url,
    name: 'file',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    // formData: {
    //   key: path,
    //   policy: signRes.policy,
    //   OSSAccessKeyId: signRes.accessId,
    //   success_action_status: '200',
    //   signature: signRes.signature
    // },
    success: res => {
      if (res.statusCode !== 200) {
        options.fail(res)
      } else {
        options.success(`${baseUrl}/${path}`)
      }
    },
    fail: res => {
      options.fail(res)
    },
    complete(res) {
      options.complete(res)
    }
  })
  return uploadTask
}
