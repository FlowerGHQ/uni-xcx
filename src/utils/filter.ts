/** 过滤非数字字符 */
export function formatterDigit(value) {
  value = value.replace(/[^\d]/g, '').replace(/^0/, '')
  return value
}
/** 过滤数字和字母之外的字符 */
export function digitAndLetter(value) {
  return value.replace(/[^0-9a-zA-Z]/g, '')
}
/** 过滤中英文之外的字符 */
export function chineseAndLetter(value) {
  return value.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '')
}
/** 名字中间部分替换为* */
export function hideName(value) {
  return value.length > 2
    ? value.replace(/^(.).*(.)$/, '$1*$2')
    : value.replace(/(.)$/, '*')
}
