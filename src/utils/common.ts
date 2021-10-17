export function validatePhone(phone) {
  let phoneRegexp = /^(0[0-9]{2,3})?([2-9][0-9]{6,7})$|(^(1[3-9])\d{9}$)/
  if (!phone) {
    return false
  }
  if (!phoneRegexp.test(phone)) {
    return false
  }
  return true
}

/**
 * 创建querystring
 * @param {{[key: string]: any}} query
 */
export function querystring(query) {
  return Object.entries(query)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
}

/**
 * 兼容解析普通query参数及小程序码或二维码传入的query参数
 *
 * @param {object} query Query
 * @returns {{[key: string]: string}}
 */
export function decodeQuery(query) {
  let qs
  if (query.scene) {
    qs = decodeURIComponent(query.scene)
  } else if (query.q) {
    const url = decodeURIComponent(query.q)
    const [, arg] = url.split('?')
    qs = arg
  } else {
    return query
  }
  return qs
    ? qs
        .split('&')
        .map(i => i.split('='))
        .reduce((o, [k, v]) => Object.assign(o, { [k]: v }), {})
    : {}
}

export function padZero(num, targetLength = 2) {
  let str = num + ''
  while (str.length < targetLength) {
    str = '0' + str
  }
  return str
}

export function hidePhone(phone: string) {
  if (!phone) {
    return phone
  }
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function showLoading(title = '加载中', mask = false) {
  wx.showLoading({
    title,
    mask
  })
}

export function hideLoading() {
  wx.hideLoading()
}
