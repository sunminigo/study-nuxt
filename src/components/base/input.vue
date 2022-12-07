<template>
  <n-input
    v-model:value="inputData.value"
    :type="props.type"
    :placeholder="props.placeholder"
    :minlength="props.minlength"
    :maxlength="props.maxlength || inputData.maxLength"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :allow-input="inputData.allowInput"
    :show-count="props.showCount"
    :show-password-on="props.showPasswordOn"
    :status="props.status"
    :rows="props.rows"
    clearable
    v-bind="props.bind"
    v-on="props.on"
  >
    <template
      v-if="slots.prefix"
      #prefix
    >
      <slot name="prefix" />
    </template>
    <template
      v-if="slots.suffix"
      #suffix
    >
      <slot name="suffix" />
    </template>
  </n-input>
</template>

<script setup>
import { computed, reactive, useSlots } from 'vue'
import { numberFormat, numberTel } from '@mediance/utils/format/number'

const slots = useSlots()
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  showCount: {
    type: Boolean,
    default: false
  },
  showPasswordOn: {
    type: String,
    default: undefined
  },
  status: {
    type: String,
    default: undefined
  },
  placeholder: {
    type: String,
    default: ''
  },
  formatter: {
    type: String,
    default: null
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  minlength: {
    type: Number,
    default: undefined
  },
  arrowInputType: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  rows: {
    type: Number,
    default: 3
  },
  bind: {
    type: Object,
    default: () => ({})
  },
  on: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const actions = {
  formatTypeValue: (value) => {
    let formatValue = value
    let updateValue = value
    let maxLength

    const numberExp = /[^0-9]/gi

    if (updateValue) {
      if (props.formatter) {
        updateValue = String(updateValue).replace(numberExp, '').trim()
      }

      switch (props.formatter) {
        case 'number':
          updateValue = updateValue * 1
          formatValue = numberFormat(updateValue)
          break
        case 'tel':
          if (updateValue.length > 0) formatValue = numberTel(updateValue)
          maxLength = 13
          break
        case 'birth':
          formatValue = updateValue.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3')
          maxLength = 10
          break
        case 'bizNumber':
          formatValue = updateValue.replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, '$1-$2-$3')
          maxLength = 12
          break
        case 'rrn':
          formatValue = updateValue.replace(/([0-9]{6})([0-9]{7})/, '$1-$2')
          maxLength = 14
          break
      }
    }

    return { updateValue, formatValue, maxLength }
  },
  getValue: (text) => {
    let val = text
    if (val && typeof val === 'string') { val = val.trim() }
    const value = actions.formatTypeValue(val)
    return value.formatValue
  },
  setValue: (text) => {
    let val = text
    if (val && typeof val === 'string') { val = val.trim() }
    const value = actions.formatTypeValue(val)
    return value.updateValue
  }
}

const inputData = reactive({
  value: computed({
    get: () => actions.getValue(props.modelValue),
    set: (value) => {
      const val = actions.setValue(value)
      emit('update:modelValue', val)
    }
  }),
  allowInput: computed(() => {
    return (value) => {
      switch (props.arrowInputType) {
        case 'eng':
          return !value || /^[a-zA-Z]*$/.test(value)
        case 'engNum':
          return !value || /^[a-zA-Z0-9]*$/.test(value)
        case 'kor':
          return !value || /^[ㄱ-ㅎ가-힣]*$/.test(value)
        case 'korNum':
          return !value || /^[ㄱ-ㅎ가-힣0-9]*$/.test(value)
      }
      return true
    }
  }),
  maxLength: computed(() => actions.formatTypeValue(inputData.value).maxLength)
})
</script>
