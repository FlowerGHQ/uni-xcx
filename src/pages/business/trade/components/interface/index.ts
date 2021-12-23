export interface dataType {
  textColor: string
  color: string
  payList: any
  list: any
  listPay: any
  discountMoneySum: any
  formObj: {
    /** 优惠券id */
    customerCouponIds?: any

    /** 课程id */
    courseId?: any

    /** 客户id */
    customerId?: number

    /** 额外优惠金额，单位元 */
    extraDiscountAmount: any

    /** 拓客卡id */
    memberCardId?: number

    /** 正向交易原始金额，单位元 */
    originalAmount: any

    /** 支付方式名称备注 */
    payMethodType?: string
  }
  // value: string
  payValue: string
  courseValue: string
  customerPhone: string
  customerName: string
  lengthCouponIds: string
  paramsCustomer: any
  error: Boolean
  payRealMoney: any
  lengthCustomerCouponIds: any,
  errorCourse: Boolean,
  type: string
}
