<template>
    <div style="background-color: darkgray;">
        <div>
          <vHead></vHead>
        </div>
        <div class="main">
          <div class="image">
            <img style="width:100%;height:100%;object-fit: cover;"
            :src=this.goods.product_pic_url>
          </div>
          <div class="message">
            <h1 style="margin-top10px;">{{goods.product_name}}</h1>
            <p style="margin-top:30px;font-size:20px">{{goods.product_content}}</p>
            <el-divider></el-divider>
            <p>价格:￥{{goods.price}}</p>
            <p style="margin-top:30px;font-size:20px">发布时间:{{goods.product_publish_time}}</p>
            <p style="margin-top:30px;font-size:20px">商家:{{goods.product_publisher}}</p>
            <span>
              <el-input-number style="margin-top:30px;"
               v-model="buyNum" :min="1" :max="goods.product_num">
              </el-input-number>
              (库存量:{{goods.product_num}})
            </span>
            <br />
            <span>
              <el-button type="danger" plain style="margin-top:30px;" @click="open">立即购买</el-button>
              <el-button type="danger" @click="joinCart">加入购物车</el-button>
            </span>
          </div>
          <el-divider></el-divider>
          <div>
            <span>商品评价</span>
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
        buyNum: 1,
        goods: {
          id: this.$route.query.id,
          product_pic_url: 'https://pic.qqtn.com/up/2019-9/15690311636958128.jpg!360_360',
          product_name: '',
          product_content: '',
          price: 10.0,
          product_num: 21,
          product_publish_time: '',
          product_publisher: '',
        },
        order: {
          username: localStorage.getItem('username'),
          product_id: this.$route.query.id,
          product_name: '',
          product_pic_url: '',
          product_num: 1,
          product_price: 1.0,
        }
      }
    },
    created() {
      this.$axios.get('http://localhost:9528/product/'+this.goods.id)
          .then((resp => (
              this.goods=resp.data
      )));
    },
    methods: {
        // 购买提示
        open() {
          this.$confirm('您将购买此商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.buyGoods();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消购买'
            });          
          });
        },
        // 立即购买
        buyGoods() {
          const _this = this;
          this.order.product_name = this.goods.product_name;
          this.order.product_num = this.buyNum;
          this.order.product_price = this.goods.price;
          this.order.product_pic_url = this.goods.product_pic_url;
          this.$axios.post('http://localhost:9528/order/save', this.order)
            .then(function(resp) {
                if (resp.data == '购买成功') {
                  _this.$message.success(resp.data);
                  _this.$router.push('/buysuccess');
                } else {
                  _this.$message.error(resp.data);
                }
          });
        },
        // 加入购物车
        joinCart() {
          this.order.product_name = this.goods.product_name;
          this.order.product_num = this.buyNum;
          this.order.product_price = this.goods.price;
          this.order.product_pic_url = this.goods.product_pic_url;
          this.$axios.post('http://localhost:9528/cart/join', this.order)
            .then((resp => (
                this.$message.success(resp.data)
          )));
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
.image {
  width: 500px;
  height: 500px;
  margin-left: 20px;
  margin-top: 20px;
  display:inline-block;

}
.message {
  width: 300px;
  height: 500px;
  margin-left: 50px;
  margin-bottom: -50px;
  display:inline-block;
}
</style>
