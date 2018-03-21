<template>
  <v-container fluid v-if="!notfound">
    <v-layout column align-center>
      <template v-if="invitation.table">
        <v-alert outline color="primary" :value="true">
          {{ tableText }}
        </v-alert>
      </template>
      <v-form v-model="valid" ref="form" @submit.prevent="check" lazy-validation>
        <v-radio-group
          v-model="invitation.rsvped"
          >
          <v-radio
            :key="true"
            :value="true"
            color="primary"
            :label="rsvpLabel + '!'"></v-radio>
          <v-radio
            :key="false"
            :value="false"
            color="primary"
            :label="rsvpLabel + ' nicht!'"></v-radio>
        </v-radio-group>
        <h2>Gäste</h2>
        Haben wir uns vertippt? Kann jemand nicht kommen? Bitte korrigiert es hier.
        <rsvpguests
          :invitation="invitation"
          v-on:newguest="newguest"
          v-on:deleteguest="deleteguest"
          class="mb-3"></rsvpguests>
        <h2>Kontaktinformationen</h2>
        Um euch erreichen zu können.
        <v-text-field
          prepend-icon="phone"
          autocomplete="tel"
          label="Telefonnummer"
          v-model="invitation.phone"
          type="tel"
        ></v-text-field>
        <v-text-field
          prepend-icon="email"
          autocomplete="email"
          label="E-Mail"
          v-model="invitation.email"
          type="email"
        ></v-text-field>
        <h2>Kommentar</h2>
        Falls wir noch etwas wissen müssen.
        <v-text-field
          v-model="invitation.comment"
          :textarea="true"></v-text-field>
        <v-btn
          type="submit"
          :disabled="!valid"
          :loading="loading"
        >
          Speichern
        </v-btn>
      </v-form>
    </v-layout>
    <v-dialog
      v-model="showCheckDialog"
      max-width="500px">
      <v-card>
        <v-card-title>
          <h2>Stimmt alles?</h2>
        </v-card-title>
        <v-card-text>
          <rsvpcheck :invitation="invitation"></rsvpcheck>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="showCheckDialog=false">Nein, zurück</v-btn>
            <v-btn color="primary" @click="save()">Ja, speichern</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
  <v-container v-else>
    Wir konnten keine Einladung mit diesem Code finden.
  </v-container>
</template>

<script>
import {HTTP} from '../http-common'
import rsvpguests from './rsvpguests'
import rsvpcheck from './rsvp_check'

export default {
  components: {
    rsvpguests,
    rsvpcheck
  },
  data: function () {
    return {
      invitation: { guest: [] },
      valid: true,
      loading: false,
      showCheckDialog: false,
      notfound: false
    }
  },
  computed: {
    tableText () {
      let prefix = (this.invitation.guest.length > 1 ? 'Ihr seid' : 'Du bist')

      return prefix + ' zur Tafel eingeladen.'
    },
    rsvpLabel () {
      return this.invitation.guest.length > 1 ? 'Wir kommen' : 'Ich komme'
    }
  },
  beforeMount: function () {
    HTTP.get('/invitation', {
      params: {
        id: this.$route.params.code
      }
    })
    .then((response) => {
      this.invitation = JSON.parse(response.data)
    })
    .catch((error) => {
      this.notfound = true
      console.log(error)
    })
  },
  methods: {
    check () {
      this.showCheckDialog = true
    },
    newguest () {
      this.invitation.guest.push('')
    },
    deleteguest (id) {
      this.invitation.guest.splice(id, 1)
    },
    save () {
      let invitation = this.invitation
      // remove empty values
      Object.keys(invitation).forEach((key) => (invitation[key] === null || invitation[key] === '') && delete invitation[key])
      // remove date value, will be set at API server
      delete invitation['date']
      HTTP.put('/invitation',
        invitation
      )
      .then((response) => {
        console.log(response.status)
        console.log(response.data)
        this.$router.push({name: 'done'})
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.tableinfo {
  font-size: 20px;
}
</style>
