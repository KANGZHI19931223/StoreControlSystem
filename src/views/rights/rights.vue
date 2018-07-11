<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="权限列表"></my-breadcrumb>
    <!-- 列表 -->
    <el-table
      class="rightsTable"
      border
      :data="rightsList"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === 0">一级</span>
          <span v-else-if="scope.row.level === 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取权限列表
    async getData() {
      // 首先获取token
      const token = sessionStorage.getItem('token');
      // 设置请求头信息
      this.$http.defaults.headers.common['Authorization'] = token;
      // 发送请求
      const {data: resData} = await this.$http.get(`rights/list`);
      this.rightsList = resData.data;
    }
  }
};
</script>

<style>
.el-card, .el-message {
  overflow: auto;
}
.rightsTable {
  margin-top: 10px;
}
</style>
