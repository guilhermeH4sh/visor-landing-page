export const CONFIG = {
  storagePrefix: 'visor_',
  freeShippingFrom: 399,
  whatsapp: '5511999999999',
  whatsappMessage: 'Olá! Vim pelo site VISOR e gostaria de ajuda com a coleção Horizonte.',
  currency: 'BRL',
  locale: 'pt-BR',
  coupons: {
    VISOR10: { type: 'percent', value: 10, label: '10% off' },
    HORIZONTE50: { type: 'fixed', value: 50, label: 'R$ 50 off' },
    FRETEGRATIS: { type: 'shipping', value: 0, label: 'Frete grátis' },
  },
  compareLimit: 3,
  recentLimit: 4,
};

export const STORAGE_KEYS = {
  cart: 'visor_cart',
  favorites: 'visor_favorites',
  cookies: 'visor_cookies',
  newsletter: 'visor_newsletter',
  account: 'visor_account',
  coupon: 'visor_coupon',
  recent: 'visor_recent',
  compare: 'visor_compare',
};
