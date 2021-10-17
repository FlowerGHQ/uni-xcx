<template>
  <div>
    <van-field
      :titleWidth="titleWidth"
      readonly
      right-icon="arrow"
      input-class="picker-input"
      :label="label"
      :placeholder="placeholder"
      :class="{ 'error-input': error }"
      :error="error"
      :value="value"
      @click-input="trackPicker"
      @click-icon="trackPicker"
    />
    <van-popup
      :close-on-click-overlay="false"
      :show="showPicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component({})
export default class extends Vue {
  @Prop()
  label: string

  @Prop()
  value: string

  @Prop({ default: '请选择' })
  placeholder: string

  @Prop()
  error: boolean

  @Prop()
  columns: string[]

  @Prop()
  titleWidth: string

  showPicker: boolean = false

  trackPicker() {
    this.showPicker = true
  }
  @Emit('confirm')
  onConfirm(e) {
    const { index } = e.detail
    this.showPicker = false
    return index
  }

  @Emit('cancel')
  onCancel() {
    this.showPicker = false
  }
}
</script>
