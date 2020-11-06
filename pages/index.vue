<template>
  <v-container class="mx-auto my-auto">
    <v-card
      v-if="state === 'login'"
      class="elevation-6 mx-auto my-auto"
      max-width="344"
      outlined
    >
      <v-card-title>ログイン</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          required
          label="メールアドレス"
          type="email"
          name="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          required
          label="パスワード"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          :append-icon="showPassword ? 'eye' : 'eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="primary" @click="login"> ログイン </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn block color="yellow darken-4" @click="state = 'signUp'">
          新しく登録する
        </v-btn>
      </v-card-actions>
      <v-card-text v-show="error" style="color: red">
        ログインできません。<br />
        エラーメッセージ：<br />
        {{ errorMessage }}
      </v-card-text>
    </v-card>

    <!-- 会員登録 -->
    <v-card
      v-else-if="state === 'signUp'"
      class="elevation-6 mx-auto my-auto"
      max-width="344"
      outlined
    >
      <v-card-title>新規登録</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          required
          label="メールアドレス"
          type="email"
          name="email"
        ></v-text-field>
        <v-text-field
          v-model="userName"
          required
          label="ユーザーネーム"
          type="text"
          name="userName"
        ></v-text-field>
        <v-text-field
          v-model="password"
          required
          label="パスワード"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          :append-icon="showPassword ? 'eye' : 'eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="yellow darken-4" @click="signUp"> 登録 </v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn block color="primary" @click="state = 'login'">
          ログイン画面に戻る
        </v-btn>
      </v-card-actions>
      <v-card-text v-show="error" style="color: red">
        登録できません。<br />
        エラーメッセージ：<br />
        {{ errorMessage }}
      </v-card-text>
    </v-card>

    <!-- 確認 -->
    <v-card
      v-if="state === 'confirm'"
      class="elevation-6 mx-auto my-auto"
      max-width="344"
      outlined
    >
      <v-card-title>確認コード</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="email"
          required
          disabled
          label="メールアドレス"
          type="email"
          name="email"
        ></v-text-field>
        <v-text-field
          v-model="code"
          required
          label="確認コード"
          type="text"
          name="code"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="yellow darken-4" @click="confirm"> 確認 </v-btn>
      </v-card-actions>
      <v-card-text v-show="error" style="color: red">
        確認できません。<br />
        エラーメッセージ：<br />
        {{ errorMessage }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createUser } from '@/src/graphql/mutations'
export default {
  layout: 'login',
  components: {},
  data: () => ({
    email: 'shuhei.tachikawa@bubekiti.com',
    password: 'tachikawa',
    userName: 'bubbubu',
    code: '',
    cognitoId: '',
    showPassword: false,
    error: false,
    errorMessage: '',
    state: 'login',
  }),
  methods: {
    async login() {
      const payload = {
        username: this.email,
        password: this.password,
      }
      try {
        await this.$store.dispatch('login', payload)
        this.goHome()
      } catch (e) {
        this.error = true
        this.errorMessage = e.message
      }
    },

    async signUp() {
      const payload = {
        username: this.email,
        password: this.password,
      }
      try {
        await Auth.signUp(payload.username, payload.password)
        this.state = 'confirm'
        alert('登録メールアドレスに確認コードを送信しました。')
      } catch (e) {
        this.error = true
        this.errorMessage = e.message
      }
    },

    async confirm() {
      const payload = {
        username: this.email,
        code: this.code,
        password: this.password,
      }
      try {
        await Auth.confirmSignUp(payload.username, payload.code)
        await this.$store.dispatch('login', payload) // 確認できたらログイン
        // this.cognitoId =
        await this.postUser(this.userName, this.cognitoId) // 初回ログイン後、Userテーブルに追加
        this.goHome()
      } catch (e) {
        this.error = true
        this.errorMessage = e.message
      }
    },

    async postUser(name, id) {
      const payload = {
        name,
        cognito_id: id,
        confirmed: true,
        color: 'Primary',
      }
      try {
        await API.graphql(graphqlOperation(createUser, { input: payload }))
      } catch (e) {
        this.error = true
        console.error(e.message)
        this.errorMessage = e.message
      }
    },

    goHome() {
      this.$router.push('/home')
    },
  },
}
</script>
