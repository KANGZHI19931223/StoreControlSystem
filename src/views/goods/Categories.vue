<template>
   <el-card class="box-card">
     <!-- 面包屑 -->
     <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
     <!-- 添加分类按钮 -->
     <el-button type="success" @click="handleShowAdd" plain class="add-categories">添加分类</el-button>
     <!-- 分类列表 -->
     <el-table
      :data="goodsList"
      style="width: 100%">
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column> -->
      <!-- 商品分类展开效果 -->
      <el-tree-grid
        prop="cat_name"
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        :indentSize="30">
      </el-tree-grid>
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
            icon="el-icon-delete"
            @click="handleDelCat(scope.row)">
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
    <!-- 添加分类弹出对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addDialogVisible">
      <el-form label-position="right" label-width="80px" :model="addFormData">
        <el-form-item label="分类名称">
          <el-input v-model="addFormData.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="分类层级">
          <el-cascader
            :options="options"
            :props="{value: 'cat_id', label: 'cat_name'}"
            expand-trigger="hover"
            :change-on-select="true"
            v-model="selectedOptions"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddCat">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import ElTreeGrid from 'element-tree-grid';
export default {
  data() {
    return {
      goodsList: [],
      total: 0,
      pagenum: 1,
      pagesize: 10,
      // 添加商品分类相关数据
      addDialogVisible: false,
      addFormData: {
        cat_name: ''
      },
      options: [],
      selectedOptions: []
    };
  },
  created() {
    this.getCate();
  },
  methods: {
    // 获取所有商品分类
    async getCate() {
      const {data: resData} = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const {data, meta: {msg, status}} = resData;
      if (status === 200) {
        this.goodsList = data.result;
        this.total = data.total;
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
    },
    // 点击添加分类显示对话框
    async handleShowAdd () {
      // 显示对话框
      this.addDialogVisible = true;
      // 请求所有分类
      const {data: resData} = await this.$http({
        url: '/categories',
        params: {
          type: 2
        }
      });
      this.options = resData.data;
    },
    // 处理添加分类事件
    async handleAddCat() {
      const {data: resData} = await this.$http({
        url: '/categories',
        method: 'post',
        data: {
          cat_pid: this.selectedOptions[this.selectedOptions.length - 1],
          cat_name: this.addFormData.cat_name,
          cat_level: this.selectedOptions.length
        }
      });
      const {meta: {msg, status}} = resData;
      if (status === 201) {
        // 1 提示
        this.$message({
          type: 'success',
          message: msg
        });
        // 2 关闭对话框
        this.addDialogVisible = false;
        // 3 重新加载页面
        this.getCate();
      } else {
        this.$message({
          type: 'warning',
          message: msg
        });
      }
    },
    // 点击删除按钮弹出确认框
    handleDelCat(cateInf) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定后发送请求
        const {data: resData} = await this.$http({
          url: `/categories/${cateInf.cat_id}`,
          method: 'delete'
        });
        const {meta: {status, msg}} = resData;
        if (status === 200) {
          this.$message({
            type: 'success',
            message: msg
          });
          // 重新加载页面
          this.getCate();
        } else {
          this.$message({
            type: 'error',
            message: msg
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  components: {
    ElTreeGrid
  }
};
</script>

<style>
.add-categories {
  margin: 10px 0;
}
</style>
