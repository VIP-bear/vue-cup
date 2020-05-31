<template>
    <div class="main">
        <div style="width:100%;height:50px;">
            <span>
                <!-- 类别 -->
                <el-cascader :options="options" @change="handleChange" placeholder="全部"
                    style="float:left;margin-left:20px;">
                </el-cascader>
                <!-- 搜索 -->
                <el-input placeholder="搜索商品" 
                    style="float:right;width:200px;margin-right:160px;"
                    prefix-icon="el-icon-search" v-model="input" @keyup.enter.native="searchProduct">
                </el-input>
            </span>
        </div>
        <!-- 循环显示商品 -->
        <ul id="list" style="white-space:nowrap;display:inline;">
            <li class="item" v-for="(goods, index) in goodsList" 
                :key="goods.product_name" @click="onDetail(goods.id)"
                style="list-style: none;display: inline-block;"> 
                <img style="width:180px;height:210px;" 
                    :src=goods.product_pic_url>
                <p style="color:red;">{{goods.product_name}}</p>
                <p>发布时间:{{goods.product_publish_time}}</p>
                <p>价格:￥{{goods.price}}</p>
                <p>商家:{{goods.product_publisher}}</p>
            </li>
        </ul>
        <div class="page" v-if="pageIsValid">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                :total="total"
                @current-change="page">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageIsValid: true,
            input: '',
            goodsList: [
                {
                    id: 1,
                    product_name: 'test',
                    product_publish_time: '2020-2-23',
                    product_pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9zZWDjKu8X8n-b27uME_TvazsPIC4dOunDY9DqVIyxshbkabx&usqp=CAU',
                    price: 10.0,
                    product_publisher: 'bear',
                },
                {
                    id: 1,
                    product_name: 'test',
                    product_publish_time: '2020-2-23',
                    product_pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9zZWDjKu8X8n-b27uME_TvazsPIC4dOunDY9DqVIyxshbkabx&usqp=CAU',
                    price: 10.0,
                    product_publisher: 'bear',
                },
                {
                    id: 1,
                    product_name: 'test',
                    product_publish_time: '2020-2-23',
                    product_pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9zZWDjKu8X8n-b27uME_TvazsPIC4dOunDY9DqVIyxshbkabx&usqp=CAU',
                    price: 10.0,
                    product_publisher: 'bear',
                },
                {
                    id: 1,
                    product_name: 'test',
                    product_publish_time: '2020-2-23',
                    product_pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9zZWDjKu8X8n-b27uME_TvazsPIC4dOunDY9DqVIyxshbkabx&usqp=CAU',
                    price: 10.0,
                    product_publisher: 'bear',
                },
                {
                    id: 1,
                    product_name: 'test',
                    product_publish_time: '2020-2-23',
                    product_pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9zZWDjKu8X8n-b27uME_TvazsPIC4dOunDY9DqVIyxshbkabx&usqp=CAU',
                    price: 10.0,
                    product_publisher: 'bear',
                },
                {
                    id: 1,
                    product_name: 'test',
                    product_publish_time: '2020-2-23',
                    product_pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9zZWDjKu8X8n-b27uME_TvazsPIC4dOunDY9DqVIyxshbkabx&usqp=CAU',
                    price: 10.0,
                    product_publisher: 'bear',
                },
                {
                    id: 1,
                    product_name: 'test',
                    product_publish_time: '2020-2-23',
                    product_pic_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS9zZWDjKu8X8n-b27uME_TvazsPIC4dOunDY9DqVIyxshbkabx&usqp=CAU',
                    price: 10.0,
                    product_publisher: 'bear',
                },
            ],
            total: 1,
            pageSize: 6,
            product_tag: "",
            options: [
                {
                    value: '数码产品',
                    label: '数码产品',
                    children: [
                        {
                            value: '手机',
                            label: '手机',
                        },
                        {
                            value: '电脑',
                            label: '电脑',
                        },
                        {
                            value: '相机',
                            label: '相机',
                        },
                        {
                            value: '耳机',
                            label: '耳机',
                        },
                        {
                            value: '平板',
                            label: '平板',
                        },
                        {
                            value: '电脑配件',
                            label: '电脑配件',
                        }
                    ]
                },
                {
                    value: '书籍教材',
                    label: '书籍教材',
                    children: [
                        {
                            value: '教材书',
                            label: '教材书',
                        },
                        {
                            value: '文学',
                            label: '文学',
                        },
                        {
                            value: '小说',
                            label: '小说',
                        },
                        {
                            value: '电子书',
                            label: '电子书',
                        },
                        {
                            value: '漫画',
                            label: '漫画',
                        }
                    ]
                },
                {
                    value: '体育健身',
                    label: '体育健身',
                    children: [
                        {
                            value: '球类',
                            label: '球类',
                        },
                        {
                            value: '运动鞋',
                            label: '运动鞋',
                        },
                        {
                            value: '球拍',
                            label: '球拍',
                        },
                        {
                            value: '健身器材',
                            label: '健身器材',
                        }
                    ]
                },
                {
                    value: '家用电器',
                    label: '家用电器',
                    children: [
                        {
                            value: '电磁炉',
                            label: '电磁炉',
                        },
                        {
                            value: '洗衣机',
                            label: '洗衣机',
                        },
                        {
                            value: '冰箱',
                            label: '冰箱',
                        },
                        {
                            value: '风扇',
                            label: '风扇',
                        },
                        {
                            value: '电饭煲',
                            label: '电饭煲',
                        },
                        {
                            value: '吹风机',
                            label: '吹风机',
                        }
                    ]
                },
                {
                    value: '其它',
                    label: '其它',
                }
            ],
        };          
    },
    methods: {
        // 获取第几页数据
        page(currentPage) {
            var params = new URLSearchParams();
            params.append('product_tag', this.product_tag);
            this.$axios.post('http://localhost:9528/product/findProductByTag/'+(currentPage-1)+'/'+this.pageSize, params)
            .then((resp => (
                this.goodsList=resp.data.content,
                this.total = resp.data.totalElements,
                this.pageIsValid = true
            )))
        },
        // 根据类别获取商品
        handleChange(value) {
            this.product_tag = value.join('/');
            var params = new URLSearchParams();
            params.append('product_tag', this.product_tag);
            this.$axios.post('http://localhost:9528/product/findProductByTag/0/'+this.pageSize, params)
                .then((resp => (
                    this.goodsList=resp.data.content,
                    this.total = resp.data.totalElements,
                    this.pageIsValid = true
            )));
        },
        // 查询商品
        searchProduct() {
            var params = new URLSearchParams();
            params.append('input', this.input);
            this.$axios.post('http://localhost:9528/product/search', params)
                .then((resp => (
                    this.goodsList=resp.data,
                    this.pageIsValid = false
            )));
        },
        // 获取商品详细信息
        onDetail(id) {
            this.$router.push({
                path: '/goods_detail',
                query: {id: id}});
        }
    },
    // 页面刚加载时获取第1页数据
    created(){
        var params = new URLSearchParams();
        params.append('product_tag', this.product_tag);
        this.$axios.post('http://localhost:9528/product/findProductByTag/0/'+this.pageSize, params)
        .then((resp => (
            this.goodsList=resp.data.content,
            this.total = resp.data.totalElements,
            this.pageIsValid = true
        )))
    }
};
</script>
<style scoped>
.main {
    height: 100%;
    margin-left: 20px;
    overflow: auto;
}
.item {
  list-style: none;
  float: left;
  border-width: 20px;
  width: 200px;
  height:300px;
  border: 20px solid #f4f4f4;
  background-color: ghostwhite;
  padding: 20px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 20px;
  cursor: pointer;
}
.page {
    position: absolute;
    bottom:10px;
    margin-left: 40%;
    cursor: pointer;
}
</style>