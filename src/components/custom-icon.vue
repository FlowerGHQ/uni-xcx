<template>
  <div :class="classes" :style="styles"></div>
</template>

<script lang="ts">
import { styles } from '@/utils/css';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop()
  type!: string;
  @Prop()
  size!:string;
  @Prop()
  color!:string;

  get classes() {
    return `weapp-icon icon-${this.type}`;
  }
  get styles() {
    let style:any = {};

    if (this.size) {
      style['font-size'] = `${this.size}rpx`;
    }

    if (this.color) {
      style.color = this.color;
    }
    return styles(style);
  }
};
</script>
