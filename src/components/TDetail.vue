<template>
  <div ref="detailCon" :class="{ 'tdetail': true, 'tdetail-box': border, 'tdetail-resize': moving }">
    <TDetailRow
      :class="{ 'tdetail__row': border }"
      v-for="row in rows" 
      :key="row.label" 
      :col="col" 
      :columList="row" 
      :border="border"
      :wrap="wrap"
      :dragable="dragable"
      @mousedown.native="handleMouseDown($event)"
    >
    </TDetailRow>
    <div ref="markLine" v-show="moving" class="tdetail-box__mark-line"></div>
  </div>
</template>

<script>
// import script
import getRows from '@/utils/rows.js'

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
    dragable: {
      type: Boolean,
      default: false,
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
      rows: [],
      moving: false,
      startPos: 0,
      markLineL: 0,
      dragColIndex: [0, 0, 0],
      dragPercentage: 0,
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
  mounted() {
    this.initDrag()
  },
  methods: {
    // compute col width
    computeColWidth() {
      for (let i = 0; i < this.rows.length; i++) {
        if (this.dragColIndex[i] === -1) {
          continue
        }
        let count = 0
        for (let j = 0; j < this.rows[i].length; j++) {
          if (j > this.dragColIndex[i]) {
            count += this.rows[i][j].colspan
          }
        }
        let allCount = 0
        let allCol = count / this.dragPercentage
        let remain = allCol - count
        for (let n = 0; n < this.rows[i].length; n++) {
          allCount += this.rows[i][n].colspan
        }
        for (let m = 0; m < this.dragColIndex[i]; m++) {
          const temp = this.rows[i][m].colspan / allCount * allCol
          this.rows[i][m].colspan = temp
          remain -= temp
        }
        this.rows[i][this.dragColIndex[i]].colspan = remain
      }
    },
    // handle mousedown event
    handleMouseDown(ev) {
      const conX = this.$refs['detailCon'].getBoundingClientRect().left
      const clientX = ev.clientX
      this.markLineL = clientX - conX > 0 ? clientX - conX + 1 : 0
      this.$refs['markLine'].style.left = `${this.markLineL}px`
      const el = ev.srcElement
      if (el.classList.contains('tdetail-row__colborder')) {
        this.startPos = el.getBoundingClientRect().left - conX + 1
        const childClass = el.className.replace(/(^\s*)|(\s*$)/, '').split(/\s+/).map(item => `.${item}`).join('')
        const childIndex = [].indexOf.call(el.parentNode.querySelectorAll(childClass), el)
        const parentClass = el.parentNode.className.replace(/(^\s*)|(\s*$)/, '').split(/\s+/).map(item => `.${item}`).join('')
        const index = [].indexOf.call(el.parentNode.parentNode.querySelectorAll(parentClass), el.parentNode)
        if (childIndex === this.rows[index].length - 1) {
          return
        }
        let colspan = this.rows[index][childIndex].colspan
        for (let i = childIndex - 1; i >= 0; i--) {
          colspan += this.rows[index][i].colspan
        }
        const targetNum = this.rows[index].reduce((total, cur) => {
          return total + cur.colspan
        }, 0)
        this.rows.forEach((item, index) => {
          let count = 0
          let flag = false
          const curNum = this.rows[index].reduce((total, cur) => {
            return total + cur.colspan
          }, 0)
          for (let j = 0; j < item.length; j++) {
            count += item[j].colspan
            if ((count / curNum).toFixed(3) === (colspan / targetNum).toFixed(3)) {
              flag = true
              this.dragColIndex[index] = j
              break
            } else if (count > colspan) {
              break
            }
          }
          if (!flag) {
            this.dragColIndex[index] = -1
          }
        })
        document.body.style['userSelect'] = 'none'
        this.moving = true
      }
    },
    // handle mouseup event
    handleMouseUp() {
      if (this.moving) {
        document.body.style['userSelect'] = 'auto'
        this.$refs['markLine'].style.left = 0
        this.dragPercentage = 1 - this.markLineL / (this.$refs['detailCon'].getBoundingClientRect().width - 1)
        this.computeColWidth()
        this.moving = false
      }
    },
    // handle boder moving
    handleBorderMoving(ev) {
      if (this.moving) {
        const conX = this.$refs['detailCon'].getBoundingClientRect().left - 1
        const clientX = ev.clientX
        this.markLineL = clientX - conX > 0 ? clientX - conX : 0
        if (this.markLineL - this.startPos < 100) {
          this.markLineL = this.startPos + 100
        }
        this.$refs['markLine'].style.left = `${this.markLineL}px`
      }
    },
    // init drag environment
    initDrag() {
      if (this.dragable) {
        window.addEventListener('mousemove', this.handleBorderMoving)
        window.addEventListener('mouseup', this.handleMouseUp)
      }
    },
    // remove event listener
    removeListener() {
      window.removeEventListener('mousemove', this.handleBorderMoving)
      window.addEventListener('mouseup', this.handleMouseUp)
    }
  },
  beforeDestroy() {
    this.removeListener()
  }
}
</script>

<style lang="scss">
.tdetail {
  box-sizing: border-box;
  position: relative;
}

.tdetail-box {
  border: 1px solid #e8eaec;
  border-right: none;
  border-bottom: none;
}

.tdetail-box__mark-line {
  height: 100%;
  border-right: 1px dashed #e8eaec;
  position: absolute;
  left: 0;
  top: 0;
  cursor: col-resize;
}

.tdetail-resize {
  * {
    cursor: col-resize !important;
  }
}
</style>