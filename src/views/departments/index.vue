<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :treeNode="company" :isRoot="true"></TreeTools>
        <!-- 主体 -->
        <el-tree :data="dataList" :props="defaultProps" default-expand-all>
          <template v-slot="scoped">
            <TreeTools :treeNode="scoped.data"></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
  data() {
    return {
      dataList: [
        {
          name: '总裁办',
          child: [
            {
              name: '二级 1-1'
            }
          ]
        },
        {
          name: '总裁办'
        },
        {
          name: '总裁办'
        }
      ],
      defaultProps: {
        children: 'child',
        label: 'name'
      },
      company: { name: '传智教育', manager: '负责人' }
    }
  },

  created() {},

  methods: {},
  components: {
    TreeTools
  }
}
</script>

<style scoped lang="less"></style>
