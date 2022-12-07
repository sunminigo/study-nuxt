import { defineNuxtPlugin } from 'nuxt/app'

import VueSvgInlinePlugin from 'vue-svg-inline-plugin'
import 'vue-svg-inline-plugin/src/polyfills'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueSvgInlinePlugin, {
    attributes: {
      merge: ['class', 'style'],
      data: ['src'],
      remove: ['alt', 'tabindex']
    },
    cache: {
      persistent: false,
      removeRevisions: true
    }
  })
})
