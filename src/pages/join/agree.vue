<template>
  <layout-page-title
    :title="baseData.title"
    icon-name="blink"
  />

  <n-checkbox
    v-model:checked="formData.allChecked"
    @update:checked="baseActions.isAllChecked"
  >
    <b>
      약관 전체동의
    </b>
  </n-checkbox>
  <n-divider />
  <n-space
    v-for="(item, index) in formData.terms"
    :key="index"
    class="mb-2"
    justify="space-between"
    :wrap="false"
  >
    <n-checkbox
      v-model:checked="item.checked"
      @update:checked="baseActions.isChecked"
    >
      {{ item.list }}
    </n-checkbox>
    <n-a
      v-if="item.required"
      style="font-size: 12px;text-decoration: underline;"
    >
      내용보기
    </n-a>
  </n-space>

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
        :disabled="!formData.allChecked && !formData.buttonDisabled"
        @click="baseActions.goEmail"
      >
        다음
      </n-button>
    </n-gi>
  </n-grid>
</template>

<script setup>

const formData = reactive({
  checked: null,
  allChecked: false,
  buttonDisabled: false,
  terms: [
    { checked: false, list: '서비스 이용약관 동의(필수)', required: true },
    { checked: false, list: '개인정보 수집 및 이용 동의(필수)', required: true },
    { checked: false, list: '개인정보 제3자 제공 동의(필수)', required: true },
    { checked: false, list: '마케팅 광고 활용 동의(선택)', required: false },
    { checked: false, list: '캠페인 제안 받기(선택)', required: false }
  ]
})

const baseData = reactive({
  title: '처음 오셨나요? </br> 환영합니다.'
})

const baseActions = {
  submit: () => {
    alert('Valid submit!')
  },
  isAllChecked: (value) => {
    formData.terms.filter((item) => { if (item.checked !== value) { item.checked = value } else { item.checked = !value } })
    console.log(value)
    if (!value) {
      formData.allChecked = value
      formData.buttonDisabled = false
    }
  },
  isChecked: (value) => {
    const isChecekd = formData.terms.filter((item) => item.checked === true)
    const requiedChecked = isChecekd.filter((item) => item.required === true)
    if (requiedChecked.length === 3) {
      formData.buttonDisabled = true
      console.log(formData.buttonDisabled)
    } else {
      formData.buttonDisabled = false
    }

    if (isChecekd.length === formData.terms.length) {
      formData.allChecked = true
    } else {
      formData.allChecked = false
    }
  },
  goEmail: () => {
    // router.push('/join')
    alert('go Email!')
  },
  goBack: () => {
    alert('go Back!')
    // router.push('/join/email')
  }
}

</script>
