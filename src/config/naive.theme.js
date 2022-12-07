const common = {
  fontFamily: 'var(--base-font-family)',
  fontFamilyMono: 'var(--base-font-family)',

  fontSize: '16px',

  fontSizeMini: '10px',
  fontSizeTiny: '12px',
  fontSizeSmall: '14px',
  fontSizeMedium: '16px',
  fontSizeLarge: '18px',
  fontSizeHuge: '20px',

  lineHeight: '1.6',

  heightMini: '40px',
  heightTiny: '44px',
  heightSmall: '48px',
  heightMedium: '52px',
  heightLarge: '56px',
  heightHuge: '60px'
}

const color = {
  primary: '#00B295',
  success: '#00B295',
  info: '#52525B',
  warning: '#ff9800',
  error: '#e51c23'
}

export default {
  common: {
    ...common,

    textColor: 'var(--gray-700)',
    borderColor: 'var(--gray-300)',
    placeholderColor: 'var(--gray-300)',
    textColorDisabled: 'var(--gray-300)',
    inputColorDisabled: 'var(--gray-100)',

    primaryColor: color.primary,
    primaryColorHover: color.primary,
    primaryColorActive: color.primary,
    primaryColorPressed: color.primary,
    primaryColorSuppl: color.primary,

    successColor: color.success,
    successColorHover: color.success,
    successColorActive: color.success,
    successColorPressed: color.success,
    successColorSuppl: color.success,

    infoColor: color.info,
    infoColorHover: color.info,
    infoColorActive: color.info,
    infoColorPressed: color.info,
    infoColorSuppl: color.info,

    warningColor: color.warning,
    warningColorHover: color.warning,
    warningColorActive: color.warning,
    warningColorPressed: color.warning,
    warningColorSuppl: color.warning,

    errorColor: color.error,
    errorColorHover: color.error,
    errorColorActive: color.error,
    errorColorPressed: color.error,
    errorColorSuppl: color.error,

    borderRadius: '4px'
  },
  Button: {
    opacityDisabled: 1,

    // secondary
    colorOpacitySecondary: '0.105',
    colorOpacitySecondaryHover: '0.105',
    colorOpacitySecondaryPressed: '0.105',

    // default type
    colorDisabled: 'var(--gray-100)',
    textColorHover: 'var(--gray-800)',
    textColorTextHover: 'var(--gray-800)',
    textColorTextPressed: 'var(--gray-800)',
    textColorTextFocus: 'var(--gray-800)',
    textColorDisabled: 'var(--gray-300)',
    borderDisabled: '1px solid var(--gray-100)',

    // primary
    colorDisabledPrimary: 'var(--gray-100)',
    textColorDisabledPrimary: 'var(--gray-300)',
    borderDisabledPrimary: '1px solid var(--gray-100)',

    // info
    colorDisabledInfo: 'var(--gray-100)',
    textColorDisabledInfo: 'var(--gray-300)',
    borderDisabledInfo: '1px solid var(--gray-100)'
  },
  Tooltip: {
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.12)',
    color: 'var(--gray-100)',
    textColor: 'var(--black)',
    spaceArrow: '4px',
    padding: '12px 20px',
    arrowHeight: 0
  },
  Dialog: {
    padding: 0,
    contentMargin: '16px',
    iconColorInfo: color.primary,
    iconColorWarning: color.error
  },
  Checkbox: {
    sizeMedium: '20px',
    fontSizeMedium: '14px'
  }
}
