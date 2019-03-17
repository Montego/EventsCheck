<template>
    <div>
      <nav class="navbar navbar-expand-sm ">
      <ul class="navbar-nav justify-content-center">

        <li class="nav-link main">
          <router-link :to="{name: 'main'}" v-bind:title="message">
            <a href="" class="fas fa-home main_icon" ></a>
          </router-link>
        </li>
        <div class="vl"></div>


        <li class="nav-link employers">
          <!--<a href="" class="far fa-user"></a>-->
          <router-link :to="{name: 'employers'}" v-bind:title="message">
            <a href="" class="fas fa-users"></a>
          </router-link>
        </li>
        <!--<div class="vl"></div>-->
        <li class="nav-link events">
          <router-link :to="{name: 'events'}" v-bind:title="message">
          <a href="" class="fas fa-theater-masks"></a>
          </router-link>
        </li>
        <!--<div class="vl"></div>-->
        <li class="nav-link tabel">
          <router-link :to="{name: 'tabel'}" v-bind:title="message">
          <a href="" class="fas fa-user-clock"></a>
          </router-link>
        </li>

        <li class="nav-link calendar">
          <router-link :to="{name: 'calendar'}" v-bind:title="message">
            <a href="" class="far fa-calendar-alt"></a>
          </router-link>
        </li>

      </ul>

      <!-- Right -->
      <ul class="navbar-nav ml-auto">
        <div class="vl"></div>
        <li class="nav-item">
          <a class="nav-link username">User</a>
        </li>
        <li class="nav-link">
          <!--<a href="" class="nav-link">Logout</a>-->
          <a href="" class="fas fa-sign-out-alt"></a>
        </li>
      </ul>
      </nav>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data: function () {
        return {
          message: 'fgdfg'
        }
      },
      computed:{
          // kindOfInfoAboutIconMenu{
          //
          // }
      }
    }
</script>

<style scoped>
  .nav-link {
    margin-left: 100px;
    font-size: 30px;
    /*text-align: center;*/
    text-shadow: 1px 1px 3px #666666,
    -1px -1px 3px #FFFFFF;
  }
  .navbar {
    text-align: center;
    /*background-color: gainsboro;*/
    background-color: #efefef;
  }

  .vl {
    border-left: 1px solid ghostwhite;
  }
  .nav-link.groups_link {
    align-content: center;
  }
  a {
    color: black;
  }
  .main {
    margin-left: 0;
    margin-right: 100px;

  }
  .username {
    margin-left: 0;
  }
  .main_icon{
    color: #5bc0de;
  }
</style>
