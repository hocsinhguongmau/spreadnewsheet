import { atom } from 'recoil'

export const activeIndex = atom({
  key: 'activeIndex',
  default: '',
})

export const inputValue = atom({
  key: 'inputValue',
  default: {
    id: '',
    value: '',
  },
})

export const submitField = atom({
  key: 'submitField',
  default: false,
})
