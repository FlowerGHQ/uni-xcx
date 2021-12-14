// 文本多行换行操作
export const drawtextLinebreak = (ctx, t, x, y, w) => {
  //参数说明
  //ctx：canvas的 2d 对象，t：绘制的文字，x,y:文字坐标，w：文字最大宽度
  let chr = t.split('')
  let temp = ''
  let row = [] as any

  for (let a = 0; a < chr.length; a++) {
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
  row.push(temp)
  for (let b = 0; b < row.length; b++) {
    ctx.fillText(row[b], x, y + (b + 1) * 20) //每行字体y坐标间隔20
  }
}
// 绘制文本
//参数说明
//ctx：canvas的 2d 对象，color:文字颜色 f：文字大小 t：绘制的文字，x,y:文字坐标，w：文字最大宽度
export const drawText = (ctx, color, f, x, y, w) => {
  ctx.setFillStyle(color)
  ctx.setFontSize(f) //字大小
  // ctx.setTextBaseline('middle')
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
  ctx.draw(true)
}
