<template>
  <div class="loginOrRegister">
    <el-tabs v-model="valueName" type="card">
      <el-tab-pane label="登录" name="login">
        <el-form ref="form" :model="LoginForm" label-width="80px" :rules="loginRules" rel="loginForm">
          <el-form-item label="邮箱" prop="account" name="email">
            <el-input v-model="LoginForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" name="password">
            <el-input v-model="LoginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onLogin()">登录</el-button>
            <!--<el-button @click="valueName ='register'">注册</el-button>-->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form ref="form" :model="RegisterForm" label-width="80px" :rules="registerRules" rel="registerForm">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="RegisterForm.email"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="RegisterForm.username"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="RegisterForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="RegisterForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="RegisterForm.confirmPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onRegister()">注册</el-button>
            <!--<el-button @click="valueName==='login'">登录</el-button>-->
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import {register, login} from "../api";
  import config from "../config/index"

  export default {
    name: "loginOrRegister",
    data() {
      return {
        RegisterForm: {
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
          nickname: ""
        },
        registerRules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
              pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
              message: '请输入正确的邮箱'
            }
          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ],
          confirmPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
          ]
        },
        LoginForm: {
          account: "",
          password: "",
        },
        loginRules: {
          account: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
              pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
              message: '请输入正确的邮箱'
            }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 1, message: '密码不能为空', trigger: 'blur'},
          ]
        },
        valueName: "login"
      }
    },
    methods: {
      onLogin() {
        let $self = this
        login($self.LoginForm)
          .then(response => {
            if (response.code === config.code) {
              //   登录成功  处理步骤
              localStorage.setItem("token", response.result.token)
              localStorage.setItem("userId", response.result.user.id)

              $self.$store.commit("SET_token", response.result.token)
              $self.$store.commit("SET_userId", response.result.user.id)

              $self.$store.commit("SET_userInfo", response.result.user)

              $self.$message({
                message: '登录成功',
                type: 'success'
              })
            } else {
              $self.$message({
                message: "登录失败：" + response.msg,
                type: 'error'
              })
            }
          })
      },
      onRegister() {

        let $self = this
        if (this.RegisterForm.password === this.RegisterForm.confirmPassword) {
          register(this.RegisterForm)
            .then(response => {
              if (response.code === config.code) {
                $self.$message({
                  message: "注册成功",
                  type: "success"
                })

                $self.valueName = 'login'

              } else {
                $self.$message({
                  message: '注册失败：' + response.msg,
                  type: 'error'
                })
              }


            })
        } else {
          this.$message({
            message: '两次输入的密码不一致',
            type: 'error'
          });
        }
      }
    },
    mounted() {

    },
    created() {
    }
  }
</script>

<style scoped>

</style>
