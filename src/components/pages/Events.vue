<template>
  <div>
    <v-flex row>
      <v-dialog v-model="dialog" max-width="800px">

        <v-btn slot="activator" color="primary" dark class="mb-2">New event</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">New info</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md2>
                  <v-text-field v-model="editedItem.date_of" label="Date"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md2>
                  <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                </v-flex>
                <v-divider></v-divider>
                <v-flex xs12 sm12 md8>
                  <!--<v-text-field v-model="editedItem.full_info" label="Full information"></v-text-field>-->
                  <v-textarea
                    v-model="editedItem.full_info"
                    label="Full information"
                    counter
                    maxlength="360"
                    full-width
                    single-line
                  ></v-textarea>
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

    <v-footer class="tabel_name">Events</v-footer>

    <v-data-table
      :headers="headers"
      :items="info"
      :search="search"
      hide-actions
      class="elevation-1 text-xs-center"


    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.date_of }}</td>
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.full_info }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
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
        { text: 'Date', value: 'date_of', align: 'center' },
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Full Information', value: 'full_info', align: 'center' },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      info: [],
      response:[],
      errors:[],
      editedIndex: -1,
      editedItem: {
        date_of: '',
        name: '',
        full_info: '',
      },
      defaultItem: {
        date_of: '',
        name: '',
        full_info: '',
      }
    }),

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

    created () {
      this.initialize()
    },

    methods: {
       initialize(){
        this.info = [
          {
            date_of: 0,
            name: 0,
            full_info: 0,
          },
        ]
      },

      editItem(item) {
        this.editedIndex = this.info.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.info.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.info.splice(index, 1)
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
        this.close();
        // Http post
          AXIOS.post(`/events`,this.editedItem)
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
  .tabel_name {
    font-size: 30px;
    /*font-family: ;*/
  }
  v-footer {
    /*text-align: center;*/
  }
</style>
