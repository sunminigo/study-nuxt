import { generateClasses } from '@formkit/themes'
import { ko } from '@formkit/i18n'

const config = {
  config: {
    classes: generateClasses({
      global: {
        outer: 'mb-4',
        label: 'block text-sm mb-2',
        help: 'text-xs text-gray-500',
        messages: 'hidden list-none p-0 mt-2 mb-0',
        message: 'list-none text-red-500 mb-1 text-xs'
      }
    })
  },
  locales: { ko },
  locale: 'ko'
}

export default config
