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
      <el-aside width="200px">
         <el-menu
          :router="true"
          :unique-opened="true"
          class="aside-list">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              商品列表
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              分类参数
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              商品分类
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              订单列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              数据报表
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
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
    text-align: center;
    line-height: 60px;
    color: #fff;
  }
  .el-header .logout {
    text-decoration: none;
    color: orange;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  .el-aside .aside-list {
    height: 100%;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
