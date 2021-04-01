<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/img/logo.png">
    <h1>Vue Table Detail</h1>
    <DefaultDemo class="demo-item"></DefaultDemo>
    <WrapDemo class="demo-item"></WrapDemo>
    <DragDemo class="demo-item"></DragDemo>
    <BundleDemo class="demo-item"></BundleDemo>
  </div>
</template>

<script>
// import components
import DefaultDemo from './demos/DefaultDemo.vue'
import WrapDemo from './demos/WrapDemo.vue'
import BundleDemo from './demos/BundleDemo.vue'
import DragDemo from './demos/DragDemo.vue'

export default {
  name: 'App',
  components: {
    DefaultDemo,
    WrapDemo,
    BundleDemo,
    DragDemo
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
  margin-top: 60px;
}

.demo-item {
  margin-bottom: 20px;
}
</style>
