<template>
  <layout-page-title
    :title="baseData.title"
    icon-name="mobile"
  />

  <form-kit
    ref="formWrap"
    v-slot="{ value }"
    v-model="formData"
    type="form"
    :config="{ validationVisibility: 'dirty' }"
    :actions="false"
    :incomplete-message="false"
    @submit="baseActions.submit"
  >
    <form-kit
      label="휴대폰 번호"
      name="tel"
      :validation="[['required'], ['matches', /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/]]"
      :validation-messages="{
        required: '연락처 항목은 필수 정보입니다.',
        matches: '숫자만 입력해주세요.'
      }"
    >
      <template #input="{ state }">
        <n-grid
          :x-gap="8"
          :y-gap="8"
          :cols="3"
          class="mt-8"
        >
          <n-gi>
            <n-select
              v-model:value="formData.telAgency"
              :options="baseData.options"
              :disabled="baseData.telCheckSuccess"
            />
          </n-gi>
          <n-gi span="2">
            <base-input
              v-model:value="formData.tel"
              type="tel"
              :status="formItemState(state)"
              placeholder="전화번호를 입력해주세요."
              :maxlength="11"
              :disabled="baseData.telCheckSuccess"
            />
          </n-gi>
        </n-grid>
      </template>
    </form-kit>
    <template v-if="baseData.isCertification">
      <form-kit
        name="certificationNumber"
        validation="required"
      >
        <template #input="{ state }">
          <div class="tel-check">
            <base-input
              v-model:value="formData.certificationNumber"
              :status="formItemState(state)"
              placeholder="인증번호 입력"
            />
            <span class="tel-check__countdown">
              {{ baseData.timer.update }}
            </span>
          </div>
        </template>
      </form-kit>
    </template>
    <n-grid
      :x-gap="12"
      :y-gap="12"
      :cols="3"
      class="mt-8"
    >
      <n-gi>
        <n-button
          block
          :type="!baseData.isCertification && baseData.telCheckSuccess ? 'info' : ''"
          @click="baseActions.telModify"
        >
          {{ !baseData.isCertification && baseData.telCheckSuccess ? '변경' : '이전' }}
        </n-button>
      </n-gi>
      <n-gi span="2">
        <n-button
          v-if="!baseData.isCertification && !baseData.telCheckSuccess"
          type="primary"
          block
          :secondary="!baseData.telCheckSuccess"
          :disabled="!value.tel"
          @click="baseActions.sendCertification"
        >
          인증번호 발송
        </n-button>
        <n-button
          v-else
          type="primary"
          block
          :disabled="!value.certificationNumber && !baseData.telCheckSuccess"
          @click="baseActions.telCheck"
        >
          {{ !baseData.telCheckSuccess ? '확인' : '다음' }}
        </n-button>
      </n-gi>
    </n-grid>
  </form-kit>
</template>

<script setup>
const { formItemState } = useGlobalConfig()

const formWrap = ref(null)
const formData = ref({
  tel: '01010041004',
  certificationNumber: null,
  telAgency: 'SKT'
})
const baseData = reactive({
  options: [
    { label: 'SKT', value: 'SKT' },
    { label: 'KT', value: 'KT' },
    { label: 'LGU+', value: 'LGT' },
    { label: '알뜰폰', value: 'MVNO' }
  ],
  isCertification: false,
  timer: {
    total: 180,
    count: null,
    setTime: null,
    update: null
  },
  telCheckSuccess: false,
  title: computed(() => baseData.telCheckSuccess ? '전화번호 인증이 완료되었습니다!' : '전화번호 인증을 해주세요'
  )
})

const baseActions = {
  goBack: () => {
    alert('이전')
  },
  telModify: () => {
    if (baseData.telCheckSuccess) {
      baseData.telCheckSuccess = false
      baseData.isCertification = false
      formData.value.tel = null
    } else {
      baseActions.goBack()
    }
  },
  submit: () => {
    if (!baseData.telCheckSuccess) {
      if (!baseData.isCertification && !baseData.telCheckSuccess) {
        baseData.isCertification = true
        baseActions.setCountDown()
      } else {
        baseData.telCheckSuccess = true
        baseData.isCertification = false
      }
    } else {
      alert('submit')
    }
  },
  sendCertification: () => {
    formWrap.value.node.submit()
  },
  telCheck: () => {
    formWrap.value.node.submit()
  },
  formatNumber: (num) => {
    const formatString = String(num)
    if (formatString.length < 2) return '0' + num
    return num
  },
  timerFormat: () => {
    const minute = Math.floor(baseData.timer.count / 60)
    const seconds = baseData.timer.count - minute * 60

    return `${baseActions.formatNumber(minute)}:${baseActions.formatNumber(seconds)}`
  },
  clearTimer: () => {
    baseData.timer.count = baseData.timer.total
    baseData.timer.update = baseActions.timerFormat()
    clearInterval(baseData.timer.setTime)
  },
  setCountDown: () => {
    baseData.timer.count = baseData.timer.total
    baseData.timer.setTime = setInterval(() => {
      baseData.timer.count--
      baseData.timer.update = baseActions.timerFormat()

      if (baseData.timer.count === 0) {
        baseActions.clearTimer()
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.tel-check {
  position: relative;

  &__countdown {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 14px;
    color: #00b295;
  }

  :deep(.n-base-clear) {
    display: none;
  }
}
</style>
