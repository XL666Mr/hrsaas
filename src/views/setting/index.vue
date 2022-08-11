<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" @click="dialogVisible = true"
            >新增角色</el-button
          >
          <!-- 对话框 -->
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
            @close="dialogClose"
          >
            <el-form
              ref="form"
              label-width="80px"
              :model="addRoleForm"
              :rules="addRoleFormRules"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="addRoleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="addRoleForm.region"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="onAddRole">确 定</el-button>
            </span>
          </el-dialog>
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" width="180" type="index">
            </el-table-column>
            <el-table-column prop="name" label="角色" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :page-size="pagesize"
            :page-sizes="[3, 5, 10]"
            layout="sizes, prev, pager, next"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second"
          ><el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
            style="margin-bottom: 20px"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled :placeholder="companyInfo.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled :placeholder="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled :placeholder="companyInfo.remarks"></el-input>
            </el-form-item> </el-form
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from '@/api/role'
import { getCompanyInfo } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 10,
      page: 1,
      dialogVisible: false,
      addRoleForm: {
        name: '',
        region: ''
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入名称' }]
      },
      companyInfo: {}
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
      console.log(total)
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    sizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    handleClose() {
      this.dialogVisible = true
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      )
      console.log(res)
      this.companyInfo = res
    }
  }
}
</script>

<style scoped lang="less"></style>
