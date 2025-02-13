import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
  ],
  shortcuts: {
    'avatar-border': 'w-64 h-64 rounded-20px p-2 bg-gradient-to-r from-blue-500 to-teal-500 shadow-md',
    'info-item': 'flex items-center gap-4 p-4 bg-blue-50 rounded-xl transition duration-200',
    'info-icon': 'w-10 h-10 flex items-center justify-center bg-white rounded-lg text-xl',
    // 'social-link': 'flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-gray-700 hover:bg-gray-100 transition duration-200 hover:-translate-y-0.5'
  },
  theme: {
    colors: {
      primary: '#1a56db'
    }
  }
}) 
