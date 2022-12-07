<template>
  <n-config-provider
    :date-locale="{ locale: ko }"
    :theme-overrides="themeOverrides"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <slot />
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { ko } from 'date-fns/esm/locale'
import themeOverrides from '@/config/naive.theme'
</script>
