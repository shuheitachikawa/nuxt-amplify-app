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
        color="#26c6da"
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
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.user_id }}</v-list-item-title>
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
import { tweetsByUserId } from '@/src/graphql/queries'
import { onCreateTweet } from '@/src/graphql/subscriptions'
export default {
  data() {
    return {
      text: '',
      posts: [],
    }
  },
  created() {
    this.getPosts()
    this.subscribe()
  },
  methods: {
    async post() {
      if (!this.text) return
      const payload = {
        user_id: 'GUEST',
        text: this.text,
      }
      await API.graphql(graphqlOperation(createTweet, { input: payload }))
        .catch((e) => console.error(e))
        .finally(() => (this.text = ''))
    },

    async getPosts() {
      const postId = 'bubekiti'
      const { data } = await API.graphql(
        graphqlOperation(tweetsByUserId, {
          user_id: postId,
        })
      )
      this.posts = data.tweetsByUserId.items
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
