// 文本多行换行操作
export const drawtextLinebreak = (ctx, t, x, y, w, rpx) => {
  //参数说明
  //ctx：canvas的 2d 对象，t：绘制的文字，x,y:文字坐标，w：文字最大宽度
  // console.log(t, '绘制文字')
  const string = t.replace(/\n/g, '<br/>')
  let chr = string.split('')
  let temp = ''
  let row = [] as any

  for (let a = 0; a < chr.length; a++) {
    if (chr[a] === '<') {
      row.push(temp)
      temp = chr[a]
    } else {
      if (
        ctx.measureText(temp).width < w &&
        ctx.measureText(temp + chr[a]).width <= w
      ) {
        temp += chr[a]
      } else {
        row.push(temp)
        temp = chr[a]
      }
    }
  }
  row.push(temp)
  let list = [] as any
  row.forEach(item => {
    if (item.indexOf('<br/>') !== -1) {
      const itemNew = item.slice(5, item.length)
      list.push(itemNew)
    } else {
      list.push(item)
    }
  })
  ctx.font = 'normal normal 16rpx sans-serif'
  // 当数组的长度超过10 重新处理
  for (let b = 0; b < row.length; b++) {
    ctx.fillText(list[b], x, y + (b + 1) * 30 * rpx) //每行字体y坐标间隔40
  }
}
// // 判断数组的长度是否超过10
// const listLength = () => {
// }
// 文字的y轴的高度 根据文字的行数决定文字宽度
export const drawHeightText = (textLength, rpx) => {
  // 绘制文字宽度
  // console.log(textLength.length, '哈哈哈')
  let yLength = 0
  let textLengthOne = textLength.length / 19
  if (0 < textLengthOne && textLengthOne <= 1) {
    yLength = 0
  } else if (1 < textLengthOne && textLengthOne <= 2) {
    yLength = 40 * rpx
  } else if (2 < textLengthOne && textLengthOne < 3) {
    yLength = yLength + 30 * rpx * 2
  } else {
    yLength = 0
  }
  return yLength
}
// 根据文本决定高度
// 绘制文本
//参数说明
//ctx：canvas的 2d 对象，color:文字颜色 f：文字大小 t：绘制的文字，x,y:文字坐标，w：文字最大宽度
export const drawText = (ctx, color, f, x, y, w) => {
  ctx.setFillStyle(color)
  ctx.setFontSize(f) //字大小
  ctx.fillText(w, x, y)
}
// 字体设置
export const drawTextFontBold = (ctx, color, f, x, y, w) => {
  ctx.setFillStyle(color)
  ctx.font = `bold ${f}px PingFangSC-Semibold`
  ctx.setFontSize(f) //字大小
  ctx.fillText(w, x, y)
}
// 生成圆角矩形
// rect 矩形 r半径 ctx canvas的 2d 对象
/**
 * 画圆角矩形
 * x 矩形x坐标
 * y 矩形y坐标
 * w 矩形w宽
 * h 矩形h高
 * r 矩形r圆角度数
 */
export const drawRoundedRect = (x, y, w, h, r, ctx, rpx) => {
  // 开始绘制
  ctx.beginPath()
  ctx.setFillStyle('#ffffff')
  // // 左上角
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  // border-top
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.lineTo(x + w, y + r)
  // 右上角
  ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  // border-right
  ctx.lineTo(x + w, y + h - r)
  ctx.lineTo(x + w - r, y + h)
  // 右下角
  ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  // border-bottom
  ctx.lineTo(x + r, y + h)
  ctx.lineTo(x, y + h - r)
  // 左下角
  ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  // border-left
  ctx.lineTo(x, y + r)
  ctx.lineTo(x + r, y)
  ctx.fill()
  ctx.closePath()
  // ctx.draw(true)
}
/**
 * 画矩形扫码框
 * x 矩形x坐标
 * y 矩形y坐标
 * w 矩形w宽
 * h 矩形h高
 * r 矩形r圆角度数
 */
export const drawBorderRect = (x, y, w, h, ctx) => {
  // 开始绘制
  ctx.beginPath()
  ctx.strokeStyle = '#e8c89f'
  ctx.lineWidth = 2
  // border-top
  // 竖着左边的上短线
  ctx.moveTo(x, y)
  ctx.lineTo(x, y + h / 3)

  // 竖着右边的上短线
  ctx.moveTo(x + w, y)
  ctx.lineTo(x + w, y + h / 3)
  // 横着上面右侧的线
  ctx.moveTo(x + w, y)
  ctx.lineTo(x + w * (2 / 3), y)
  // 横着上面左侧的短线
  ctx.moveTo(x, y)
  ctx.lineTo(x + w * (1 / 3), y)
  // 竖着底部左侧短线
  ctx.moveTo(x, y + h)
  ctx.lineTo(x, y + h * (2 / 3))
  // 竖着右侧底部短线
  ctx.moveTo(x, y + h)
  ctx.lineTo(x, y + h * (2 / 3))
  // 横着底部左侧的线
  ctx.moveTo(x, y + h)
  ctx.lineTo(x + w / 3, y + h)
  // 横着底部右侧的线
  ctx.moveTo(x + w, y + h)
  ctx.lineTo(x + w * (2 / 3), y + h)
  // 竖着底部右侧的线
  ctx.moveTo(x + w, y + h)
  ctx.lineTo(x + w, y + h * (2 / 3))
  ctx.stroke()
}
// 价值字体位置调整
export const textValueChange = (text, rpx) => {
  let textLength = 0
  for (let i = 0; i < text.length; i++) {
    textLength += 9.5 * rpx
  }
  return textLength
}
