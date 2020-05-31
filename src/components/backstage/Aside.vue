<template>
    <div>
        <el-col :span="3">
            <el-menu
            style="height:1000px;width:200px;"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-menu-item index="1" @click="userManage">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="2" @click="goodsPublish">
                    <i class="el-icon-setting"></i>
                    <span slot="title">商品审核</span>
                </el-menu-item>
                <el-menu-item index="3" @click="goodsManage">
                    <i class="el-icon-setting"></i>
                    <span slot="title">商品管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    methods: {
        userManage() {
            this.$router.push('/admin/user');
        },
        goodsPublish() {
            this.$router.push('/admin/publish');
        },
        goodsManage() {
            this.$router.push('/admin/goods');
        }
    }
  }
</script>
<style scoped>
</style>