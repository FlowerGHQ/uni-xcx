<template>
  <div class="user-login">
    <div class="change-org" @click="changeSchoolOrg">
      <div class="flex">
        <img src="../../../assets/images/place.png" class="icon-place" />
        <div class="school-title">切换校区</div>
      </div>
      <img src="../../../assets/images/right-arrow.png" class="icon-right" />
    </div>
    <div class="talk-card">
      <Card />
    </div>
    <van-tabs @click="onClickTab">
      <van-tab title="尊享礼券" name="bonus">
        <div>1111111</div>
      </van-tab>
      <van-tab title="权益介绍" name="bonus">
        <div class="tab-rights">
          权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍权益介绍
        </div>
      </van-tab>
      <van-tab title="校区介绍" name="bonus">
        <div class="tab-school">
          <van-cell-group>
            <van-cell title="校区名称" value="大同舞蹈学校城北校区" />
            <van-cell
              title="校区位置"
              value="浙江省/杭州市/西湖区 文三路华星时代广场A座10楼"
            />
          </van-cell-group>
        </div>
      </van-tab>
    </van-tabs>
    <div class="bottom-test">
      <img src="../../../assets/images/limited.png" class="icon-limited" />
    </div>
    <div class="bottom-button">
      <button class="view">生成二维码</button>
      <button class="save-list">分享至微信</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Card from './components/card.vue'

export default Vue.extend({
  name: 'HomeList',
  components: { Card },
  data() {
    return {}
  },

  methods: {
    onClickTab(e: any) {
      console.log(e.target.name)
    }
  }
})
</script>
<style lang="less" scoped>
.user-login {
  padding: 32rpx 0;
  font-size: 28rpx;
}
.talk-card {
  margin: 32rpx;
}
.change-org {
  margin: 32rpx;
  width: 686rpx;
  height: 96rpx;
  background: #ffffff;
  box-shadow: 10rpx 10rpx 56rpx 0rpx rgba(211, 222, 241, 0.5);
  border-radius: 32rpx;
  padding: 0 32rpx;
  border: 1rpx solid #ecf0f4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.view,
.save-list {
  width: 294rpx;
  height: 80rpx;
  background: #f86744;
  border-radius: 40rpx;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  border: 1px solid #f86744;
  color: #fff;
}
.view {
  margin-right: 32rpx;
  background: #fff;
  color: #f86744;
}

.icon-place {
  width: 44rpx;
  height: 44rpx;
}
.icon-right {
  width: 24rpx;
  height: 24rpx;
}
.tab-rights {
  padding: 40rpx 32rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #666666;
  line-height: 44rpx;
}
.bottom-test {
  width: 100%;
  height: 80rpx;
  background: #ffebe6;
  position: fixed;
  bottom: calc(112rpx + var(--safe-area-inset-bottom));
  left: 0;
}
.icon-limited{
  height: 66rpx;
  width: 66rpx;
}
</style>
