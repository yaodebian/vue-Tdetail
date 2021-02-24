<template>
  <div :class="{ 'tdetail': true, 'tdetail-box': border }">
    <TDetailRow
      :class="{ 'tdetail__row': border }"
      v-for="row in rows" 
      :key="row.label" 
      :col="col" 
      :columList="row" 
      :border="border"
      :wrap="wrap"
    >
    </TDetailRow>
  </div>
</template>

<script>
// import script
import { getRows } from '@/utils/tool.js'

// import components
import TDetailRow from './TDetailRow.vue'

export default {
  name: 'tdetail',
  components: {
    TDetailRow
  },
  props: {
    col: {
      type: Number,
      default: 3
    },
    border: {
      type: Boolean,
      default: true
    },
    wrap: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
      /*
        [
          {
            label: 'label1',
            value: 'value1',
            colspan: 1
          }
        ]
      */
    }
  },
  data() {
    return {
      rows: []
    }
  },
  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(val) {
        this.rows = getRows(this.col, val)
      }
    }
  },
}
</script>

<style lang="scss">
.tdetail {
  box-sizing: border-box;
}

.tdetail-box {
  border: 1px solid #e8eaec;
  border-right: none;
  border-bottom: none;
}
</style>