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
import { alignMatch, restAlignList } from '@/utils/alignMatch' // eslint-disable-line

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
      alignMatchList: []
    }
  },
  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(val) {
        this.rows = getRows(this.col, val)
        this.initAlignMatchList()
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
        // adjust the left half
        let previousCount = this.col * this.dragPercentage
        const remain = this.col - previousCount
        const targetIndex = this.dragColIndex[i]
        for (let j = 0; j < targetIndex; j++) {
          previousCount -= this.rows[i][j].colspan
        }
        this.rows[i][targetIndex].colspan = previousCount
        // adjust the right half
        let behindCount = 0
        for (let j = targetIndex + 1; j < this.rows[i].length; j++) {
          behindCount += this.rows[i][j].colspan
        }
        for (let j = targetIndex + 1; j < this.rows[i].length; j++) {
          this.rows[i][j].colspan = this.rows[i][j].colspan / behindCount * remain
        }
      }
      // if (this.dragColIndex.indexOf(-1) === -1) {
      //   return
      // }
      // let dragRowIndex = -1
      // for (let i = 0; i < this.dragColIndex.length; ) {
      //   if (this.dragColIndex[i] !== -1) {
      //     dragRowIndex = i
      //     break
      //   }
      // }
      // const restAlignObj = {}
      // for (let i = dragRowIndex + 1; i < this.rows[dragRowIndex][this.dragColIndex[dragRowIndex]].length; i++) {
      //   let temp = restAlignList(this.alignMatchList, dragRowIndex, i)
      // }
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
        // get index in row columns
        const childClass = el.className.replace(/(^\s*)|(\s*$)/, '').split(/\s+/).map(item => `.${item}`).join('')
        const childIndex = [].indexOf.call(el.parentNode.querySelectorAll(childClass), el)
        // get index in row list
        const parentClass = el.parentNode.className.replace(/(^\s*)|(\s*$)/, '').split(/\s+/).map(item => `.${item}`).join('')
        const index = [].indexOf.call(el.parentNode.parentNode.querySelectorAll(parentClass), el.parentNode)
        // last border can't be dragged
        if (childIndex === this.rows[index].length - 1) {
          return
        }
        // get the sum of weight
        let colspan = this.rows[index][childIndex].colspan
        for (let i = childIndex - 1; i >= 0; i--) {
          colspan += this.rows[index][i].colspan
        }
        // get weight of the row
        const targetNum = this.rows[index].reduce((total, cur) => {
          return total + cur.colspan
        }, 0)
        // try to compute the same drag line
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
            this.dragColIndex[index] = -1 // use -1 to indicate no match
          }
        })
        // forbidden 'user select mode' while dragging
        document.body.style['userSelect'] = 'none'
        // tag move status
        this.moving = true
      }
    },
    // handle mouseup event
    handleMouseUp() {
      if (this.moving) {
        // restart 'user select mode'
        document.body.style['userSelect'] = 'auto'
        this.$refs['markLine'].style.left = 0
        this.dragPercentage = this.markLineL / (this.$refs['detailCon'].getBoundingClientRect().width - 1)
        this.computeColWidth()
        this.moving = false
      }
    },
    // handle boder moving
    handleBorderMoving(ev) {
      if (this.moving) {
        const conX = this.$refs['detailCon'].getBoundingClientRect().left
        const clientX = ev.clientX
        this.markLineL = clientX - conX > 0 ? clientX - conX + 1 : 0
        // limit min width
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
    // init align match list
    initAlignMatchList() {
      this.alignMatchList = alignMatch(this.rows)
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