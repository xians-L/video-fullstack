<template>
  <div class="pa-3 text-center">
    <v-select v-model="currentIndex" :items="course.episode.map((v, i) => ({text: v.name, value: i}))"></v-select>
    <video width="70%" :src="episode.file" controls></video>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${params.id}`, {
      params: {
        query: {
          populate: 'episode'
        }
      }
    })
    return {
      id,
      course
    }
  },

  data() {
    return {
      currentIndex: 0
    }
  },

  computed: {
    episode() {
      return this.course.episode[this.currentIndex]
    }
  },
}
</script>
