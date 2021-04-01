<template>
  <div>
    <h2>Demo4: Bundle</h2>
    <TDetail 
      :list="list" 
      :col="4"
      :wrap="true"
    >
    </TDetail>
  </div>
</template>

<script>
export default {
  name: 'WrapDemo',
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
          value: 'Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.',
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