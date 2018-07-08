<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" class="search" clearable>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" plain>添加用户</el-button>
    <el-table
      border
      :data="userInf"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="30">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="150">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userInf: []
    };
  },
  methods: {
    // 发送请求,获取用户信息
    async getData() {
      // 获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中添加token信息
      this.$http.defaults.headers.common['Authorization'] = token;
      // 发送请求获取user信息(其中的当前页和每页中的数据条数是必须发送的内容)
      const res = await this.$http.get('users?pagenum=1&pagesize=10');
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        const {data: {users}} = data;
        this.userInf = users;
        console.log(res);
      } else {
        this.$message(msg);
      }
    }
  },
  created() {
    // vue创建完成时调用getData方法
    this.getData();
  }
};
</script>

<style>
.search {
  width: 300px;
  margin: 20px 0;
}
</style>
