<template>
    <div>
      <nav class="navbar navbar-expand-sm ">
      <ul class="navbar-nav justify-content-center">

        <li class="nav-link main">
          <router-link :to="{name: 'main'}" v-bind:title="titles[0].title">
            <!--<a href="" class="fas fa-home main_icon" ></a>-->
            <template v-if="'main'.indexOf($route.name)>-1">
              <a href="" class="fas fa-home main_icon"></a>
            </template>
            <template v-else>
              <a href="" class="fas fa-home"></a>
            </template>
          </router-link>
        </li>
        <div class="vl"></div>


        <li class="nav-link employers">
          <!--<a href="" class="far fa-user"></a>-->
          <router-link :to="{name: 'employers'}" v-bind:title="titles[1].title">
            <!--<a href="" class="fas fa-users"></a>-->
            <template v-if="'employers'.indexOf($route.name)>-1">
              <a href="" class="fas fa-user-plus employer_icon"></a>
            </template>
            <template v-else>
              <a href="" class="fas fa-user-plus"></a>
            </template>
          </router-link>
        </li>
        <!--<div class="vl"></div>-->
        <li class="nav-link events">
          <router-link :to="{name: 'events'}" v-bind:title="titles[2].title">
          <!--<a href="" class="fas fa-theater-masks"></a>-->
            <template v-if="'events'.indexOf($route.name)>-1">
              <a href="" class="fas fa-theater-masks events_icon"></a>
            </template>
            <template v-else>
              <a href="" class="fas fa-theater-masks"></a>
            </template>
          </router-link>
        </li>
        <!--<div class="vl"></div>-->
        <li class="nav-link tabel">
          <router-link :to="{name: 'tabel'}" v-bind:title="titles[3].title">
          <!--<a href="" class="fas fa-user-clock"></a>-->
            <template v-if="'tabel'.indexOf($route.name)>-1">
              <a href="" class="fas fa-user-clock tabel_icon"></a>
            </template>
            <template v-else>
              <a href="" class="fas fa-user-clock"></a>
            </template>
          </router-link>
        </li>

        <li class="nav-link calendar">
          <router-link :to="{name: 'calendar'}" v-bind:title="titles[4].title">
            <!--<a href="" class="far fa-calendar-alt"></a>-->
            <template v-if="'calendar'.indexOf($route.name)>-1">
              <a href="" class="far fa-calendar-alt calendar_icon"></a>
            </template>
            <template v-else>
              <a href="" class="far fa-calendar-alt"></a>
            </template>
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
          titles:[
            {
              title: 'Главная страница'
            },
            {
              title: 'Сотрудники'
            },
            {
              title: 'События'
            },
            {
              title: 'Табель'
            },
            {
              title: 'Календарь'
            }
          ]
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
  .main_icon{
  color: #5bc0de;
  }
  .employer_icon {
    color: #5bc0de;
  }
  .events_icon {
    color: #5bc0de;
  }
  .tabel_icon {
    color: #5bc0de;
  }
  .calendar_icon {
    color: #5bc0de;
  }
  .vl {
    border-left: 1px solid ghostwhite;
  }
  .nav-link.groups_link {
    align-content: center;
  }
  a {
    color: black;
    text-decoration: none;
  }
  .main {
    margin-left: 0;
    margin-right: 100px;

  }
  .username {
    margin-left: 0;
  }

</style>
