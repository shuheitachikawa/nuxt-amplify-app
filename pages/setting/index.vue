<template>
  <v-container>
    <v-text-field
      :value="loginUser.name"
      v-model="loginUser.name"
    ></v-text-field>

    <v-file-input
      :rules="rules"
      accept="image/png, image/jpeg, image/bmp"
      placeholder="アイコン画像を選択"
      prepend-icon="mdi-camera"
      label="ファイル"
      v-model="uploadImage"
      @change="selectedFile"
    ></v-file-input>

    <v-container class="d-flex justify-center">
      <div class="image">
        <img :src="loginUser.image.path" alt="アイコン" />
      </div>

      <v-color-picker
        class="ma-4"
        v-model="loginUser.color"
        show-swatches
        swatches-max-height="500px"
      ></v-color-picker>
    </v-container>

    <v-btn color="primary" @click="changeProfile">変更</v-btn>
  </v-container>
</template>

<script>
import { API, graphqlOperation, Storage } from 'aws-amplify'
import { updateUser } from '@/src/graphql/mutations'
// import { userByCognitoId } from '@/src/graphql/queries'

export default {
  data() {
    return {
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ],
      loginUser: {
        name: '',
        color: '',
        id: '',
        cognitoId: '',
        image: {
          path: '',
          name: '',
        },
      },
      uploadImage: '',
    }
  },
  async created() {
    if (!this.$store.getters.loginUser) {
      const cognitoId = localStorage.getItem(
        'CognitoIdentityServiceProvider.371nfhrqmkp9rq749d92gl6dbe.LastAuthUser'
      )
      await this.$store.dispatch('getUser', cognitoId)
    }
    const user = this.$store.getters.loginUser
    this.loginUser.name = user.name
    this.loginUser.color = user.color
    this.loginUser.id = user.id
    this.loginUser.cognitoId = user.cognito_id
    this.loginUser.image.name = user.img_pass

    // 画像取得
    if (this.loginUser.image.name) {
      const data = await Storage.get(this.loginUser.image.name, {
        level: 'protected',
      })
      console.log(data)
      this.loginUser.image.path = data
    }
  },
  methods: {
    selectedFile() {
      console.log(this.uploadImage)
      // e.preventDefault()
      // this.uploadImage = e.target.files[0]
    },
    async changeProfile() {
      try {
        // DB保存
        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: this.loginUser.id,
              name: this.loginUser.name,
              color: this.loginUser.color,
              img_pass: this.uploadImage.name,
            },
          })
        )
        // ストレージ保存
        if (this.uploadImage) {
          await Storage.put(this.uploadImage.name, 'Protected Content', {
            level: 'protected',
            contentType: this.uploadImage.type,
          })
            .then((res) => console.log(res))
            .catch((e) => console.error(e))
        }
        alert('変更しました')
      } catch (e) {
        alert(e.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.image {
  width: 200px;
  margin-right: 54px;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
