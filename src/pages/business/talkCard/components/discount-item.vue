<template>
  <div>
    <div class="class-all" :class="discountObj.canUsed ? '' : 'gray'">
      <div
        class="discount"
        :style="{ background: `url(${imageBg}) no-repeat center` }"
      >
        <div class="discount-number">
          <div class="left">
            <div :class="leftNumberColor">
              <span>¥</span
              >{{
                discountObj.discountAmount ? discountObj.discountAmount : '-'
              }}
            </div>
            <div class="use-number">
              满<span>{{
                discountObj.conditionAmount ? discountObj.conditionAmount : '-'
              }}</span
              >可用
            </div>
          </div>
        </div>
        <div class="discount-name">
          <div class="right">
            <div class="right-top">
              <p :class="discountNameColor">
                {{ discountObj.name ? discountObj.name : '-' }}
              </p>
              <span :class="discountDealine"
                >有效期至：{{ format(discountObj.effectEndTime) }}</span
              >
            </div>
            <div class="right-bottom">
              <div class="icon">
                <span
                  class="icon-full"
                  :style="{ background: `url(${iconImage}) no-repeat center` }"
                ></span
                ><span :class="rightFullColor">{{
                  ruleName ? ruleName : '-'
                }}</span>
              </div>
              <div
                @click="openDetail(discountObj.name, discountObj.description)"
                class="open-detail-icon"
              >
                查看详情<van-icon name="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup
      :show="showDetail"
      position="bottom"
      round
      closeable
      custom-style="height: 40%;"
      @close="closeDetail"
    >
      <div class="popup-title popup-detail">优惠券详情</div>
      <div class="popup-title popup-field">
        {{ disCountName }}
      </div>
      <div class="popup-text popup-field">
        {{ disCountDesc }}
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
enum TYPE_COLOR {
  TYPE_FULL = 1,
  TYPE_GIFT = 2
}
export default Vue.extend({
  name: 'DiscountItem',
  // 优惠券颜色 数据等 icon颜色数据
  props: {
    type: {
      type: Number,
      default: 1
    },
    discountObj: {
      type: Object,
      default: () => {}
    },
    // 是否自定义右下方按钮处显示内容
    isDefineRight: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    view: {
      type: String,
      default: '详情'
    }
  },
  components: {},
  watch: {
    type: {
      handler(val) {
        if (val === null) {
          return
        }
        switch (val) {
          case TYPE_COLOR.TYPE_FULL:
            this.ruleName = '满减券'
            this.rightFullColor = '.full'
            this.leftNumberColor = '.color-number'
            this.imageBg = require('@/assets/images/full-substract-bg.png')
            this.iconImage = require('@/assets/images/full-substract-icon.png')
            break
          case TYPE_COLOR.TYPE_GIFT:
            this.rightFullColor = '.gift'
            this.ruleName = '赠送券'
            this.leftNumberColor = '.color-number-gift'
            this.imageBg = require('@/assets/images/gift-bg.png')
            this.iconImage = require('@/assets/images/gift-icon.png')
            break
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      leftNumberColor: '.color-number ',
      rightFullColor: '.color-number-gift',
      imageBg: require('@/assets/images/full-substract-bg.png'),
      iconImage: require('@/assets/images/full-substract-icon.png'),
      discountNameColor: '',
      discountDealine: '',
      ruleName: '',
      disCountName: '',
      disCountDesc: '',
      showDetail: false
    }
  },
  methods: {
    viewClick() {
      this.$emit('viewClick')
    },
    shelfClick() {
      this.$emit('shelfClick')
    },
    format(date: string) {
      return date ? dayjs(date).format('YYYY-MM-DD') : '-'
    },
    openDetail(name: string, desc: string) {
      this.disCountName = name
      this.disCountDesc = desc
      this.showDetail = true
    },
    closeDetail() {
      this.showDetail = false
    }
  },
  created() {
    console.log('获取list数据')
  }
})
</script>
<style lang="less" scoped>
.class-all {
  padding: 0 32rpx;
  .discount {
    width: 686rpx;
    height: 220rpx;
    border-radius: 20rpx;
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .discount-number {
      width: 240rpx;
      height: 200rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-family: DINAlternate-Bold, DINAlternate;
    }
    .color-number,
    .color-number-gift,
    .disabled-number {
      color: #e5c89c;
      font-size: 48rpx;
      margin-bottom: 8rpx;
      span {
        font-size: 24rpx;
      }
    }
    .color-number-gift,
    .disabled-number {
      color: #ffffff;
      font-weight: bold;
    }
    .use-number {
      color: #ffffff;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
    }
    .discount-name {
      flex: 1;
      padding: 32rpx 16rpx 40rpx 16rpx;
      .right-top {
        margin-bottom: 36rpx;
        p {
          font-size: 32rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
        }
        span {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
        p.name-color {
          color: #cccccc;
        }
        span.discount-dealine {
          color: #cccccc;
        }
      }
      .right-bottom {
        display: flex;
        justify-content: space-between;
        .icon {
          display: flex;
          align-items: center;
        }
        .icon-full {
          display: inline-block;
          width: 28rpx;
          height: 28rpx;
          border-radius: 50%;
          margin-right: 2rpx;
        }
        span {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
        .full {
          color: #ce9948;
        }
        .gift {
          color: #fa8130;
        }
        .disabled-all {
          color: #cccccc;
        }
      }
    }
  }
  .discount,
  .icon-full {
    background-size: cover !important;
  }
  .button {
    display: flex;
  }
  .view-tag,
  .shelf-tag {
    display: inline-block;
    margin-right: 16rpx;
    width: 120rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #f86744;
    border-radius: 24rpx;
    border: 1px solid #f86744;
  }
  .shelf-tag {
    background: #f86744;
    color: #ffffff;
  }
}
.gray {
  filter: grayscale(100%);
}

.open-detail-icon {
  font-size: 24rpx;
  font-weight: 400;
  color: #666666;
  line-height: 32rpx;
}
.popup-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #222222;
  line-height: 48rpx;
  padding: 22rpx 80rpx 22rpx 0;
}
.popup-detail {
  text-align: center;
  padding: 36rpx;
}
.popup-text {
  font-size: 24rpx;
  font-weight: 400;
  color: #888888;
  line-height: 44rpx;
  padding: 22rpx 32rpx 22rpx 0;
}
.popup-field {
  margin-left: 32rpx;
  border-bottom: 1rpx solid #eeeeee;
}
</style>
