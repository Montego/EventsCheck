<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="#5bc0de" dark class="mb-2">Add new employer</v-btn>

      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.lastname" label="Last name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.firstname" label="First name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.patronic" label="Patronic"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.birthday" label="Birthday" type="date"></v-text-field>
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
    <v-data-table
      :headers="headers"
      :items="employers"

      hide-actions
      class="elevation-1 text-xs-center"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.lastname }}</td>
        <td class="text-xs-center">{{ props.item.firstname }}</td>
        <td class="text-xs-center">{{ props.item.patronic }}</td>
        <td class="text-xs-center">{{ props.item.birthday }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
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
      dialog: false,
      headers: [
        { text: 'Last name', value: 'lastтame', align: 'center' },
        { text: 'First name', value: 'firstтame', align: 'center' },
        { text: 'Patronic', value: 'patronic', align: 'center' },
        { text: 'Birthday', value: 'birthday', align: 'center' },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      employers: [],
      response:[],
      errors:[],
      editedIndex: -1,
      editedItem: {
        lastname: '',
        firstname: '',
        patronic: '',
        birthday: ''
      },

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New employer' : 'Edit employer'
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
      initialize () {
        this.employers = [
          AXIOS.get(`/employers`)
            .then(response => {
              this.employers = response.data
            })
            .catch(e => {
              this.errors.push(e)
            })
        ]
        // this.employers = [
          // {
          //   lastname: '',
          //   firstname: '',
          //   patronic: '',
          //   birthday: '',
          // },
        // ]

      },

      editItem (item) {
        this.editedIndex = this.employers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.employers.indexOf(item);
        confirm('Are you sure you want to delete this item?') && AXIOS.delete('employers/' + index,{
          params:
            {
              id:this.item.id
            }
        }).then(response => {
          this.employers.splice(index, 1);
        })
          .catch(e => {
            this.errors.push(e)
          });
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.employers[this.editedIndex], this.editedItem)
        } else {
          this.employers.push(this.editedItem)

        }
        this.close();
        AXIOS.post(`/employers`,this.editedItem)
          .then(response => {
            // JSON responses are automatically parsed.
            this.editedItem = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
</script>

<style scoped>
  v-data-table {
    width: 100%;
  }

</style>
