<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="search" class="search">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <!-- 添加商品按钮 -->
    <el-button type="success" plain>添加商品</el-button>
    <!-- 商品列表 -->
    <el-table
      :data="goodsList"
      border>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="380">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="80">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        width="80"
        label="商品重量">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.add_time | fmtDate('YYYY-MM-DD') }}
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
    <!-- 分页导航 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 15, 20, 25]"
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
      // 搜索框相关数据
      search: '',
      // 商品列表相关数据
      goodsList: [],
      // 分页相关数据
      pagenum: 1,
      pagesize: 10,
      total: 0
    };
  },
  created() {
    this.getGoods();
  },
  methods: {
    // 获取所有商品信息
    async getGoods() {
      const {data: resData} = await this.$http({
        url: '/goods',
        method: 'get',
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      const {data, meta: {msg, status}} = resData;
      if (status === 200) {
        this.goodsList = data.goods;
        console.log(data.total);
        this.total = data.total;
      } else {
        this.$message({
          type: 'error',
          message: msg
        });
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getGoods();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getGoods();
    }
    // 点击删除商品弹出对话框
    // 点击修改商品按钮弹出对话框
  }
};
</script>

<style>
.search {
  width: 300px;
  margin: 10px 0;
}
</style>
