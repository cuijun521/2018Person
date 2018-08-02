<template>
    <div>
        <el-button @click="addCommodityVisible = true">添加商品</el-button>
        商品列表
        <ListView :tableData="tableData" />
        <el-dialog title="添加商品" :visible.sync="addCommodityVisible">
          <AddForm />
        </el-dialog>
    </div>
</template>

<script>
import ListView from "./components/ListView";
import AddForm from './components/AddForm';
export default {
  data() {
    return {
      addCommodityVisible: false,
      tableData: []
    };
  },
  components: {
    ListView,
    AddForm
  },
  created() {
    fetch("/api/product/list")
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.tableData = data;
      });
  }
};
</script>

<style scoped>
.content-box {
  background: #fff;
  padding: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>