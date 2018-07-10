<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-input v-model="searchVal" placeholder="请输入内容" class="search" clearable>
      <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加用户按钮 -->
    <el-button @click="dialogTableVisible = true" type="success" plain>添加用户</el-button>
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
            inactive-color="#ff4949"
            @change="handleUserState(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" @click="handleClickEdit(scope.row.id)"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" @click="handleDel(scope.row)"></el-button>
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
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogTableVisible" @close="handleClose">
      <el-form :rules="rules" label-position="right" label-width="80px" :model="formData">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogTableVisible" @close="handleClose">
      <el-form label-position="right" label-width="80px" :model="formData">
        <el-form-item label="用户名称">
          <el-input v-model="formData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditUser">确 定</el-button>
      </div>
    </el-dialog>
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
      pagesize: 8,
      // 搜索功能绑定的数据
      searchVal: '',
      // 添加用户相关数据
      dialogTableVisible: false,
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // 编辑用户相关数据
      editDialogTableVisible: false,
      userId: -1
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
      const res = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchVal}`);
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
    // 没页展示的数据条数发生改变时触发的函数
    handleSizeChange(val) {
      this.pagesize = val;
      // 每页数据条数发生改变时,重新加载数据
      this.getData();
    },
    // 当页码发生改变时触发的函数
    handleCurrentChange(val) {
      this.pagenum = val;
      // 当前页码改变时重新加载数据
      this.getData();
    },
    // 点击搜索按钮触发的处理函数
    handleSearch() {
      // 点击搜索按钮重新加载用户列表
      this.getData();
    },
    // 改变用户状态的处理函数
    async handleUserState(user) {
      // 发送请求
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      const data = res.data;
      const {meta: {msg, status}} = data;
      if (status === 200) {
        // 提示
        this.$message.success(msg);
      } else {
        // 提示
        this.$message.error(msg);
      }
    },
    // 处理删除用户的函数
    async handleDel(user) {
      // 点击删除按钮,弹出确认框
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮执行的操作
        const res = await this.$http.delete(`users/${user.id}`);
        const data = res.data;
        const {meta: {msg, status}} = data;
        if (status === 200) {
          // 删除成功
          // 1 提示
          this.$message({
            type: 'success',
            message: msg
          });
          // 2 重置当前页码
          this.pagenum = 1;
          // 3 重新加载用户列表
          this.getData();
        } else {
          // 删除失败
          // 1 提示
          this.$message({
            type: 'error',
            message: msg
          });
        }
      }).catch(() => {
        // 点击取消按钮执行的操作
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 处理添加用户的函数
    async handleAddUser() {
      const res = await this.$http.post('users', this.formData);
      const data = res.data;
      const {meta: {msg, status}} = data;
      if (status === 201) {
        // 1 提示
        this.$message.success(msg);
        // 2 重新加载页面
        this.getData();
        // 3 关闭对话框
        this.dialogTableVisible = false;
      } else {
        this.$message.error(msg);
      }
    },
    // 当对话框关闭是执行的函数
    handleClose() {
      // 将表单清空 , 也就是将formData清空
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    },
    // 点击编辑按钮时执行的函数
    async handleClickEdit(userId) {
      // 1 显示编辑对话框
      this.editDialogTableVisible = true;
      // 2 将需要编辑的userId保存在data中的userId中
      this.userId = userId;
      // 3 发送请求 (根据userid查询数据)
      const res = await this.$http.get(`users/${this.userId}`);
      const data = res.data;
      this.formData = data.data;
    },
    // 点击编辑对话框中的确定按钮时执行的函数
    async handleEditUser() {
      const res = await this.$http.put(`users/${this.formData.id}`, {
        email: this.formData.email,
        mobile: this.formData.mobile
      });
      const data = res.data;
      const {meta: {msg, status}} = data;
      if (status === 200) {
        this.$message.success(msg);
        this.getData();
      } else {
        this.$message.error(msg);
      }
      this.editDialogTableVisible = false;
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
