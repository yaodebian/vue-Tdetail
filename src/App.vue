<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Vue Table Detail</h1>
    <DefaultDemo></DefaultDemo>
  </div>
</template>

<script>
// import components
import DefaultDemo from './demos/DefaultDemo.vue'

export default {
  name: 'App',
  components: {
    DefaultDemo
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
  margin-top: 60px;
}
</style>
