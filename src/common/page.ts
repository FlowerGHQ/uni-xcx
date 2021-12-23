import { Vue, Component } from 'vue-property-decorator'
let systemInfo = uni.getSystemInfoSync()

interface Anchor {
  /** 监听初始化定时器 */
  initTimer: any
  /** 页面滚动定时器 */
  scrollTimer: any
  /** tab */
  currentTabIndex: number
  /** 页面相交监听 */
  _observer: any
}

@Component
export default class CommonPage extends Vue {
  showGoTop: boolean = false

  tabList: any = []

  /** 吸顶距离 */
  stickyHeight: number = 104
  /** 锚点tab切换属性 */
  anchor: Anchor = {
    initTimer: null,
    scrollTimer: null,
    currentTabIndex: 0,
    _observer: null
  }

  initAnchor() {
    this.anchor.initTimer = setTimeout(() => {
      this.getAnchor()
      clearTimeout(this.anchor.initTimer)
      this.anchor.initTimer = null
    }, 3000)
  }

  /**
   * 清除锚点定时器
   */
  clearScrollTimer() {
    if (this.anchor.scrollTimer) {
      clearTimeout(this.anchor.scrollTimer)
      this.anchor.scrollTimer = null
    }
  }
  /**
   * 切换tab
   * @param index tab
   */
  selectTab(index: number, key: string) {
    this.anchor.currentTabIndex = index
    this.clearScrollTimer()
    wx.createSelectorQuery()
      .selectViewport()
      .scrollOffset(scrollRes => {
        var query = wx.createSelectorQuery()
        query.select(`#${key}`).boundingClientRect()
        query.exec(res => {
          if (res && res[0]) {
            wx.pageScrollTo({
              scrollTop:
                res[0].top +
                scrollRes.scrollTop -
                (systemInfo.windowWidth / 750) * this.stickyHeight,
              duration: 300
            })
          }
        })
      })
      .exec()
  }

  /**
   * 锚点切换observer监听
   */
  getAnchor() {
    this.anchor._observer = uni.createIntersectionObserver(null, {
      observeAll: true
    })
    this.anchor._observer
      .relativeTo('.intersection')
      .observe('.scroll-item', res => {
        if (res.intersectionRatio > 0) {
          this.clearScrollTimer()
          this.anchor.scrollTimer = setTimeout(() => {
            if (res && res.id) {
              this.anchor.currentTabIndex = this.tabList.findIndex(
                item => item.key === res.id
              )
            }
          }, 1000)
        }
      })
  }
  onUnload() {
    this.clearScrollTimer()
    if (this.anchor && this.anchor._observer) {
      this.anchor._observer.disconnect()
    }
  }
  // 回到顶部
  onPageScroll(t) {
    if (t.scrollTop >= 500) {
      this.showGoTop = true
    } else {
      this.showGoTop = false
    }
  }
}
