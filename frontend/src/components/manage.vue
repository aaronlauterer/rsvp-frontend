<template>
  <v-container fluid>
    <v-layout column align-center>
      <v-toolbar>
        <v-toolbar-items>
          <v-btn color="primary" dark @click="dialog = true" class="mb-2"><v-icon>add</v-icon>New Item</v-btn>
          <v-btn flat :loading="refreshLoading" @click="refreshall"><v-icon>refresh</v-icon>refresh</v-btn>
          <download-c-s-v :invites="invites"></download-c-s-v>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"></v-text-field>
      </v-toolbar>
       <v-dialog v-model="dialog" max-width="500px">
        <v-form v-model="valid" ref="form" @submit="save" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="title">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <fieldset ><legend class="subtitle">Guests</legend>
                    <template v-for="guest, key in editedItem.guest">
                      <v-layout wrap>
                        <v-flex xs10>
                          <v-text-field label="Guest" v-model="editedItem.guest[key]"></v-text-field>
                        </v-flex>
                        <v-flex xs2>
                          <v-btn flat small icon title="Delete" @click="deleteguest(key)"><v-icon>delete</v-icon></v-btn>
                        </v-flex>
                      </v-layout>
                    </template>
                    <v-btn flat outline small icon title="Add guest" @click="newguest"><v-icon small>add</v-icon></v-btn>
                  </fieldset>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field autocomplete="email" label="Email" v-model="editedItem.email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field autocomplete="tel" label="Phone" v-model="editedItem.phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-checkbox label="RSVPed" v-model="editedItem.rsvped"></v-checkbox>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-checkbox label="Table" v-model="editedItem.table"></v-checkbox>
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field textarea label="Comment" v-model="editedItem.comment"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click.native="close">Cancel</v-btn>
            <v-btn type="submit" flat>Save</v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
      <template>
        <v-flex xs12>
          <v-data-table
            :headers="tableheaders"
            :items="invites"
            item-key="id"
            class="elevation-1"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.guest[0] }}
                  <template v-if="props.item.guest.length > 1">
                    + {{ props.item.guest.length -1 }}
                  </template>
                </td>
                <td class="text-xs-center"><table-true-false :status="props.item.rsvped"></table-true-false> </td>
                <td class="text-xs-center"><table-true-false :status="props.item.table"></table-true-false></td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.phone }}</td>
                <td><table-true-false :status="props.item.comment"></table-true-false></td>
                <td>{{ props.item.date | datetime }}</td>
                <td class="justify-center layout px-0">
                  <v-btn icon class="mx-0" @click="props.expanded = !props.expanded">
                    <v-icon v-if="props.expanded">expand_less</v-icon>
                    <v-icon v-else>expand_more</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="editItem(props.item)">
                    <v-icon color="teal">edit</v-icon>
                  </v-btn>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="pink">delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <div class="expanded">
                  <div class="guests">
                    <h3>Guests</h3>
                    <div v-for="value, key in props.item.guest">
                      <span v-bind:key="key">{{ value }}</span>
                    </div>
                  </div>
                  <div class="comment">
                    <h3>Comment</h3>
                    {{ props.item.comment }}
                  </div>
                </div>
              </v-card>
            </template>
          </v-data-table>
        </v-flex>
      </template>
      <statistics :invites="invites"></statistics>
    </v-layout>
  </v-container>
</template>

<script>
import {HTTP} from '../http-common'
import tableTrueFalse from './manage/table-true-false'
import downloadCSV from './manage/downloadcsv'
import statistics from './manage/statistics'

import {Random, Entropy} from 'entropy-string'

const random = new Random('ABCDEFGHJKLMNOPRSTUVWXYZ23456789')
const bits = Entropy.bits(200, 1e6)

export default {
  components: {
    tableTrueFalse,
    downloadCSV,
    statistics
  },
  data: () => {
    return {
      token: '',
      dialog: false,
      valid: true,
      search: '',
      tableheaders: [
        {
          text: 'Code',
          align: 'left',
          sortable: false,
          value: 'code'
        },
        { text: 'Guests', value: 'guest', sortable: false },
        { text: 'RSVPed', value: 'rsvped' },
        { text: 'Table', value: 'table' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Comment', value: 'comment' },
        { text: 'RSVPed @', value: 'date' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      invites: [],
      refreshLoading: false,
      editedIndex: -1,
      editedItem: {
        guest: [''],
        table: false,
        rsvped: false,
        comment: '',
        email: '',
        phone: ''
      },
      defaultItem: {
        guest: [''],
        table: false,
        rsvped: false,
        comment: '',
        email: '',
        phone: ''
      }
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  filters: {
    datetime: function (value) {
      if (!value) return ''
      return new Date(value).toLocaleString()
    }
  },
  created () {
    this.token = localStorage.getItem('authToken')

    if (!this.token) {
      this.$router.push({name: 'login'})
    }
  },
  beforeMount () {
    if (this.token) {
      HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
    } else {
      HTTP.defaults.headers.common['Authorization'] = null
    }
    this.fetchAll()
  },
  methods: {
    fetchAll () {
      HTTP.get('/allinvites')
      .then((response) => {
        this.invites = JSON.parse(response.data)
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response.headers)
        console.log(error.response.request)
        if (error.response.status === 401) {
          this.$router.push({name: 'login'})
        }
      })
    },
    refreshall () {
      this.refreshLoading = true
      this.fetchAll()
      this.refreshLoading = false
    },
    newguest () {
      this.editedItem.guest.push('')
    },
    deleteguest (key) {
      this.editedItem.guest.splice(key, 1)
    },
    editItem (item) {
      this.editedIndex = this.invites.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.invites.indexOf(item)
      confirm('Are you sure you want to delete this item?')
      HTTP.delete('/invitation', {
        params: {
          delid: item.id
        }
      })
      .then((response) => {
        console.log(response.status)
        console.log(response.data)
        this.invites.splice(index, 1)
        this.close()
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response.headers)
        console.log(error.response.request)
        console.log(error.response.data)
        if (error.stats === 401) {
          this.$router.push({name: 'login'})
        }
      })
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      let sendItem = this.editedItem
      // remove empty values
      Object.keys(sendItem).forEach((key) => (sendItem[key] === null || sendItem[key] === '') && delete sendItem[key])
      // remove date value, will be set at API server
      delete sendItem['date']
      if (this.editedIndex > -1) {
        HTTP.put('/invitation',
          sendItem
        )
        .then((response) => {
          console.log(response.status)
          console.log(response.data)
          Object.assign(this.invites[this.editedIndex], sendItem)
          this.close()
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response.headers)
          console.log(error.response.request)
          console.log(error.response.data)
          if (error.stats === 401) {
            this.$router.push({name: 'login'})
          }
          alert(error.response.data.detail)
        })
      } else {
        sendItem['id'] = random.string(bits)

        HTTP.post('/invitation',
          sendItem
        )
        .then((response) => {
          console.log(response.status)
          console.log(response.data)
          this.invites.push(sendItem)
          this.close()
        })
        .catch((error) => {
          console.log(error)
          console.log(error.response.headers)
          console.log(error.response.request)
          console.log(error.response.data)
          if (error.stats === 401) {
            this.$router.push({name: 'login'})
          }
          alert(error.response.data.detail)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.content {
  max-width: 100% !important;
}
.datatable__expand-content .expanded {
  display: grid;
  padding: 15px;
  grid-template-columns: 1fr 1fr;
}
.datatable__expand-content .expanded .guests > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.stats {
  border-collapse: collapse;
}

.stats thead {
  border-bottom: 1px solid rgba(0,0,0,0.12);
}
.stats th,
.stats td {
  padding: 10px 20px;
}
.stats thead th {
  font-weight: 400;
  text-align: center;
}

.stats tbody td {
  text-align: center;
}

.stats .split {
    border-right: 1px solid rgba(0,0,0,0.12);
}
fieldset {
  padding: 10px;
}
legend {
  padding: 0 5px;
}

</style>
