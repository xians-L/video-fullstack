<template>
  <div>
    <h4>{{ IsNew ? "创建" : "编辑" }}课程</h4>
    <ele-form
      v-model="data"
      :form-desc="fields"
      :request-fn="submit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CourseEdit extends Vue {
  @Prop(String) id!: string;
  data = {};

  fields = {
    title: { label: "课程标题", type: "input" },
    cover: { label: "课程封面图", type: "input" }
  };

  get IsNew() {
    return !this.id;
  }

  async submit(data: any) {
    // let url = this.IsNew ? `courses` : `courses/${this.id}`
    // let methods = this.IsNew ? 'post' : 'put'
    // await this.$http[methods](url, data);
    // this.data = {}
    // this.$message.success("success");
    // this.$router.go(-1)
  }

  async fetch() {
    let res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }

  created() {
    !this.IsNew && this.fetch();
  }
}
</script>

<style scoped lang="less"></style>
