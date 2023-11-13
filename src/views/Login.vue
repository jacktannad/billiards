<template>
    <div class="login-page">

        <!--登录图片-->
        <div class="login-img">
        </div>
        <div class="login-cont">
            <div class="login_main">
                <h2 class="login-title">用户登录</h2>

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         label-position="top">

                    <el-form-item label="登录账号" prop="username">
                        <el-input type="username" v-model="ruleForm.username">
                            <i slot="prefix" class="el-icon-s-custom"></i>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="登录密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password>
                            <i slot="prefix" class="el-icon-connection"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="checked" style="float:left">记住密码</el-checkbox>
                        <el-link type="primary" :underline="false" style="float:right">忘记密码?</el-link>
                    </el-form-item>
                    <el-form-item class="login-buts">
                        <el-button icon="el-icon-s-promotion" :loading="login_ing" class="submit-but" type="primary"
                                   @click="submitForm('ruleForm')">提交
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <Vcode :canvasWidth="440" :canvasHeight="260" :show="showValidate" @success="handleCodeSuccess"
               @close="handleCodeClose"/>

    </div>
</template>

<script>
import {defineComponent} from 'vue'
import Vcode from "vue-puzzle-vcode";

import {systemFullPathArray} from "@/config/router.config"
import {loginTitle, loginValarieCode} from "@/config/system.config"

export default defineComponent({
    name: "loginHome",
    components: {
        Vcode
    },
    data() {

        return {
            loginTitle,

            checked: false,
            showValidate: false,

            builtAccounts: [
                // {
                //   username: "18562861228",
                //   password: "ql123456",
                //   msg: "超级管理员"
                // }
            ],

            login_ing: false,
            ruleForm: {
                username: "",
                password: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入登录账号', trigger: 'blur'},
                    {min: 4, max: 11, message: '长度在 4 到 11 个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入登录密码', trigger: 'blur'},
                    {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {

        // 用户通过了验证
        handleCodeSuccess() {
            this.showValidate = false; // 通过验证后，需要手动隐藏模态框
            this.handleAdminLogin();
        },
        // 用户点击遮罩层，应该关闭模态框
        handleCodeClose() {
            this.showValidate = false;
        },

        handleBuiltAccount(username) {
            const filter = this.builtAccounts.filter(user => user.username === username);
            if (!filter.length) return this.ruleForm.password = "";
            this.ruleForm.password = filter[0].password;
        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (this.checked) {
                    localStorage.setItem('username', this.ruleForm.username);
                    localStorage.setItem('password', this.ruleForm.password);
                } else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                }
                if (valid) {

                    if (loginValarieCode) return this.showValidate = true;

                    this.handleAdminLogin();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        handleAdminLogin() {
            this.login_ing = true
            this.$store.dispatch("login", this.ruleForm).then(() => {
                const redirect = this.$route.query.redirect;
                if (redirect && !systemFullPathArray.includes(redirect)) return this.$router.push(`${redirect}`);
                this.$router.push("/")
            }).finally(() => {
                this.login_ing = false
            })
        },
        //获取本地密码
        getLocalStorageUserPassword() {
            const savedUsername = localStorage.getItem('username');
            const savedPassword = localStorage.getItem('password');
            if (savedUsername && savedPassword) {
                this.ruleForm.username = savedUsername;
                this.ruleForm.password = savedPassword;
                this.checked = true;
            }

        }
    },
    mounted() {
        this.getLocalStorageUserPassword()
    }
})
</script>
<style lang="scss">
.login-page {
  display: flex;

  .login-img {
    padding: 0;
    height: 100vh;
    flex: 3;
    background: url("@/assets/imgs/登录页.png");
    background-size: 100% 113%;
  }

  .login-cont {
    height: 100vh;
    flex: 2;

    .login_main {
      margin: 28vh auto;
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .login-title {
        flex: 1;
        padding-bottom: 40px;
      }

      .demo-ruleForm {
        flex: 3;

        .submit-but {
          width: 100%;
        }
      }
    }
  }
}
</style>
