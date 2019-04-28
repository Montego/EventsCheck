<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="#5bc0de" dark class="mb-2">Новый сотрудник</v-btn>

      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.lastname" label="Фамилия" type="string"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.firstname" label="Имя" type="string"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.patronic" label="Отчество" type="string"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.birthday" label="Дата рождения" type="date"></v-text-field>
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
    <!--{{editedItem}}-->
    <v-footer class="tabel_name">Сотрудники</v-footer>
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
        <td class="text-xs-center">{{ props.item.birthday}}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="#5bc0de">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="red">delete</v-icon>
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
      error: false,
      dialog: false,
      headers: [
        { text: 'Фамилия', value: 'lastтame', align: 'center' },
        { text: 'Имя', value: 'firstтame', align: 'center' },
        { text: 'Отчество', value: 'patronic', align: 'center' },
        { text: 'Дата рождения', value: 'birthday', align: 'center' },
        { text: 'Действия', value: 'name', sortable: false, align: 'center' }
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
      defaultItem: {
        lastname: '',
        firstname: '',
        patronic: '',
        birthday: ''
      }

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Новый сотрудник' : 'Редактировать информацию о новом сотруднике'
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
      },

      editItem (item) {
        this.editedIndex = this.employers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.employers.indexOf(item);
        const idString = this.employers[index].id;
        const id = parseInt(idString,10);
        confirm('Are you sure you want to delete this item?') && AXIOS.delete('employers/' + id,{
          params:
            {
              id:id
            }
        }).then(response => {
          this.employers.splice(index, 1);
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.employers[this.editedIndex], this.editedItem);
          const idString = this.employers[this.editedIndex].id;
          const id = parseInt(idString,10);
          AXIOS.put(`/employers/` + id, this.editedItem)
            .then(response => {

            })
            .catch(e => {
              this.errors.push(e)
            })
        } else {
          AXIOS.post(`/employers`, this.editedItem)
            .then(response => {

              // JSON responses are automatically parsed.
              this.employers.push(response.data);
              console.log(response.data);
              console.log('test');
              console.log(response)
            })
            .catch(e => {
              this.errors.push(e);
              this.error=true;
              console.log(e)
            })

          // AXIOS.post(`/employers`, this.editedItem)
          //   .then(response => {
          //     if(response.data.isSuccess = true){
          //       this.employers.editedItem;
          //       console.log(response.data.message);
          //       console.log(response.data.isSuccess);
          //       console.log(response.data);
          //     }else{
          //       this.errors.push(e);
          //     }
          //   })

        }
        this.close();
      }
    }
  }
</script>

<style scoped>
  v-data-table {
    width: 100%;
  }
  .tabel_name {
    font-size: 30px;
    /*font-family: ;*/
  }

</style>
