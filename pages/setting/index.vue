<template>
  <v-container>
    <h2>{{ loginUser.name }}</h2>
    <h2>{{ loginUser.color }}</h2>
    <v-color-picker
      class="ma-4"
      show-swatches
      swatches-max-height="500px"
    ></v-color-picker>
    <v-container>
      <div class="image">
        <!-- <img :src="user.img_pass" alt="" /> -->
      </div>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    swatches: [
      ['#FF0000', '#AA0000', '#550000'],
      ['#FFFF00', '#AAAA00', '#555500'],
      ['#00FF00', '#00AA00', '#005500'],
      ['#00FFFF', '#00AAAA', '#005555'],
      ['#0000FF', '#0000AA', '#000055'],
    ],
  }),
  computed: {
    loginUser() {
      return this.$store.getters.loginUser
    },
  },
}
</script>

<style lang="scss" scoped></style>
