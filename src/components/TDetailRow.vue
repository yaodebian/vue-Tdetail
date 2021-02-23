<template>
  <div class="tdetail-row">
    <div 
      :class="{'tdetail-row__col': true, 'tdetail-row__col-box': border}"
      :style="`flex-grow: ${col.colspan}`"
      v-for="col in columList" 
      :key="col.label"
    >
      <label class="tdetail-row__col-label" v-text="col.label"></label>
      <p class="tdetail-row__col-value" v-tooltip="col.value" v-text="col.value"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TDetailRow',
  props: {
    col: {
      type: Number,
      default: 3
    },
    columList: {
      type: Array,
      default: () => []
    },
    border: {
      type: Boolean,
      default: true
    },
    labelWrap: {
      type: Boolean,
      default: false
    },
    valueWrap: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {

    }
  },
}
</script>

<style lang="scss">
.tdetail-row {
  display: flex;
}
.tdetail-row__col {
  font-size: 14px;
  text-align: left;
  height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-basis: 0;
}

.tdetail-row__col-box {
  border-bottom: 1px solid #e8eaec; 

  &::after {
    content: '';
    width: 1px;
    height: 100%;
    background: #e8eaec;
    display: block;
  }
}

.tdetail-row__col-label {
  color: #666;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  flex-shrink: 0;
  
  &::after {
    content: ':';
  }
}

.tdetail-row__col-value {
  color: #333;
  width: 0;
  padding: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  flex-basis: 0;
  flex-grow: 1;
}
</style>