<template>
  <div class="login-wrap">
    <el-form class="login-form" :label-position="labelPosition" label-width="80px">
      <h2>用户信息</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click="handleLogin" class="form-button" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 1 给登录按钮绑定点击事件
    // 2 获取表达数据
    // 3 发送请求
    handleLogin() {
      this.$http
        .post('login', this.formData)
        .then((res) => {
          const {data: {data, meta: {msg, status}}} = res;
          if (status === 200) {
            const {token} = data;
            // 提示登陆成功
            this.$message.success(msg);
            // 设置sessionStorage
            sessionStorage.setItem('token', token);
            // 页面跳转
            this.$router.push({name: 'home'});
          } else {
            this.$message.error(msg);
          }
        });
    }
  }
};
</script>

<style>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }
  .form-button {
    width: 100%;
  }
</style>
