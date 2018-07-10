<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" class="search" clearable>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加用户按钮 -->
    <el-button type="success" plain>添加用户</el-button>
    <!-- 用户列表展示 -->
    <el-table
      v-loading="loading"
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
        label="日期"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
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
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="page">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userInf: [],
      loading: true,
      // 分页绑定的相关数据
      pagenum: 1,
      total: 0,
      pagesize: 2
    };
  },
  methods: {
    // 获取用户信息
    async getData() {
      // 获取数据前显示loading状态
      this.loading = true;
      // 获取token
      const token = sessionStorage.getItem('token');
      // 在请求头中添加token信息
      this.$http.defaults.headers.common['Authorization'] = token;
      // 发送请求获取user信息(其中的当前页和每页中的数据条数是必须发送的内容)
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      // 请求回来数据后loading状态消失
      this.loading = false;
      const data = res.data;
      const { meta: { msg, status } } = data;
      if (status === 200) {
        const {data: {users, total}} = data;
        this.userInf = users;
        this.total = total;
      } else {
        this.$message(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // 每页数据条数发生改变时,重新加载数据
      this.getData();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      // 当前页码改变时重新加载数据
      this.getData();
    }
  },
  created() {
    // vue创建完成时调用getData方法
    this.getData();
  }
  // 注意: 此页中不用验证token, 因为是home的子路由,在加载list组件之前会先加载home组件,home组件中做了token验证
};
</script>

<style>
.search {
  width: 300px;
  margin: 20px 0;
}
.page {
  margin-top: 10px;
}
</style>
