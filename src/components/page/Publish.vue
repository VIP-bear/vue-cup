<template>
    <div class="publish">
        <div class="top">
            <vHead></vHead>
        </div>
        <div class="container">
            <div class="form-box">
                <h3 class="title">发布商品</h3>
                <el-form :model="form" :rules="rules" ref="good_form" label-width="120px" class="good-message">
                    <el-form-item label="商品名称" prop="product_name">
                        <el-input v-model="form.product_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片链接" prop="product_pic_url">
                        <el-input v-model="form.product_pic_url"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="product_price">
                        <el-input-number v-model="form.price" :precision="2" :step="0.1"></el-input-number>
                    </el-form-item>
                    <el-form-item label="库存量" prop="product_num">
                        <el-input-number v-model="form.product_num" :step="2"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品类别" prop="product_tag">
                        <el-cascader :options="options" @change="handleChange" placeholder="其它"></el-cascader>
                    </el-form-item>
                    <el-form-item label="商品描述" prop="product_content">
                        <el-input type="textarea" rows="5" v-model="form.product_content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('good_form')">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
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
            form: {
                product_name: '',
                product_pic_url: '',
                price: 10.00,
                product_num: 1,
                product_tag: '其它',
                product_content: '',
                product_publisher: '',
            },
            rules: {
                product_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                product_pic_url: [{ required: true, message: '请输入图片链接', trigger: 'blur' }],
                product_num: [{ required: true, message: '请输入库存数', trigger: 'blur' }],
                product_content: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
            },
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
            ]
        };
    },
    created() {
        this.form.product_publisher = localStorage.getItem('username');
    },
    methods: {
        onSubmit(good_form) {
            const _this = this;
            this.$refs[good_form].validate(valid => {
                if (valid) {
                    this.$axios.post('http://localhost:9528/publish', this.form)
                    .then(function(resp){
                        if (resp.data != '发布失败') {
                            _this.$message.success(resp.data);
                            _this.$router.push('/');
                        } else {
                            _this.$message.success(resp.data);
                        }
                    })
                } else {
                    _this.$message.error('请完整填写商品信息');
                    return false;
                }
            });
        },
        handleChange(value) {
            this.form.product_tag = value.join('/');
        }
    }
};
</script>
<style scoped>
.container {
    background-color: lightgray;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
    background-repeat:repeat-x;
    height: 1000px;
}
.top {
    line-height: 1.5;
    background-color: #fff;
    width: 100%;
}
.form-box {
    width: 1000px;
    height: 800px;
    margin: auto;
    background-color:snow;
    border-radius: 20px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.title {
    text-align: center;
    padding-top: 50px;
    font-size: 20px;
}
.good-message {
    width: 900px;
    padding: 20px;
}
.el-form-item {
    margin-top: 50px;
}
</style>
