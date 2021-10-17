import dayjs from 'dayjs'

import { ApplyStatus } from '@/models/competition'

export class Receipt {
  /**
   * 报名费用
   */
  price?: number
  /**
   * 报名费用
   */
  showPrice?: string
  /**
   * 付款时间
   */
  paidAt?: string
  /**
   * 报名时间
   */
  applyTime: string
  /**
   * 活动名称
   */
  competitionName: string
  /**
   * 学校名称
   */
  orgName: string
  /**
   * 学校电话
   */
  orgContact: string
  /**
   * 学生姓名
   */
  name: string

  /**
   * 自定义字段
   */
  fields?: Field[]

  // constructor(data: defs.ssbC.ApplyInfoDto) {
  //   this.price = data.payAmount ? Number(data.payAmount) : 0
  //   this.showPrice =
  //     data.payAmount && Number(data.payAmount) > 0 ? data.payAmount : ''
  //   this.applyTime = data.applyTime
  //     ? dayjs(data.applyTime).format('YYYY-MM-DD HH:mm')
  //     : ''
  //   this.paidAt = data.payTime
  //     ? dayjs(data.payTime).format('YYYY-MM-DD HH:mm')
  //     : ''
  //   this.competitionName = data.competitionName || ''
  //   this.orgName = data.schoolName || ''
  //   this.orgContact = data.servicePhone || ''
  //   this.name = data.studentName || ''
  //   this.fields = [
  //     {
  //       name: '学生证件类型',
  //       value: data.certType || ''
  //     },
  //     {
  //       name: '证件号',
  //       value: data.certNo || ''
  //     },
  //     {
  //       name: '家长姓名',
  //       value: data.parentName || ''
  //     },
  //     {
  //       name: '手机号',
  //       value: data.parentPhone || ''
  //     },
  //     {
  //       name: '上传作品状态',
  //       value: (data.status as any) === ApplyStatus.FINISHED ? '作品已提交' : ''
  //     }
  //   ]
  // }

  /**
   * 转为打印列
   */
  toPrintable(): Printable {
    return {
      details: [
        ...(this.price
          ? [
              {
                name: '报名费用',
                value: this.price + '元',
                mark: true
              },
              {
                name: '付款方式',
                value: '微信支付'
              },
              {
                name: '付款时间',
                value: this.paidAt
              }
            ]
          : []),
        {
          name: '报名时间',
          value: this.applyTime
        },
        { name: '活动名称', value: this.competitionName },
        { name: '学校名称', value: this.orgName },
        { name: '学校电话', value: this.orgContact, callable: true }
      ],
      info: [{ name: '学生姓名', value: this.name }, ...(this.fields || [])]
    } as Printable
  }
}
interface Row {
  /**
   * 显示名称
   */
  name: string
  /**
   * 显示值
   */
  value: string
  /**
   * 是否特殊标记
   */
  mark?: boolean
  /**
   * 是否可拨打
   */
  callable?: boolean
}
export interface Field {
  /**
   * 字段显示名称
   */
  name: string
  /**
   * 字段值
   */
  value: string
}
export interface Printable {
  /**
   * 详细信息
   */
  details: Row[]
  /**
   * 报名信息
   */
  info: Row[]
}
