<template>
  <div>
    <h2>Login</h2>
    <v-form v-model="valid"
      ref="form"
      @submit.prevent="submit"
      lazy-validation>
      <v-text-field
        v-model="user"
        required
        label="User"></v-text-field>
      <v-text-field
        v-model="pass"
        type="password"
        required
        label="Password"></v-text-field>
      <v-btn type="submit" color="primary" :disabled="!valid">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  data: function () {
    return {
      valid: false,
      user: '',
      pass: ''
    }
  },
  methods: {
    submit () {
      HTTP.post('/login', {
        user: this.user,
        pass: this.pass
      })
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('authToken', response.data)
        this.$router.push({name: 'manage'})
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
h2 {
  font-weight: 300;
}
</style>
