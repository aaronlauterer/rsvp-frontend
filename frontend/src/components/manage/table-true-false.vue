<template>
  <v-icon>{{ icon }}</v-icon>
</template>

<script>
export default {
  props: {
    status: {
      required: true
    }
  },
  computed: {
    icon: function () {
      return this.status ? 'done' : 'clear'
    }
  }
}
</script>

<style>

</style>
