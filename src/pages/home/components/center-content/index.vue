<template>
  <div class="content">
    <div class="top">
      <img :src="img" alt="" class="star-partner" />
    </div>
    <div class="center">
      <span class="mar-r-16">
        <img :src="leftImg" alt="" class="left-rect" />
      </span>
      <span class="bold success-font">升级成功</span>
      <span class="mar-l-16">
        <img :src="rightImg" alt="" class="right-rect" />
      </span>
    </div>
    <div class="bottom mar-t-15">
      <p>合作人可领取试听课奖励和正课奖励</p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CenterContent',
  components: {},
  props: {},
  data() {
    return {
      img: require('@/assets/images/star-partner.png'),
      leftImg: require('@/assets/images/left-rect.png'),
      rightImg: require('@/assets/images/right-rect.png')
    }
  },
  methods: {},
  created() {}
})
</script>
<style lang="less" src="./index.less"></style>
