<template>
    <div style="background-color: darkgray;">
        <div>
          <vHead></vHead>
        </div>
        <div class="main">
            <h1 style="margin:20px;">购物车</h1>
            <el-table
                class="table"
                ref="multipleTable"
                tooltip-effect="dark"
                :data="tableData"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="70">
                </el-table-column>
                <el-table-column 
                width="100"
                height="100"
                prop="product_pic_url">
                  <template scope="scope">
                    <img style="width:100px;height:100px;object-fit: cover;"
                      :src="scope.row.product_pic_url">
                  </template>
                </el-table-column>
                <el-table-column
                prop="product_name"
                label="商品信息"
                width="250">
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
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="medium"
                      type="danger"
                      @click="handleDelete(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="bt-bottom">
                <el-button class="bt-cancel" type="text" @click="toggleSelection()">取消选择</el-button>
                <el-button class="bt-delete" type="text" @click="batchDelete">删除</el-button>
                <el-button class="bt-money"  type="text">￥{{money}}</el-button>
                <el-button class="bt-buy" type="danger" @click="open">去结算</el-button>
            </div>
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
          tableData: [],
          money: 0,
          multipleSelection: []
      }
    },
    created() {
      this.$axios.get('http://localhost:9528/cart/findAll/'+this.username)
          .then((resp => (
              this.tableData=resp.data
      )));
    },
    methods: {
        // 删除一条记录
        handleDelete(index) {
          this.$axios.get('http://localhost:9528/cart/delete/'+this.username+'/'+this.tableData[index].product_id)
            .then((resp => (
                this.tableData.splice(index, 1),
                this.$message("删除成功")
          )));
        },
        // 批量删除
        batchDelete() {
          const _this = this;
          this.$axios.post('http://localhost:9528/cart/deleteAllSelect/'+this.username, this.multipleSelection)
            .then(function(resp){
                let  multData = _this.multipleSelection;
                let  tableDataTemp = _this.tableData;
                let  multDataLen = multData.length;
                let  tableDataLen = tableDataTemp.length;
                for(let i = 0; i < multDataLen ;i++){ 
                    for(let y=0;y < tableDataLen;y++){
                        if(JSON.stringify(tableDataTemp[y]) == JSON.stringify(multData[i])){  //判断是否相等，相等就删除
                          _this.tableData.splice(y,1)
                        }
                    }
                }
                _this.$message("删除成功");
            });
        },
        toggleSelection(rows) {
          this.money = 0;
          if (rows) {
              rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
          });
          } else {
              this.$refs.multipleTable.clearSelection();
          }
        },
        // 购买提示
        open() {
          if (this.multipleSelection.length != 0) {
            this.$confirm('您将购选择的商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(() => {
              this.buySelect();
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消购买'
              });          
            });
          } else {
            this.$message.error('您没有选择任何商品');
          }
        },
        buySelect() {
          const _this = this;
          this.$axios.post('http://localhost:9528/order/saveAll/'+this.username, this.multipleSelection)
            .then(function(resp) {
                if (resp.data == '购买成功') {
                  _this.$message.success(resp.data);
                  _this.$router.push('/buysuccess');
                } else {
                  _this.$message.error(resp.data);
                }
          });
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          this.money = 0;
          let  len = this.multipleSelection.length;
          for(let i = 0; i < len ;i++){
            this.money += this.multipleSelection[i].total_price;
          } 
        }
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
.bt-bottom {
  width: 1000px;
  height: 50px;
  position: fixed;
  bottom: 0px;
  background-color: gray;
}
.bt-delete, .bt-cancel{
  margin-top: 10px;
  margin-left: 30px;
  font-size: 16px;
}
.bt-money {
  font-size: 20px;
  color: red;
  margin-left: 60%;
}
.bt-buy {
  font-size: 24px;
  height: 100%;
  float: right;
}
</style>
