<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <hr>
  </div>
</template>

<script>
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
export default {
  name: 'app',
  components: {
    Footer, Header
  },
  // data () {
  //   return {
  //     msg: 'Welcome to Your Vue.js App'
  //   }
  // }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
/*header {*/
  /*padding: 30px 20px;*/
  /*!*background-color: #007bff;*!*/
  /*background-color: lightblue;*/
/*}*/

/*footer {*/
  /*margin-top: 40px;*/
  /*padding: 30px 20px;*/
  /*background-color: #007bff;*/
/*}*/
/*h1, h2 {*/
  /*font-weight: normal;*/
/*}*/

/*ul {*/
  /*list-style-type: none;*/
  /*padding: 0;*/
/*}*/

/*li {*/
  /*display: inline-block;*/
  /*margin: 0 10px;*/
/*}*/

/*a {*/
  /*color: #42b983;*/
/*}*/
</style>
