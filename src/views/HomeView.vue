<template>
  <div class="home">
    <h1>Home</h1>
    <button @click="goToDaybook" class="btn btn-primary">Hola Mundo</button>
  </div>
</template>
<script>
export default {
  methods: {
    goToDaybook () {
      this.$router.push({name: 'no-entry'})
    }
  },
}
</script>