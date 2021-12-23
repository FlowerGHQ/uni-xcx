<template>
  <div>
    <van-field
      readonly
      :required="required"
      input-class="picker-input"
      right-icon="arrow"
      :label="label"
      :placeholder="placeholder"
      :value="date"
      :clearable="true"
      :error-message="errorMessage"
      @click-input="showCalendarClick"
      @click-icon="showCalendarClick"
    ></van-field>
    <!-- <van-cell :title="title" :value="date" @click="showCalendarClick" /> -->
    <van-calendar
      :show="showCalendar"
      @confirm="onConfirm"
      @close="onClose"
      :type="dateType"
      :title="title"
      :color="color"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import dayjs from 'dayjs'
export default Vue.extend({
  name: '',

  props: {
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    label: {
      type: String,
      default: ''
    },
    dateType: {
      type: String,
      default: 'single'
    },
    color: {
      type: String,
      default: '#F86744'
    },
    errorMessage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '日期选择'
    }
  },
  data() {
    return {
      showCalendar: false,
      // 直接改变date的值请自行在父组件中修改this.$refs.selectCalendar
      // 如果要修改组件请判断一下以免影响前面的内容
      date: '请选择时间'
    }
  },

  methods: {
    showCalendarClick() {
      this.showCalendar = true
      this.$emit('showCalendarClick')
    },
    onConfirm(event) {
      this.$emit('onConfirm', event.detail)
      this.showCalendar = false
      // 如果显示mutiple类型请添加判断条件
      if (this.dateType === 'range') {
        this.date = `${dayjs(event.detail[0]).format('YYYY-MM-DD')}~${dayjs(
          event.detail[1]
        ).format('YYYY-MM-DD')}`
      } else {
        this.date = dayjs(event.detail).format('YYYY-MM-DD')
      }
    },
    onClose() {
      this.showCalendar = false
      this.$emit('showCalendarClick')
    }
  }
})
</script>

<style scoped lang="less"></style>
