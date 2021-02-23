import tooltip from './tooltip'

const directives = {
  tooltip
}

export default {
  install: Vue => {
    for (const key in directives) {
      Vue.directive(key, directives[key])
    }
  }
}