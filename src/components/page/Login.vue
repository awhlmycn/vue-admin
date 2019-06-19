<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 请输入正确的用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: 'mingyue',
                    password: '111111'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm( formName ) {
                this.$refs[formName].validate( async (valid) => {
                    if( valid ) {
                        var data = {
                            username : this.ruleForm.username,
                            password : this.ruleForm.password
                        };
                        let result = {
                            data : [
                                {
                                    icon: 'el-icon-tickets',
                                    index: 'table',
                                    title: '基础表格'
                                },
                                {
                                    icon: 'el-icon-tickets',
                                    index: 'ads',
                                    title: '广告管理'
                                },
                                {
                                    icon: 'el-icon-tickets',
                                    index: 'export',
                                    title: '文件导出'
                                },
                                {
                                    icon: 'el-icon-tickets',
                                    index: 'echarts',
                                    title: '图表展示'
                                }
                            ]
                        }
                        this.$world.loginSetStorage( this.ruleForm.username, result );
                        this.$router.push('/');
                        // var result = await this.$http.login( data.username, data.password );
                        // if( result.code == 200 ){
                        //     this.$world.loginSetStorage( this.ruleForm.username, result );
                        //     this.$router.push('/');
                        // }
                        // else{
                        //     this.$lele.toast( result.msg );
                        // }
                    }
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>