<template>
  <el-container class="home">
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="/static/images/logo.png" alt="">
        </el-col>
        <el-col :span="18">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <a @click.prevent="handleLogout" class="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate() {
    // 验证有没有sessionStorage
    if (!sessionStorage.getItem('token')) {
      this.$message.warning('请登录后访问');
      this.$router.push('login');
    }
  },
  methods: {
    handleLogout() {
      // 1 销毁sessionStorage
      // 2 提示退出成功
      // 3 跳转到登录页
      sessionStorage.clear();
      this.$message.success('退出成功');
      this.$router.push('login');
    }
  }
};
</script>

<style>
  .home {
    height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header .logout {
    text-decoration: none;
    color: orange;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
