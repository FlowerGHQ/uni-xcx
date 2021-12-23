<template>
  <div class="introduce-block contact-block">
    <div class="block-title" v-if="title">{{title}}</div>
    <div class="mar-b-40 flex">
      <custom-icon :size="36" :color="iconColor" type="home"></custom-icon>
      <div class="mar-l-30">{{orgName}}</div>
    </div>
    <div class="mar-b-40 flex" style="position:relative">
      <custom-icon :size="36" :color="iconColor" type="phone"></custom-icon>
      <div class="mar-l-30">{{contact}}</div>
      <div class="phone-call" :style="{background:iconColor}" @click="freeTell(contact)">拨打</div>
    </div>
    <div class="flex">
      <custom-icon :size="36" :color="iconColor" type="location"></custom-icon>
      <div class="mar-l-30">{{address}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import customIcon from '@/components/custom-icon.vue';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({components: {customIcon}})
export default class extends Vue {
  @Prop()
  iconColor!: string;

  @Prop()
  orgName!: string;

  @Prop()
  contact!: string;

  @Prop()
  address!: string;

  @Prop()
  title!: string;

  freeTell(phone) {
    this.$emit('call');
    uni.makePhoneCall({
      phoneNumber: phone
    });
  }
};
</script>
<style lang="less" scoped>
.introduce-block {
  background: #fff;
  border-radius: 32rpx;
  padding: 80rpx;
  font-size: 28rpx;
  color: #444;
  line-height: 44rpx;
  margin-top: 16rpx;
}

.block-title {
  color: #444;
  font-size: 48rpx;
  font-weight: 600;
  margin-bottom: 40rpx;
  line-height: 67rpx;

  .tip {
    font-size: 28rpx;
    color: #888;
    font-weight: normal;
  }
}
.contact-block {
  .org-image {
    height: 300rpx;
  }
  .phone-call {
    width: 100rpx;
    height: 56rpx;
    line-height: 56rpx;
    border-radius: 28rpx;
    color: #fff;
    text-align: center;
    font-size: 28rpx;
    font-weight: 600;
    position: absolute;
    right: 0;
    top: -10rpx;
  }
}
</style>