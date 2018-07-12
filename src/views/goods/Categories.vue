<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
     <!-- 添加分类按钮 -->
     <el-button type="success" plain class="add-categories">添加分类</el-button>
     <!-- 分类列表 -->
     <el-table
      :data="goodsList"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            plain size="mini"
            type="primary"
            icon="el-icon-edit">
          </el-button>
          <el-button
            plain size="mini"
            type="danger"
            icon="el-icon-delete">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      total: 0,
      pagenum: 1,
      pagesize: 10
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    // 获取一级菜单
    async getCate() {
      const {data: resData} = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const {data, meta: {msg, status}} = resData;
      if (status === 200) {
        this.goodsList = data.result;
        this.total = data.total;
        console.log(data);
      } else {
        this.$message.error(msg);
      }
    },
    // 每页显示数据条数改变事件
    handleSizeChange(val) {
      this.pagesize = val;
      this.getCate();
    },
    // 当前页数改变事件
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getCate();
    }
  }
};
</script>

<style>
.add-categories {
  margin: 10px 0;
}
</style>
