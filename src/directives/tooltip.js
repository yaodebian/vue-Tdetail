function handler(el, binding) {
  const { clientWidth, scrollWidth } = el
  const text = scrollWidth > clientWidth ? binding.value : ''
  el.setAttribute('title', text)
}

export default {
  inserted: (el, binding) => {
    handler(el, binding)
  },
  update: (el, binding) => {
    if (binding.value !== binding.oldValue) {
      handler(el, binding)
    }
  }
}