<template>
  <div>
    <TDetail :list="list" :col="4"></TDetail>
  </div>
</template>

<script>
// import components
import TDetail from '../components/TDetail.vue'

export default {
  name: 'DefaultDemo',
  components: {
    TDetail
  },
  data() {
    return {
      list: [
        {
          label: 'label1',
          value: 'value1',
          colspan: 1
        },
        {
          label: 'label2',
          value: 'value2',
          colspan: 1
        },
        {
          label: 'label3',
          value: 'value3',
          colspan: 1
        },
        {
          label: 'label4',
          value: 'value4',
          colspan: 1
        },
        {
          label: 'label5',
          value: 'value5',
          colspan: 1
        },
        {
          label: 'label6',
          value: 'value6',
          colspan: 1
        },
        {
          label: 'label7',
          value: 'value7',
          colspan: 1
        },
        {
          label: 'label8',
          value: 'value8',
          colspan: 1
        },
        {
          label: 'label9',
          value: '感觉很干净很干净很客观环境高科技赶紧换个好几个机会看过后即可',
          colspan: 1
        },
        {
          label: 'label10',
          value: 'value10',
          colspan: 1
        }
      ]
    }
  }
}
</script>

<style lang="scss">

</style>