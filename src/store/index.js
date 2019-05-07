import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify'


Vue.use(Vuetify);
Vue.use(Vuex);

export const store= new Vuex.Store({
  modules: {
    // employersPage,
    // eventsPage,
    // mainPage,
    // tabelPage
  }
  ,
  strict: process.env.NODE_ENV !== 'production'
});
