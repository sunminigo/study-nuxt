<template>
  <!-- <layout-header
    title="미디언스 회원가입"
    description="미디언스 계정으로 모든 미디언스 서비스를 이용할 수 있습니다."
  /> -->
  <div id="fb-root">
  </div>

  <n-button
    v-if="!baseData.isLogin"
    type="primary"
    large
    @click="actions.login"
  >
    LOGIN
  </n-button>

  <n-button
    v-else
    type="primary"
    large
    @click="actions.logout"
  >
    LOGOUT
  </n-button>

  <br>
  <br>
  <n-button
    type="primary"
    large
    @click="actions.getDetailInfo"
  >
    get
  </n-button>

  <br>
  <br>

  <div
    class="fb-login-button"
    data-max-rows="1"
    data-size="large"
    data-button-type="login_with"
    data-show-faces="false"
    data-auto-logout-link="false"
    data-use-continue-as="false"
    data-onlogin="login()"
  />
</template>

<script setup>
const config = useRuntimeConfig()
const baseData = reactive({
  appId: config.public.APPID_FB,
  isLogin: false,
  posts: [],
  paging: {}
})

window.login = async () => {
  await actions.getInfo()
}

const actions = {
  init: () => {
    console.log(baseData.appId)
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: baseData.appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v15.0',
        cookie: true
      })
      window.FB.AppEvents.logPageView()
    }

    actions.setSdk(document, 'script', 'facebook-jssdk')
  },
  setSdk: (d, s, id) => {
    const js = d.createElement(s)
    const fjs = d.getElementsByTagName(s)[0]

    if (d.getElementById(id)) { return }

    js.id = id
    js.src = 'https://connect.facebook.net/ko_KR/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  },
  login: async () => {
    const res = await actions.getInfo()

    console.log('login', res)
  },
  logout: () => {
    console.log('logout')
    window.FB.logout((response) => {
      if (!response) {
        alert('음 다시해보자')
        return
      }
      console.log(response)
      baseData.isLogin = false
    })
  },
  getInfo: () => {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus((response) => {
        window.FB.login(
          response => {
            console.log(response)
            if (response.status === 'connected') {
              window.FB.api(
                '/me',
                { fields: 'id,name,email,birthday,hometown,likes,events,photos,videos,friends,posts,link,age_range,fundraisers,groups,location,picture' },
                res => {
                  if (!res) return
                  const setResult = {
                    ...res,
                    social: 'Facebook'
                  }
                  resolve(setResult)
                }
              )
            } else {
              alert('로그인하자..')
            }
          },
          { scope: 'public_profile, email' }
        )
      })
    })
  },
  getDetailInfo: () => {
    const getSessionUserInfo = JSON.parse(sessionStorage.getItem(`fbssls_${baseData.appId}`))
    console.log(getSessionUserInfo.authResponse)
    if (getSessionUserInfo) {
      window.FB.api(
        `${getSessionUserInfo.authResponse.userID}/feed`,
        {
          access_token: getSessionUserInfo.authResponse.accessToken
        },
        res => {
          console.log(res)
        }
      )
    }
  }
}

onMounted(() => {
  actions.init()
})
</script>
