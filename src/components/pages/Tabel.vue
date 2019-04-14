<template>
  <div>
    <v-flex row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="#5bc0de" dark class="mb-2">Новая информация для табеля</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New info</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap align-center>
              <v-flex xs12 sm12 md12>
                <!--<v-text-field v-model="editedItem.employer" :items="employers" label="Работник"></v-text-field>-->
                <!--<v-select-->
                  <!--:items="employers"-->
                  <!--label="Person"-->
                <!--&gt;</v-select>-->

                <!--<cool-select-->
                  <!--v-model="editedItem.employer"-->
                  <!--:items="employers"-->
                  <!--:key="employers.id"-->
                  <!---->
                  <!--item-text="fullname"-->
                  <!--item-value="id"-->
                <!--/>-->

                <cool-select
                v-model="editedItem.fullname"
                :items="employers"
                :key="employers.id"
                item-text="fullname"
                item-value="id"
                @select="onSelected"
                />

              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.date_of" label="Дата" type="date"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.overtime" label="Переработки"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.lesstime" label="Недоработки"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.seakleave" label="Больничный"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.time_off" label="Отгул"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.vacation" label="Отпуск"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Закрыть</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      {{editedItem}}
      <br>
    {{employers}}
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
        <td class="text-xs-center">{{ props.item.fullname }}</td>
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
  import { CoolSelect } from 'vue-cool-select';
  export default {
    components: { CoolSelect },
    data: () => ({
      search: '',
      dialog: false,
      headers: [
        { text: 'Работник', value: 'fullname', align: 'center' },
        { text: 'Дата', value: 'date_of', align: 'center' },
        { text: 'Переработки', value: 'overtime', align: 'center' },
        { text: 'Недоработки', value: 'lesstime', align: 'center' },
        { text: 'Больничный', value: 'seakleave', align: 'center' },
        { text: 'Отгул', value: 'time_off', align: 'center' },
        { text: 'Отпуск', value: 'vacation', align: 'center' },
        { text: 'Действия', value: 'name', sortable: false, align: 'center' }
      ],
      info: [],
      employers: [],
      selected:1,
      errors:[],
      editedIndex: -1,
      editedItem: {
        fullname:'',
        // employer: {
        //   // id:'',
        //   // fullname:''
        // },
        date_of: '',
        overtime: '',
        lesstime: '',
        seakleave: '',
        time_off: '',
        vacation: ''
      },
      defaultItem: {
        // employer: {
        //   // id:'',
        //   // fullname:''
        // },
        fullname:'',
        date_of: '',
        overtime: 0,
        lesstime: 0,
        seakleave: 0,
        time_off: 0,
        vacation: 0,
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

      onSelected(obj) {
        console.log(obj);
        this.editItem.employer=obj;
        // console.log(this.selected);

        console.log(this.editedItem);
      },


      initialize() {
        this.employers = [
          AXIOS.get(`/employers/full`)
            .then(response => {
              this.employers = response.data
            })
            .catch(e => {
              this.errors.push(e)
            })
        ],
        this.info = [
          AXIOS.get(`/tabel`)
            .then(response => {
              this.info = response.data
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
        const index = this.info.indexOf(item);
        const idString = this.info[index].id;
        const id = parseInt(idString,10);
        confirm('Are you sure you want to delete this item?') && AXIOS.delete('tabel/' + id,{
          params:
            {
              id:id
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
          AXIOS.post(`/tabel`,this.editedItem)
            .then(response => {
              // JSON responses are automatically parsed.
              this.info.push(response.data)
            })
            .catch(e => {
              this.errors.push(e)
            })
        }
        this.close()

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
