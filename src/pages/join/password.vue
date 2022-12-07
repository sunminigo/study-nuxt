<template>
  <layout-page-title
    :title="baseData.title"
    icon-name="interface-lock"
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
      label="비밀번호"
      name="password"
      validation="required"
    >
      <template #input="{ state }">
        <base-input
          v-model:value="formData.password"
          type="password"
          :status="formItemState(state)"
          placeholder="비밀번호 입력 (영문+숫자+특수기호 조합 8자)"
        />
      </template>
    </form-kit>
    <form-kit
      label="비밀번호 확인"
      name="passwordCheck"
      validation="required|confirm:password"
    >
      <template #input="{ state }">
        <base-input
          v-model:value="formData.passwordCheck"
          type="password"
          :status="formItemState(state)"
          placeholder="비밀번호 재입력"
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
  password: '',
  passwordCheck: ''
})

const baseData = reactive({
  title: '비밀번호를 입력해주세요.'
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
