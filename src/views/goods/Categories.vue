<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
     <!-- 添加分类按钮 -->
     <el-button type="success" plain class="add-categories">添加分类</el-button>
     <!-- 分类列表 -->
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
