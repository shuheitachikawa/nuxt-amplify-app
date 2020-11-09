<template>
  <v-app dark>
    <v-navigation-drawer
      :clipped="true"
      :disable-resize-watcher="true"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="logout" block
          ><v-btn color="primary" block @click="logout"
            >ログアウト</v-btn
          ></v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'ホーム',
          to: '/home',
        },
        {
          icon: 'mdi-chat',
          title: 'チャット',
          to: '/chat',
        },
        {
          icon: 'mdi-food',
          title: '食べログ',
          to: '/tabelog',
        },
        {
          icon: 'mdi-cat',
          title: 'ユーザー設定',
          to: '/setting',
        },
      ],
      title: 'BUBE',
    }
  },

  methods: {
    async logout() {
      try {
        await Auth.signOut()
        this.$router.push('/')
      } catch (e) {
        console.error('ログアウトエラー', e.message)
      }
    },
  },
}
</script>

<style lang="scss">
.logout {
  position: absolute;
  bottom: 30px;
  width: 100%;
}
</style>
