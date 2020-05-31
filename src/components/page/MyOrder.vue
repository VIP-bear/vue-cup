<template>
    <div style="background-color: darkgray;">
        <div>
          <vHead></vHead>
        </div>
        <div class="main">
            <h1 style="margin:20px;">我的订单</h1>
            <el-table
                class="table"
                tooltip-effect="dark"
                :data="tableData"
                style="width: 100%">

                <el-table-column
                prop="order_id"
                label="订单号"
                width="200">
                </el-table-column>

                <el-table-column
                prop="product_name"
                label="商品名称"
                width="200">
                </el-table-column>

                <el-table-column
                prop="product_price"
                label="单价"
                width="150">
                </el-table-column>

                <el-table-column
                prop="product_num"
                label="数量"
                width="150">
                </el-table-column>

                <el-table-column
                prop="total_price"
                label="金额"
                width="150">
                </el-table-column>
                
                <el-table-column 
                prop="order_time"
                label="下单时间"
                width="150">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import vHead from '../common/Header.vue';
export default {
    components: {
        vHead,
    },
    data() {
      return {
          username: localStorage.getItem('username'),
          tableData: [
            {
              order_id: 1,
              product_name: "test",
              product_price: 10.2,
              product_num: 3,
              total_price: 30.6,
              order_time: '2020-13-45' 
            }
          ],
      }
    },
    created() {
      this.$axios.get('http://localhost:9528/order/'+this.username)
          .then((resp => (
              this.tableData=resp.data
      )));
    },
    methods: {
    }
};
</script>
<style scoped>
.main {
  width: 1000px;
  height: 1000px;
  margin: auto;
  border-radius: 20px;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.table {
  font-size: 20px;
}
</style>
