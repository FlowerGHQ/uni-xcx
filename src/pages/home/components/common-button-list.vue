<template>
  <div class="func-button-list">
    <CommonButton
      :error="error"
      v-for="(item, index) in buttonList"
      :key="item.type"
      :text="item.title"
      :class="(index + 1) % 4 === 0 ? 'mr0' : 'mr50'"
      :image="item.imageStyle"
      :openUrl="item.openUrl"
    />
  </div>
</template>
<script lang="ts">
import CommonButton from './common-button.vue'
// import mixin from '@/pages/home/components/mixin/mixin'
import { API } from '@/models/api'
import { ButtonList } from './constant'
import Vue from 'vue'

export default Vue.extend({
  name: 'AddList',
  props: {
    error: {
      type: Boolean,
      default: false
    }
    // permissionList: {
    //   type: Array,
    //   default: () => []
    // }
  },
  components: { CommonButton },
  // mixins: [mixin],
  data() {
    return {
      buttonList: [] as any,
      permissionList: []
    }
  },
  mounted() {
    // this.getListAll()
  },
  methods: {
    async getListAll() {
      try {
        const resRecommend = await API.partnersSBusiness.account.info.request(
          {}
        )
        // console.log(resRecommend, 'resRecommend')
        this.permissionList = resRecommend.data.permissions
        // console.log(this.permissionList, 'getListAll')
        let list = [] as any
        resRecommend.data.permissions.forEach(id => {
          ButtonList.forEach(item => {
            if (item.id === id) {
              list.push(item)
            }
          })
        })
        this.buttonList = [
          ...list,
          {
            title: '设置',
            type: 'campus',
            imageStyle: 'set',
            openUrl: '/pages/business/set/index'
          }
        ]
      } catch {
        this.buttonList = [
          {
            title: '设置',
            type: 'campus',
            imageStyle: 'set',
            openUrl: '/pages/business/set/index'
          }
        ]
      }

      // console.log(list, 'oneList')
    }
  }
})
</script>

<style lang="less" scoped>
.func-button-list {
  display: flex;
  flex-wrap: wrap;
  :nth-child(n + 5) {
    margin-top: 40rpx;
  }
}

.mr50 {
  margin-right: 50rpx;
}
.mr0 {
  margin-right: 0;
}
</style>
