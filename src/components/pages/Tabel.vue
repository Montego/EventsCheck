<template>
  <div>
    <v-flex row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="#5bc0de" dark class="mb-2">New tabel info</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New info</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.person" :items="persons" label="Person"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.date_of" label="Date" type="date"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.overtime" label="Overtime"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.lesstime" label="Lesstime"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.seakleave" label="Seak leave"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.time_off" label="Time off"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.vacation" label="Vacation"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-text-field
        class="search_place"
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-flex>

    <v-data-table
      :headers="headers"
      :items="info"
      :search="search"
      hide-actions
      class="elevation-1 text-xs-center"


    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.person }}</td>
        <td class="text-xs-center">{{ props.item.date_of }}</td>
        <td class="text-xs-center">{{ props.item.overtime }}</td>
        <td class="text-xs-center">{{ props.item.lesstime }}</td>
        <td class="text-xs-center">{{ props.item.seakleave }}</td>
        <td class="text-xs-center">{{ props.item.time_off }}</td>
        <td class="text-xs-center">{{ props.item.vacation }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="red">delete</v-icon>
          </v-btn>
        </td>
      </template>

      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>



      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {AXIOS} from '../plugins/APIService';
  export default {
    data: () => ({
      search: '',
      dialog: false,
      headers: [
        { text: 'Person', value: 'person', align: 'center' },
        { text: 'Date', value: 'date_of', align: 'center' },
        { text: 'Overtime', value: 'overtime', align: 'center' },
        { text: 'Lesstime', value: 'lesstime', align: 'center' },
        { text: 'Seak leave', value: 'seakleave', align: 'center' },
        { text: 'Time off', value: 'time_off', align: 'center' },
        { text: 'Vacation', value: 'vacation', align: 'center' },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      info: [],
      persons: [],
      errors:[],
      editedIndex: -1,
      editedItem: {
        person: '',
        date_of: '',
        overtime: '',
        lesstime: '',
        seakleave: '',
        time_off: '',
        vacaton: ''
      },
      defaultItem: {
        person: '',
        date_of: '',
        overtime: 0,
        lesstime: 0,
        seakleave: 0,
        time_off: 0,
        vacaton: 0,
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New tabel info' : 'Edit tabel info'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize() {
        this.info = [
          AXIOS.get(`/employers`)
            .then(response => {
              this.employers = response.data
            })
            .catch(e => {
              this.errors.push(e)
            })
        ]
      },

      editItem(item) {
        this.editedIndex = this.info.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.info.indexOf(item)
        confirm('Are you sure you want to delete this item?') && AXIOS.delete('events/' + index,{
          params:
            {
              id:this.info.id
            }
        }).then(response => {
          this.info.splice(index, 1);
        })
          .catch(e => {
            this.errors.push(e)
          });
      },

      close() {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.info[this.editedIndex], this.editedItem)
        } else {
          this.info.push(this.editedItem)
        }
        this.close()
        AXIOS.post(`/tabel`,this.editedItem)
          .then(response => {
            // JSON responses are automatically parsed.
            this.editedItem = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    },
  }

</script>

<style scoped>
  .search_place {
    padding-bottom: 20px;
  }
  .row {
    margin-left: 0;
    margin-right: 0;
  }
</style>
