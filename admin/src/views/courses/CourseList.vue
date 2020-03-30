<template>
    <div>
      <h4>视频列表</h4>
      <el-button type="primary" @click="$router.push('/courses/creat')">添加视频</el-button>
      <el-button type="success" @click="$router.push('/courses/creat')">更新</el-button>
      
      <el-table
        :data="data.data"
        style="width: 100%">
        <el-table-column v-for="(field, title) in fields"
          :key="title"
          :prop="title"
          :label="field.label">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope='scope'>
            <el-button type="success" size="small" @click="$router.push(`/courses/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class CourseList extends Vue {
  data = {}
  fields = {
    _id: {label: 'ID'},
    title: {label: '课程标题'},
    cover: {label: '课程封面图'}
  }
  async remove(row:any) {
    try{
     await this.$confirm('是否确认删除')
    }catch(err){ return }
    await this.$http.delete(`courses/${row._id}`)
    this.$message.success('success')
    this.fetch()
  }

  async fetch() {
    let res = await this.$http.get('courses')
    this.data = res.data
  }

  created() {
   this.fetch() 
  }
}
</script>

<style scoped lang="less">

</style>
