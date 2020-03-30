<template>
    <div>
      <el-table
        :data="data.data"
        style="width: 100%">
        <el-table-column v-for="(field, title) in fields"
          :key="title"
          :prop="title"
          :label="field.label">
        </el-table-column>
        <el-table-column
          :label="操作"
          :width="200">
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
