<template>
  <div>
    <v-flex row>

      <!--<span class="title"> По состоянию на: {{}}</span>-->
      <span class="title" @click="callRestService()"> По состоянию на: {{ response }}</span>
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

    <v-footer class="tabel_name">Full information</v-footer>

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
      </template>

      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>

      <!--<template slot="no-data">-->
        <!--<v-btn color="primary" @click="initialize">Reset</v-btn>-->
      <!--</template>-->
    </v-data-table>
  </div>
</template>

<script>
  import  {AXIOS} from "../plugins/APIService.js"
  export default {
    data: () => ({
      response:[],
      search: '',
      dialog: false,
      headers: [
        { text: 'Date', value: 'date_of', align: 'center' },
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'Full Information', value: 'full_info', align: 'center' },
      ],
      info: [],
      editedIndex: -1,

    }),

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      callRestService () {
        AXIOS.get(`/testREST/test`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.response = response.data
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

  }
</style>
