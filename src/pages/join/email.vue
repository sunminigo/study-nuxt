<template>
  <layout-page-title
    :title="baseData.title"
    :content="baseData.content"
    icon-name="communication-mail"
    :icon-size="24"
  />

  <form-kit
    ref="formWrap"
    v-model="formData"
    type="form"
    :config="{ validationVisibility: 'dirty' }"
    :actions="false"
    :incomplete-message="false"
    @submit="baseActions.submit"
  >
    <form-kit
      label="이메일"
      name="email"
      validation="required|email"
    >
      <template #input="{ state }">
        <base-input
          v-model:value="formData.email"
          :status="formItemState(state)"
          placeholder="welcome@medinace.com"
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
          :secondary="!baseData.doubleCheck"
          @click="baseActions.doubleCheck"
        >
          {{ !baseData.doubleCheck ? '중복확인' : '사용하기' }}
        </n-button>
      </n-gi>
    </n-grid>
  </form-kit>
</template>

<script setup>
import { dialogMassage } from '@/composables/global.dialog'

const { confirmModal, alertModal } = dialogMassage()
const { formItemState } = useGlobalConfig()

const formWrap = ref(null)
const formData = ref({
  email: null
})

const baseData = reactive({
  title: '이메일 주소를 입력해주세요 :)',
  content: '이메일은 한번 등록하면 변경되지 않으니</br>신중하게 입력해주세요!',
  doubleCheck: false
})

const baseActions = {
  submit: () => {
    if (!baseData.doubleCheck) {
      dialogMassageActions('cancel')
      baseData.doubleCheck = true
    } else {
      dialogMassageActions('confirm')
    }
  },
  doubleCheck: () => {
    // alert('double check!')
    formWrap.value.node.submit()
  },
  goBack: () => {
    alert('go Back!')
    // router.push({ path: '/join' })
  }
}

const dialogMassageActions = (type) => {
  if (type === 'cancel') {
    confirmModal({
      type: 'info',
      icon: 'triangle-warning',
      title: '이미 사용중인 이메일입니다.',
      content: '미디언스에 가입한 이력이 있다면 로그인해 주세요.'
    })
  }
  if (type === 'confirm') {
    alertModal({
      type: 'info',
      icon: 'interface-check-big',
      title: '이메일이 인증되었습니다.',
      closable: false
    })
  }
}

</script>
