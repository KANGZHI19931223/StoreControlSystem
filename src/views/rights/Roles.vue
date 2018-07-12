<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-button plain class="add-role-btn">添加角色</el-button>
    <!-- 角色表格 -->
    <el-table
      border
      :data="rolesList">
      <el-table-column
        type="expand">
        <!-- 展示展开行权限 -->
        <template slot-scope="scope">
          <el-row v-for="item1 in scope.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag closable class="tag" @close="handleClose(scope.row, item1.id)">
                {{ item1.authName }}
              </el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row closable v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag closable type="success" class="tag" @close="handleClose(scope.row, item2.id)">
                    {{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    class="tag"
                    type="warning"
                    @close="handleClose(scope.row, item3.id)">
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">暂无数据</el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
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
          <el-button
            plain size="mini"
            type="success"
            icon="el-icon-check"
            @click="handleShowRightTree">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="权限分配"
      :visible.sync="dialogVisible">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      // 分配权限对话框是否显示(默认false不显示)
      dialogVisible: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取角色列表数据
    async getData() {
      const {data: resData} = await this.$http.get('roles');
      this.rolesList = resData.data;
    },
    // 取消权限事件
    async handleClose(role, rightId) {
      const {data: resData} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      role.children = resData.data;
    },
    // 展示分配权限树形对话框
    handleShowRightTree() {
      // 显示对话框
      this.dialogVisible = true;
    }
  }
};
</script>

<style>
.add-role-btn {
  margin: 10px 0;
}
.tag {
  margin: 5px;
}
</style>
