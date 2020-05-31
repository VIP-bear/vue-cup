<template>
    <div class="header">
        <!-- 折叠按钮
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div> -->
        <div class="logo">
            <router-link to="/" style="color:white">
                校园二手交易平台
            </router-link>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 发布 -->
                <div class="btn-publish">
                    <router-link to="/publish">
                        <span class="login">发布</span>
                    </router-link>
                </div>
                <!-- 购物车 -->
                <div class="btn-shopping" title="购物车">
                    <router-link to="/cart">
                        <i class="el-icon-shopping-cart-full"></i>
                    </router-link>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <div v-if="login">
                    <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{username}}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <a href="https://github.com/VIP-bear/cup" target="_blank">
                                <el-dropdown-item>项目仓库</el-dropdown-item>
                            </a>
                            <el-dropdown-item divided command="myOrder">我的订单</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div v-else>
                    <router-link to="/login">
                        <span class="login">登录/注册</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            login: false,
            username: '',
            input: '',
        };
    },
    computed: {
        username() {
            return this.username;
        }
    },
    // 初始化的时候调用
    created() {
        this.username = localStorage.getItem('username');
        this.login = this.username ? true : false;
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('username');
                this.$router.push('/login');
            } else if (command == 'myOrder') {
                this.$router.push('/myorder');
            }
        },
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.login {
    font-size: 18px;
    color: #fff;
    cursor: pointer;
}
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.header .logo {
    float: left;
    width: 250px;
    margin-left: 20px;
    line-height: 70px;
    cursor: pointer;
}
.search {
    float: left;
    width: 250px;
    border-radius: 15px;
    line-height: 70px;
    margin-left: 20%;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-publish {
    text-align: center;
    cursor: pointer;
    margin-right: 50px;
}
.btn-shopping {
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    margin-right: 50px;
}
.el-icon-shopping-cart-full {
    margin-top: 5px;
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
