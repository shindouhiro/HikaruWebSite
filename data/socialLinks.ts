export type SocialLink = {
  key: 'douyin' | 'redbook' | 'bilibili'
  label?: string
  icon: string
  iconActive: string
  hoverBg: string
  qr: string
}

export const socialLinks: SocialLink[] = [
  {
    key: 'douyin',
    label: '抖音',
    icon: 'i-custom-douyin',
    iconActive: 'i-custom-douyin-active',
    hoverBg: 'group-hover:bg-black',
    qr: 'https://i0.hdslb.com/bfs/openplatform/b827c019e1c6c35c03619611120821eb55a15460.png'
  },
  {
    key: 'redbook',
    label: '小红书',
    icon: 'i-custom-redbook',
    iconActive: 'i-custom-redbook-active',
    hoverBg: 'group-hover:bg-red-500',
    qr: 'https://i0.hdslb.com/bfs/openplatform/dcf8faa65c440318b6b6b01985ad5e8d8da5893e.png'
  },
  {
    key: 'bilibili',
    label: '哔哩哔哩',
    icon: 'i-custom-bilibili',
    iconActive: 'i-custom-bilibili-active',
    hoverBg: 'group-hover:bg-blue-500',
    qr: 'https://i0.hdslb.com/bfs/openplatform/a6ea75badb01c606f05fe95ba951dd2990201fe4.png'
  }
]


