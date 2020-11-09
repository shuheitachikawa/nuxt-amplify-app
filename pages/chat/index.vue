<template>
  <v-container>
    <v-text-field v-model="text"></v-text-field>
    <v-btn @click="post" color="primary" block>POST</v-btn>
    <!-- <ul>
      <li v-for="(post, index) in posts" :key="index">{{ post.text }}</li>
    </ul> -->
    <v-container class="d-flex flex-column-reverse">
      <v-card
        v-for="post in posts"
        :key="post.id"
        class="mx-auto my-5"
        :color="post.user.color"
        dark
        width="90%"
      >
        <v-card-text class="headline font-weight-bold">
          {{ post.text }}
        </v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                :src="post.user.img_pass"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.user.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { createTweet } from '@/src/graphql/mutations'
// import { listTweets } from '@/src/graphql/queries'
import { listTweets } from '@/src/graphql/queries'
import { onCreateTweet } from '@/src/graphql/subscriptions'
export default {
  data() {
    return {
      text: '',
      posts: [],
      loginUser: '',
    }
  },
  created() {
    this.getUser()
    this.getPosts()
    this.subscribe()
  },
  methods: {
    async getUser() {
      if (!this.$store.getters.loginUser) {
        const cognitoId = localStorage.getItem(
          'CognitoIdentityServiceProvider.371nfhrqmkp9rq749d92gl6dbe.LastAuthUser'
        )
        await this.$store.dispatch('getUser', cognitoId)
      }
      this.loginUser = this.$store.getters.loginUser
    },
    async post() {
      if (!this.text) return
      const payload = {
        text: this.text,
        user_id: this.loginUser.id,
      }
      await API.graphql(graphqlOperation(createTweet, { input: payload }))
        .catch((e) => console.error(e))
        .finally(() => (this.text = ''))
    },

    async getPosts() {
      // const postId = 'bubekiti'
      const { data } = await API.graphql(graphqlOperation(listTweets))
      this.posts = data.listTweets.items
      console.log(this.posts)
    },

    subscribe() {
      API.graphql({ query: onCreateTweet }).subscribe({
        next: (eventData) => {
          // コメントが送信されて追加されたとき、送信内容を一覧に追加
          const chat = eventData.value.data.onCreateTweet // データを読み込み
          if (this.posts.some((post) => post.text === chat.text)) return // すでに表示されているデータは無視
          this.posts = [...this.posts, chat] // 新しいデータを追加
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
