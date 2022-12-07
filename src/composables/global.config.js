// import { computed } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
// import { useStoreAuth } from '@/stores/auth'
// import { lodash } from '@mediance/common'

export function useGlobalConfig () {
  // const router = useRouter()
  // const route = useRoute()
  // const reactionParams = computed(() => router.currentRoute.value.params)

  // const storeAuth = useStoreAuth
  // const isAuth = computed(() => storeAuth.isAuth)

  // const routerLink = (to, isBlank) => {
  //   if (isBlank) {
  //     const routeData = router.resolve(to)
  //     window.open(to.path || routeData.href, '_blank')
  //   } else {
  //     router.push(to).then(() => {})
  //   }
  // }

  const formItemState = (state) => {
    return (state.dirty || state.submitted) && !state.valid ? 'error' : null
  }

  return {
    // router,
    // route,
    // reactionParams,
    // routerLink,
    formItemState
    // isAuth
  }
}
