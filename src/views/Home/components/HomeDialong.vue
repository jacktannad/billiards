<template>
    <el-dialog title="参观意向" :visible.sync="dialogFormVisible" top="10vh">
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="姓名:" label-width="200px" prop="name">
                <div style="font-weight: 700"> {{ form.name }}</div>
                <!--                <el-input v-model="form.name" disabled autocomplete="off" placeholder="请输入姓名"></el-input>-->
            </el-form-item>
            <el-form-item label="单位:" label-width="200px" prop="company">
                <div style="font-weight: 700"> {{ form.company }}</div>
                <!--                <el-input v-model="form.company" disabled autocomplete="off" placeholder="请输入单位"></el-input>-->
            </el-form-item>
            <el-form-item label="职务:" label-width="200px" prop="position">
                <div style="font-weight: 700"> {{ form.position }}</div>
                <!--                <el-input v-model="form.position" disabled autocomplete="off" placeholder="请输入职务"></el-input>-->
            </el-form-item>
            <el-form-item label="联系方式:" label-width="200px" prop="phone">
                <div style="font-weight: 700"> {{ form.phone }}</div>
                <!--                <el-input v-model="form.phone" disabled autocomplete="off" placeholder="请输入联系方式"></el-input>-->
            </el-form-item>
            <el-form-item label="感兴趣的展区/解决方案:" label-width="200px">
                <div style="font-weight: 700"> {{ form.scheme }}</div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <!--            <el-button type="primary" @click="submit">确 定</el-button>-->
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "HomeDialong",
    data() {
        return {
            props: {multiple: true},
            dialogFormVisible: false,
            form: {
                name: null,
                company: null,
                position: null,
                phone: null,
                exhibition: null,
                scheme: null,
                event: null

            },
            exhibitions: [
                {
                    value: '智慧科研基建场景',
                    label: '智慧科研基建场景',
                    children: [{
                        value: 'Hailab智慧实验室场景',
                        label: 'Hailab智慧实验室场景',
                    },
                        {
                            value: '低温工业自动化+模式',
                            label: '低温工业自动化+模式',
                        },
                        {
                            value: '生物制药整体场景方案',
                            label: '生物制药整体场景方案',
                        },
                        {
                            value: '国际公共卫生场景',
                            label: '国际公共卫生场景',
                        },],
                },
                {
                    value: '智慧健康城市场景',
                    label: '智慧健康城市场景',
                    children: [{
                        value: '智慧疫苗全场景解决方案',
                        label: '智慧疫苗全场景解决方案',
                    },
                        {
                            value: '智慧妇幼保健解决方案',
                            label: '智慧妇幼保健解决方案',
                        },
                        {
                            value: '智慧血液安全解决方案',
                            label: '智慧血液安全解决方案',
                        },
                    ],
                },
                {
                    value: '智慧医院场景',
                    label: '智慧医院场景',
                    children: [{
                        value: '全国首个医院智慧用药全场景数智方案',
                        label: '全国首个医院智慧用药全场景数智方案',
                    },
                        {
                            value: '女性关爱场景',
                            label: '女性关爱场景',
                        },
                        {
                            value: '影像增强应用场景',
                            label: '影像增强应用场景',
                        },
                        {
                            value: '脑科学探索场景',
                            label: '脑科学探索场景',
                        },
                        {
                            value: '智慧输注场景',
                            label: '智慧输注场景',
                        },
                        {
                            value: '慢性病治疗场景',
                            label: '慢性病治疗场景',
                        },
                        {
                            value: '医院数字化管理场景',
                            label: '医院数字化管理场景',
                        },],
                },
                {
                    value: '智慧健康家庭场景',
                    label: '智慧健康家庭场景',
                    children: [{
                        value: '服务社区健康“最后一公里”',
                        label: '服务社区健康“最后一公里”',
                    },
                        {
                            value: '家庭康养解决方案',
                            label: '家庭康养解决方案',
                        },

                    ],
                },
            ],
            scheme: [
                {
                    value: '生物制药场景整体解决方案发布',
                    label: '生物制药场景整体解决方案发布',
                },
                {
                    value: '数智化健康城市公卫新生态战略发布',
                    label: '数智化健康城市公卫新生态战略发布',
                },
                {
                    value: '医院智慧用药全场景数智方案发布家庭康养场景新品发布',
                    label: '医院智慧用药全场景数智方案发布家庭康养场景新品发布',
                }, {
                    value: '全院自动化输注场景全球推介会',
                    label: '全院自动化输注场景全球推介会',
                }, {
                    value: '国产三维乳腺断层新品升级发布会',
                    label: '国产三维乳腺断层新品升级发布会',
                }, {
                    value: '高压注射器产品行业发展及新产品展望发布会',
                    label: '高压注射器产品行业发展及新产品展望发布会',
                }, {
                    value: '医院数字化解决方案发布会',
                    label: '医院数字化解决方案发布会',
                }, {
                    value: '立体定向放射技术发展与展望研讨会',
                    label: '立体定向放射技术发展与展望研讨会',
                },
                {
                    value: '泌尿外科磁质子新技术推介会',
                    label: '泌尿外科磁质子新技术推介会',
                },
                {
                    value: '盈康一生医疗器械平台全线产品海外推介会',
                    label: '盈康一生医疗器械平台全线产品海外推介会',
                }],
            rules: {
                name: [{required: true, message: '请填写姓名', trigger: 'blur'}],
                company: [{required: true, message: '请填写单位', trigger: 'blur'}],
                position: [{required: true, message: '请填写职务', trigger: 'blur'}],
                phone: [{required: true, message: '请填写联系方式', trigger: 'blur'}]
            }
        }
    },
    methods: {
        /**
         * 获取父组件传过来的数据
         * @param {Object} data
         */
        getConfig(data) {
            if (data) {
                this.form = data
                //对data数据进行处理
                console.log('this.form.scheme',this.form.scheme)
                // this.form.scheme = data.scheme[0].children.join(',')
                this.form.scheme = data.scheme.map((item)=>{
                    return item.children.join(',')
                })
                this.form.scheme = this.form.scheme.join(",")

                console.log('this.form.scheme',this.form.scheme)
            } else {
                this.form = {
                    name: null,
                    company: null,
                    position: null,
                    phone: null,
                    exhibition: null,
                    scheme: null
                }
            }
            this.dialogFormVisible = true
        },
        /**
         * 数据的提交和编辑函数
         */
        submit() {
            this.$refs.form.validate((validate) => {
                if (validate) {
                    if (this.form.id) {
                        const exhibition = JSON.stringify(this.handleDate(this.form.exhibition))
                        const scheme = [{
                            label: "",
                            children: this.form.scheme
                        }]
                        this.form.scheme = JSON.stringify(scheme)
                        this.form.exhibition = exhibition
                        //编辑
                        HTTP.patch('visitor', this.form).then(() => {
                            this.dialogFormVisible = false
                            this.$emit('updata')
                            this.$message({
                                message: '编辑成功！',
                                type: 'success'
                            })
                        }).catch(() => {
                            this.$message({
                                message: '出错联系管理员！',
                                type: 'warning'
                            })
                        })
                    } else if (!this.form.id) {
                        //新增
                        const exhibition = JSON.stringify(this.handleDate(this.form.exhibition))
                        const scheme = [{
                            label: "",
                            children: this.form.scheme
                        }]
                        console.log('scheme', scheme)
                        console.log('exhibition', exhibition)
                        this.form.scheme = JSON.stringify(scheme)
                        this.form.exhibition = exhibition
                        HTTP.post('visitor', this.form).then(() => {
                            this.dialogFormVisible = false
                            this.$emit('updata')
                            this.$message({
                                message: '新增成功！',
                                type: 'success'
                            })
                        }).catch(() => {
                            this.$message({
                                message: '出错联系管理员！',
                                type: 'warning'
                            })
                        })
                    }
                }
            })
        },
        // 处理数据转为字符串
        /**
         * 将一个多维数组转为数组对象形式 第一项为label 其余项为children的数组里的项
         * @param {Array} data
         * @return  {String}
         */
        handleDate(data) {
            const arr = data.map((item) => {
                const [label, ...children] = item
                return {
                    label, children
                }
            })
            return arr
        },
    }
}
</script>

<style scoped>

</style>
