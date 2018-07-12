<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
     <!-- 添加分类按钮 -->
     <el-button type="success" plain class="add-categories">添加分类</el-button>
     <!-- 分类列表 -->
     <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="是否有效">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
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
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </el-card>
</template>

<script>
export default {

};
</script>

<style>
.add-categories {
  margin: 10px 0;
}
</style>
