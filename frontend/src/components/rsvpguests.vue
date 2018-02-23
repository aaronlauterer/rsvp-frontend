<template>
  <div>
    <div v-for="guest, key in invitation.guest">
      <div class="guest">
        <v-text-field v-model="invitation.guest[key]"></v-text-field>
        <v-btn flat small icon title="Löschen" @click="deleteguest(key)"><v-icon>delete</v-icon></v-btn>
      </div>
    </div>
    <v-btn flat outline icon title="Weiterer Gast" @click="newguest"><v-icon>add</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  props: {
    invitation: {
      type: Object,
      required: true
    }
  },
  data: () => ({
  }),
  methods: {
    newguest () {
      this.$emit('newguest')
    },
    deleteguest (id) {
      this.$emit('deleteguest', id)
    }
  }
}
</script>

<style lang="scss">
.guest {
  display: flex;
  align-items: baseline;
}


</style>
