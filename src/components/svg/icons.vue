<template>
  <span
    class="svg-icon"
    :class="[`name-${name}`, { 'is-color': !!props.color, 'type-default': !props.color }]"
  >
    <!--img
      v-svg-inline
      :src="`/assets/icons/${props.name}.svg`"
    /-->
    <img
      :src="`/assets/icons/${props.name}.svg`"
      onload="SVGInject(this)"
    />
  </span>
</template>

<script setup>
import SVGInject from '@iconfu/svg-inject'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 40
  },
  color: {
    type: String,
    default: null
  },
  sizeReverse: {
    type: Boolean,
    default: false
  }
})

const style = computed(() => {
  const data = {
    width: props.sizeReverse ? 'auto' : `${props.size}px`,
    height: props.sizeReverse ? `${props.size}px` : 'auto'
  }
  return data
})

</script>

<style lang="scss" scoped>
.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  outline: none;

  :deep(svg) {
    width: v-bind("style.width");
    height: v-bind("style.height");
  }

  &.is-color {
    :deep(svg) {
      fill: v-bind("props.color");
      stroke: v-bind("props.color");
    }
  }
}
</style>
