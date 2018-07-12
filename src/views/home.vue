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
          <el-submenu :index="item.id + ''" v-for="item in menus" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="item1.path + ''" v-for="item1 in item.children" :key="item1.id">
              <i class="el-icon-menu"></i>
              {{ item1.authName }}
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
  data() {
    return {
      menus: []
    };
  },
  beforeCreate() {
    // 简单验证有没有token
    if (!sessionStorage.getItem('token')) {
      this.$message.warning('请登录后访问');
      this.$router.push('login');
    }
  },
  created() {
    this.getData();
  },
  methods: {
    // 退出登录事件
    handleLogout() {
      // 1 销毁sessionStorage
      // 2 提示退出成功
      // 3 跳转到登录页
      sessionStorage.clear();
      this.$message.success('退出成功');
      this.$router.push('login');
    },
    // 动态获取左侧菜单导航
    async getData() {
      const {data: resData} = await this.$http.get('menus');
      this.menus = resData.data;
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
