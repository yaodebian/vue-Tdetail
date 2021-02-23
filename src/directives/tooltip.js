function handler(el, binding) {
  const { clientWidth, scrollWidth } = el
  const text = scrollWidth > clientWidth ? binding.value : ''
  const cursor = scrollWidth > clientWidth ? 'pointer' : 'auto'
  el.setAttribute('title', text)
  el.style.cursor = cursor
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