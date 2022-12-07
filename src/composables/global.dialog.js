import { h, ref, computed } from 'vue'
import { NAlert, createDiscreteApi, lightTheme } from 'naive-ui'
import SvgIcons from '@/components/svg/icons.vue'
import themeOverrides from '@/config/naive.theme'

const iconInfo = ref({ name: '', size: 30 })

const renderMessage = (props) => {
  const { type } = props
  return h(NAlert, {
    closable: props.closable,
    onClose: props.onClose,
    type: type === 'loading' ? 'default' : type,
    title: 'Lorem ipsum dolor sit amet',
    style: {
      boxShadow: 'var(--n-box-shadow)',
      maxWidth: 'calc(100vw - 32px)',
      width: '480px'
    }
  }, {
    default: () => props.content
  })
}

const renderIcon = () => {
  return h(SvgIcons, {
    name: iconInfo.value.name,
    color: 'var(--primary-color)',
    ...iconInfo.value
  })
}

export const dialogMassage = () => {
  const configProviderPropsRef = computed(() => ({
    theme: lightTheme,
    themeOverrides
  }))

  const { message, dialog } = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'], {
    configProviderProps: configProviderPropsRef
  })

  const messageModal = (config = {}) => {
    const setInfo = {
      type: config.type || 'warning',
      msg: () => h('div', { innerHTML: config.msg || '메세지를 넣어주세요.' }),
      options: {
        duration: 3000,
        ...config.options
      }
    }
    if (config.title) {
      setInfo.options.render = renderMessage
    }
    message[setInfo.type](setInfo.msg, setInfo.options)
  }

  const dialogCreateOption = (setting, config) => {
    if (config.icon) {
      if (typeof config.icon === 'string') {
        iconInfo.value.name = config.icon
      } else {
        iconInfo.value = {
          ...iconInfo.value,
          ...config.icon
        }
        iconInfo.value.hideBg = !!config.icon?.hideBg
        if (config.icon?.hideBg) {
          iconInfo.value.size = 42
        } else {
          iconInfo.value.size = 30
        }
      }

      setting.icon = renderIcon
    }

    return setting
  }

  const alertModal = (config = {}) => {
    const setting = {
      type: config.type || 'success',
      class: 'base-dialog base-dialog-alert',
      closable: config.closable || false,
      autoFocus: false,
      maskClosable: false,
      showIcon: !!config.icon,
      iconPlacement: 'top',
      title: () => config.title ? h('div', { innerHTML: config.title, className: 'n-dialog__title-text' }) : null,
      content: () => h('div', { innerHTML: config.content, className: 'n-dialog__content-text' }),
      positiveButtonProps: { type: 'primary' },
      positiveText: config.positiveText || '확인',
      onPositiveClick: () => {
        const messageCall = () => {
          if (config.positiveMsg) {
            messageModal({
              type: 'success',
              msg: config.positiveMsg
            })
          }
          d.loading = false
        }

        if (config.ok) {
          d.loading = true
          return new Promise((resolve) => {
            config.ok().then(() => {
              resolve()
              messageCall()
            }).catch(() => {
              d.loading = false
            })
          })
        } else {
          messageCall()
        }
      }
    }

    const options = dialogCreateOption(setting, config)
    const d = dialog.create(options)
  }

  const confirmModal = (config = {}) => {
    const setting = {
      type: config.type || 'success',
      class: 'base-dialog base-dialog-confirm',
      closable: config.closable || false,
      autoFocus: false,
      maskClosable: false,
      showIcon: !!config.icon,
      iconPlacement: 'top',
      title: () => config.title ? h('div', { innerHTML: config.title, className: 'n-dialog__title-text' }) : null,
      content: () => h('div', { innerHTML: config.content, className: 'n-dialog__content-text' }),
      positiveText: config.positiveText || '확인',
      positiveButtonProps: { type: 'primary' },
      negativeText: config.negativeText || '취소',
      negativeButtonProps: { type: 'error' },
      onPositiveClick: async () => {
        const messageCall = async () => {
          if (config.positiveMsg) {
            messageModal({
              type: 'success',
              msg: config.positiveMsg
            })
          }
          d.loading = false
        }
        if (config.ok) {
          d.loading = true
          return new Promise((resolve) => {
            config.ok().then(() => {
              resolve()
              messageCall()
            }).catch(() => {
              d.loading = false
            })
          })
        } else {
          await messageCall()
        }
      },
      onNegativeClick: async () => {
        if (config.cancel) await config.cancel()
      }
    }

    const options = dialogCreateOption(setting, config)
    const d = dialog.create(options)
  }

  return {
    messageModal,
    alertModal,
    confirmModal
  }
}
