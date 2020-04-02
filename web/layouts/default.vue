<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          :to="item.link"
          v-for="item in items"
          :key="item.text"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">关注的人</v-subheader>
        <v-list>
          <v-list-item
            v-for="item in items2"
            :key="item.text"
            link
          >
            <v-list-item-avatar>
              <img
                :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`"
                alt=""
              >
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>
        <v-list-item
          class="mt-4"
          link
          v-if="$store.state.auth.user.username"
        >
          <v-list-item-action>
            <v-icon color="grey darken-1" @click="showLoginForm">mdi-user</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">{{$store.state.auth.user.username}}</v-list-item-title>
        </v-list-item>
        <v-list-item
          class="mt-4"
          link
          v-else
        >
          <v-list-item-action>
            <v-icon color="grey darken-1" @click="showLoginForm = !showLoginForm">mdi-user</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">登录</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-setting</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">Manage Subscriptions</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="red"
      dense
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">星火视频</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="搜索..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <nuxt-child />
    </v-content>

    <v-bottom-sheet v-model="showLoginForm" inset>
      <v-form class="pa-5" @submit.prevent="login">
        <v-text-field v-model="loginModel.username" lbael="用户名" requier></v-text-field>
        <v-text-field v-model="loginModel.password" lbael="密码" type="password" requier></v-text-field>
        <v-btn color="success" type="submit">登录</v-btn>
      </v-form>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      loginModel: {},
      showLoginForm: false, 
      drawer: null,
      items: [
        { icon: 'mdi-home', text: '首页', link: '/'},
        { icon: 'mdi-trending-up', text: '热门视频', link: '/course'},
        { icon: 'mdi-youtube-subscription', text: '热门评论', link: '/comments'} 
      ],
      items2: [
        { picture: 28, text: 'Joseph' },
        { picture: 38, text: 'Apple' },
        { picture: 48, text: 'Xbox Ahoy' },
        { picture: 58, text: 'Nokia' },
        { picture: 78, text: 'MKBHD' },
      ],
    }),
    methods: {
      async login() {
        await this.$auth.loginWith('local', {
          data: this.loginModel
        })
        console.log('登录成功')
        this.showLoginForm = false
      },
    },
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
