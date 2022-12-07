<template>
  <form-kit
    ref="formWrap"
    v-model="formData"
    type="form"
    :config="{ validationVisibility: 'dirty' }"
    :actions="false"
    :incomplete-message="false"
    @submit="actions.submit"
  >
    <form-kit
      label="Airlines"
      name="email"
      validation="required|email"
    >
      <template #input="{ state }">
        <base-input
          v-model:value="formData.email"
          :status="formItemState(state)"
        />
      </template>
    </form-kit>
    <form-kit
      type="group"
      name="add"
    >
      <form-kit
        label="Airlines"
        name="test"
        validation="required"
      >
        <template #input="{ state }">
          <base-input
            v-model:value="formData.add.test"
            :status="formItemState(state)"
          />
        </template>
      </form-kit>
      <form-kit
        label="Airline2323s"
        name="abc"
        validation="required|?length:10"
      >
        <template #input="{ state }">
          <n-input
            v-model:value="formData.add.abc"
            :status="formItemState(state)"
          />
        </template>
      </form-kit>
    </form-kit>

    <n-space
      vertical
      class="mt-8"
    >
      <n-button
        type="primary"
        block
        @click="actions.valid"
      >
        로그인 하기
      </n-button>
      <n-button
        type="primary"
        block
        secondary
        @click="actions.valid"
      >
        로그인 하기
      </n-button>
      <n-button
        block
        @click="actions.reset"
      >
        리셋
      </n-button>
      <n-button
        type="info"
        block
        @click="actions.reset"
      >
        리셋
      </n-button>

      <n-button
        type="primary"
        block
        disabled
        @click="actions.valid"
      >
        로그인 하기
      </n-button>
      <n-button
        block
        disabled
        @click="actions.reset"
      >
        리셋
      </n-button>
      <n-button
        type="info"
        block
        disabled
        @click="actions.reset"
      >
        리셋
      </n-button>
    </n-space>
  </form-kit>

  <n-space class="">
    <n-button @click="dialogMassageActions('message')">
      message
    </n-button>
    <n-button @click="dialogMassageActions('alert')">
      alert
    </n-button>
    <n-button @click="dialogMassageActions('confirm')">
      confirm
    </n-button>
  </n-space>
</template>

<script setup>
import { ref } from 'vue'
import { dialogMassage } from '@/composables/global.dialog'

const { messageModal, alertModal, confirmModal } = dialogMassage()
const { formItemState } = useGlobalConfig()

const formWrap = ref(null)
const formData = ref({
  email: null,
  add: {
    test: null,
    abc: null
  }
})
const actions = {
  valid: ({ property }) => {
    formWrap.value.node.submit()
  },
  reset: () => {
    formWrap.value.node.reset()
  },
  submit: () => {
    alert('Valid submit!')
  }
}

const dialogMassageActions = (type) => {
  if (type === 'message') {
    messageModal({
      type: 'info',
      msg: 'test<br />11231'
    })
  }
  if (type === 'alert') {
    alertModal({
      title: '123',
      icon: 'triangle-warning',
      content: '언플래쉬의 모든 이미지는 상업적, 비상업적 목적으로 저작자 표시 없이 무료로 사용할 수 있습니다. 다양한 사진 작가들이 활동하기 때문에 다양한 이미지와 스타일을 보유하고 있습니다. 이곳에는 130만 개가 넘는 사진이 있으며 매월 65,000개 이상의 새로운 이미지가 업로드됩니다. 또한 인터넷에서 가장 큰 사진가 커뮤니티 중의 하나이며 16만 명 이상이 활동하고 있습니다.'
    })
  }
  if (type === 'confirm') {
    confirmModal({
      type: 'info',
      icon: 'triangle-warning',
      title: '이미 사용중인 이메일입니다.',
      content: '미디언스에 가입한 이력이 있다면 로그인해 주세요.'
    })
  }
}
</script>
