<template>
  <v-card class="mt-5">
          <v-card-title class="title">Statistics</v-card-title>
          <v-card-text>
            <table class="stats">
              <thead>
                <tr>
                  <th></th>
                  <th>Guests</th>
                  <th>@ Table</th>
                  <th class="split">@ Ceremony</th>
                  <th>Invitations</th>
                  <th>@ Table</th>
                  <th>@ Ceremony</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="split">Overall</td>
                  <td>{{ numberofguests.guests }}</td>
                  <td>{{ numberofguests.table }}</td>
                  <td class="split">{{ numberofguests.ceremony }}</td>
                  <td>{{ numberofinvites.invites }}</td>
                  <td>{{ numberofinvites.table }}</td>
                  <td>{{ numberofinvites.ceremony }}</td>
                </tr>
                <tr>
                  <td class="split">RSVPed</td>
                  <td>{{ rsvpedguests.guests }}</td>
                  <td>{{ rsvpedguests.table }}</td>
                  <td class="split">{{ rsvpedguests.ceremony }}</td>
                  <td>{{ rsvpedinvites.invites }}</td>
                  <td>{{ rsvpedinvites.table }}</td>
                  <td>{{ rsvpedinvites.ceremony }}</td>
                </tr>
              </tbody>
            </table>
          </v-card-text>
      </v-card>
</template>

<script>
export default {
  props: {
    invites: {
      type: Array,
      required: true
    }
  },
  computed: {
    numberofguests () {
      let retVal = {
        guests: 0,
        table: 0,
        ceremony: 0
      }
      for (let invite of this.invites) {
        retVal.guests += invite.guest.length
        if (invite.table) {
          retVal.table += invite.guest.length
        } else {
          retVal.ceremony += invite.guest.length
        }
      }
      return retVal
    },
    numberofinvites () {
      let retVal = {
        invites: 0,
        table: 0,
        ceremony: 0
      }
      for (let invite of this.invites) {
        retVal.invites += 1
        if (invite.table) {
          retVal.table += 1
        } else {
          retVal.ceremony += 1
        }
      }
      return retVal
    },
    rsvpedguests () {
      let retVal = {
        guests: 0,
        table: 0,
        ceremony: 0
      }
      for (let invite of this.invites) {
        if (invite.rsvped) {
          retVal.guests += invite.guest.length
          if (invite.table) {
            retVal.table += invite.guest.length
          } else {
            retVal.ceremony += invite.guest.length
          }
        }
      }
      return retVal
    },
    rsvpedinvites () {
      let retVal = {
        invites: 0,
        table: 0,
        ceremony: 0
      }
      for (let invite of this.invites) {
        if (invite.rsvped) {
          retVal.invites += 1
          if (invite.table) {
            retVal.table += 1
          } else {
            retVal.ceremony += 1
          }
        }
      }
      return retVal
    }
  }
}
</script>

<style>

</style>
