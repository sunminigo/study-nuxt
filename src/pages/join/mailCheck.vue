<template>
  <layout-page-title
    :title="baseData.title"
    :content="baseData.content"
    icon-name="communication-mail-open"
  />
  <n-space
    vertical
    class="mt-8"
    justify="center"
  >
    <div class="mb-1 text-center">
      인증메일을 받지 못하셨나요?
    </div>
    <n-button
      type="primary"
      block
      secondary
      @click="baseActions.mailResend"
    >
      메일 재발송
    </n-button>

    <n-button
      type="primary"
      block
      @click="baseActions.mailConfirm"
    >
      확인
    </n-button>
  </n-space>
</template>

<script setup>

const baseActions = {
  mailResend: () => {
    alert('메일 재발송 완료!')
  },
  mailConfirm: () => {
    alert('확인!')
  }
}

const baseData = reactive({
  title: '마지막으로 이메일 인증을 해주세요!',
  content: 'welcome@medinace.com 으로</br>회원가입 인증 메일이 발송되었습니다. </br></br>24시간 내, 발송된 이메일의 [가입완료] 버튼을</br>클릭하시면 회원가입이 완료됩니다.',
  email: null
})
</script>
