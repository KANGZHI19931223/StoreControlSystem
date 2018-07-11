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
        <template slot-scope="scope">
          <el-row v-for="item1 in scope.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag closable class="tag">
                {{ item1.authName }}
              </el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row closable v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag closable type="success" class="tag">
                    {{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag closable v-for="item3 in item2.children" :key="item3.id" class="tag" type="warning">
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
            icon="el-icon-check">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const {data: resData} = await this.$http.get('roles');
      this.rolesList = resData.data;
      console.log(resData);
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
