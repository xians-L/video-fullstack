<template>
    <div id="main">
      <el-container>
        <el-aside width="200px">
          <el-menu mode="vertical" :default-active="$route.path" router>
            <el-submenu v-for="(item, index) in menu.items"
              :index="`menu-item-${index} + 1`"
              :key="`menu-item-${index}`">
              <template slot="title">{{ item.title }}</template>
              <el-menu-item v-for="(subItme, subIndex) in item.items"
                :key="`menu-itme-${index}-${subIndex}`"
                :index="subItme.path">
                  {{subItme.title}}
              </el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>
        <el-container>
          <el-header height="">
            <h2>星火在线-后台管理界面</h2>
          </el-header>
          <el-main height="">
            <router-view :key="$route.path"></router-view>
          </el-main>
        </el-container>
      </el-container>
      
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: '内容管理',
        items: [
          {title: '首页', path: '/'},
          {title: '视频管理', path: '/courses/list'},
          {title: '课时管理', path: '/episode/list'}
        ]
      },
      {
        title: '用户管理',
        items: [
          {title: '添加用户', path: '/users/list'},
        ]
      }
    ]
  }
}
</script>

<style scoped lang="less">

</style>
