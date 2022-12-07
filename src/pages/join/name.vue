<template>
  <layout-page-title
    :title="baseData.title"
    icon-name="user"
  />

  <form-kit
    ref="formWrap"
    v-slot="{ state: { valid } }"
    v-model="formData"
    type="form"
    :config="{ validationVisibility: 'dirty' }"
    :actions="false"
    :incomplete-message="false"
    @submit="baseActions.submit"
  >
    <form-kit
      label="이름"
      name="name"
      validation="required|length:2"
    >
      <template #input="{ state }">
        <base-input
          v-model:value="formData.name"
          :status="formItemState(state)"
          placeholder="2글자 이상 입력"
        />
      </template>
    </form-kit>
    <n-grid
      :x-gap="12"
      :y-gap="12"
      :cols="3"
      class="mt-8"
    >
      <n-gi>
        <n-button
          block
          @click="baseActions.goBack"
        >
          이전
        </n-button>
      </n-gi>
      <n-gi span="2">
        <n-button
          type="primary"
          block
          :disabled="!valid"
          @click="baseActions.submit"
        >
          다음
        </n-button>
      </n-gi>
    </n-grid>
  </form-kit>
</template>

<script setup>
const { formItemState } = useGlobalConfig()

const formWrap = ref(null)
const formData = ref({
  name: ''
})

const baseData = reactive({
  title: '이름을 입력해주세요.'
})
const baseActions = {
  goBack: () => {
    alert('go Back!')
    // router.push({ path: '/join' })
  },
  submit: () => {
    alert('submit')
  }
}

</script>
