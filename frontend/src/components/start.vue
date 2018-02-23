<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <p>Den Code findest du auf dem Aufkleber.
          </p>
         <v-form v-model="valid" ref="form" @submit="submit" lazy-validation>
          <v-text-field
            label="Code"
            v-model="code"
            required
          ></v-text-field>
          <v-btn
            type="submit"
            :disabled="!valid"
            :loading="loading"
          >
            Weiter
          </v-btn>
        </v-form>
          <v-alert
            color="error"
            v-model="alert"
            transition="slide-x-transition"
          >
            {{ errormsg}}
          </v-alert>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  data: function () {
    return {
      valid: false,
      code: '',
      errormsg: '',
      alert: false,
      loading: false
    }
  },
  methods: {
    submit () {
      let code = this.code

      this.loading = true
      // Check if coode exists
      HTTP.get('/invitation', {
        params: {
          id: code
        }
      })
      .then((response) => {
        this.alert = false
        console.log(response.data)
        this.$router.push({name: 'rsvp', params: { code }})
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.errormsg = 'Wir konnten keine Einladung mit dem Code finden.'
          this.alert = true
        }
      })
      this.loading = false
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
p {
  text-align: center;
}
</style>
