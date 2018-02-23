<template>
  <div>
    <h3>Zugesagt</h3>
    {{ rsvped }}
    <h3>Gäste</h3>
    <div v-for="guest, key in invitation.guest">
      <span>{{ guest }}</span><br>
    </div>
    <h2>Kontaktinfos</h2>
    <span v-if="invitation.email"><v-icon>email</v-icon> {{ invitation.email }}</span><br>
    <span v-if="invitation.phone"><v-icon>phone</v-icon> {{ invitation.phone }}</span>
    <template v-if="invitation.comment">
      <h2>Kommentar</h2>
      {{ invitation.comment }}
    </template>
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
  computed: {
    rsvped () {
      return this.invitation.rsvped ? 'JA' : 'NEIN'
    }
  }
}
</script>

<style>

</style>
