/** 判断是开发还是生产环境替换不同的appId */
let appId = 'wxb94eeef233d3d51d'

appId =
  process.env.NODE_ENV === 'production'
    ? 'wxcf3a3fd9e27ea168'
    : 'wxb94eeef233d3d51d'
export default { appId }
