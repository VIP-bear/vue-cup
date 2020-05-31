<template>
    <div class="wrapper">
        <div class="div">
            <vHead></vHead>
            <div class="div1">
                <vSide></vSide>
            </div>
            <div class="div2">
                <h2>商品管理(已发布)</h2>
                <el-table
                :data="tableData"
                style="text-align: center;font-size: 24px;"
                border>
                    <el-table-column
                        prop="id"
                        label="编号"
                        width="200">
                    </el-table-column>
                    <el-table-column 
                    width="100"
                    height="100"
                    label="商品封面"
                    prop="product_pic_url">
                    <template scope="scope">
                        <img style="width:100px;height:100px;object-fit: cover;"
                        :src="scope.row.product_pic_url">
                    </template>
                    </el-table-column>
                    <el-table-column
                        prop="product_name"
                        label="商品名"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="单价"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        prop="product_publisher"
                        label="商家"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        prop="product_publish_time"
                        label="发布时间"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="400">
                        <template slot-scope="scope">
                            <el-button @click="deleteGoods(scope.$index)" size="large" type="danger" style="margin-left:50px;">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                class="page"
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from '../backstage/Header.vue';
import vSide from '../backstage/Aside.vue'
export default {
    components: {
        vHead,
        vSide,
    },
    data() {
        return {
            pageSize:6,
            total:10,
            tableData: []
        }
    },
    created(){
      this.$axios.get('http://localhost:9528/admin/findProduct/0/6')
            .then((resp => (
                this.tableData = resp.data.content,
                this.total = resp.data.totalElements
            )))
    },
    methods: {
      page(currentPage){
        this.$axios.get('http://localhost:9528/admin/findProduct/'+(currentPage-1)+'/6')
            .then((resp => (
                this.tableData = resp.data.content,
                this.total = resp.data.totalElements
            )))
      },
      deleteGoods(index) {
        this.$axios.get('http://localhost:9528/admin/deleteProduct/'+this.tableData[index].id)
        .then((resp => (
            this.tableData.splice(index, 1),
            this.$message.success(resp.data)
        )))
      }
    },
};
</script>
<style scoped>

.div1{
    width:200px;
    height:1000px;
    background-color:#545c64;
	display:inline-block;
}
.div2{
    width:100%;
    position: fixed;
    top: 100px;
    margin-left: 50px;
	display:inline-block;
}
.page {
    position: fixed;
    bottom:10px;
    margin-left: 40%;
    cursor: pointer;
}
</style>
