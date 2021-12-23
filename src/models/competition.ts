import dayjs from 'dayjs'
import { divide } from '@/utils/number-precision'

/**
 * 赛事当前阶段
 */
enum MatchStage {
  /**
   * 其他
   */
  Other,
  /**
   * 初赛
   */
  PRELIMINARY,
  /**
   * 复赛
   */
  REMATCH
}

/**
 * 参赛方式
 */
enum MatchType {
  /**
   * 线上
   */
  ONLINE,
  /**
   * 线下
   */
  OFFLINE,
  /**
   * 线上和线下
   */
  ALL
}

/**
 * 作品类型
 */
export enum WorkType {
  /**
   * 图片作品
   */
  IMAGE = 1,
  /**
   * 视频作品
   */
  VIDEO = 2
}

/**
 * 当前用户报名状态
 */

export enum ApplyStatus {
  /**
   * 初始化状态
   */
  INIT,
  /**
   * 已下单未付款
   */
  UN_PAID,
  /**
   * 订单已取消支付
   */
  CANCELED,
  /**
   * 订单已支付但作品未提交
   */
  PAID_WORKS_UN_COMMIT,
  /**
   * 订单已退款
   */
  REFUNDED,
  /**
   * 订单已完成
   */
  FINISHED
}

/**
 * 机构信息
 */
export interface OrgInfo {
  /**
   * 联系电话
   */
  contact: string
  /**
   * 地址
   */
  address: string
  /**
   * 机构名称
   */
  orgName: string
}

export class Competition {
  /**
   * 活动ID
   */
  id: number
  /**
   * 名称
   */
  name: string
  /**
   * 报名结束日期
   */
  applyEndTime?: Date | null

  /**
   * 结束日期格式化后的日期
   */
  applyEndTimeFormat: string
  /**
   * 缩略图
   */
  thumbnailFirstDynamicUrl?: string
  /**
   * 是否报名结束
   */
  applyEnd: boolean

  /**
   * 考试形式
   */
  matchTypeText: string

  /**
   * 赛事介绍
   */
  intro: string

  constructor(data?: any) {
    this.id = data && data.id ? data.id : 0
    this.name = data && data.name ? data.name : ''
    this.applyEndTime =
      data && data.applyEndTime ? dayjs(data.applyEndTime).toDate() : null
    if (this.applyEndTime) {
      this.applyEndTimeFormat = dayjs(this.applyEndTime).format('YYYY-MM-DD')
    }
    this.thumbnailFirstDynamicUrl =
      data && data.thumbnailFirstDynamicUrl ? data.thumbnailFirstDynamicUrl : ''
    if (!this.thumbnailFirstDynamicUrl) {
      this.thumbnailFirstDynamicUrl =
        'https://cdn.xiaobaoxiu.cn/xbshow/XcxImages/Common/manage-default.png'
    }
    this.applyEnd = data.applyEnd
    this.matchTypeText = data ? this.getMatchTypeText(data.matchType) : ''
    this.intro = data ? data.intro : ''
  }

  getMatchTypeText(matchType: number) {
    let matchTypeText = ''
    switch (matchType) {
      case MatchType.ONLINE:
        matchTypeText = '线上'
        break
      case MatchType.OFFLINE:
        matchTypeText = '线下'
        break
      case MatchType.ALL:
        matchTypeText = '线上和线下'
        break
      default:
        matchTypeText = ''
    }
    return matchTypeText
  }
}

export class CompetitionDetail extends Competition {
  /**
   * 价格
   */
  price: number

  /**
   * 价格的文字说明
   */
  competitionFee: string

  /**
   * 当前赛段
   */
  currentStage: string

  /**
   * 剩余天数
   */
  leftDays: number

  /**
   * 赛事报名要求图
   */
  applyDemandImgUrl: string

  /**
   * 参赛方式图
   */
  applyWayImgUrl: string

  /**
   * 动态轮播图
   */
  dynamicImgUrls: string[]

  /**
   * 介绍图
   */
  introImgUrls: string[]

  constructor(data?: any) {
    super(data)
    this.price = data ? divide(data.applyCost, 100) || 0 : 0
    this.competitionFee = this.price ? '' : '免费'
    this.currentStage = data ? this.getCurrentStage(data.matchStage) : ''
    this.applyDemandImgUrl = data ? data.applyDemandImgUrl || '' : ''
    this.applyWayImgUrl = data ? data.applyWayImgUrl || '' : ''
    this.dynamicImgUrls = data ? data.dynamicImgUrls.filter(item => !!item) : []
    this.introImgUrls = data ? data.introImgUrls.filter(item => !!item) : []
    this.leftDays = data ? data.leftDays : 0
  }

  getCurrentStage(stage: number) {
    let currentStageText = ''
    switch (stage) {
      case MatchStage.Other:
        currentStageText = '其他'
        break
      case MatchStage.PRELIMINARY:
        currentStageText = '初赛'
        break
      case MatchStage.REMATCH:
        currentStageText = '复赛'
        break
      default:
        currentStageText = '其他'
    }
    return currentStageText
  }
}

export enum UploadStatus {
  NotStarted,
  Ongoing,
  Failed,
  Success
}

export class WorkDemand {
  /**
   * 上传截止
   */
  isUploadEnd: boolean | undefined

  /**
   * 作品类型
   */
  uploadType: WorkType

  /**
   * 作品数上限
   */
  maxCount: number

  /**
   * 最小宽度
   */
  minWidth: number

  /**
   * 最大宽度
   */
  maxWidth: number

  /**
   * 最小高度
   */
  minHeight: number

  /**
   * 最大高度
   */
  maxHeight: number

  /**
   * 作品大小 kb
   */
  size: number

  /**
   * 视频录制最小时长
   */
  minLength: number

  /**
   * 视频录制最大时长
   */
  maxLength: number

  // constructor(data: defs.ssbC.WorksDemandInfoDto) {
  //   this.isUploadEnd = data.workSubmitEnd
  //   this.uploadType = data.worksType as any
  //   this.maxCount = data.worksMaxNumber || 0
  //   this.minWidth = data.minWidthResolution || 0
  //   this.maxWidth = data.maxWidthResolution || 0
  //   this.minHeight = data.minHeightResolution || 0
  //   this.maxHeight = data.maxHeightResolution || 0
  //   this.size = data.sizeLimit || 0
  //   this.minLength = data.minSecond || 0
  //   this.maxLength = data.maxSecond || 0
  // }
}

export class ApplyItem {
  /**
   * 活动ID
   */
  id: number
  /**
   * 名称
   */
  competitionName: string
  /**
   * 报名日期
   */
  applyTime: string

  /**
   * 学员姓名
   */
  studentName: string
  /**
   * 缩略图
   */
  thumbnailImgUrl: string
  /**
   * 报名状态
   */
  status: ApplyStatus
  /**
   * 报名状态文案
   */
  statusText: string

  /**
   * 订单编号
   */
  orderNo: string

  constructor(data: any) {
    this.id = data.id || 0
    this.competitionName = data.competitionName || ''
    this.applyTime = data.applyTime
      ? dayjs(data.applyTime).format('YYYY-MM-DD HH:mm')
      : ''
    this.studentName = data.studentName || ''
    this.thumbnailImgUrl = data.thumbnailImgUrl || ''
    if (!this.thumbnailImgUrl) {
      this.thumbnailImgUrl =
        'https://cdn.xiaobaoxiu.cn/xbshow/XcxImages/Common/manage-default.png'
    }
    this.status = data.status || ApplyStatus.INIT
    this.statusText = this.getStatusText(this.status)
    this.orderNo = data.orderNo || ''
  }
  getStatusText(status: ApplyStatus) {
    let text = ''
    switch (status) {
      case ApplyStatus.UN_PAID:
        text = '待付款'
        break
      case ApplyStatus.CANCELED:
        text = '订单关闭'
        break
      case ApplyStatus.PAID_WORKS_UN_COMMIT:
        text = '未提交作品'
        break
      case ApplyStatus.REFUNDED:
        text = '已退款'
        break
      case ApplyStatus.FINISHED:
        text = '报名完成'
        break
      default:
        text = '其他'
    }
    return text
  }
}
