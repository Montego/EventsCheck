<template>
    <div>
      <!--<nav class="navbar navbar-light bg-light">-->
        <!--<div>-->
          <!---->
        <!--<form class="form-inline">-->
          <!--<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">-->
          <!--<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
        <!--</form>-->
        <!--</div>-->
      <!--</nav>-->
      <nav class="navbar fixed-top navbar-light bg-light navbar-light" style="background-color: lightblue">
        <a class="navbar-brand" href="#">Fixed top</a>
        <a class="navbar-brand" href="#">Hidden brand</a>
          <!--<ul class="navbar-nav">-->
            <!--<li class="nav-item active">-->
              <!--<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
              <!--<a class="nav-link" href="#">Link</a>-->
            <!--</li>-->
            <!--<li class="nav-item">-->
              <!--<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>-->
            <!--</li>-->
          <!--</ul>-->
        <a class="fas fa-sign-out" href="#"></a>"
        <button>Logout </button>
      </nav>
    </div>

</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .nav-header {
    padding: 30px 20px;
    /*background-color: #007bff;*/
    background-color: lightblue;
    text-align: center;
  }
</style>
