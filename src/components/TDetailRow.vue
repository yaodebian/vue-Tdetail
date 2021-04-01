<template>
  <div class="tdetail-row">
    <div 
      :class="{ 'tdetail-row__col': true, 'tdetail-row__colbox': border, 'tdetail-row__colborder': dragable && border }"
      :style="`flex-grow: ${col.colspan}`"
      v-for="col in columList" 
      :key="col.label"
    >
      <label class="tdetail-row__col-label" v-tooltip="col.label" v-text="col.label"></label>
      <p :class="{ 'tdetail-row__col-value': true, 'tdetail-row__col-valwrap': wrap }" v-tooltip="col.value" v-text="col.value"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TDetailRow',
  inject: ['col', 'border', 'wrap', 'dragable'],
  props: {
    columList: {
      type: Array,
      default: () => []
    },
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
  line-height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  flex-basis: 0;
  overflow: hidden;
}

.tdetail-row__colbox {
  border-bottom: 1px solid #e8eaec; 

  &::after {
    content: '';
    width: 1px;
    height: 100%;
    background: #e8eaec;
    display: block;
    pointer-events: auto;
  }
}

.tdetail-row__colborder {
  &:last-child::after {
    cursor: auto;
  }

  &::after {
    cursor: col-resize;
  }
}

.tdetail-row__col-label {
  color: #666;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  
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
  flex-shrink: 0;
}

.tdetail-row__col-valwrap {
  white-space: normal;
}
</style>