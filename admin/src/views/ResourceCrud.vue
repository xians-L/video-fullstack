<template>
    <div>
      <h4>视频管理</h4>
      <avue-crud 
        :data="data.data"
        :option="options"
        :page="page"
        @row-save="create"
        @row-update="update"
        @row-del="remove"
        @on-load="changePage"
        @sort-change="changeSort"
        @search-change="search"></avue-crud>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ResourceCrud extends Vue {
  @Prop(String) resource!: string
  data = {}
  options:any = {}
  page = {
    total: 0,
    pageSize: 2,
    pageSizes: [2,5,10]
  }
  query:any = {
    limit: 2
  }

  async changePage({currentPage, pageSize}) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  async search(where, done) {
    if (where === null && where === '' && where === undefined) {
      this.fetch()
    }
    for (let k in where) {
      const field = this.options.column.find(v => v.prop === k)
      if (field.regex) {
        where[k] = { $regex: where[k]}
      }
    }
    this.query.where = where
    this.fetch()
    done()
  }

  async changeSort({prop, order}) {
    if (!order) {
      this.query.sort = null
      this.fetch()
    } else {
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1
      }
      this.fetch()
    }
  }

  async create(row:any, done:any) {
    await this.$http.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }
  async update(row:any, index:any, done:any) {
    let data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
    this.$message.success('修改成功')
    this.fetch()
    done()
  }

  async remove(row:any) {
    try{
      await this.$confirm('是否确认删除')
    }catch(err) { return}
    await this.$http.delete(`${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  async fetch() {
    let res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    })
    this.page.total = res.data.total
    this.data = res.data
  }
  async option() {
    let res = await this.$http.get(`${this.resource}/option`)
    this.options = res.data
  }

  created() {
   this.fetch()
   this.option()
  }
}
</script>

<style>

</style>
