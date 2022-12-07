<template>
  <teleport to="body">
    <n-modal
      v-model:show="dialogVisible"
      :type="props.type"
      :preset="props.preset"
      :show-icon="!props.title && preset === 'dialog'"
      :closable="preset === 'dialog' ? props.iconClosable : null"
      :mask-closable="props.maskClosable"
      :auto-focus="false"
      :icon-placement="!props.title ? 'left' : 'top'"
      :style="dialogStyle"
    >
      <template #header>
        <div
          v-if="props.title"
          class="props-title"
          v-html="props.title"
        />
      </template>
      <div
        v-if="props.content"
        class="props-content"
        v-html="props.content"
      />
      <div
        v-if="$slots.default"
        class="slot-content"
      >
        <slot />
      </div>
      <template #action>
        <n-button
          v-if="!props.nonCancel"
          type="tertiary"
          @click="modalActions.negative()"
        >
          {{ props.negativeText }}
        </n-button>
        <n-button
          v-if="!props.nonConfirm"
          type="success"
          :loading="props.loading"
          @click="modalActions.positive()"
        >
          {{ props.positiveText }}
        </n-button>
      </template>
    </n-modal>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  preset: {
    type: String,
    default: 'dialog'
  },
  title: {
    type: String,
    default: null
  },
  content: {
    type: String,
    default: null
  },
  width: {
    type: Number,
    default: 400
  },
  type: {
    type: String,
    default: 'info'
  },
  iconClosable: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: false
  },
  positiveText: {
    type: String,
    default: '확인'
  },
  nonConfirm: {
    type: Boolean,
    default: false
  },
  negativeText: {
    type: String,
    default: '취소'
  },
  nonCancel: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  style: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:show', 'confirm', 'cancel'])

const dialogVisible = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})

const dialogStyle = computed(() => {
  return {
    ...props.style,
    width: `${props.width}px`
  }
})

const modalActions = {
  positive: () => {
    emit('confirm')
  },
  negative: () => {
    dialogVisible.value = false
    emit('cancel')
  }
}
</script>
