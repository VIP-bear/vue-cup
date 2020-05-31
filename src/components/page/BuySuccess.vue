<template>
    <div style="background-color: darkgray;">
        <div>
          <vHead></vHead>
        </div>
        <div class="main">
          <br />
          <p1 class="message">购买成功, {{this.count}}秒后跳转到首页！！！</p1>
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
        count: "",
      }
    },
    created() {
      // 3秒后跳转到首页
      const TIME_COUNT = 3;
        if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
            }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                this.$router.push({
                    path: '/'
                });
            }
          },1000)
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
.message {
  margin-left: 30%;
  margin-top: 20%;
  font-size: 28px;
}
</style>
