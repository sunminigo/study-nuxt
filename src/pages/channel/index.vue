<template>
  <layout-page-title
    :title="text.title"
    :content="text.content"
  />
  <n-select :options="channelGuideOptions" />
  <div class="channel-guide">
  </div>
</template>

<script setup>
const text = {
  title: '채널 통합 연결',
  content: '한번의 등록으로 미디언스&스타일메이트 캠페인에 참여해보세요! <p class="second-description">*인스타그램과 페이스북 페이지 연동상태를 확인하여 채널을 등록해주세요.</p>'
}

const channelGuideOptions = [
  { value: 'instagram', label: '인스타그램 연결 가이드' },
  { value: 'youtube', label: '유투브 연결 가이드' }
]
</script>
