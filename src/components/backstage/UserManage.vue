<template>
    <div class="wrapper">
        <div class="div">
            <vHead></vHead>
            <div class="div1">
                <vSide></vSide>
            </div>
            <div class="div2">
                <h2>用户管理</h2>
                <el-table
                :data="tableData"
                style="text-align: center;font-size: 24px;"
                border>
                    <el-table-column
                        prop="id"
                        label="编号"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        prop="username"
                        label="用户名"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="250">
                        <template slot-scope="scope">
                            <el-button @click="toAdmin(scope.$index)" size="medium" type="danger" style="margin-left:50px;">设置为管理员</el-button>
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
            tableData: [{
                id: 1,
                username: 'test',
            },
            {
                id: 2,
                username: 'test2',
            }]
        }
    },
    created(){
      this.$axios.get('http://localhost:9528/admin/findAllUser/0/6')
            .then((resp => (
                this.tableData = resp.data.content,
                this.total = resp.data.totalElements
            )))
    },
    methods: {
      page(currentPage){
        this.$axios.get('http://localhost:9528/admin/findAllUser/'+(currentPage-1)+'/6')
            .then((resp => (
                this.tableData = resp.data.content,
                this.total = resp.data.totalElements
            )))
      },
      toAdmin(index) {
          this.$axios.get('http://localhost:9528/admin/add/'+this.tableData[index].id)
            .then((resp => (
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
    width:751px;
    position: fixed;
    top: 100px;
    margin-left: 250px;
	display:inline-block;
}
.page {
    position: fixed;
    bottom:10px;
    margin-left: 15%;
    cursor: pointer;
}
</style>
