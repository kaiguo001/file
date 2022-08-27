<template>
  <div class="mTable">
    <el-table :data="tableData" :max-height="maxHeight" :border="border" fit size="mini" ref="table" tooltip-effect="myTooltips">
      <el-table-column v-for="(item, index) in tableHead" :key="index" :prop="item.key" :label="item.name" :align="align" min-width="50" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'mTable',
  data() {
    return {
      tableHead:[{name: 'col1', key: 'key1'}, {name: 'col2', key: 'key2'}],
      tableData:[{key1: '100', key2:'200'},{key1: '300', key2:'400'}],
      align: 'center',
      border: true
    }
  }
}
</script>
<style lang="scss" scoped>
.mTable{
  width: 100%;
  height: 100%;
  ::v-deep.el-table {
      background-color: transparent;
      border-color: #393939;
      tr {
        background-color: transparent;
      }
      .el-table__cell {
        background-color: transparent !important;
        border-color: #393939;
        .cell {
          font-size: 1.4rem;
          font-family: PingFang SC;
          font-weight: 400;
        }
      }
      .el-table__body-wrapper {
        .el-table__cell {
          .cell {
            color: #ccc;
          }
        }
        .el-table__cell:nth-last-child(1){
          border-right: none
        }
      }
      .el-table__header{
        .el-table__cell {
          .cell {
            color: #fff;
          }
        }
        .el-table__cell:nth-last-child(1){
          border-right: none
        }
      }
    }

    
    ::v-deep.el-table--group:after,
    ::v-deep.el-table:before {
      background: #393939;
    }
    ::v-deep.el-table--border:after{
      background: transparent;
    }
    
    
}
</style>